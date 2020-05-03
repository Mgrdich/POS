import React from 'react';
import {
    VictoryAxis,
    VictoryChart,
    VictoryLine,
    VictoryScatter,
    VictoryTheme,
    VictoryTooltip
} from "victory";
import {IInterpolationChart} from "../../../interfaces/Reusable";

const InterpolationChart :React.FC<IInterpolationChart> = (props) => {
    const {data, tickFormat, labelsKey, chartSize, tickFormatFunction, labelsFunction, interpolation, title, toolTipPosition} = props;
    return (
        <>
            {title ? <div className='chart-title-container'><span>{title}</span></div> : null}
            <VictoryChart theme={VictoryTheme.material} height={chartSize.height} width={chartSize.width}>
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

                <VictoryLine
                    animate={{duration: 2000, onLoad: {duration: 1000}}}
                    interpolation={interpolation ? interpolation : 'linear'} data={data}
                    style={{data: {stroke: "#66fcf1"}}}

                />
                <VictoryScatter data={data}
                                size={4}
                                labels={({datum}) => labelsFunction ? labelsFunction(datum[labelsKey]) : datum[labelsKey]}
                                style={{data: {fill: "#000000"}, labels: {fontSize: '6px', color: '#1f2833'}}}
                                labelComponent={
                                    <VictoryTooltip
                                        flyoutStyle={{fill: '#66fcf1', stroke: 'none'}}
                                        orientation={toolTipPosition ? toolTipPosition : 'top'}
                                    />
                                }
                />
            </VictoryChart>
        </>
    );
};

export default InterpolationChart;