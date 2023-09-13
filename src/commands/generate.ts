import type { CAC } from 'cac';
import consola from 'consola';
import { runBenchmark, saveBenchmarkResult } from '../benchmark';
import { findPackages, spawnPackage } from '../package';

type Options = {
    packages: string[],
    connections: number,
    pipelining: number,
    duration: number
};
export function createGenerateCommand(cac: CAC) {
    cac
        .command('generate [...packages]')
        .option('--connections [connections]', 'Amount of connections', {
            default: 100,
        })
        .option('--pipelining [pipelining]', 'Amount of pipelines', {
            default: 10,
        })
        .option('--duration [duration]', 'Eexecution duration', {
            default: 40,
        })
        .action(async (packages: string[], options: Options) => {
            if (packages.length === 0) {
                packages = await findPackages();
            }

            for (let i = 0; i < packages.length; i++) {
                consola.start(`Inspecting ${packages[i]}`);

                const kill = spawnPackage(packages[i]);
                consola.info('Warming up...');

                await runBenchmark({
                    duration: options.duration,
                    pipelining: options.pipelining,
                    connections: options.connections,
                });

                consola.success('Warmed up');

                consola.info('Executing...');
                const result = await runBenchmark({
                    duration: options.duration,
                    pipelining: options.pipelining,
                    connections: options.connections,
                });

                await saveBenchmarkResult(packages[i], result);

                consola.success(`Finished ${packages[i]}`);

                kill();
            }
        });
}
