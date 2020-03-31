import React, {useContext, useEffect, useState} from 'react';
import {ChatContext} from "./ChatProvider";
import ComponentLoader from "../Reusable/ComponentLoader";
import {
    Avatar, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@material-ui/core";
import {CHAT_ACTIONS} from "./ActionsConfig";
import Button from "@material-ui/core/Button";
import DynamicFields from "../Reusable/DynamicFields";

interface IChatList {
    filter: string;
    data: Array<any>;
    isLoading: boolean;
}

const GroupList: React.FC<IChatList> = (props) => {
    const {filter, data: users, isLoading} = props;
    const [data, setData] = useState<Array<any>>();
    const [state, dispatch] = useContext(ChatContext);

    useEffect(function () {
        if (!isLoading) {
            setData(users);
        }
    }, [isLoading]);

    useEffect(function () {
        if (!isLoading) {
            if (filter === '') {
                return setData(users);
            }
            const filteredUsers: Array<any> = users.filter((item: any) => item.name.includes(filter)); //more nice filter
            setData(filteredUsers);
        }
    }, [filter, isLoading]);

    return (
        <>
            <Button
                fullWidth={true}
                color="primary"
                variant="outlined"
                size="small"
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
            {/*<Dialog open={} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <form noValidate autoComplete="off" onSubmit={()=>0}>
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
            </Dialog>*/}
        </>
    );
};

export default GroupList;