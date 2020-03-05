import React from 'react';
import TabPanel from "../../components/Reusable/TabPanel";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {useTab} from "../../components/Hooks/useTab";
import TabPanelOne from "./create-user/TabPanelOne";
import TabPanelTwo from "./create-user/TabPanelTwo";

const Users = () => {

    const [tabValue, handleChange] = useTab(0);

    return (
        <>
            <AppBar position="static">
                <Tabs value={tabValue} onChange={handleChange} >

                    <Tab label='Item One' tabIndex={0} />
                    <Tab label="Item Two" tabIndex={1} />
                    <Tab label="Item Three" tabIndex={2} />
                </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0} >
                   <TabPanelOne/>
                </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <TabPanelTwo/>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                Item Three
            </TabPanel>
        </>
    );
};

export default Users;