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
import {useAlert} from "../../components/Hooks/useAlert";
import Alerts from "../../components/Reusable/Alerts";
import {useModal} from "../../components/Hooks/useModal";
import {DefaultValue} from "../../util/functions";
import CardMessage from "../../components/Reusable/CardMessage";
import DeleteModal from "../../components/Reusable/DeleteModal";
import {TableActionOptions} from "../../constants/Enums/General";
import MyTableProvider from "../../components/Reusable/Table/TableProvider";


const actionsTypes: Array<TableActionOptions> = [TableActionOptions.delete, TableActionOptions.edit];


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
    const [open, handleClickOpen, handleClose] = useModal();
    const [openDeleteModal, handleClickOpenDeleteModal, handleCloseDeleteModal] = useModal();
    const [EditData, setEditData] = useState();
    const [tableNumber, setTableNumber] = useState<string>('');
    useDynamicFields(creteTableInputField, register, unregister);

    const onSubmit = function (values: any): void {
        axios.put('/tables', values)
            .then(function (res: IAlertAxiosResponse) {
                setRefetch((prev:boolean) => !prev );
                reset();
                resetServerError();
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });

    };


    const handleActions = function (type: string, obj: any) {
        if (type === TableActionOptions.delete) {
            changeDeletedId(obj._id);
            setTableNumber(obj.number);
            handleClickOpenDeleteModal()
        }
        if (type === TableActionOptions.edit) {
            changeDeletedId(obj._id);
            const editData: any = DefaultValue(EditTableInputField, obj);
            setEditData(editData);
            handleClickOpen();
        }
    };


    const onEdit = function (values: any): void { //TODO Cached
        axios.put(`/tables/${deletedId}`, values)
            .then(function (res: IAlertAxiosResponse) {
                setRefetch((prev:boolean) => !prev );
                handleClose();
                setAlert(res.data,true);
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });
    };

    const handleDeleted = function (id: string) { //TODO Cached could be refacorable???
        axios.delete(`/tables/${id}`).then((res: AxiosResponse) => {
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
                    ( <MyTableProvider>
                        <MyTable
                        thead={thead}
                        tbody={rows}
                        keys={keys}
                        pagination={true}
                        paginationRowsCount={[3, 5, 10]}
                        actionsTypes={actionsTypes}
                        handleActions={handleActions}
                    />
                        </MyTableProvider>
                    )
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
            <DeleteModal
                open={openDeleteModal}
                modalTitle='Delete table'
                message={`Are you sure you want to delete table ${tableNumber} ?`}
                action={() => handleDeleted(deletedId)}
                handleClose={handleCloseDeleteModal}
            />
            <Alerts open={openAlert} severity={alertType} close={setOpenAlert}>
                {alertMessage}
            </Alerts>
        </>
    );
};

export default CreateEditTables;