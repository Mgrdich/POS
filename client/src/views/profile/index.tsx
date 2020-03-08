import React from 'react';
import {useTab} from "../../components/Hooks/useTab";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import TabPanel from "../../components/Reusable/TabPanel";
import AccountDetails from "./AccountDetails";
import ChangePassword from "./ChangePassword";

const Profile = () => {
    const [tabValue, handleChange] = useTab(0);
    return (
        <>
            <AppBar position="static" color='secondary'>
                <Tabs indicatorColor='primary' textColor='primary' value={tabValue} onChange={handleChange}>
                    <Tab label="Account Detail" tabIndex={0}/>
                    <Tab label="Change Password" tabIndex={1}/>
                </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}>
                <AccountDetails/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <ChangePassword/>
            </TabPanel>
        </>
    );
};

export default Profile;