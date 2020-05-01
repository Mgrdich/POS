import React, {useEffect, useState} from 'react';
import {Paper} from "@material-ui/core";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {dateRanges} from "../../constants/dropdown/dateRanges";
import InterpolationChart from "../../components/Reusable/Chart/InterpolationChart";
import CardMessage from "../../components/Reusable/CardMessage";
import {isEmpty} from "../../util/functions";
import {labelsFunction, tickFormatFunction} from "./index";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import {useFetchUrl} from "../../components/Hooks/useFetchUrl";

const ProductsChart = () => {
    const {data: products, isLoading:isLoadingProducts,handleChangeUrl} = useFetchUrl('/statistics/products/price');
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
        handleChangeUrl(`/statistics/products/price?date=${event.target.value}`);
    };

    return (
        <ComponentLoader isLoading={isLoadingProducts}>
            {!isEmpty(products) && !isLoadingProducts ?
                <Paper>
                    <div className="chart-dropdown-container">
                        <ControlledDropDown
                            id='productsDateRange'
                            name='products-date-range'
                            size='small'
                            ignoreNone={true}
                            data={dateRanges}
                            label='Date Ranges'
                            handleOnChange={handleOnChange}
                            defaultValue='ytd'
                        />
                    </div>
                    <InterpolationChart
                        chartSize={{height: 250, width: 400}}
                        tickFormat={productsTickFormat}
                        data={productsData}
                        labelsKey='y'
                        labelsFunction={labelsFunction}
                        tickFormatFunction={tickFormatFunction}
                        interpolation='linear'
                    />
                </Paper>
                :
                <CardMessage header='No data created!'>
                    <div className="chart-dropdown-container">
                        <ControlledDropDown
                            id='productsDateRange'
                            name='products-date-range'
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

export default ProductsChart;