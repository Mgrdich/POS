import React from 'react';
import {VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryTheme, VictoryTooltip} from "victory";
import {IHorizontalGroupChart} from "../../../interfaces/Reusable";

const HorizontalGroupChart:React.FC<IHorizontalGroupChart> = (props) => {
    const {data, x, y, tickFormat, tickFormatFunction,chartSize, labelsFunction, labelsKey, title, colorScale, toolTipPosition} = props;
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
                        style={{tickLabels: {fontSize: '6px', fill: '#66fcf1'}}}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => tickFormatFunction ? tickFormatFunction(x) : x}
                        style={{tickLabels: {fontSize: '6px', fill: '#66fcf1'}}}
                    />
                    <VictoryGroup horizontal
                                  offset={10}
                                  style={{data: {width: 6}}}
                                  animate={{duration: 2000, onLoad: {duration: 1000}}}
                                  colorScale={colorScale ? colorScale :['#66fcf1', '#1f2833']}
                    >
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
                    </VictoryGroup>
                </VictoryChart>
        </>
    );
};

export default HorizontalGroupChart;