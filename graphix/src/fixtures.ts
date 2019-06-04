import { ChartData } from "./types";
import { string } from "prop-types";

const valuesControl: number[] = Array.from({length: 24}, () => +(Math.random() * 10).toFixed(2));
const valuesTreatment: number[] = Array.from({length: 24}, () => +(Math.random() * 10).toFixed(2));
const valuesOtherTreatment: number[] = Array.from({length: 24}, () => +(Math.random() * 10).toFixed(2));

function zip(dates: Date[], values: number[]): ChartData.VariantDataPoint[] {
    return dates.map((aVal, aInd) => {
      return {
        x: aVal,
        y: values[aInd]
      }
    });
}

const dates: Date[] = [
    new Date("2019-01-01T00:00:00.000Z"),
    new Date("2019-01-01T00:01:00.000Z"),
    new Date("2019-01-01T00:02:00.000Z"),
    new Date("2019-01-01T00:03:00.000Z"),
    new Date("2019-01-01T00:04:00.000Z"),
    new Date("2019-01-01T00:05:00.000Z"),
    new Date("2019-01-01T00:06:00.000Z"),
    new Date("2019-01-01T00:07:00.000Z"),
    new Date("2019-01-01T00:08:00.000Z"),
    new Date("2019-01-01T00:09:00.000Z"),
    new Date("2019-01-01T00:10:00.000Z"),
    new Date("2019-01-01T00:11:00.000Z"),
    new Date("2019-01-01T00:12:00.000Z"),
    new Date("2019-01-01T00:13:00.000Z"),
    new Date("2019-01-01T00:14:00.000Z"),
    new Date("2019-01-01T00:15:00.000Z"),
    new Date("2019-01-01T00:16:00.000Z"),
    new Date("2019-01-01T00:17:00.000Z"),
    new Date("2019-01-01T00:18:00.000Z"),
    new Date("2019-01-01T00:19:00.000Z"),
    new Date("2019-01-01T00:20:00.000Z"),
    new Date("2019-01-01T00:21:00.000Z"),
    new Date("2019-01-01T00:22:00.000Z"),
    new Date("2019-01-01T00:23:00.000Z"),
];

const controlVariantData: ChartData.VariantData = {
    name: 'control',
    data: zip(dates, valuesControl),
}

const treatmentVariantData: ChartData.VariantData = {
    name: 'treatment',
    data: zip(dates, valuesTreatment),
}

const otherTreatmentVariantData: ChartData.VariantData = {
    name: 'treatment2',
    data: zip(dates, valuesOtherTreatment),
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
colormap.set('control', '#785EF0');
colormap.set('treatment', '#0DC98B');
colormap.set('treatment2', '#FF4C4D');
export const COLOR_ROSE_3 = '#E281BF';
export const COLOR_DESERT_3 = '#FF4C4D';
export const COLOR_ORANGE_3 = '#FF7545';
export const COLOR_SUNSHINE_3 = '#FFB13B';
export const COLOR_GREEN_3 = '#0DC98B';
export const COLOR_AQUA_3 = '#10AEBA';
export const COLOR_SKY_3 = '#81BEF0';
export const COLOR_ULTRAMARINE_3 = '#036AFF';
export const COLOR_VOILET_3 = '#785EF0';
