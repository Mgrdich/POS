import React from 'react';
import {useForm} from "react-hook-form";
import {useServerErrorHandle} from "../../../components/Hooks/useServerErrorHandle";
import {useDynamicFields} from "../../../components/Hooks/useDynamicFields";
import axios from "axios";
import {IAlertAxiosResponse} from "../../../interfaces/General";
import Grid from "@material-ui/core/Grid";
import DynamicFields from "../../../components/Reusable/DynamicFields";
import {Button} from "@material-ui/core";
import {productGroupInputField, productGroupValSchema} from "./config";

const ProductsGroup: React.FC = () => {
    const {handleSubmit, register, errors, control, unregister, reset} = useForm<any>({
        validationSchema: productGroupValSchema,
    });
    const [serverError, setterError, resetServerError] = useServerErrorHandle();
    useDynamicFields(productGroupInputField, register, unregister);

    const onSubmit = function (values: any): void {
        axios.put('/products-group', values)
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
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    className="FloatRight"
                    type="submit"
                >Submit</Button>
            </form>
        </>
    );
};

export default ProductsGroup;