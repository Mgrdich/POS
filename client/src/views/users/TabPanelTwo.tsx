import React from 'react';
import MyTable from "../../components/Reusable/Table/MyTable";


const TabPanelTwo: React.FC = () => {
    const data = [
        {_id: 0, name: 'Mike', age: 22, sex: 'Male'},
        {_id: 1, name: 'Maria', age: 27, sex: 'Female'},
        {_id: 2, name: 'John', age: 18, sex: 'Male'},
        {_id: 3, name: 'Andrew', age: 42, sex: 'Male'},
        {_id: 4, name: 'Kata', age: 29, sex: 'Female'},
        {_id: 5, name: 'Ahmed', age: 15, sex: 'Male'},
    ];
    const headCell = ['Name', 'Sex', 'Age'];
    const thead = ['name', 'sex', 'age'];

    return (
        <>
            <MyTable
                data={data}
                headCellData={headCell}
                thead={thead}
                pagination={true}
                paginationRowsCount={[1, 5, 6]}/>
        </>
    );
};

export default TabPanelTwo;