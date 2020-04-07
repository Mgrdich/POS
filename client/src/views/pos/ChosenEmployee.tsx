import React, {useState} from 'react';
import {Button, Menu, MenuItem} from "@material-ui/core";

const ChosenEmployee = (props: any) => {
    const {users,click} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userName, setUserName] = useState('');

    const handleClick = function (event:any) {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = function ()  {
        setAnchorEl(null);
    };
    const handleUserName = function (name:string) {
        setUserName(name);
    };

    return (
        <>
            <Button variant="outlined" color="primary" aria-controls="simple-menu" aria-haspopup="true"
                    onClick={click && handleClick}>
                {userName.length ? userName : 'select employee' }
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {users? users.map((user: string, index: number)=>(
                    <div key={index} onClick={handleClose}>
                    <MenuItem  onClick={() =>handleUserName(user)}>{user}</MenuItem>
                    </div>
                )): []}
            </Menu>
        </>
    );
};

export default ChosenEmployee;