import type { CAC } from 'cac';
import consola from 'consola';
import chalk from 'chalk';
import { compareBenchmark } from '../benchmark';

export function createCompareCommand(cac: CAC) {
    cac
        .command('compare [...packages]')
        .action(async (packages: string[]) => {
            if (packages.length !== 2) {
                consola.warn('Pick 2 packages by name to compare');
            }

            const [pkgA, pkgB] = packages;

            const result = await compareBenchmark(pkgA, pkgB);

            if (typeof result === 'boolean') {
                consola.log(chalk.green.bold(`${pkgA} and ${pkgB} are equally fast!`));
                return;
            }

            const winnerName = chalk.bold.yellow(result.winner.name);
            const winnerRequestsAverage = chalk.green(result.winner.requestsAverage);
            const looserName = chalk.bold.yellow(result.looser.name);
            const looserRequestsAverage = chalk.green(result.looser.requestsAverage);
            const requestsDifference = chalk.bold.green(result.requestsDifference);

            const requestAverageText = chalk.blue('request average is');

            consola.log(` ${winnerName} ${chalk.blue('is')} ${requestsDifference} ${chalk.blue('faster than')} ${looserName}
 • ${winnerName} ${requestAverageText} ${winnerRequestsAverage}
 • ${looserName} ${requestAverageText} ${looserRequestsAverage}`);
        });
}
