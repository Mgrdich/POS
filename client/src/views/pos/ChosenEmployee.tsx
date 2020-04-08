import React, {useEffect, useState} from 'react';
import {Button, Menu, MenuItem} from "@material-ui/core";

const ChosenEmployee = () => {
    const [users,setUsers] = useState<Array<any>>([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userName, setUserName] = useState('');


    const handleClick = function (event:any) {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = function ()  {
        setAnchorEl(null);
    };
    const handleUserName = function (name:string) {

    };

    return (
        <>
            <Button variant="outlined" color="primary" aria-controls="simple-menu" aria-haspopup="true"
                    onClick={handleClick}>
                {userName.length ? userName : 'Select employee' }
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {users.length? users.map((user: string, index: number)=>(
                    <div key={index} onClick={handleClose}>
                    <MenuItem  onClick={() =>handleUserName(user)}>{user}</MenuItem>
                    </div>
                )): null}
            </Menu>
        </>
    );
};

export default ChosenEmployee;