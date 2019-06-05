import React, { useState, ReactNode } from 'react';
import {
    Crosshair,
    DiscreteColorLegend,
    FlexibleWidthXYPlot,
    LineMarkSeries,
    YAxis,
    XAxis
} from 'react-vis';
import { ChartData } from './types';

const CHART_HEIGHT = 256;
const CHART_MARGIN = 36;
const COLOR_GRAYISH = '#11111F';
const COLOR_RED_BRIGHT = '#FF0000';
const CROSSHAIR_LINE_STYLES = {
    background: COLOR_RED_BRIGHT,
    width: '6px',
    opacity: '0.1',
    marginLeft: '-1px', // to center crosshair
    zIndex: '-1', // put crosshair behind nodes
    position: 'relative',
};

interface ChartProps {
    metricData: ChartData.MetricData;
    metricName: string;
    colorMap: Map<string, string>;
}

interface LegendObject {
    title: string;
    color: string;
}

type SimpleData = {
    x: number,
    y: number
}

type PlottableData = {
    data: SimpleData[],
    xDomain: [number, number],
    yDomain: [number, number]
}

type DomainPair = {
    xDomain: [number, number],
    yDomain: [number, number]
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

function onPlotMouseEnter(variantName: string,
    hoveredPlot: string | null,
    setHoveredPlot: React.Dispatch<React.SetStateAction<string | null>>) {
        console.log(`OPME: ${variantName}|${hoveredPlot}`);
        if (variantName !== hoveredPlot) {
            setHoveredPlot(variantName);
            console.log(`Hovered plot is now ${variantName}`);
        }
}

function onPlotMouseLeave(variantName: string,
    hoveredPlot: string | null,
    setHoveredPlot: React.Dispatch<React.SetStateAction<string | null>>) {
        console.log(`OPML: ${variantName}|${hoveredPlot}`);
        if (variantName === hoveredPlot) {
            setHoveredPlot(null);
            console.log(`Hovered plot cleared`);
        }
}

function onPlotNearestX(
    metricName: string,
    isHovered: boolean,
    nearestXIndex: number | null,
    setNearestXIndex: React.Dispatch<React.SetStateAction<number | null>>,
    // x: Date,
    x: number,
    y: number,
    innerX: number,
    index: number,
    nearestDataPoint: SimpleData | null,
    setNearestDataPoint: React.Dispatch<React.SetStateAction<SimpleData | null>>,
    crosshairX: number | null,
    setCrosshairX: React.Dispatch<React.SetStateAction<number | null>>,
) {
        if (!isHovered) {
            return;
        }
        if (index !== nearestXIndex) {
            setNearestXIndex(index);
            setNearestDataPoint({x, y});
            setCrosshairX(innerX);
        }
}

function renderLegend(
    knownVariantSeries: string[],
    colorMap: Map<string, string>,
    metricName: string,
    setHoveredTreatment: React.Dispatch<React.SetStateAction<string | null>>
    ): ReactNode {
    const legendObjects: LegendObject[] = knownVariantSeries.map(variantName => ({
        title: variantName,
        color: colorMap.get(variantName)!,
    }));
    return (
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
        </div>);
}

function renderCrossHair(
    isPlotHovered: boolean,
    nearestDataPoint: SimpleData | null,
    crosshairX: number | null,
): ReactNode {
    if ( nearestDataPoint === null || crosshairX === null) {
        return null;
    }

    return (
        <Crosshair
            values={[nearestDataPoint]}
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

function convertData(inData: ChartData.VariantDataPoint[]): SimpleData[] {
    const mappedData =  inData.map(datum => {
        return {
            x: datum.x.getTime(),
            y: datum.y
        }

    });
    return mappedData;
}

function generateDomains(inData: ChartData.VariantDataPoint[]) : DomainPair {
    let minX = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = Number.MIN_VALUE;
    inData.forEach(datum => {
        const timeVal = datum.x.getTime();
        if (timeVal < minX) {
            minX = timeVal;
        }
        if (timeVal > maxX) {
            maxX = timeVal;
        }
        if (datum.y < minY) {
            minY = datum.y;
        }
        if (datum.y > maxY) {
            maxY = datum.y;
        }
    });
    return {
        xDomain: [minX, maxX],
        yDomain: [minY, maxY]
    };
}


function createPlotDiv(
    metricData: ChartData.MetricData,
    colorMap: Map<string, string>,
    metricName: string,
    isPlotHovered: boolean,
    setIsPlotHovered: React.Dispatch<React.SetStateAction<boolean>>,
    hoveredTreatment: string | null,
    setHoveredTreatment: React.Dispatch<React.SetStateAction<string | null>>,
    nearestXIndex: number | null,
    setNearestXIndex: React.Dispatch<React.SetStateAction<number | null>>,
    nearestDataPoint: SimpleData | null,
    setNearestDataPoint: React.Dispatch<React.SetStateAction<SimpleData | null>>,
    domains: DomainPair | null,
    setDomains: React.Dispatch<React.SetStateAction<DomainPair | null>>,
    crosshairX: number | null,
    setCrosshairX: React.Dispatch<React.SetStateAction<number | null>>,
): React.ReactNode {
    const knownVariantSeries = Object.keys(metricData).filter(variantName => colorMap.has(variantName));
    if (domains === null) {
        setDomains(generateDomains(metricData[knownVariantSeries[0]].data));
        return null;
    }
    return (
        <div className={'plotContainer'} key={`container-${metricName}`}>
            <FlexibleWidthXYPlot
                xType="time"
                height={CHART_HEIGHT}
                margin={CHART_MARGIN}
                key={`plot-${metricName}`}
                style={{ fill: 'none' }}
                onMouseEnter={() => setIsPlotHovered(true)}
                onMouseLeave={() => setIsPlotHovered(false)}
                xDomain={domains.xDomain}
                yDomain={domains.yDomain}
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
                {knownVariantSeries.map((variantName, totalIndex) => (
                        <LineMarkSeries
                            size={2}
                            key={`${metricName}-${variantName}`}
                            data={convertData(metricData[variantName].data)}
                            color={colorMap.get(variantName)}
                            getNull={checkNaNs}
                            opacity={getOpacity(hoveredTreatment, variantName)}
                            onNearestX={({x, y}, {innerX, index}) => {
                                onPlotNearestX(
                                    metricName,
                                    isPlotHovered,
                                    nearestXIndex,
                                    setNearestXIndex,
                                    x,
                                    y,
                                    innerX,
                                    index,
                                    nearestDataPoint,
                                    setNearestDataPoint,
                                    crosshairX,
                                    setCrosshairX);
                            }}
                            strokeWidth={getStrokeWidth(hoveredTreatment, variantName)}
                        />
                ))}
                {renderCrossHair(isPlotHovered, nearestDataPoint, crosshairX)}
            </FlexibleWidthXYPlot>
            {renderLegend(knownVariantSeries, colorMap, metricName, setHoveredTreatment)}

        </div>
    );
}

export const TimeSeries: React.FC<ChartProps> = props => {
    const { metricData } = props;
    const [ hoveredTreatment, setHoveredTreatment ] = useState<string | null>(null);
    const [ nearestXIndex, setNearestXIndex ] = useState<number | null>(null);
    const [ nearestDataPoint, setNearestDataPoinit ] = useState<SimpleData | null>(null);
    const [ isPlotHovered, setIsPlotHovered ] = useState<boolean>(false);
    const [ domains, setDomains ] = useState<DomainPair | null>(null);
    const [ crosshairX, setCrossHairX ] = useState<number | null>(null);
    if (!metricData || Object.keys(metricData).length === 0) {
        return null;
    }

    return (
        <div>
            {createPlotDiv(
                metricData,
                props.colorMap,
                props.metricName,
                isPlotHovered,
                setIsPlotHovered,
                hoveredTreatment,
                setHoveredTreatment,
                nearestXIndex,
                setNearestXIndex,
                nearestDataPoint,
                setNearestDataPoinit,
                domains,
                setDomains,
                crosshairX,
                setCrossHairX)
            }
        </div>
    );
};
