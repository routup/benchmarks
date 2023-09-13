import type { Options, Result } from 'autocannon';
import autocannon from 'autocannon';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import autocannonCompare from 'autocannon-compare';
import fs from 'node:fs';
import path from 'node:path';
import { OUTPUT_DIRECTORY } from './constants';
import type { BenchmarkCompareResult, BenchmarkResult } from './types';

export async function runBenchmark(options: Omit<Options, 'url'>) : Promise<Result> {
    return autocannon({
        ...options,
        url: 'http://127.0.0.1:3000',
    });
}

export async function saveBenchmarkResult(pkg: string, result: Result) {
    try {
        await fs.promises.access(OUTPUT_DIRECTORY, fs.constants.O_DIRECTORY);
    } catch (e) {
        await fs.promises.mkdir(OUTPUT_DIRECTORY, { recursive: true });
    }

    const destinationPath = path.join(OUTPUT_DIRECTORY, `${pkg}.json`);
    await fs.promises.writeFile(destinationPath, JSON.stringify(result));
}

export async function readBenchmarkResult(pkg: string) : Promise<Result> {
    const destinationPath = path.join(OUTPUT_DIRECTORY, `${pkg}.json`);

    const content = await fs.promises.readFile(destinationPath, { encoding: 'utf-8' });

    return JSON.parse(content);
}

export async function readBenchmarkResults(pkgs?: string[]) : Promise<BenchmarkResult[]> {
    const files = await fs.promises.readdir(OUTPUT_DIRECTORY);

    const output : BenchmarkResult[] = [];

    for (let i = 0; i < files.length; i++) {
        const ext = path.extname(files[i]);
        const name = files[i].substring(0, files[i].length - ext.length);
        if (!pkgs || pkgs.length === 0 || pkgs.indexOf(name) !== -1) {
            output.push({
                name,
                value: await readBenchmarkResult(name),
            });
        }
    }

    return output;
}

export async function compareBenchmark(pkgA: string, pkgB: string) : Promise<boolean | BenchmarkCompareResult> {
    const resA = await readBenchmarkResult(pkgA);
    const resB = await readBenchmarkResult(pkgB);

    const result = autocannonCompare(resA, resB);
    if (result.equal) {
        return true;
    }

    if (result.aWins) {
        return {
            requestsDifference: result.requests.difference,
            latencyDifference: result.latency.difference,
            winner: {
                name: pkgA,
                requestsAverage: resA.requests.average,
                latencyAverage: resA.latency.average,
            },
            looser: {
                name: pkgB,
                requestsAverage: resB.requests.average,
                latencyAverage: resB.latency.average,
            },
        };
    }

    return {
        requestsDifference: result.requests.difference,
        latencyDifference: result.latency.difference,
        winner: {
            name: pkgB,
            requestsAverage: resB.requests.average,
            latencyAverage: resB.latency.average,
        },
        looser: {
            name: pkgA,
            requestsAverage: resA.requests.average,
            latencyAverage: resA.latency.average,
        },
    };
}
