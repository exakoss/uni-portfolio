import React from 'react';
import {View} from 'react-native'
import Plotly from 'react-native-plotly';
import theme from '../../theme';
import {generateDates} from '../../utils';

const sampleData = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 3, 4, 8],
    type: 'scatter',}
]

const sampleDateData = [{
    x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
    y: [2000, 2700, 2500],
    type: 'scatter',
    line: {color: theme.colors.warning},
    fill: 'tozeroy'
}
]

const layout = {
    title: 'ETH Price chart',
    xaxis: {
        title: 'Date',
        type: 'date'
    },
    yaxis: {
        title: 'Price in $',
        range: [0,3000]
    },
    plot_bgcolor: theme.colors.background,
    paper_bgcolor: theme.colors.background,
    font: {
        color:theme.colors.textWhite
    }

};


const SampleChart:React.FC = () => {
    const {unixTimestamps,plotlyTimestamps} = generateDates(24)
    console.log(unixTimestamps)
    console.log(plotlyTimestamps)
    return(
        <View style={{flex: 1}}>
            <Plotly
                data={sampleDateData}
                layout={layout}
                config={{displayModeBar : false}}
            />
        </View>
    )
}

export default SampleChart
