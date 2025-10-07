import * as assert from 'assert';
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Extension should be present', () => {
        assert.ok(vscode.extensions.getExtension('semicolonailabs.codin'));
    });

    test('Extension should activate', async () => {
        const extension = vscode.extensions.getExtension('semicolonailabs.codin');
        assert.ok(extension);
        await extension!.activate();
        assert.strictEqual(extension!.isActive, true);
    });

    test('Command should be registered', async () => {
        const commands = await vscode.commands.getCommands(true);
        assert.ok(commands.includes('extension.explainCode'));
    });
});
