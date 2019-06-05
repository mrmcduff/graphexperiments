export namespace ChartData {
    export interface MetricData {
        [variantName: string]: VariantData;
    }
    export interface VariantData {
        name: string;
        data: VariantDataPoint[];
    }
    export interface VariantDataPoint {
        x: Date;
        y: number;
    }
}

export namespace SimpleChartData {
    export interface MetricData {
        [variantName: string]: VariantData;
    }
    export interface VariantData {
        name: string;
        data: VariantDataPoint[];
    }
    export interface VariantDataPoint {
        x: number;
        y: number;
    }
}
