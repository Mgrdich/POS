import React, {useEffect, useState} from 'react';
import {useFetch} from "../../components/Hooks/useFetch";
import {Paper} from "@material-ui/core";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {dateRanges} from "../../constants/dropdown/dateRanges";
import BarChart from "../../components/Reusable/Chart/BarChart";
import CardMessage from "../../components/Reusable/CardMessage";
import {labelsFunction, tickFormatFunction} from "./index";
import {isEmpty} from "../../util/functions";

const BarChartColorScale = ['#66fcf1', '#1f2833'];



const CashierChart = () => {
    const [fetchURL, setFetchUrl] = useState<string>('/statistics/orders/cashier');
    const {data: cashier, isLoading: cashierIsLoading} = useFetch(fetchURL);
    const [cashierTickFormat, setCashierTickFormat] = useState<Array<any>>([]);


    useEffect(function () {
        const cashierTickFormat = cashier.length ? cashier.map((item: any) => item.createdBy) : null;
        setCashierTickFormat(cashierTickFormat);
    }, [cashier]);


    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFetchUrl(prevState => prevState+`?date=${event.target.value}`);
    };

    return (
        <>
            {!isEmpty(cashier) && !cashierIsLoading ?
                <Paper>
                    <div className="chart-dropdown-container">
                        <ControlledDropDown
                            id='cashierDateRange'
                            name='cashier-date-range'
                            size='small'
                            ignoreNone={true}
                            data={dateRanges}
                            label='select date range'
                            handleOnChange={handleOnChange}
                        />
                    </div>
                    <BarChart
                        chartSize={{height: 250, width: 400}}
                        colorScale={BarChartColorScale}
                        data={cashier}
                        x='createdBy'
                        y='price'
                        tickFormat={cashierTickFormat}
                        labelsKey='price'
                        tickFormatFunction={tickFormatFunction}
                        labelsFunction={labelsFunction}
                    />
                </Paper> : <CardMessage header='No data created!'/>}
        </>
    );
};

export default CashierChart;