import React, {useState} from 'react';
import TabPanel from "../../components/Reusable/TabPanel";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {useTab} from "../../components/Hooks/useTab";
import TabPanelOne from "./TabPanelOne";
import TabPanelTwo from "./TabPanelTwo";
import {useTable} from "../../components/Hooks/useTable";
import {useAlert} from "../../components/Hooks/useAlert";
import axios, {AxiosResponse} from 'axios';
import CardMessage from "../../components/Reusable/CardMessage";
import Alerts from "../../components/Reusable/Alerts";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import {useTableBody} from "../../components/Hooks/useTableBody";
import DeleteModal from "../../components/Reusable/DeleteModal";
import {useModal} from "../../components/Hooks/useModal";

const actionsTypes: Array<string> = ["Delete"];


const Users: React.FC = () => {

    const [tabValue, handleChange] = useTab(0);
    const {tbody, thead, keys, isLoading} = useTable('/users');
    const {alertMessage, setOpenAlert, openAlert, setAlert, alertType} = useAlert();
    const [open, handleClickOpen, handleClose] = useModal();
    const [rows, setRows, deletedId, changeDeletedId] = useTableBody(isLoading, tbody);
    const [email, setEmail] = useState<string>('');

    const handleActions = function (type: string, obj: any) {
        if (type === 'delete') {
            changeDeletedId(obj._id);
            setEmail(obj.email);
            handleClickOpen();
        }
    };

    const handleDeleted = function (id: string) {
        axios.delete(`/users/${id}`).then((res: AxiosResponse) => {
            setAlert(res.data, true);
        }).catch((e) => {
            console.log(e);
        });
        const filteredRows = rows.filter((row: any) => {
            return row._id !== id;
        });
        setRows(filteredRows);
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
                <ComponentLoader isLoading={isLoading}>
                    {rows.length && !isLoading
                        ?
                        (
                            <TabPanelOne
                                data={rows}
                                keys={keys}
                                thead={thead}
                                loading={isLoading}
                                actionsTypes={actionsTypes}
                                handleActions={handleActions}
                            />
                        )
                        :
                        (<CardMessage
                            header='No users created!'
                            message='You can create users by clicking on the button below'
                            translation='Create user'
                            location='/users/create-user'
                            button={true}
                        />)
                    }
                </ComponentLoader>

            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <TabPanelTwo/>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                Item Three
            </TabPanel>
            <DeleteModal
                open={open}
                modalTitle={'Delete user'}
                message={`Are you sure you want to delete ${email} ?`}
                action={() => handleDeleted(deletedId)}
                handleClose={handleClose}
            />
            <Alerts open={openAlert} severity={alertType} close={setOpenAlert}>
                {alertMessage}
            </Alerts>
        </>
    );
};

export default Users;