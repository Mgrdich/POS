import React from 'react';
import {VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryTheme, VictoryTooltip} from "victory";
import CardMessage from "../CardMessage";

const HorizontalGroupChart = (props: any) => {
    const{data,x,y,tickFormat} = props;
    return (
        <> {data.length ?
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{x: 20, y: [0, 5]}} width={400} height={170}
            >
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
                <VictoryGroup horizontal
                              offset={10}
                              style={{data: {width: 6}}}
                              animate={{duration: 2000, onLoad: {duration: 1000}}}
                              colorScale={['#66fcf1', '#1f2833']}
                >
                    <VictoryBar data={data} x={x} y={y}
                                labels={({datum}) => `price: ${datum.price}`}
                                style={{labels: {fontSize: '8px', color: '#1f2833'}}}
                                labelComponent={
                                    <VictoryTooltip
                                        flyoutStyle={{fill: '#66fcf1', stroke: 'none'}}
                                        orientation={'top'}
                                    />
                                }
                    />

                </VictoryGroup>
            </VictoryChart>: <CardMessage header='No data created!' />  }
        </>
    );
};

export default HorizontalGroupChart;