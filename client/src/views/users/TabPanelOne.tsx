import React from 'react';
import MyTable from "../../components/Reusable/Table/MyTable";

const TabPanelOne:React.FC<any> = (props) => {
    return (
        <>
            {!props.loading && <MyTable
                tbody={(props.data && props.data.length)?props.data:undefined}
                keys={(props.keys)?props.keys:undefined}
                thead={(props.thead)?props.thead:undefined}
                pagination={true}
                paginationRowsCount={[1, 5, 6]}
            />}
        </>
    );
};

export default TabPanelOne;