import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TimeSeries } from './TimeSeries';
import { SampleData, colormap, SampleTriData } from 'fixtures';

const App: React.FC = () => {

  return (
    <div className="App">
        <div className='leftPanel'>
            <TimeSeries
                metricData = {SampleData}
                metricName = 'things_per_second'
                colorMap={colormap}
            />
            <TimeSeries
                metricData = {SampleTriData}
                metricName = 'more_things_per_second'
                colorMap={colormap}
            />
        </div>
    </div>
  );
}

export default App;
