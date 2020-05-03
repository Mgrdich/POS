import React, {useEffect, useState} from 'react';
import {Paper} from "@material-ui/core";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {dateRanges} from "../../constants/dropdown/dateRanges";
import BarChart from "../../components/Reusable/Chart/BarChart";
import {isEmpty} from "../../util/functions";
import {labelsFunction,tickFormatFunction} from "./util";
import {useFetchUrl} from "../../components/Hooks/useFetchUrl";
import Loader from "../../components/Reusable/Loader";
import {IChart} from "../../interfaces/Views/dashboard";

const BarChartColorScale = ['#66fcf1', '#1f2833'];


const CashierChart:React.FC<IChart> = (props) => {
    let myUri: string = (props.query) ? props.url + props.query : props.url;
    const {data: cashier, isLoading: cashierIsLoading,handleChangeUrl} = useFetchUrl(myUri);
    const [cashierTickFormat, setCashierTickFormat] = useState<Array<any>>([]);

    useEffect(function () {
        const cashierTickFormat = cashier.length ? cashier.map((item: any) => item.createdBy) : null;
        setCashierTickFormat(cashierTickFormat);
    }, [cashier]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeUrl(`${props.url}?date=${event.target.value}`);
    };

    return (
        <Paper className='charts-paper'>
            <div className="chart-dropdown-container">
                <ControlledDropDown
                    id='tablesDateRange'
                    name='tables-date-range'
                    size='small'
                    ignoreNone={true}
                    data={dateRanges}
                    label='Date Ranges'
                    handleOnChange={handleOnChange}
                    defaultValue={(props.defaultDateValue) ? props.defaultDateValue : 'ytd'}
                />
            </div>
            {cashierIsLoading ? <div className='dashboard-loader-container'>
                <Loader className='dashboard-loader'/>
            </div> : !isEmpty(cashier) && !cashierIsLoading ?
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
                    title='Cashier Chart'
                />
                :
               <div className='chart-card'><span>No data created!</span></div>}

        </Paper>
    );
};

export default CashierChart;