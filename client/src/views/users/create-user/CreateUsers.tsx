import React, {useState} from 'react';
import DynamicFields from "../../../components/Reusable/DynamicFields";
import {createUsersInputFields, createUsersValSchema} from './config';
import {useForm} from "react-hook-form";
import {useServerErrorHandle} from "../../../components/Hooks/useServerErrorHandle";
import {Button} from "@material-ui/core";
import axios, {AxiosResponse} from "axios";
import {RouteComponentProps} from "react-router";
import {useDynamicFields} from "../../../components/Hooks/useDynamicFields";
import {createUserFormDataType} from "../../../interfaces/Views/users";
import Grid from "@material-ui/core/Grid";
import {useAlert} from "../../../components/Hooks/useAlert";
import Alerts from "../../../components/Reusable/Alerts";
import {IAlertAxiosResponse} from "../../../interfaces/General";
import {useModal} from "../../../components/Hooks/useModal";
import {useTableBody} from "../../../components/Hooks/useTableBody";
import {useTable} from "../../../components/Hooks/useTable";
import DeleteModal from "../../../components/Reusable/DeleteModal";
import {TableActionOptions} from "../../../constants/Enums/General";
import Table from "../../../components/Reusable/Table/Table";

const actionsTypes: Array<TableActionOptions> = [TableActionOptions.delete];

const CreateUsers: React.FC<RouteComponentProps> = (props) => {
    const {handleSubmit, register, errors, control, unregister, reset} = useForm<createUserFormDataType>({
        validationSchema: createUsersValSchema,
    });
    const {tbody, thead, keys, isLoading, setRefetch} = useTable('/users');
    const {alertMessage, openAlert, alertType, setAlert, setOpenAlert} = useAlert();
    const {alertMessage: tableAlertMessage, setOpenAlert: tableSetOpenAlert, openAlert: tableOpenAlert, setAlert: tableSetAler, alertType: tableAlertType} = useAlert();
    const [serverError, setterError, resetServerError] = useServerErrorHandle();
    const [open, handleClickOpen, handleClose] = useModal();
    const [rows, setRows, deletedId, changeDeletedId] = useTableBody(isLoading, tbody);
    const [email, setEmail] = useState<string>(''); //TODO better way
    useDynamicFields(createUsersInputFields, register, unregister);

    const onSubmit = function (values: any): void {
        axios.put('/users/register-user', values)
            .then(function (res: IAlertAxiosResponse) {
                setRefetch((prev: boolean) => !prev);
                reset();
                resetServerError();
                tableSetAler(res.data);
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });
    };

    const handleActions = function (type: TableActionOptions, obj: any) { //TODO refactor code a lot of repetition
        if (type === TableActionOptions.delete) {
            changeDeletedId(obj._id);
            setEmail(obj.email);
            handleClickOpen();
        }
    };

    const handleDeleted = function (id: string) {
        axios.delete(`/users/${id}`).then((res: AxiosResponse) => { //TODO refactor code a lot of repetition
            setAlert(res.data, true);
        }).catch((e) => {
            console.log(e);
        });
        const filteredRows = rows.filter((row: any) => {
            return row._id !== id;
        });
        setRows(filteredRows);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="row" spacing={1}>
                    <DynamicFields
                        InputFields={createUsersInputFields}
                        register={register}
                        errors={errors}
                        control={control}
                        serverError={serverError}
                        Component={Grid}
                        ComponentProps={
                            {
                                item: true,
                                xs: 12,
                                md: 4,
                                lg: 3,
                            }
                        }
                    />


                    <Grid item container justify='flex-end' sm={12}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            className="FloatRight"
                            type="submit"
                        >Submit</Button>
                    </Grid>
                </Grid>
            </form>

            <Table
                thead={thead}
                tbody={rows}
                keys={keys}
                pagination={true}
                paginationRowsCount={[3, 5, 10]}
                actionsTypes={actionsTypes}
                handleActions={handleActions}
                isLoading={isLoading}
            />

            <DeleteModal
                open={open}
                modalTitle='Delete user'
                message={`Are you sure you want to delete email ${email} ?`}
                action={() => handleDeleted(deletedId)}
                handleClose={handleClose}
            />
            <Alerts open={openAlert} close={setOpenAlert} severity={alertType}>
                {alertMessage}
            </Alerts>

            <Alerts open={tableOpenAlert} severity={tableAlertType} close={tableSetOpenAlert}>
                {tableAlertMessage}
            </Alerts>

        </>
    );
};

export default CreateUsers;