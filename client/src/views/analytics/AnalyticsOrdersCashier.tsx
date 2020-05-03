import React from 'react';
import CashierChart from "../dashboard/CashierChart";

const AnalyticsOrdersCashier = () => {
    return (
        <>
           <CashierChart url="/statistics/orders/cashier"/>
           <CashierChart url="/statistics/orders/cashier" query="?date="/>
        </>
    );
};

export default AnalyticsOrdersCashier;