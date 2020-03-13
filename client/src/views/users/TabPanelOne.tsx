import React from 'react';
import MyTable from "../../components/Reusable/Table/MyTable";

const TabPanelOne: React.FC<any> = (props) => { //TODO check the interfaces

    //TODO add Loading element
    return (
        <>
            {!props.loading && <MyTable
                tbody={props.data }
                keys={props.keys}
                thead={props.thead}
                pagination={true}
                paginationRowsCount={[5, 10, 20]}
            />}
        </>
    );
};

export default React.memo(TabPanelOne);