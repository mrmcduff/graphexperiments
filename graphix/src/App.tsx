import React from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import { TimeSeries } from './TimeSeries';
import { generateDataSet, convertToComparisonData } from 'dataGenerator';

const App: React.FC = () => {
    const [twoMetricData, twoColorMap] = generateDataSet(2, 96, 6);
    const [anotherGrouping, anotherColorMap] = generateDataSet(2, 64, 2);
    const [narrowGrouping, narrowColorMap] = generateDataSet(2, 32, 1);

    return (
        <div className="App">
            <div className='leftPanel'>
                <TimeSeries
                    metricData={convertToComparisonData(twoMetricData)}
                    metricName='things_per_second'
                    colorMap={twoColorMap}
                />
                <TimeSeries
                    metricData={convertToComparisonData(anotherGrouping)}
                    metricName='more_things_per_second'
                    colorMap={anotherColorMap}
                />
                <TimeSeries
                    metricData={convertToComparisonData(narrowGrouping)}
                    metricName='more_things_per_second'
                    colorMap={narrowColorMap}
                />
            </div>
        </div>
    );
}

export default App;
