import { GraphDomain, ChartData } from "types";

type Targets = {
    min: number;
    median: number;
    max: number;
}
function getYTargets(data: ChartData.VariantDataPoint[]) : Targets {
    const yVals = data.map(datum => datum.y);
    // Sort is ascending by default, and these are numbers, so there's no need to manipulate further.
    yVals.sort((a, b) => (b - a));
    const length = yVals.length;
    const median = length % 2 === 0
        ? (yVals[length / 2] + yVals[(length / 2) - 1]) / 2
        : yVals[Math.floor[length/2]];
    console.log('Data:');
    console.log(data);
    console.log(yVals);
    return {
        min: yVals[0],
        median,
        max:  yVals[length - 1],
    }
}

export function getYDomain(paddingPercentage: number, data: ChartData.VariantDataPoint[]): GraphDomain {
    const targets = getYTargets(data);
    const maxPadding = (targets.max - targets.median) * paddingPercentage;
    const minPadding = (targets.median - targets.min) * paddingPercentage;
    console.log(`Getting y domain of ${targets.min - minPadding}, ${targets.max + maxPadding}`);
    return {
        upper: targets.max + maxPadding,
        lower: targets.min - minPadding,
    }
}

export function getXDomain(paddingPercentage: number, data: ChartData.VariantDataPoint[]): GraphDomain {
    const xVals = data.map(datum => datum.x);
    xVals.sort((a, b) => b - a);
    const totalPadding = (xVals[xVals.length - 1] - xVals[0]) * paddingPercentage;
    const max = xVals[xVals.length - 1] + totalPadding;
    return { upper: max, lower: xVals[0] }
}
