// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/ban-ts-comment
// @ts-ignore
import markdownTable from 'markdown-table';
import { cpus, totalmem } from 'os';
import type { BenchmarkResult } from './types';

const formatRequests = (value: number) => (value ? value.toFixed(0) : 'N/A');
const formatLatency = (value: number) => (value ? value.toFixed(2) : 'N/A');
const formatThroughput = (value: number) => (value ? (value / 1024 / 1024).toFixed(2) : 'N/A');

export function createMarkdownTableForBenchmarkResults(input: BenchmarkResult[]) {
    const items : [string, string, string, string][] = [];

    input = input.sort(
        (
            t1,
            t2,
        ) => {
            if (t1.value.requests.average < t2.value.requests.average) {
                return 1;
            } if (t1.value.requests.average > t2.value.requests.average) {
                return -1;
            }

            return 0;
        },
    );

    for (let i = 0; i < input.length; i++) {
        const { name, value } = input[i];
        items.push([
            name,
            formatRequests(value.requests.average),
            formatLatency(value.latency.average),
            formatThroughput(value.throughput.average),
        ]);
    }

    return markdownTable(
        [
            ['Package', 'Requests/s', 'Latency (ms)', 'Throughput/MB'],
            ...items,
        ],
        {
            align: ['l', 'c', 'r', 'r'],
        },
    );
}

export function createMarkdownForBenchmarkResults(input: BenchmarkResult[]) {
    return `## Benchmarks 

* CPUs:  \`${cpus().length}\`
* RAM:  \`${(totalmem() / (1024 ** 3)).toFixed(1)}GB\`
* Node: \`${process.version}\`
* Date:  \`${new Date()} \`
* Method: \`autocannon -c 100 -d 40 -p 10 localhost:3000\` (two rounds; one to warm-up, one to measure)

${createMarkdownTableForBenchmarkResults(input)}
`;
}
