import * as path from 'path';
import Mocha from 'mocha';
import * as fs from 'fs';

export function run(): Promise<void> {
    // Create the mocha test
    const mocha = new Mocha({
        ui: 'tdd',
        color: true
    });

    const testsRoot = path.resolve(__dirname, '..');

    return new Promise((resolve, reject) => {
        // Simple file discovery
        const testFiles = findTestFiles(testsRoot);
        
        // Add files to the test suite
        testFiles.forEach((f: string) => mocha.addFile(f));

        try {
            // Run the mocha test
            mocha.run((failures: number) => {
                if (failures > 0) {
                    reject(new Error(`${failures} tests failed.`));
                } else {
                    resolve();
                }
            });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
}

function findTestFiles(dir: string): string[] {
    const files: string[] = [];
    
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            
            if (entry.isDirectory()) {
                files.push(...findTestFiles(fullPath));
            } else if (entry.isFile() && entry.name.endsWith('.test.js')) {
                files.push(fullPath);
            }
        }
    } catch (err) {
        console.error('Error reading directory:', dir, err);
    }
    
    return files;
}
