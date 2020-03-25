import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useDynamicFields} from "../../components/Hooks/useDynamicFields";
import axios, {AxiosResponse} from "axios";
import {IAlertAxiosResponse} from "../../interfaces/General";
import Grid from "@material-ui/core/Grid";
import DynamicFields from "../../components/Reusable/DynamicFields";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {createTableValSchema, creteTableInputField, EditTableInputField, EditTableValSchema} from "./config";
import {useServerErrorHandle} from "../../components/Hooks/useServerErrorHandle";
import {useTable} from "../../components/Hooks/useTable";
import {useTableBody} from "../../components/Hooks/useTableBody";
import MyTable from "../../components/Reusable/Table/MyTable";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import AlertQuestion from "../../components/Reusable/AlertQuestion";
import {useAlert} from "../../components/Hooks/useAlert";
import Alerts from "../../components/Reusable/Alerts";
import {useModule} from "../../components/Hooks/useModule";
import {DefaultValue} from "../../util/functions";
import CardMessage from "../../components/Reusable/CardMessage";


const actionsTypes: Array<string> = ["Delete", 'Edit'];


const CreateEditTables = () => {
    const {handleSubmit, register, errors, control, unregister, reset} = useForm<any>({
        validationSchema: createTableValSchema,
    });
    const {handleSubmit: handleEditSubmit, register: editRegister, errors: editErrors, control: editControl} = useForm<any>({
        validationSchema: EditTableValSchema,
    });

    const [serverError, setterError, resetServerError] = useServerErrorHandle();
    const {tbody, thead, keys, isLoading, setRefetch} = useTable('/tables');
    const [rows, setRows, deletedId, changeDeletedId] = useTableBody(isLoading, tbody);
    const {alertMessage, setOpenAlert, openAlert, setAlert, alertType} = useAlert();
    const [open, handleClickOpen, handleClose] = useModule();
    const [EditData, setEditData] = useState();
    useDynamicFields(creteTableInputField, register, unregister);

    const onSubmit = function (values: any): void {
        axios.put('/tables', values)
            .then(function (res: IAlertAxiosResponse) {
                setRefetch((prev:boolean) => !prev );
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
        if (type === 'edit') {
            changeDeletedId(obj._id);
            const editData: any = DefaultValue(EditTableInputField, obj);
            setEditData(editData);
            handleClickOpen();
        }
    };


    const onEdit = function (values: any): void {
        axios.put(`/tables/${deletedId}`, values)
            .then(function (res: IAlertAxiosResponse) {
                setRefetch((prev:boolean) => !prev );
                handleClose();
                console.log('updated successfully');

            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });
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
                {rows.length && !isLoading
                    ?
                    (<MyTable
                        thead={thead}
                        tbody={rows}
                        keys={keys}
                        pagination={true}
                        paginationRowsCount={[3, 5, 10]}
                        actionsTypes={actionsTypes}
                        handleActions={handleActions}
                    />)
                    : (<CardMessage
                        header='No Tables created!'
                    />)}
            </ComponentLoader>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <form noValidate autoComplete="off" onSubmit={handleEditSubmit(onEdit)}>
                    <DynamicFields
                        Component={DialogContent}
                        InputFields={EditData || []}
                        register={editRegister}
                        errors={editErrors}
                        control={editControl}
                        serverError={serverError}
                    />
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={handleClose}
                        >Cancel</Button>
                        <Button
                            color="primary"
                            type="submit"
                        >Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>


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