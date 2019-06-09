import { ChartData } from "./types";

const DATA_POINTS = 96;
const valuesControl: number[] = Array.from({ length: DATA_POINTS }, () => +(Math.random() * 10).toFixed(2));
const valuesTreatment: number[] = Array.from({ length: DATA_POINTS }, () => +(Math.random() * 10).toFixed(2));
const valuesOtherTreatment: number[] = Array.from({ length: DATA_POINTS }, () => +(Math.random() * 10).toFixed(2));

function zip(dates: Date[], values: number[]): ChartData.VariantDataPoint[] {
    return dates.map((aVal, aInd) => {
        return {
            x: aVal,
            y: values[aInd]
        }
    });
}

function toTimeFragment(k: number): string {
    if (k < 0 || k >= 3600) {
        return '00:00';
    }
    const hours = Math.floor(k / 60);
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    const minutes = k % 60;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hoursString}:${minutesString}`;
}

const flexDates = Array.from({ length: DATA_POINTS }, (v, k) => new Date(`2019-01-01T${toTimeFragment(k)}:00.000Z`));

const controlVariantData: ChartData.VariantData = {
    name: 'control',
    data: zip(flexDates, valuesControl),
}

const treatmentVariantData: ChartData.VariantData = {
    name: 'treatment',
    data: zip(flexDates, valuesTreatment),
}

const otherTreatmentVariantData: ChartData.VariantData = {
    name: 'treatment2',
    data: zip(flexDates, valuesOtherTreatment),
};

export const SampleData: ChartData.MetricData = {
    'control': controlVariantData,
    'treatment': treatmentVariantData
};

export const SampleTriData: ChartData.MetricData = {
    'control': controlVariantData,
    'treatment': treatmentVariantData,
    'treatment2': otherTreatmentVariantData,
};

export const colormap = new Map<string, string>();
export const COLOR_ROSE = '#E281BF';
export const COLOR_DESERT = '#FF4C4D';
export const COLOR_ORANGE = '#FF7545';
export const COLOR_SUNSHINE = '#FFB13B';
export const COLOR_GREEN = '#0DC98B';
export const COLOR_AQUA = '#10AEBA';
export const COLOR_SKY = '#81BEF0';
export const COLOR_ULTRAMARINE = '#036AFF';
export const COLOR_VIOLET = '#785EF0';
colormap.set('control', COLOR_VIOLET);
colormap.set('treatment', COLOR_GREEN);
colormap.set('treatment2', COLOR_DESERT);
const COLORS = [
    COLOR_VIOLET,
    COLOR_GREEN,
    COLOR_DESERT,
    COLOR_SKY,
    COLOR_ROSE,
    COLOR_ORANGE,
    COLOR_ULTRAMARINE,
    COLOR_SUNSHINE,
    COLOR_AQUA]

function generateColorMap(names: string[]): Map<string, string> {
    const colorMap = new Map<string, string>();
    names.forEach((name, index) => {
        colorMap.set(name, COLORS[index % COLORS.length]);
    });
    return colorMap;
}

function generateNames(numVariants: number): string[] {
    if (numVariants < 1) {
        return [];
    }
    const names = ['control'];
    for (let i = 1; i < numVariants; i++) {
        names.push(`treatment_${i}`);
    }
    return names;
}

function generateDates(numPoints: number): Date[] {
    if (numPoints < 1 || numPoints >= 3600) {
        return [];
    }
    return Array.from({ length: numPoints }, (_, k) => new Date(`2019-01-01T${toTimeFragment(k)}:00.000Z`));
}

function generateValues(numPoints: number, rangeMultiplier: number): number[] {
    if (numPoints < 1 || numPoints >= 3600) {
        return [];
    }
    return Array.from({ length: numPoints }, () => +(Math.random() * rangeMultiplier).toFixed(2));
};

export function generateDataSet(
    numVariants: number,
    numPoints: number,
    rangeMultiplier: number): [ChartData.MetricData, Map<string, string>] {
    const names = generateNames(numVariants);
    const dates = generateDates(numPoints);
    if (names.length === 0 || dates.length === 0) {
        return [{}, new Map<string, string>()];
    }
    const metricData = {};
    names.forEach(name => {
        const variantData: ChartData.VariantData = {
            name,
            data: zip(dates, generateValues(numPoints, rangeMultiplier)),
        }
        metricData[name] = variantData;
    });
    return [metricData, generateColorMap(names)];
}
