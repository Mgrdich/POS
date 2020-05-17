import React from 'react';
import DynamicFields from "../../components/Reusable/DynamicFields";
import {useForm} from "react-hook-form";
import {useServerErrorHandle} from "../../components/Hooks/useServerErrorHandle";
import {ChangePasswordFormData} from "../../interfaces/Views/Profile/index";
import {ChangePasswordInputField, ChangePasswordValSchema} from "./config";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {useAlert} from "../../components/Hooks/useAlert";
import Alerts from "../../components/Reusable/Alerts";
import {IAlertAxiosResponse} from "../../interfaces/General";


const ChangePassword: React.FC = () => {
    const {handleSubmit, register, errors, control, reset} = useForm<ChangePasswordFormData>({
        validationSchema: ChangePasswordValSchema,
    });
    const [serverError, setterError, resetServerError] = useServerErrorHandle();
    const {alertMessage, openAlert, alertType, setAlert, setOpenAlert} = useAlert();


    // TODO cached functions
    const onSubmit = function (values: any): void {
        axios.patch('/users/change-password', values)
            .then(function (res: IAlertAxiosResponse) {
                reset();
                resetServerError();
                setAlert(res.data);
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" spacing={1}>
                    <DynamicFields
                        Component={Grid}
                        ComponentProps={{item: true, xs: 12, sm: 12, md: 6, lg: 4}}
                        InputFields={ChangePasswordInputField}
                        errors={errors}
                        control={control}
                        register={register}
                        serverError={serverError}
                    />
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Button
                            fullWidth={true}
                            color="primary"
                            variant="contained"
                            size="large"
                            type="submit"
                        >Submit</Button>
                    </Grid>
                </Grid>
            </form>
            <Alerts open={openAlert} close={setOpenAlert} severity={alertType}>
                {alertMessage}
            </Alerts>

        </>
    );
};

export default ChangePassword;