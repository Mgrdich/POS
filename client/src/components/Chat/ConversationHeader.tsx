import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {ChatContext} from "./ChatProvider";
import EditGroup from "./EditGroup";
import {useModal} from "../Hooks/useModal";
import DynamicFields from "../Reusable/DynamicFields";
import {useForm} from "react-hook-form";
import {editGroupChat, editGroupChatVal} from "./configs";
import {useServerErrorHandle} from "../Hooks/useServerErrorHandle";
import {DefaultValue} from "../../util/functions";
import Grid from "@material-ui/core/Grid";
import axios, {AxiosResponse} from "axios";
import {IAlertAxiosResponse} from "../../interfaces/General";
import {CHAT_ACTIONS} from "./ActionsConfig";
import Typography from "@material-ui/core/Typography";
import DeleteModal from "../Reusable/DeleteModal";


const ConversationHeader: React.FC = () => {
    const [state, dispatch] = useContext(ChatContext);
    const {user, group} = state;
    const [editGroup,setEditGroup] = useState<Array<any>>([]);
    const [open, handleClickOpen, handleClose] = useModal();
    const [openGroupInfo, handleClickOpenGroupInfo, handleCloseGroupInfo] = useModal();
    const [openGroupDelete, handleClickOpenGroupDelete, handleCloseGroupDelete] = useModal();
    const {handleSubmit: handleEditSubmit, register: editRegister, errors: editErrors, control: editControl} = useForm<any>({
        validationSchema: editGroupChatVal,
    });
    const [serverError, setterError] = useServerErrorHandle();

    useEffect(function () { //TODO keep all id array to with the orginal name in another key
        let newGroup = (group) ? {...group} : {admins: [], members: []};
        if (group) {
            newGroup.admins = group.admins.map((item: any) => typeof (item) === 'string' ? item : item._id);
            newGroup.members = group.members.map((item: any) => typeof (item) === 'string' ? item : item._id);
        }
        setEditGroup(DefaultValue(editGroupChat, newGroup));
    },[group]);

    const onEdit = useCallback(function (values: any) {
        axios.put(`/group-chat/${state.group._id}`, values)
            .then(function (res: IAlertAxiosResponse) {
                handleClose();
                dispatch({type: CHAT_ACTIONS.REFETCH});
                axios.get(`/group-chat/${state.group._id}`).then(function (res:AxiosResponse) {
                    if (res.data) {
                        if (res.data.admins && res.data.members) {
                            dispatch({
                                type: CHAT_ACTIONS.SET_GROUP_MORE,
                                payload: {admins: res.data.admins, members: res.data.members}
                            });
                        }
                    }
                });

            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });

    }, [state.group, dispatch,handleClose, setterError]);

    const onDelete = useCallback(() => {
        axios.delete(`/group-chat/${state.group._id}`)
            .then(function (res: IAlertAxiosResponse) {
                handleCloseGroupDelete();
                dispatch({type: CHAT_ACTIONS.REFETCH});
                dispatch({type: CHAT_ACTIONS.DELETE_GROUP});
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });
    }, [state.group, dispatch, setterError, handleCloseGroupDelete]);

    return (
        <div className="conversationHeader">
            <div>
                <Avatar className="avatar">
                    {user ? user.name[0] : group.name[0]}
                </Avatar>
                <span className="email">
                     {user ? user.name : ''} {user ? `(${user.email})` : group.name}
                </span>

                {user ? null : <div className='drop-wrapper'><EditGroup
                    editCallBack={{handleClickOpen, handleClickOpenGroupInfo, handleClickOpenGroupDelete}}/></div>}

            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="edit-group">Edit-group</DialogTitle>
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
                <DialogTitle id="group-info">Group-info</DialogTitle>
                <DialogContent>
                    <Typography variant='h6' color='primary'>
                        Group-name: {state?.group?.name}
                    </Typography>
                    <Typography variant='h6' color='primary'>
                        {state?.group?.admins.length > 1 ? 'Admins' : 'Admin'}
                    </Typography>
                    {state?.group?.admins.map((admin: {_id:string,name:string},index:number) => (
                        <Typography key={index} color="textSecondary">
                            {admin.name}
                        </Typography>
                    ))}
                    <Typography variant='h6' component="h2" color='primary'>
                        {state?.group?.members.length > 1 ? 'Members' : 'Member'}
                    </Typography>
                    {state?.group?.members.map((member: {_id:string,name:string},index:number) => (
                        <Typography key={index} color="textSecondary">
                            {member.name}
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

            <DeleteModal
                open={openGroupDelete}
                modalTitle='Delete group'
                message={`Are you sure you want to delete ${state?.group?.name} group ?`}
                action={onDelete}
                handleClose={handleCloseGroupDelete}
            />
        </div>
    );
};

export default ConversationHeader;