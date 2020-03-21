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
import axios, {AxiosResponse} from 'axios';
import CardMessage from "../../components/Reusable/CardMessage";
import Alerts from "../../components/Reusable/Alerts";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import {useTableBody} from "../../components/Hooks/useTableBody";

const actionsTypes: Array<string> = ["delete"];


const Users: React.FC = () => {

    const [tabValue, handleChange] = useTab(0);
    const {tbody, thead, keys, isLoading} = useTable('/users');
    const {alertMessage, setOpenAlert, openAlert, setAlert, alertType} = useAlert();
    // const [deletedId, changeDeletedId] = useState<string>('');
    const [rows, setRows, deletedId, changeDeletedId] =  useTableBody(isLoading, tbody);

    const handleActions = function (type: string, obj: any) {
        if (type === 'delete') {
            changeDeletedId(obj._id);
            setAlert({message: 'Are you sure you want to delete this row!'}, {alertQuestion: true, alert: false});
        }
    };

    const handleDeleted = function (id: string) {
        axios.delete(`/users/${id}`).then((res: AxiosResponse) => {
            setAlert(res.data, {alertQuestion: false, alert: true});
        }).catch((e) => {
            console.log(e);
        });
        const filteredRows = rows.filter((row: any) => {
            return row._id !== id;
        });
        setRows(filteredRows);
        setOpenAlert({alertQuestion: false, alert: false});
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
                {rows.length && !isLoading
                    ?
                    //TODO Check the loader
                    (<ComponentLoader isLoading={isLoading}>
                            <TabPanelOne
                                data={rows}
                                keys={keys}
                                thead={thead}
                                loading={isLoading}
                                actionsTypes={actionsTypes}
                                handleActions={handleActions}
                            />
                        </ComponentLoader>

                    )
                    :
                    (<CardMessage
                        header='No users created!'
                        message='You can create users by clicking on the button below'
                        translation='Create user'
                        location='/users/create-user'
                    />)
                }

            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <TabPanelTwo/>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                Item Three
            </TabPanel>
            <AlertQuestion
                open={openAlert.alertQuestion}
                close={setOpenAlert}
                callback={() => handleDeleted(deletedId)}
            >
                {alertMessage}
            </AlertQuestion>

            <Alerts open={openAlert.alert} severity={alertType} close={setOpenAlert}>
                {alertMessage};
            </Alerts>
        </>
    );
};

export default Users;