import React, { useState, ReactNode } from 'react';
import { Crosshair, DiscreteColorLegend, FlexibleWidthXYPlot, LineMarkSeries, YAxis, XAxis } from 'react-vis';
import { SimpleChartData } from './types';

const CHART_HEIGHT = 256;
const CHART_MARGIN = 36;

const COLOR_RED_BRIGHT = '#FF0000';
const CROSSHAIR_LINE_STYLES = {
    background: COLOR_RED_BRIGHT,
    width: '6px',
    opacity: '0.1',
    marginLeft: '-1px', // to center crosshair
    zIndex: '-1', // put crosshair behind nodes
    position: 'relative',
};

interface SimpleChartProps {
    metricData: SimpleChartData.MetricData;
    metricName: string;
    colorMap: Map<string, string>;
}

interface LegendObject {
    title: string;
    color: string;
}

function renderCrosshair(data: SimpleChartData.VariantDataPoint[]): ReactNode {
    return (
        <Crosshair
            values={[data[3]]}
            style={{ line: { background: 'silver' } }}
            // style={{
            //     line: {
            //         ...CROSSHAIR_LINE_STYLES,
            //         height: `${CHART_HEIGHT - 2*CHART_MARGIN}px`,
            //         marginLeft: `${crosshairX}px`,
            //     },
            // }}
        >
        </Crosshair>
    );
}

function createPlotDiv(
    simpleData: SimpleChartData.VariantDataPoint[],
    colorMap: Map<string, string>,
    metricName: string,
): React.ReactNode {
    const legendObjects = [{
        title: 'control',
        color: colorMap.get('control')!
    }];
    return (
        <div key={`container-${metricName}`}>
            <FlexibleWidthXYPlot
                xType="time"
                height={CHART_HEIGHT}
                margin={CHART_MARGIN}
                key={`plot-${metricName}`}
                style={{ fill: 'none' }}
                >
                <YAxis
                    tickTotal={6}
                    style={{
                        line: {stroke: '#ADDDE1'},
                        ticks: {stroke: '#ADDDE1'},
                        text: {stroke: 'none', fill: '#6b6b76', fontWeight: 300}
                    }}
                />
                <XAxis
                    tickTotal={6}
                    style={{
                        line: {stroke: '#ADDDE1'},
                        ticks: {stroke: '#ADDDE1'},
                        text: {stroke: 'none', fill: '#6b6b76', fontWeight: 300}
                    }}
                />
                <LineMarkSeries
                    size={2}
                    key={`${metricName}-${'control'}`}
                    data={simpleData}
                    color={colorMap.get('control')}
                    opacity={1}
                    strokeWidth={2}
                />
                {renderCrosshair(simpleData)}
            </FlexibleWidthXYPlot>
            <div className="legendContainer">
                <DiscreteColorLegend
                    items={legendObjects}
                    key={`legend-${metricName}`}
                />
            </div>

        </div>
    );
}

export const SimpleGraph: React.FC<SimpleChartProps> = props => {
    const { metricData } = props;
    if (!metricData || Object.keys(metricData).length === 0) {
        return null;
    }
    return (
        <div>
            {createPlotDiv(
                metricData['control'].data,
                props.colorMap,
                props.metricName)
            }
        </div>
    );
};
