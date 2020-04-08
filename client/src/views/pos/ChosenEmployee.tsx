import React, {useState} from 'react';
import {Button, Menu, MenuItem} from "@material-ui/core";
import {useFetch} from "../../components/Hooks/useFetch";
import {Roles} from "../../roles";
import {useDispatch} from "react-redux";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import {setWaiter} from "../../actions/posActions";


const ChosenEmployee = () => {
    const [user, setUser] = useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {isLoading, data: users} = useFetch(`/users/role/${Roles.Employee}`); //TODO change it with id create table for it
    const dispatch = useDispatch();

    const handleClick = function (event: any) {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = function () {
        setAnchorEl(null);
    };

    const handleUserName = function (user: any) {
        setUser(user.name);
        dispatch(setWaiter(user._id));
    };

    return (
        <ComponentLoader isLoading={isLoading}>
            <Button variant="outlined" color="primary" aria-controls="simple-menu" aria-haspopup="true"
                    onClick={handleClick}>
                {user ? user : 'Select employee'}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {users.length ? users.map((user: any, index: number) => (
                    <div key={user._id} onClick={handleClose}>
                        <MenuItem onClick={() => handleUserName(user)}>{user.name}</MenuItem>
                    </div>
                )) : null}
            </Menu>
        </ComponentLoader>
    );
};

export default ChosenEmployee;