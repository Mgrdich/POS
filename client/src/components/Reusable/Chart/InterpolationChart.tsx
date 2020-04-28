import React from 'react';
import {
    VictoryAxis,
    VictoryChart,
    VictoryLine,
    VictoryScatter,
    VictoryTheme,
    VictoryTooltip
} from "victory";


const InterpolationChart = (props: any) => {
    const {data, tickFormat, labelsKey, tickFormatFunction, labelsFunction, interpolation} = props;
    return (
        <>


            <VictoryChart theme={VictoryTheme.material} height={170}>
                <VictoryAxis
                    tickValues={tickFormat}
                    tickFormat={tickFormat}
                    style={{tickLabels: {fontSize: '8px', fill: '#66fcf1'}}}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => tickFormatFunction ? tickFormatFunction(x) : x}
                    style={{tickLabels: {fontSize: '8px', fill: '#66fcf1'}}}

                />

                <VictoryLine
                    animate={{duration: 2000, onLoad: {duration: 1000}}}
                    interpolation={interpolation} data={data}
                    style={{data: {stroke: "#66fcf1"}}}

                />
                <VictoryScatter data={data}
                                size={4}
                                labels={({datum}) => labelsFunction ? labelsFunction(datum[labelsKey]) : datum[labelsKey]}
                                style={{data: {fill: "#000000"}, labels: {fontSize: '8px', color: '#1f2833'}}}
                                labelComponent={
                                    <VictoryTooltip
                                        flyoutStyle={{fill: '#66fcf1', stroke: 'none'}}
                                        orientation='top'
                                    />
                                }
                />
            </VictoryChart>
        </>
    );
};

export default InterpolationChart;