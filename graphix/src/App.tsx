import React from 'react';
import './App.css';
import { TimeSeries } from './TimeSeries';
import { generateDataSet, generateSimpleDataSet } from 'dataGenerator';
import { SimpleGraph } from 'SimpleGraph';

const App: React.FC = () => {
    // const [twoMetricData, twoColorMap] = generateDataSet(2, 96, 6);
    // const [threeMetricData, threeColorMap] = generateDataSet(3, 128, 1);
    // const [sixMetricData, sixColorMap] = generateDataSet(6, 64, 3);

    const [simpleSingleData, simpleSingleColorMap] = generateSimpleDataSet(1, 12, 4);
  return (
    <div className="App">
        <div className='simpleContainer'>
            <SimpleGraph
                metricData = {simpleSingleData}
                metricName = {'simple stuff'}
                colorMap = {simpleSingleColorMap}
            />
        </div>

    </div>
  );
}

export default App;


//<div className='graphContainer'>
//<TimeSeries
//    metricData = {twoMetricData}
//    metricName = 'things_per_second'
//    colorMap={twoColorMap}
///>
//{/* <TimeSeries
//    metricData = {threeMetricData}
//    metricName = 'more_things_per_second'
//    colorMap={threeColorMap}
///>
//<TimeSeries
//    metricData = {sixMetricData}
//    metricName = 'so_many_things_per_second'
//    colorMap={sixColorMap}
///> */}
//</div>
