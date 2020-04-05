import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface IEditGroup {
    editCallBack: {
        handleClickOpen: Function;
        handleClickOpenGroupInfo: Function;
        handleClickOpenGroupDelete:Function;
    };

}

const EditGroup: React.FC<IEditGroup> = (props) => {
    const {editCallBack} = props;
    const {handleClickOpen, handleClickOpenGroupInfo, handleClickOpenGroupDelete} = editCallBack;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

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
                    <MenuItem onClick={() => handleClickOpen()}>
                        Edit
                    </MenuItem>
                </div>
                <div onClick={handleClose}>
                    <MenuItem onClick={() => handleClickOpenGroupInfo()}>
                        Group info
                    </MenuItem>
                </div>
                <div onClick={handleClose}>
                    <MenuItem onClick={() => handleClickOpenGroupDelete()}>
                        Delete
                    </MenuItem>
                </div>
            </Menu>
        </>
    );
};

export default EditGroup;
