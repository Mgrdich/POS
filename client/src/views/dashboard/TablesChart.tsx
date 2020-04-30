import React, {useEffect, useState} from 'react';
import {useFetch} from "../../components/Hooks/useFetch";
import {Paper} from "@material-ui/core";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {dateRanges} from "../../constants/dropdown/dateRanges";
import InterpolationChart from "../../components/Reusable/Chart/InterpolationChart";
import CardMessage from "../../components/Reusable/CardMessage";
import {isEmpty} from "../../util/functions";

const TablesChart = () => {

    const [fetchURL, setFetchUrl] = useState<string>('statistics/orders/table');
    const {data: tables, isLoading: tablesIsLoading} = useFetch(fetchURL);
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
        setFetchUrl(prevState => prevState + `?date=${event.target.value}`);
    };

    const tickFormatFunction = (x: any) => {
        return `AMD${x / 1000}K`
    };
    const labelsFunction = (datum: any) => {
        return `price: ${datum}`
    };

    return (
        <>
            {!isEmpty(tables) && !tablesIsLoading ?
                <Paper>
                    <div className="chart-dropdown-container">
                        <ControlledDropDown
                            id='tablesDateRange'
                            name='tables-date-range'
                            size='small'
                            ignoreNone={true}
                            data={dateRanges}
                            label='select date range'
                            handleOnChange={handleOnChange}
                            defaultValue='ytd'
                        />
                    </div>
                    <InterpolationChart
                        chartSize={{height: 250, width: 400}}
                        tickFormat={tablesTickFormat}
                        data={tablesData}
                        labelsKey='price'
                        labelsFunction={labelsFunction}
                        tickFormatFunction={tickFormatFunction}
                        interpolation='cardinal'
                    />
                </Paper>
                :
                <CardMessage header='No data created!'>
                    <div className="chart-dropdown-container">
                        <ControlledDropDown
                            id='tablesDateRange'
                            name='tables-date-range'
                            size='small'
                            ignoreNone={true}
                            data={dateRanges}
                            label='select date range'
                            handleOnChange={handleOnChange}
                            defaultValue='ytd'
                        />
                    </div>
                </CardMessage>}
        </>
    );
};

export default TablesChart;