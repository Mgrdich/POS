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

const ProductsChart:React.FC<IChart> = (props) => {
    let myUri: string = (props.query) ? props.url + props.query : props.url;
    const {data: products, isLoading:isLoadingProducts,handleChangeUrl} = useFetchUrl(myUri);
    const [productsTickFormat, setProductsTickFormat] = useState<Array<string>>([]);
    const [productsData, setProductsData] = useState<Array<any>>([]);

    useEffect(() => {
        const productsTickFormat = products.length ? products.map((item: any) => item.name) : null;
        const productsData = products.length ? products.map((item: any) => {
            return {x: item.name, y: item.price}
        }) : null;
        setProductsTickFormat(productsTickFormat);
        setProductsData(productsData)
    }, [products]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeUrl(`${props.url}?date=${event.target.value}`);
    };

    return (
        <Paper className='charts-paper'>
            <div className="chart-dropdown-container">
                <ControlledDropDown
                    id='productsDateRange'
                    name='products-date-range'
                    size='small'
                    ignoreNone={true}
                    data={dateRanges}
                    label='Date Ranges'
                    handleOnChange={handleOnChange}
                    defaultValue={(props.defaultDateValue) ? props.defaultDateValue : 'ytd'}
                />
            </div>

            {isLoadingProducts ? <div className='dashboard-loader-container'>
                <Loader className='dashboard-loader'/></div> : !isEmpty(products) && !isLoadingProducts ?
                <InterpolationChart
                    chartSize={{height: 250, width: 400}}
                    tickFormat={productsTickFormat}
                    data={productsData}
                    labelsKey='y'
                    labelsFunction={labelsFunction}
                    tickFormatFunction={tickFormatFunction}
                    interpolation='linear'
                    title='Products Chart'
                /> : <div className='chart-card'><span>No data created!</span></div>

            }
        </Paper>
    );
};

export default ProductsChart;