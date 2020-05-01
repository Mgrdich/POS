import React from 'react';
import {VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryTheme, VictoryTooltip} from "victory";
import CardMessage from "../CardMessage";
import {Paper} from "@material-ui/core";

const HorizontalGroupChart = (props: any) => {
    const {data, x, y, tickFormat, tickFormatFunction,chartSize, labelsFunction, labelsKey, title} = props;
    return (
        <>
            {title ? <div className='chart-title-container'><span>{title}</span></div> : null}
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={{x: 20, y: [0, 5]}} width={chartSize.width} height={chartSize.height}
                >
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
                    <VictoryGroup horizontal
                                  offset={10}
                                  style={{data: {width: 6}}}
                                  animate={{duration: 2000, onLoad: {duration: 1000}}}
                                  colorScale={['#66fcf1', '#1f2833']}
                    >
                        <VictoryBar data={data} x={x} y={y}
                                    labels={({datum}) => labelsFunction ? labelsFunction(datum[labelsKey]) : datum[labelsKey]}
                                    style={{labels: {fontSize: '8px', color: '#1f2833'}}}
                                    labelComponent={
                                        <VictoryTooltip
                                            flyoutStyle={{fill: '#66fcf1', stroke: 'none'}}
                                            orientation={'top'}
                                        />
                                    }
                        />
                    </VictoryGroup>
                </VictoryChart>
        </>
    );
};

export default HorizontalGroupChart;