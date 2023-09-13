import type { CAC } from 'cac';
import fs from 'node:fs';
import { readBenchmarkResults } from '../benchmark';
import { createMarkdownForBenchmarkResults } from '../markdown';

export function createStatsCommand(cac: CAC) {
    cac
        .command('stats [...packages]')
        .action(async (packages: string[]) => {
            const results = await readBenchmarkResults(packages);

            const md = createMarkdownForBenchmarkResults(results);
            const content = await fs.promises.readFile('README.md', { encoding: 'utf-8' });
            const [head] = content.split('## Benchmarks');
            await fs.promises.writeFile('README.md', head + md, { encoding: 'utf-8' });
        });
}
