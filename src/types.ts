import type { Result } from 'autocannon';

export type BenchmarkCompareResult = {
    requestsDifference: string,
    latencyDifference: string,
    winner: {
        name: string,
        requestsAverage: number,
        latencyAverage: number,
    },
    looser: {
        name: string,
        requestsAverage: number,
        latencyAverage: number,
    }
};

export type BenchmarkResult = {
    name: string,
    value: Result
};
