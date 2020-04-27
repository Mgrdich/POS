import React from 'react';
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryStack,
    VictoryTheme,
    VictoryTooltip
} from "victory";
import CardMessage from "../CardMessage";
interface IBarChart {
    data: Array<{ name: string; price: string; }>;
    x: string;
    y: string;
    tickFormat: Array<string>;
    labelsKey: string;
    colorScale: Array<string>;
}

const BarChart : React.FC<IBarChart> = (props) => {
    const {data, x, y, tickFormat, labelsKey, colorScale} = props;
    return (
        <>
            {data.length ?
                <VictoryChart theme={VictoryTheme.material} domainPadding={{x: 20, y: [0, 5]}} height={250} width={400}>
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
                    <VictoryStack animate={{
                        duration: 2000,
                        onLoad: {duration: 1000}
                    }} colorScale={colorScale}>
                        <VictoryBar data={data} x={x} y={y}
                                    labels={({datum}) => `price: ${datum[labelsKey]}`}
                                    style={{labels: {fontSize: '8px', color: '#1f2833'}}}
                                    labelComponent={
                                        <VictoryTooltip
                                            flyoutStyle={{fill: '#66fcf1', stroke: 'none'}}
                                            orientation='left'
                                        />
                                    }
                        />
                    </VictoryStack>
                </VictoryChart> : <CardMessage header='No data created!'/>}
        </>
    );
};

export default BarChart;