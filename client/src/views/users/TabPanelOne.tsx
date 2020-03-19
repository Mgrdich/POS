import React from 'react';
import MyTable from "../../components/Reusable/Table/MyTable";
import ComponentLoader from "../../components/Reusable/ComponentLoader";

const TabPanelOne: React.FC<any> = (props) => { //TODO check the interfaces

    return (
        <>
            <ComponentLoader isLoading={props.loading}>
                <MyTable
                    tbody={props.data}
                    keys={props.keys}
                    thead={props.thead}
                    pagination={true}
                    paginationRowsCount={[5, 10, 20]}
                    actionsTypes={props.actionsTypes}
                    handleActions={props.handleActions}
                />
            </ComponentLoader>
        </>
    );
};

export default React.memo(TabPanelOne);