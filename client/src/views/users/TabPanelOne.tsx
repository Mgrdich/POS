import React from 'react';
import {useTable} from "../../components/Hooks/useTable";

const TabPanelOne:React.FC = () => {
    const {tbody, header} = useTable('/users');
    console.log(header);
    return (
        <div>
            Tab Panel One
        </div>
    );
};

export default TabPanelOne;