import React from 'react';
import {VictoryContainer, VictoryLabel, VictoryPie, VictoryTheme} from "victory";
import {Paper} from "@material-ui/core";

const PieChart = (props: any) => {
    const {data, x, colorScale, chartName, y} = props;
    return (
        <>
            <Paper>
            <VictoryContainer height={165} width={400} >
            <svg viewBox="0 0 400 400">
                <VictoryPie
                    theme={VictoryTheme.material}
                    colorScale={colorScale}
                    standalone={false}
                    width={400} height={400}
                    data={data}
                    x={x}
                    innerRadius={80} labelRadius={100}
                    style={{ labels: { fontSize: 30, fill: "white" } }}
                    animate={{duration: 2000, onLoad: {duration:1000 }}}
                    labels={({datum}) => datum.x}
                />
                <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 20, fill:'#66fcf1'}}
                    x={200} y={200}
                    text={y}
                />
            </svg>
            </VictoryContainer>

            </Paper>
        </>
    );
};

export default PieChart;