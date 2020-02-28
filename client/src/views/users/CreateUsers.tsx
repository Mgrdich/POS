import React from 'react';
import DynamicFields from "../../components/Reusable/DynamicFields";
import {createUsers} from './config';
import {useForm} from "react-hook-form";
import {useServerErrorHandle} from "../../components/Hooks/useServerErrorHandle";
import {Button} from "@material-ui/core";
import axios, {AxiosResponse} from "axios";
import {RouteComponentProps} from "react-router";
import {useDynamicFields} from "../../components/Hooks/useDynamicFields";

const CreateUsers : React.FC<RouteComponentProps> = (props) => {
    const {handleSubmit, register, errors, control,unregister} = useForm<FormData>();
    const [serverError, setterError] = useServerErrorHandle();
    useDynamicFields(createUsers, register, unregister);


    const onSubmit = function (values: any):void {

        axios.put('/users/register-user', values)
            .then(function (res:AxiosResponse) {
                console.log('successfully created');
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            console.log(e.response.data)
            setterError(e.response.data.data);
        })
    };

    return (
        <>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DynamicFields InputFields={createUsers} register={register} errors={errors} control={control}
                               serverError={serverError}/>
                <Button color="primary" variant="contained" size="large" className="submitBtn"
                        type="submit">Submit</Button>
            </form>
        </>
    );
};

export default CreateUsers;