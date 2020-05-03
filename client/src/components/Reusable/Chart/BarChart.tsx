import React from 'react';
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryStack,
    VictoryTheme,
    VictoryTooltip
} from "victory";
import {IBarChart} from "../../../interfaces/Reusable";

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
                    style={{tickLabels: {fontSize: '6px', fill: '#66fcf1'}}}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => tickFormatFunction ? tickFormatFunction(x) : x}
                    style={{tickLabels: {fontSize: '6px', fill: '#66fcf1'}}}

                />
                <VictoryStack animate={{
                    duration: 2000,
                    onLoad: {duration: 1000}
                }} colorScale={colorScale}>
                    <VictoryBar data={data} x={x} y={y}
                                labels={({datum}) => labelsFunction ? labelsFunction(datum[labelsKey]) : datum[labelsKey]}
                                style={{labels: {fontSize: '6px', color: '#1f2833'}}}
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