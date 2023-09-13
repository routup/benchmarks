import cac from 'cac';
import { createCompareCommand } from './commands/compare';
import { createGenerateCommand } from './commands/generate';
import { createStatsCommand } from './commands/stats';

const cli = cac('benchmarks');

createCompareCommand(cli);
createGenerateCommand(cli);
createStatsCommand(cli);

cli.help();

cli.parse();
