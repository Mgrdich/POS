import React from 'react';
import {useSelector} from "react-redux";
import {IAuthorizationElem} from "../../../interfaces/HOC/Auth";



const AuthorizationElem: React.FC<IAuthorizationElem> = (props) => {
    const isAuth = useSelector<any>(state => state.auth.isAuthenticated);
    const role = useSelector<any>(state => state.auth.user.role);

    if (isAuth && props.allowedRoles && props.allowedRoles.includes(role as string)) {
        return (
            <>
                {props.children}
            </>
        );
    } else {
        return null;
    }
};

export default AuthorizationElem;