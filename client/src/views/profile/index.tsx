import React, {useState} from 'react';
import {useTab} from "../../components/Hooks/useTab";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import TabPanel from "../../components/Reusable/TabPanel";
import AccountDetails from "./AccountDetails";
import ChangePassword from "./ChangePassword";
import {useFetch} from "../../components/Hooks/useFetch";

const Profile = () => {
    const [tabValue, handleChange] = useTab(0);
    const [reload,setReload] = useState<boolean>(false);
    const {isLoading, data} = useFetch('/users/current',reload);

    return (
        <>
            <AppBar position="static" color='secondary'>
                <Tabs indicatorColor='primary' textColor='primary' value={tabValue} onChange={handleChange}>
                    <Tab label="Account Detail" tabIndex={0}/>
                    <Tab label="Change Password" tabIndex={1}/>
                </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}>
                <AccountDetails setReload={setReload} isLoading={isLoading} data={data} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <ChangePassword/>
            </TabPanel>
        </>
    );
};

export default Profile;