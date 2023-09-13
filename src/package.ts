import { fork } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { PACKAGES_DIRECTORY } from './constants';

export function spawnPackage(pkg: string) {
    const childProcess = fork(path.join(PACKAGES_DIRECTORY, `${pkg}.cjs`));

    return () => {
        childProcess.kill('SIGINT');
    };
}

export async function findPackages() {
    const files = await fs.promises.readdir(PACKAGES_DIRECTORY);

    return files.map((file) => {
        const ext = path.extname(file);
        return file.substring(0, file.length - ext.length);
    });
}
