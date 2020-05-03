import React from 'react';
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryStack,
    VictoryTheme,
    VictoryTooltip
} from "victory";


interface IBarChart {
    data: Array<{ name: string; price: string; }>;
    x: string;
    y: string;
    tickFormat: Array<string>;
    labelsKey: string;
    colorScale?: Array<string>;
    tickFormatFunction?: Function;
    labelsFunction?: Function;
    chartSize:any;
    title?:string;
    toolTipPosition?: 'top' | 'left'| 'right'| 'bottom';
}

const BarChart: React.FC<IBarChart> = (props) => {
    const {data, x, y, tickFormat, chartSize, labelsKey, colorScale, title, tickFormatFunction, labelsFunction, toolTipPosition} = props;
    return (
        <>
            {title ? <div className='chart-title-container'><span>{title}</span></div> : null}
            <VictoryChart theme={VictoryTheme.material} domainPadding={{x: 20, y: [0, 5]}} height={chartSize.height}
                          width={chartSize.width}>
                <VictoryAxis
                    tickValues={tickFormat}
                    tickFormat={tickFormat}
                    style={{tickLabels: {fontSize: '10px', fill: '#66fcf1'}}}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => tickFormatFunction ? tickFormatFunction(x) : x}
                    style={{tickLabels: {fontSize: '8px', fill: '#66fcf1'}}}

                />
                <VictoryStack animate={{
                    duration: 2000,
                    onLoad: {duration: 1000}
                }} colorScale={colorScale}>
                    <VictoryBar data={data} x={x} y={y}
                                labels={({datum}) => labelsFunction ? labelsFunction(datum[labelsKey]) : datum[labelsKey]}
                                style={{labels: {fontSize: '5px', color: '#1f2833'}}}
                                labelComponent={
                                    <VictoryTooltip
                                        flyoutStyle={{fill: '#66fcf1', stroke: 'none'}}
                                        orientation={toolTipPosition ? toolTipPosition : 'top'}
                                    />
                                }
                    />
                </VictoryStack>
            </VictoryChart>

        </>
    );
};

export default BarChart;