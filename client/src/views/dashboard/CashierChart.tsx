import React, {useEffect, useState} from 'react';
import {useFetch} from "../../components/Hooks/useFetch";
import {Paper} from "@material-ui/core";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {dateRanges} from "../../constants/dropdown/dateRanges";
import BarChart from "../../components/Reusable/Chart/BarChart";
import CardMessage from "../../components/Reusable/CardMessage";

import {isEmpty} from "../../util/functions";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import {labelsFunction, tickFormatFunction} from "./index";
import {useFetchUrl} from "../../components/Hooks/useFetchUrl";

const BarChartColorScale = ['#66fcf1', '#1f2833'];


const CashierChart = () => {
    const {data: cashier, isLoading: cashierIsLoading,handleChangeUrl} = useFetchUrl('/statistics/orders/cashier');
    const [cashierTickFormat, setCashierTickFormat] = useState<Array<any>>([]);

    useEffect(function () {
        const cashierTickFormat = cashier.length ? cashier.map((item: any) => item.createdBy) : null;
        setCashierTickFormat(cashierTickFormat);
    }, [cashier]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeUrl(`/statistics/orders/cashier?date=${event.target.value}`);
    };

    return (
        <>
            <ComponentLoader isLoading={cashierIsLoading}>
                {!isEmpty(cashier) && !cashierIsLoading ?
                    <Paper>
                        <div className="chart-dropdown-container">
                            <ControlledDropDown
                                id='tablesDateRange'
                                name='tables-date-range'
                                size='small'
                                ignoreNone={true}
                                data={dateRanges}
                                label='Date Ranges'
                                handleOnChange={handleOnChange}
                                defaultValue='ytd'
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
                                label='Date Ranges'
                                handleOnChange={handleOnChange}
                                defaultValue='ytd'
                            />
                        </div>
                    </CardMessage>
                }
            </ComponentLoader>
        </>
    );
};

export default CashierChart;