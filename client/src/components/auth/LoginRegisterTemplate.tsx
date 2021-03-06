import React from 'react';
import DynamicFields from "../Reusable/DynamicFields";
import {Box, Button} from "@material-ui/core";
import {ILoginRegisterTemplate} from "../../interfaces/Views/auth";
import Grid from "@material-ui/core/Grid";

const LoginRegisterTemplate: React.FC<ILoginRegisterTemplate> = (props) => {
    const {dynamicInputFields, templateName, handleSubmit, onSubmit} = props;
    return (
        <div className='loginRegister'>
            <h1>{templateName}</h1>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" justify="center" alignItems="center">

                    <DynamicFields
                        {...dynamicInputFields}
                        boxProps={{minWidth:320,mt:2}}
                    />

                    <Box mt={2} minWidth={320}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            className="submitBtn"
                            type="submit"
                        >{templateName}</Button>
                    </Box>

                </Grid>
            </form>
        </div>
    );
};

export default LoginRegisterTemplate;