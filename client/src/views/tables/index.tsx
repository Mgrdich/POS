import React from 'react';
import {useForm} from "react-hook-form";
import {useDynamicFields} from "../../components/Hooks/useDynamicFields";
import axios, {AxiosResponse} from "axios";
import {IAlertAxiosResponse} from "../../interfaces/General";
import Grid from "@material-ui/core/Grid";
import DynamicFields from "../../components/Reusable/DynamicFields";
import {Button} from "@material-ui/core";
import {createTableValSchema, creteTableInputField} from "./config";
import {useServerErrorHandle} from "../../components/Hooks/useServerErrorHandle";
import {useTable} from "../../components/Hooks/useTable";
import {useTableBody} from "../../components/Hooks/useTableBody";
import MyTable from "../../components/Reusable/Table/MyTable";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import AlertQuestion from "../../components/Reusable/AlertQuestion";
import {useAlert} from "../../components/Hooks/useAlert";
import Alerts from "../../components/Reusable/Alerts";


const actionsTypes: Array<string> = ["delete"];


const CreateEditTables = () => {
    const {handleSubmit, register, errors, control, unregister, reset} = useForm<any>({
        validationSchema: createTableValSchema,
    });
    const [serverError, setterError, resetServerError] = useServerErrorHandle();
    const {tbody, thead, keys, isLoading} = useTable('/tables');
    const [rows, setRows, deletedId, changeDeletedId] = useTableBody(isLoading, tbody);
    const {alertMessage, setOpenAlert, openAlert, setAlert, alertType} = useAlert();
    useDynamicFields(creteTableInputField, register, unregister);
    // console.log(rows);

    const onSubmit = function (values: any): void {
        axios.put('/tables', values)
            .then(function (res: IAlertAxiosResponse) {
                reset();
                resetServerError();
                console.log('successfully created', res.data.message);
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });
    };


    const handleActions = function (type: string, obj: any) {
        if (type === 'delete') {
            changeDeletedId(obj._id);
            setAlert({message: 'Are you sure you want to delete this row!'}, {alertQuestion: true, alert: false});
        }
    };

    const handleDeleted = function (id: string) {
        axios.delete(`/tables/${id}`).then((res: AxiosResponse) => {
            setAlert(res.data, {alertQuestion: false, alert: true});
        }).catch((e) => {
            console.log(e);
        });
        const filteredRows = rows.filter((row: any) => {
            return row._id !== id;
        });
        setRows(filteredRows);
        setOpenAlert({alertQuestion: false, alert: false});
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" spacing={1}>
                    <Grid item container direction="row" spacing={1}>
                        <DynamicFields
                            InputFields={creteTableInputField}
                            register={register}
                            errors={errors}
                            control={control}
                            serverError={serverError}
                            Component={Grid}
                            ComponentProps={
                                {
                                    item: true,
                                    xs: 12,
                                    sm: 6,
                                    md: 4,
                                    lg: 3,
                                }
                            }
                        />

                    </Grid>
                    <Grid item container direction="row-reverse" xs={12}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            className="FloatRight"
                            type="submit"
                        >Submit</Button></Grid>
                </Grid>
            </form>

            <ComponentLoader isLoading={isLoading}>
                <MyTable
                    thead={thead}
                    tbody={rows}
                    keys={keys}
                    pagination={true}
                    paginationRowsCount={[3, 5, 10]}
                    actionsTypes={actionsTypes}
                    handleActions={handleActions}
                />
            </ComponentLoader>


            <AlertQuestion
                open={openAlert.alertQuestion}
                close={setOpenAlert}
                callback={() => handleDeleted(deletedId)}
            >
                {alertMessage}
            </AlertQuestion>
            <Alerts open={openAlert.alert} severity={alertType} close={setOpenAlert}>
                {alertMessage};
            </Alerts>
        </>
    );
};

export default CreateEditTables;