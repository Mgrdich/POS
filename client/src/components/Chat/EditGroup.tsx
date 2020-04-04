import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const EditGroup = (props: any) => { //TODO types???
    const {editCallBack} = props;
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

                <MenuItem onClick={editCallBack}>
                    Edit
                </MenuItem>
                <MenuItem>
                    Group info
                </MenuItem>

            </Menu>
        </>
    );
};

export default EditGroup;
