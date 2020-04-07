import React, {useState} from 'react';
import {Button, Menu, MenuItem} from "@material-ui/core";

const ChosenEmployee = (props: any) => {
    const {users,click} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userName, setUserName] = useState('');

    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleUserName = (name:string) => {
        setUserName(name);
    };

    return (
        <div>
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
            
        </div>
    );
};

export default ChosenEmployee;