import React from 'react';
import {useForm} from "react-hook-form";
import {useDynamicFields} from "../../components/Hooks/useDynamicFields";
import axios from "axios";
import {IAlertAxiosResponse} from "../../interfaces/General";
import Grid from "@material-ui/core/Grid";
import DynamicFields from "../../components/Reusable/DynamicFields";
import {Button} from "@material-ui/core";
import {createTableValSchema, creteTableInputField} from "./config";
import {useServerErrorHandle} from "../../components/Hooks/useServerErrorHandle";


const CreateEditTables = () => {
    const {handleSubmit, register, errors, control, unregister, reset} = useForm<any>({
        validationSchema: createTableValSchema,
    });
    const [serverError, setterError, resetServerError] = useServerErrorHandle();
    useDynamicFields(creteTableInputField, register, unregister);

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
        </>
    );
};

export default CreateEditTables;