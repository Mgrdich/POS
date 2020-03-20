import React from 'react';
import MyTable from "../../components/Reusable/Table/MyTable";
import ComponentLoader from "../../components/Reusable/ComponentLoader";

const TabPanelOne: React.FC<any> = (props) => { //TODO check the interfaces
    const {data, keys, thead, actionsTypes, handleActions} = props;
    return (
        <>
            <ComponentLoader isLoading={props.loading}>
                <MyTable
                    tbody={data}
                    keys={keys}
                    thead={thead}
                    pagination={true}
                    paginationRowsCount={[5, 10, 20]}
                    actionsTypes={actionsTypes}
                    handleActions={handleActions}
                />
            </ComponentLoader>
        </>
    );
};

export default React.memo(TabPanelOne);