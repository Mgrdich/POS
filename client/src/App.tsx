import React from 'react';
import Routes from "./Routes";
import {Router} from "react-router";
import history from "./util/history";


const App: React.FC = () => {
    return (
        <>
            <Router history={history}>
                <Routes/>
            </Router>
        </>
    );
};

export default App;