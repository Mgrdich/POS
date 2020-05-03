import React from 'react';
import CashierChart from "../dashboard/CashierChart";
import {DateRanges} from "../../constants/Enums/General";

const AnalyticsOrdersCashier = () => {
    return (
        <>
           <CashierChart url="/statistics/orders/cashier" query={`?date=${DateRanges.last_month}`} />
           <CashierChart url="/statistics/orders/cashier" query={`?date=${DateRanges.this_month}`}/>
        </>
    );
};

export default AnalyticsOrdersCashier;