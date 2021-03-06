import React, {useEffect, useState} from 'react';
import {Paper} from "@material-ui/core";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {dateRanges} from "../../constants/dropdown/dateRanges";
import HorizontalGroupChart from "../../components/Reusable/Chart/HorizontalGroupChart";
import {isEmpty} from "../../util/functions";
import {labelsFunction,tickFormatFunction} from "./util";
import {useFetchUrl} from "../../components/Hooks/useFetchUrl";
import Loader from "../../components/Reusable/Loader";
import {IChart} from "../../interfaces/Views/dashboard";

const WaiterChart:React.FC<IChart> = (props) => {
    let myUri: string = (props.query) ? props.url + props.query : props.url;
    const {data: waiter, isLoading: waterIsLoading,handleChangeUrl} = useFetchUrl(myUri);
    const [waiterTickFormat, setWaiterTickFormat] = useState<Array<any>>([]);

    useEffect(function () {
        const cashierTickFormat = waiter.length ? waiter.map((item: any) => item.waiter) : null;
        setWaiterTickFormat(cashierTickFormat);
    }, [waiter]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeUrl(`${props.url}?date=${event.target.value}`);
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
                    defaultValue={(props.defaultDateValue) ? props.defaultDateValue : 'ytd'}
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