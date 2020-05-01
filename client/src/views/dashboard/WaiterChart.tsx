import React, {useEffect, useState} from 'react';
import {Paper} from "@material-ui/core";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {dateRanges} from "../../constants/dropdown/dateRanges";
import HorizontalGroupChart from "../../components/Reusable/Chart/HorizontalGroupChart";
import {isEmpty} from "../../util/functions";
import {labelsFunction, tickFormatFunction} from "./index";
import {useFetchUrl} from "../../components/Hooks/useFetchUrl";
import Loader from "../../components/Reusable/Loader";

const WaiterChart = () => {
    const {data: waiter, isLoading: waterIsLoading,handleChangeUrl} = useFetchUrl('/statistics/orders/waiter');
    const [waiterTickFormat, setWaiterTickFormat] = useState<Array<any>>([]);

    useEffect(function () {
        const cashierTickFormat = waiter.length ? waiter.map((item: any) => item.waiter) : null;
        setWaiterTickFormat(cashierTickFormat);
    }, [waiter]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeUrl(`/statistics/orders/waiter?date=${event.target.value}`);
    };


    return (
        <Paper className='charts-paper'>
            <div className="chart-dropdown-container">
                <ControlledDropDown
                    id='waiterDateRange'
                    name='waiter-date-range'
                    size='small'
                    ignoreNone={true}
                    data={dateRanges}
                    label='Date Ranges'
                    handleOnChange={handleOnChange}
                    defaultValue='ytd'
                />
            </div>

                {waterIsLoading ? <div className='dashboard-loader-container'>
                    <Loader className='dashboard-loader'/></div> : !isEmpty(waiter) && !waterIsLoading ?
                    <HorizontalGroupChart
                        chartSize={{height: 250, width: 400}}
                        data={waiter}
                        x='waiter'
                        y='price'
                        tickFormat={waiterTickFormat}
                        labelsKey='price'
                        tickFormatFunction={tickFormatFunction}
                        labelsFunction={labelsFunction}
                        title='Waiter Chart'
                    /> :
                    <div className='chart-card'><span>No data created!</span></div>}
        </Paper>
    );
};

export default WaiterChart;