import React, {useCallback, useContext} from 'react';
import {Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {ChatContext} from "./ChatProvider";
import EditGroup from "./EditGroup";
import {useModule} from "../Hooks/useModule";
import DynamicFields from "../Reusable/DynamicFields";
import {useForm} from "react-hook-form";
import {editGroupChat, editGroupChatVal} from "./configs";
import {useServerErrorHandle} from "../Hooks/useServerErrorHandle";
import {DefaultValue} from "../../util/functions";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {IAlertAxiosResponse} from "../../interfaces/General";
import {CHAT_ACTIONS} from "./ActionsConfig";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";


const ConversationHeader: React.FC = () => {
    const [state, dispatch] = useContext(ChatContext);
    const {user, group} = state;
    let editGroup;
    const [open, handleClickOpen, handleClose] = useModule();
    const [openGroupInfo, handleClickOpenGroupInfo, handleCloseGroupInfo] = useModule();
    const [openGroupDelete, handleClickOpenGroupDelete, handleCloseGroupDelete] = useModule();
    const {handleSubmit: handleEditSubmit, register: editRegister, errors: editErrors, control: editControl} = useForm<any>({
        validationSchema: editGroupChatVal,
    });
    const [serverError, setterError] = useServerErrorHandle();

    if (group) {
        editGroup = DefaultValue(editGroupChat, group);
    }

    const onEdit = useCallback(function (values: any) {
        axios.put(`/group-chat/${state.group._id}`, values)
            .then(function (res: IAlertAxiosResponse) {
                handleClose();
                dispatch({type: CHAT_ACTIONS.REFETCH});
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });
    }, [state.group, dispatch]);

    const onDelete = useCallback(() => {
        axios.delete(`/group-chat/${state.group._id}`)
            .then(function (res: IAlertAxiosResponse) {
                handleCloseGroupDelete();
                dispatch({type: CHAT_ACTIONS.REFETCH});
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });
    }, [state.group, dispatch]);

    return (
        <div className="conversationHeader">
            <div>
                <Avatar className="avatar">
                    {user ? user.name[0] : group.name[0]}
                </Avatar>
                <span className="email">
                    {user ? user.email : group.name} {user ? `(${user.name})` : ''}
                </span>

                {user ? null : <div className='drop-wrapper'><EditGroup
                    editCallBack={{handleClickOpen, handleClickOpenGroupInfo, handleClickOpenGroupDelete}}/></div>}

            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <form noValidate autoComplete="off" onSubmit={handleEditSubmit(onEdit)}>
                    <DialogContent>
                        <Grid container direction="row" spacing={1}>
                            <DynamicFields
                                InputFields={(user) ? user : editGroup}
                                register={editRegister}
                                errors={editErrors}
                                control={editControl}
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

            <Dialog open={openGroupInfo} onClose={handleCloseGroupInfo} aria-labelledby="form-dialog-title"
                    fullWidth={true}>
                <DialogTitle id="group-info">Group Info</DialogTitle>
                <DialogContent>
                    <Typography variant='h6' color='primary'>
                        Group-name: {state?.group?.name}
                    </Typography>
                    <Typography variant='h6' color='primary'>
                        {state?.group?.admins.length > 1 ? 'Admins' : 'Admin'}
                    </Typography>
                    {state?.group?.admins.map((admin: string, index: number) => (
                        <Typography key={index} color="textSecondary">
                            {admin}
                        </Typography>
                    ))}
                    <Typography variant='h6' component="h2" color='primary'>
                        {state?.group?.members.length > 1 ? 'Members' : 'Member'}
                    </Typography>
                    {state?.group?.members.map((member: any, index: number) => (
                        <Typography key={index} color="textSecondary">
                            {member}
                        </Typography>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={handleCloseGroupInfo}
                    >Done</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openGroupDelete} onClose={handleCloseGroupDelete} aria-labelledby="form-dialog-title"
                    fullWidth={true}>
                <DialogTitle id="group-info">Group Info</DialogTitle>
                <DialogContent>
                    <Typography component='p' color='primary'>
                        Are you sure you want to delete {state?.group?.name} group ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={handleCloseGroupDelete}
                    >Cancel
                    </Button>
                    <Button
                        onClick={onDelete}
                        color="primary"
                    >Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConversationHeader;