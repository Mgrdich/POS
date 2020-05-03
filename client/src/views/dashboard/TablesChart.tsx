import React, {useEffect, useState} from 'react';
import {Paper} from "@material-ui/core";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {dateRanges} from "../../constants/dropdown/dateRanges";
import InterpolationChart from "../../components/Reusable/Chart/InterpolationChart";
import {isEmpty} from "../../util/functions";
import {labelsFunction,tickFormatFunction} from "./util";
import {useFetchUrl} from "../../components/Hooks/useFetchUrl";
import Loader from "../../components/Reusable/Loader";
import {IChart} from "../../interfaces/Views/dashboard";

const TablesChart:React.FC<IChart> = (props) => {
    let myUri: string = (props.query) ? props.url + props.query : props.url;
    const {data: tables, isLoading: tablesIsLoading, handleChangeUrl} = useFetchUrl(myUri);
    const [tablesTickFormat, setTablesTickFormat] = useState<Array<string>>([]);
    const [tablesData, setTablesData] = useState<Array<any>>([]);

    useEffect(() => {
        const tablesTickFormat = tables.length ? tables.map((item: any) => item.number) : null;
        const tablesData = tables.length ? tables.map((item: any) => {
            return {x: item.number, y: item.price}
        }) : null;
        setTablesTickFormat(tablesTickFormat);
        setTablesData(tablesData);
    }, [tables]);


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

            {tablesIsLoading ? <div className='dashboard-loader-container'>
                <Loader className='dashboard-loader'/></div> : !isEmpty(tables) && !tablesIsLoading ?
                <InterpolationChart
                    chartSize={{height: 250, width: 400}}
                    tickFormat={tablesTickFormat}
                    data={tablesData}
                    labelsKey='y'
                    labelsFunction={labelsFunction}
                    tickFormatFunction={tickFormatFunction}
                    title='Tables Chart'
                /> : <div className='chart-card'><span>No data created!</span></div>}
        </Paper>
    );
};

export default TablesChart;