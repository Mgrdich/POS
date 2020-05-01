import React, {useEffect, useState} from 'react';
import {Paper} from "@material-ui/core";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {dateRanges} from "../../constants/dropdown/dateRanges";
import HorizontalGroupChart from "../../components/Reusable/Chart/HorizontalGroupChart";
import CardMessage from "../../components/Reusable/CardMessage";
import {useFetch} from "../../components/Hooks/useFetch";
import {isEmpty} from "../../util/functions";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import {labelsFunction, tickFormatFunction} from "./index";

const WaiterChart = () => {

    const [fetchURL, setFetchUrl] = useState<string>('/statistics/orders/waiter');
    const {data: waiter, isLoading: waterIsLoading} = useFetch(fetchURL);
    const [waiterTickFormat, setWaiterTickFormat] = useState<Array<any>>([]);

    useEffect(function () {
        const cashierTickFormat = waiter.length ? waiter.map((item: any) => item.waiter) : null;
        setWaiterTickFormat(cashierTickFormat);
    }, [waiter]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFetchUrl(`statistics/orders/table?date=${event.target.value}`);
    };


    return (
        <ComponentLoader isLoading={waterIsLoading}>
            {!isEmpty(waiter) && !waterIsLoading ?
                <Paper>
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
                    <HorizontalGroupChart
                        chartSize={{height: 250, width: 400}}
                        data={waiter}
                        x='waiter'
                        y='price'
                        tickFormat={waiterTickFormat}
                        labelsKey='price'
                        tickFormatFunction={tickFormatFunction}
                        labelsFunction={labelsFunction}
                    />
                </Paper>
                :
                <CardMessage header='No data created!'>
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
                </CardMessage>
            }
        </ComponentLoader>
    );
};

export default WaiterChart;