import React from 'react';
import './App.css';
import { TimeSeries } from './TimeSeries';
import { generateDataSet } from 'dataGenerator';

const App: React.FC = () => {
    const [twoMetricData, twoColorMap] = generateDataSet(2, 96, 6);
    const [threeMetricData, threeColorMap] = generateDataSet(3, 128, 1);
    const [sixMetricData, sixColorMap] = generateDataSet(6, 64, 3);
  return (
    <div className="App">
        <div className='leftPanel'>
            <TimeSeries
                metricData = {twoMetricData}
                metricName = 'things_per_second'
                colorMap={twoColorMap}
            />
            <TimeSeries
                metricData = {threeMetricData}
                metricName = 'more_things_per_second'
                colorMap={threeColorMap}
            />
            <TimeSeries
                metricData = {sixMetricData}
                metricName = 'more_things_per_second'
                colorMap={sixColorMap}
            />
        </div>
    </div>
  );
}

export default App;
