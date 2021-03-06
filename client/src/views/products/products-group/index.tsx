import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useServerErrorHandle} from "../../../components/Hooks/useServerErrorHandle";
import {useDynamicFields} from "../../../components/Hooks/useDynamicFields";
import axios, {AxiosResponse} from "axios";
import {IAlertAxiosResponse} from "../../../interfaces/General";
import Grid from "@material-ui/core/Grid";
import DynamicFields from "../../../components/Reusable/DynamicFields";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {
    editProductGroupInputField,
    editProductGroupValSchema,
    productGroupInputField,
    productGroupValSchema
} from "./config";
import {useTable} from "../../../components/Hooks/useTable";
import {useTableBody} from "../../../components/Hooks/useTableBody";
import {useAlert} from "../../../components/Hooks/useAlert";
import {useModal} from "../../../components/Hooks/useModal";
import {DefaultValue} from "../../../util/functions";
import ComponentLoader from "../../../components/Reusable/ComponentLoader";
import MyTable from "../../../components/Reusable/Table/MyTable";
import CardMessage from "../../../components/Reusable/CardMessage";
import Alerts from "../../../components/Reusable/Alerts";
import DeleteModal from "../../../components/Reusable/DeleteModal";
import {TableActionOptions} from "../../../constants/Enums/General";
const actionsTypes: Array<TableActionOptions> = [TableActionOptions.delete, TableActionOptions.edit]; //TODO repeated in so many files should be importe

const ProductsGroup: React.FC = () => {
    const {handleSubmit, register, errors, control, unregister, reset} = useForm<any>({
        validationSchema: productGroupValSchema,
    });
    const {handleSubmit: handleEditSubmit, register: editRegister, errors: editErrors, control: editControl} = useForm<any>({
        validationSchema: editProductGroupValSchema,
    });
    const {tbody, thead, keys, isLoading, setRefetch} = useTable('/products-group');
    const [rows, setRows, deletedId, changeDeletedId] = useTableBody(isLoading, tbody);
    const {alertMessage, setOpenAlert, openAlert, setAlert, alertType} = useAlert();
    const [open, handleClickOpen, handleClose] = useModal();
    const [openDeleteModal, handleClickOpenDeleteModal, handleCloseDeleteModal] = useModal();
    const [serverError, setterError, resetServerError] = useServerErrorHandle();
    const [EditData, setEditData] = useState();
    const [productGroupName, setProductName] = useState<string>('');
    useDynamicFields(productGroupInputField, register, unregister);

    const onSubmit = function (values: any): void {
        axios.put('/products-group', values)
            .then(function (res: IAlertAxiosResponse) {
                reset();
                setRefetch((prev: boolean) => !prev);
                resetServerError();
                console.log('successfully created', res.data.message);
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });
    };
    const ProductsGroupHandleActions = function (type: TableActionOptions, obj: any) {
        if (type === TableActionOptions.delete) {
            changeDeletedId(obj._id);
            setProductName(obj.name);
            handleClickOpenDeleteModal();
        }
        if (type === TableActionOptions.edit) {
            changeDeletedId(obj._id);
            const editData: any = DefaultValue(editProductGroupInputField, obj);
            setEditData(editData);
            handleClickOpen();
        }
    };

    const onEdit = function (values: any): void {
        axios.put(`/products-group/${deletedId}`, values)
            .then(function (res: IAlertAxiosResponse) {
                handleClose();
                setRefetch((prev: boolean) => !prev);
                setAlert(res.data, true);
                setRefetch((prev: boolean) => !prev);
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });
    };

    const handleDeleted = function (id: string) {
        axios.delete(`/products-group/${id}`).then((res: AxiosResponse) => {
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
                    <Grid container direction="row" spacing={1}>
                        <DynamicFields
                            InputFields={productGroupInputField}
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
                        >Submit</Button>
                    </Grid>
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
                        handleActions={ProductsGroupHandleActions}
                    />)
                    : (<CardMessage
                        header='No products created!'
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
                modalTitle='Delete product group'
                message={`Are you sure you want to delete product group ${productGroupName} ?`}
                action={() => handleDeleted(deletedId)}
                handleClose={handleCloseDeleteModal}
            />
            <Alerts open={openAlert} severity={alertType} close={setOpenAlert}>
                {alertMessage}
            </Alerts>
        </>
    );
};

export default ProductsGroup;