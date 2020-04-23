import React from 'react';
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryStack,
    VictoryTheme,
    VictoryTooltip
} from "victory";

const BarChart = (props: any) => {
    const {data, x, y, tickFormat} = props;
    return (
        <>
            <VictoryChart theme={VictoryTheme.material} domainPadding={{x: 20, y: [0, 5]}}>
                <VictoryAxis
                    tickValues={tickFormat}
                    tickFormat={tickFormat}
                    style={{tickLabels: {fontSize: '10px', fill: '#66fcf1'}}}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => `AMD${x / 1000}k`}
                    style={{tickLabels: {fontSize: '8px', fill: '#66fcf1'}}}

                />
                <VictoryStack colorScale={['#66fcf1', '#1f2833']}>
                    <VictoryBar data={data} x={x} y={y}
                                labels={({datum}) => `price: ${datum.price}`}
                                style={{labels: {fontSize: '8px', color: '#1f2833'}}}
                                labelComponent={
                                    <VictoryTooltip
                                        flyoutStyle={{fill: '#66fcf1', stroke: 'none'}}
                                        orientation={'left'}
                                    />
                                }
                    />
                </VictoryStack>
            </VictoryChart>
        </>
    );
};

export default BarChart;