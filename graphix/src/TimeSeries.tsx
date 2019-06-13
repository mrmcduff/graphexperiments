import React, { useState } from 'react';
import { Crosshair, DiscreteColorLegend, DecorativeAxis, FlexibleWidthXYPlot, LineSeries, YAxis, XAxis } from 'react-vis';
import { ChartData } from './types';
import { getYDomain, getXDomain } from 'dataHelpers';

const CHART_HEIGHT = 128;
const CHART_MARGIN = 36;
const SLIGHT_FUZZ_SUFFIX = '77';
const AXIS_FUZZ_SUFFIX = '33';
const AXIS_FOCUS_SUFFIX = '55';

const CROSSHAIR_STYLE = {
    'color': 'black',
    'textSize': '0.8em',
    'text': {
        'fontWeight': 120,
        'fontSize': 8,
    }
}

interface ChartProps {
    metricData: ChartData.MetricData;
    metricName: string;
    colorMap: Map<string, string>;
}

interface LegendObject {
    title: string;
    color: string;
}

interface CrosshairTarget {
    targetPoint: ChartData.VariantDataPoint,
    index: number,
    innerX: number,
}

/**
 * Checks the react-vis graph data type to verify that the y value is not
 * NaN and returns false if it is.
 * @param d the react-vis graph data type that is required to have a y value.
 */
function checkNaNs(d: { y: number }): boolean {
    return !isNaN(d.y);
}

function getOpacity(hoveredTreatment: string | null, variantName: string): number {
    if (hoveredTreatment === null) {
        return 1;
    }
    return variantName === hoveredTreatment ? 1 : 0.5;
}

function getStrokeWidth(hoveredTreatment: string | null, variantName: string): number {
    if (hoveredTreatment === null) {
        return 2;
    }
    return variantName === hoveredTreatment ? 3 : 1;
}

function setWithOpacity(colorString: string, isHovered: boolean, isAxis = false): string {
    if (isAxis) {
        return isHovered ? `${colorString}${AXIS_FOCUS_SUFFIX}` : `${colorString}${AXIS_FUZZ_SUFFIX}`;
    }
    return isHovered ? `${colorString}` : `${colorString}${SLIGHT_FUZZ_SUFFIX}`;
}

function renderCrosshair(crosshairTarget: CrosshairTarget | null): React.ReactNode {
    if (!crosshairTarget) {
        return null;
    }
    return (
        <Crosshair values={[crosshairTarget.targetPoint]}>
            <div>
                <p style={CROSSHAIR_STYLE}>{`Date: ${new Date(crosshairTarget.targetPoint.x).toLocaleString()}`}</p>
                <p>{`Value: ${crosshairTarget.targetPoint.y.toFixed(2)}`}</p>
            </div>
        </Crosshair>
    );
}

function createPlotDiv(
    metricData: ChartData.MetricData,
    colorMap: Map<string, string>,
    metricName: string,
    hoveredTreatment: string | null,
    setHoveredTreatment: React.Dispatch<React.SetStateAction<string | null>>,
    isHovered: boolean,
    setIsHovered: React.Dispatch<React.SetStateAction<boolean>>,
    crosshairTarget: CrosshairTarget | null,
    setCrosshairTarget: React.Dispatch<React.SetStateAction<CrosshairTarget | null>>,

): React.ReactNode {
    const knownVariantSeries = Object.keys(metricData).filter(variantName => colorMap.has(variantName));
    const legendObjects: LegendObject[] = knownVariantSeries.map(variantName => ({
        title: variantName,
        color: colorMap.get(variantName)!,
    }));
    const rangeData = metricData[knownVariantSeries[0]];
    const yDomain = getYDomain(0.5, rangeData.data);
    const xDomain = getXDomain(0.2, rangeData.data);
    const axisDataset = rangeData.data.map(datum => ({
        x: datum.x,
        y: 0,
    }));
    return (
        <div
            key={`container-${metricName}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setCrosshairTarget(null);
                setIsHovered(false);
            }}
        >
            <FlexibleWidthXYPlot
                xType="time"
                height={CHART_HEIGHT}
                margin={CHART_MARGIN}
                key={`plot-${metricName}`}
                style={{ fill: 'none' }}
                yDomain={[yDomain.lower, yDomain.upper]}
            >
                <YAxis
                    style={{
                        line: { stroke: setWithOpacity('#ADDDE1', isHovered) },
                        ticks: { stroke: setWithOpacity('#ADDDE1', isHovered) },
                        text: { stroke: 'none', fill: setWithOpacity('#6b6b76', isHovered), fontWeight: 300 }
                    }}
                />
                <XAxis
                    tickTotal={6}
                    style={{
                        line: { stroke: '#FFFFFF00' },
                        ticks: { stroke: setWithOpacity('#ADDDE1', isHovered) },
                        text: { stroke: 'none', fill: setWithOpacity('#6b6b76', isHovered), fontWeight: 300 }
                    }}
                />
                <LineSeries
                    key={`axis-${metricName}`}
                    data={axisDataset}
                    color={setWithOpacity('#ADDDE1', isHovered, true)}
                    strokeWidth={2}
                />
                {knownVariantSeries.map((variantName, seriesIndex) => (
                    <LineSeries
                        key={`${metricName}-${variantName}`}
                        curve="curveMonotoneX"
                        data={metricData[variantName].data}
                        color={setWithOpacity(colorMap.get(variantName)!, isHovered)}
                        getNull={checkNaNs}
                        opacity={getOpacity(hoveredTreatment, variantName)}
                        strokeWidth={getStrokeWidth(hoveredTreatment, variantName)}
                        onNearestX={(value, { event, innerX, index }) => {
                            if (isHovered && seriesIndex === 0) {
                                setCrosshairTarget({
                                    targetPoint: value as ChartData.VariantDataPoint,
                                    index,
                                    innerX,
                                });
                            }
                        }}
                    />
                ))}

                {renderCrosshair(crosshairTarget)}
            </FlexibleWidthXYPlot>
            <div className="legendContainer">
                <DiscreteColorLegend
                    items={legendObjects}
                    key={`legend-${metricName}`}
                    onItemMouseEnter={(item, index, event) => {
                        setHoveredTreatment(item.title);
                    }}
                    onItemMouseLeave={(item, index, event) => {
                        setHoveredTreatment(null);
                    }}
                />
            </div>

        </div>
    );
}

export const TimeSeries: React.FC<ChartProps> = props => {
    const { metricData } = props;
    const [hoveredTreatment, setHoveredTreatment] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [crosshairTarget, setCrosshairTarget] = useState<CrosshairTarget | null>(null);
    if (!metricData || Object.keys(metricData).length === 0) {
        return null;
    }
    return (
        <div>
            {createPlotDiv(
                metricData,
                props.colorMap,
                props.metricName,
                hoveredTreatment,
                setHoveredTreatment,
                isHovered,
                setIsHovered,
                crosshairTarget,
                setCrosshairTarget)
            }
        </div>
    );
};
