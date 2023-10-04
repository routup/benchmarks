<div align="center">

[![Routup banner](./.github/assets/banner.png)](https://routup.net)

</div>

# Routup 🧙‍

[![npm version](https://badge.fury.io/js/routup.svg)](https://badge.fury.io/js/routup)
[![main](https://github.com/Tada5hi/routup/actions/workflows/main.yml/badge.svg)](https://github.com/Tada5hi/routup/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/tada5hi/routup/branch/master/graph/badge.svg?token=CLIA667K6V)](https://codecov.io/gh/tada5hi/routup)
[![Known Vulnerabilities](https://snyk.io/test/github/Tada5hi/routup/badge.svg)](https://snyk.io/test/github/Tada5hi/routup)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

## Usage

```shell
git clone https://github.com/routup/benchmarks
cd benchmarks
```

## Generate

Generate results

```shell
npm run cli generate
```

### Compare

Compare two generated results

```shell
npm run cli compare <pkg1> <pkg2>
```

### Stats

Save all generated results to README.md

```shell
npm run cli stats
```

## Benchmarks 

* CPUs:  `24`
* RAM:  `63.9GB`
* Node: `v18.18.0`
* Date:  `Wed Oct 04 2023 19:39:17 GMT+0200 (Mitteleuropäische Sommerzeit) `
* Method: `autocannon -c 100 -d 40 -p 10 localhost:3000` (two rounds; one to warm-up, one to measure)

| Package | Requests/s | Latency (ms) | Throughput/MB |
| :------ | :--------: | -----------: | ------------: |
| http    |    61062   |        15.87 |         10.89 |
| fastify |    59679   |        16.26 |         10.70 |
| koa     |    45763   |        21.35 |          8.16 |
| routup  |    44588   |        21.91 |          9.02 |
| hapi    |    41374   |        23.67 |          7.38 |
| express |    13376   |        74.18 |          2.39 |
