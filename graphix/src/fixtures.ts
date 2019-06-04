import { ChartData } from "./types";

const valuesControl: number[] = Array.from({length: 48}, () => +(Math.random() * 10).toFixed(2));
const valuesTreatment: number[] = Array.from({length: 48}, () => +(Math.random() * 10).toFixed(2));
const valuesOtherTreatment: number[] = Array.from({length: 48}, () => +(Math.random() * 10).toFixed(2));

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
    new Date("2019-01-01T00:24:00.000Z"),
    new Date("2019-01-01T00:25:00.000Z"),
    new Date("2019-01-01T00:26:00.000Z"),
    new Date("2019-01-01T00:27:00.000Z"),
    new Date("2019-01-01T00:28:00.000Z"),
    new Date("2019-01-01T00:29:00.000Z"),
    new Date("2019-01-01T00:30:00.000Z"),
    new Date("2019-01-01T00:31:00.000Z"),
    new Date("2019-01-01T00:32:00.000Z"),
    new Date("2019-01-01T00:33:00.000Z"),
    new Date("2019-01-01T00:34:00.000Z"),
    new Date("2019-01-01T00:35:00.000Z"),
    new Date("2019-01-01T00:36:00.000Z"),
    new Date("2019-01-01T00:37:00.000Z"),
    new Date("2019-01-01T00:38:00.000Z"),
    new Date("2019-01-01T00:39:00.000Z"),
    new Date("2019-01-01T00:40:00.000Z"),
    new Date("2019-01-01T00:41:00.000Z"),
    new Date("2019-01-01T00:42:00.000Z"),
    new Date("2019-01-01T00:43:00.000Z"),
    new Date("2019-01-01T00:44:00.000Z"),
    new Date("2019-01-01T00:45:00.000Z"),
    new Date("2019-01-01T00:46:00.000Z"),
    new Date("2019-01-01T00:47:00.000Z"),

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
