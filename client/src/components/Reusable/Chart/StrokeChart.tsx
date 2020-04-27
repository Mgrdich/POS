import React from 'react';
import {VictoryArea, VictoryChart, VictoryGroup, VictoryTheme} from "victory";

const StrokeChart = () => {

    const data : any = {
        0: [
            { x: 1, y: 3 },
            { x: 2, y: 2 },
            { x: 3, y: 6 },
            { x: 4, y: 2 },
            { x: 5, y: 6 }
        ],
        1: [
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 }
        ],
    };
    return (
        <>
            <VictoryChart width={400} height={400} theme={VictoryTheme.material}>
                <VictoryGroup
                    colorScale={['#ffffff', '#66fcf1']}
                    style={{
                        data: { strokeWidth: 3, fillOpacity: 0.4 }
                    }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                >

                    {Object.keys(data).map((item:string) =>{
                        console.log(data[item]);

                        return(
                        <VictoryArea
                            key={item}
                            data={data[item]}

                        />
                    )})}

                </VictoryGroup>
            </VictoryChart>
        </>
    );
};

export default StrokeChart;