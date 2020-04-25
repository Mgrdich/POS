import React from 'react';
import {VictoryLabel, VictoryPie, VictoryTheme} from "victory";

const PieChart = (props: any) => {
    const {data, x, colorScale, chartName} = props;
    return (
        <>
            <svg viewBox="0 0 400 400">
                <VictoryPie
                    theme={VictoryTheme.material}
                    colorScale={colorScale}
                    standalone={false}
                    width={400} height={400}
                    data={data}
                    x={x}
                    innerRadius={68} labelRadius={100}
                    style={{ labels: { fontSize: 10, fill: "white" } }}
                />
                <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 20, fill:'#66fcf1'}}
                    x={200} y={200}
                    text={chartName}
                />
            </svg>
            
        </>
    );
};

export default PieChart;