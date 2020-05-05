import React, {useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Conditional from "../Reusable/Conditional";
import {useSelector} from "react-redux";
import {ChatContext} from "./ChatProvider";
import {IEditGroup} from "../../interfaces/Chat";


const EditGroup: React.FC<IEditGroup> = (props) => {
    const {editCallBack} = props;
    const {handleClickOpen, handleClickOpenGroupInfo, handleClickOpenGroupDelete} = editCallBack;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [state] = useContext(ChatContext);
    const authorId = useSelector<any>(state => state.auth.user.id);
    const condition = state?.group?.admins.some((item:{_id:string,name:string})=>item._id===authorId);

    const handleClick = function (event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = function () {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <div onClick={handleClose}>
                    <Conditional condition={condition}>
                        <MenuItem onClick={() => handleClickOpen()}>
                            Edit
                        </MenuItem>
                    </Conditional>
                </div>
                <div onClick={handleClose}>
                    <MenuItem onClick={() => handleClickOpenGroupInfo()}>
                        Group info
                    </MenuItem>
                </div>
                <div onClick={handleClose}>
                    <Conditional condition={condition}>
                        <MenuItem onClick={() => handleClickOpenGroupDelete()}>
                            Delete
                        </MenuItem>
                    </Conditional>
                </div>
            </Menu>
        </>
    );
};

export default EditGroup;
