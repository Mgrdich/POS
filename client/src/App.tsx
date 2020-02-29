import React from 'react';
import Routes from "./Routes";
import {Router} from "react-router";
import history from "./util/history";
import {Provider} from "react-redux";
import {store} from "./store";
import jwt_decode from 'jwt-decode';
import {setAuthToken} from "./util/redux";
import {logOutUser, setCurrentUser} from "./actions/authActions";
import {theme} from "./theme";
import { ThemeProvider} from '@material-ui/styles';
import {CssBaseline} from "@material-ui/core";
import "../src/Styles/style.scss";

if (localStorage.token) {
    // Set auth token header auth
    setAuthToken(localStorage.token);
    // Decode token and get user info and exp
    const decoded: any = jwt_decode(localStorage.token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logOutUser());
        // store.dispatch(clearCurrentProfile()); //TODO check the profile later
        // Redirect to login
        window.location.href = '/login';
    }
}

const App: React.FC = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Provider store={store}>
                    <Router history={history}>
                        <Routes/>
                    </Router>
                </Provider>
            </ThemeProvider>
        </>
    );
};

export default App;