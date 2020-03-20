import React, {useEffect, useState} from 'react';
import TabPanel from "../../components/Reusable/TabPanel";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {useTab} from "../../components/Hooks/useTab";
import TabPanelOne from "./TabPanelOne";
import TabPanelTwo from "./TabPanelTwo";
import {useTable} from "../../components/Hooks/useTable";
import AlertQuestion from "../../components/Reusable/AlertQuestion";
import {useAlert} from "../../components/Hooks/useAlert";

const actionsTypes: Array<string> = ["delete"];


const Users: React.FC = () => {

    const [tabValue, handleChange] = useTab(0);
    const {tbody, thead, keys, isLoading} = useTable('/users');
    const {alertMessage, setOpenAlert, openAlert} = useAlert('Are you sure you want to delete this row!');
    const [deletedId,changedeletedId] = useState<string>('');
    const [rows, setRows] = useState<any>([]);


    useEffect(() => {
        if(!isLoading && tbody?.length){

            setRows( (prev:any) => [...prev,...tbody]);
        }
    },[isLoading, tbody]);


    const handleActions  = function (type:string,obj:any) {
        if(type === 'delete') {
            console.log("s");
            console.log(obj._id);
            setOpenAlert(true);
            //TODO open it here
        }
    };

    const handleDeleted = function (id:string) {

    };


    return (
        <>
            <AppBar position="static" color='secondary'>
                <Tabs indicatorColor='primary' textColor='primary' value={tabValue} onChange={handleChange}>
                    <Tab label='Item One' tabIndex={0}/>
                    <Tab label="Item Two" tabIndex={1}/>
                    <Tab label="Item Three" tabIndex={2}/>
                </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}>
                <TabPanelOne
                    data={rows}
                    keys={keys}
                    thead={thead}
                    loading={isLoading}
                    actionsTypes={actionsTypes}
                    handleActions={handleActions}
                />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <TabPanelTwo/>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                Item Three
            </TabPanel>
            <AlertQuestion
                open={openAlert}
                close={setOpenAlert}
                callback={()=>handleDeleted(deletedId)}
                >
                {alertMessage}
            </AlertQuestion>
        </>
    );
};

export default Users;