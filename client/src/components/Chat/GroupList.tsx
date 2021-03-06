import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ChatContext} from "./ChatProvider";
import ComponentLoader from "../Reusable/ComponentLoader";
import {
    Avatar,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@material-ui/core";
import {CHAT_ACTIONS} from "./ActionsConfig";
import Button from "@material-ui/core/Button";
import {useModal} from "../Hooks/useModal";
import {useForm} from "react-hook-form";
import {useServerErrorHandle} from "../Hooks/useServerErrorHandle";
import Grid from "@material-ui/core/Grid";
import DynamicFields from "../Reusable/DynamicFields";
import {createGroupChat, createGroupChatVal} from "./configs";
import DialogContent from "@material-ui/core/DialogContent";
import {IAlertAxiosResponse} from "../../interfaces/General";
import axios from "axios";
import {IChatList} from "../../interfaces/Chat";



const GroupList: React.FC<IChatList> = (props) => {
    const {filter, data: users, isLoading} = props;
    const [data, setData] = useState<Array<any>>();
    const dispatch = useContext(ChatContext)[1];
    const [open, handleClickOpen, handleClose] = useModal();
    const [serverError, setterError, resetServerError] = useServerErrorHandle();
    const {handleSubmit, register, errors, control, reset} = useForm<any>({
        validationSchema: createGroupChatVal
    });

    useEffect(function () {
        if (!isLoading) {
            setData(users);
        }
    }, [isLoading,users]);

    useEffect(function () {
        if (!isLoading) {
            if (filter === '') {
                return setData(users);
            }
            const filteredUsers: Array<any> = users.filter((item: any) => item.name.toLowerCase().includes(filter.toLowerCase().trim()));
            setData(filteredUsers);
        }
    }, [filter, isLoading,users]);

    const onSubmit = useCallback(function (values: any) {
        axios.put('/group-chat', values)
            .then(function (res: IAlertAxiosResponse) {
                reset();
                resetServerError();
                dispatch({type: CHAT_ACTIONS.REFETCH});
                handleClose();
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });

    },[dispatch,reset,resetServerError,handleClose,setterError]);

    return (
        <>
            <Button
                fullWidth={true}
                color="primary"
                variant="outlined"
                size="small"
                onClick={() => handleClickOpen()}
            >+
            </Button>
            <div className="usersList">
                <ComponentLoader isLoading={isLoading}>
                    <List>
                        {
                            data ? data.map((item: any, index: number) => {
                                return (
                                    <React.Fragment key={item._id}>
                                        <ListItem
                                            onClick={() => dispatch({type: CHAT_ACTIONS.SET_GROUP, payload: item})}>
                                            <ListItemAvatar>
                                                <Avatar className="avatar">
                                                    {item.name[0]}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={item.name}/>
                                        </ListItem>
                                        <Divider component="li"/>
                                    </React.Fragment>
                                );
                            }) : null
                        }
                    </List>
                </ComponentLoader>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">GroupChat</DialogTitle>

                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Grid container direction="row" spacing={1}>
                            <DynamicFields
                                InputFields={createGroupChat}
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
                                    }
                                }
                            />
                        </Grid>
                    </DialogContent>
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
        </>
    );
};

export default GroupList;