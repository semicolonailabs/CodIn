const vscode = require('vscode');

function activate(context) {
    console.log('🔬 DEBUG EXTENSION: Starting activation...');
    
    // Test basic command registration
    const testCmd = vscode.commands.registerCommand('debug.testRegistration', () => {
        vscode.window.showInformationMessage('✅ Debug extension commands work!');
        console.log('✅ Debug command executed successfully');
    });

    // Check for CodIn commands
    const checkCmd = vscode.commands.registerCommand('debug.checkCodInCommands', async () => {
        try {
            console.log('🔍 Checking for CodIn commands...');
            
            const allCommands = await vscode.commands.getCommands();
            const codinCommands = allCommands.filter(cmd => cmd.includes('extension.'));
            
            console.log('📋 All extension.* commands found:', codinCommands);
            
            const expectedCommands = [
                'extension.explainCode',
                'extension.setApiKey',
                'extension.removeApiKey',
                'extension.checkApiKey',
                'extension.selectLanguage'
            ];
            
            const foundCommands = expectedCommands.filter(cmd => allCommands.includes(cmd));
            const missingCommands = expectedCommands.filter(cmd => !allCommands.includes(cmd));
            
            const message = `Found CodIn Commands: ${foundCommands.length}/5
Found: ${foundCommands.join(', ')}
Missing: ${missingCommands.join(', ')}`;
            
            vscode.window.showInformationMessage(message);
            console.log('📊 CodIn Command Analysis:', {
                found: foundCommands,
                missing: missingCommands,
                total: allCommands.length
            });
            
        } catch (error) {
            console.error('❌ Error checking commands:', error);
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    });

    // Try to force activate CodIn
    const activateCmd = vscode.commands.registerCommand('debug.activateCodIn', async () => {
        try {
            console.log('🔄 Attempting to find and activate CodIn extension...');
            
            const codinExtension = vscode.extensions.all.find(ext => 
                ext.id.includes('codin') || 
                ext.packageJSON?.name === 'codin' ||
                ext.packageJSON?.displayName?.includes('CodIn')
            );
            
            if (!codinExtension) {
                const msg = '❌ CodIn extension not found in extensions list';
                console.log(msg);
                vscode.window.showErrorMessage(msg);
                
                // List all extensions for debugging
                console.log('📦 All installed extensions:');
                vscode.extensions.all.forEach(ext => {
                    console.log(`  - ${ext.id} (${ext.packageJSON?.displayName || ext.packageJSON?.name})`);
                });
                return;
            }
            
            console.log(`✅ Found CodIn extension: ${codinExtension.id}`);
            console.log(`   Active: ${codinExtension.isActive}`);
            console.log(`   Package: ${JSON.stringify(codinExtension.packageJSON, null, 2)}`);
            
            if (!codinExtension.isActive) {
                console.log('🔄 Activating CodIn extension...');
                await codinExtension.activate();
                console.log('✅ CodIn extension activated');
            }
            
            // Check commands again after activation
            setTimeout(async () => {
                const commands = await vscode.commands.getCommands();
                const codinCmds = commands.filter(cmd => cmd.startsWith('extension.'));
                console.log('📋 Commands after activation:', codinCmds);
                
                vscode.window.showInformationMessage(
                    `CodIn Extension: ${codinExtension.isActive ? 'Active' : 'Inactive'}
Commands found: ${codinCmds.length}`
                );
            }, 1000);
            
        } catch (error) {
            console.error('❌ Error activating CodIn:', error);
            vscode.window.showErrorMessage(`Activation error: ${error.message}`);
        }
    });

    context.subscriptions.push(testCmd, checkCmd, activateCmd);
    
    console.log('🔬 DEBUG EXTENSION: Activation complete');
    console.log('📋 Available debug commands:');
    console.log('  - Debug: Test Command Registration');
    console.log('  - Debug: Check CodIn Commands');
    console.log('  - Debug: Force Activate CodIn');
    
    // Auto-check for CodIn after 2 seconds
    setTimeout(async () => {
        console.log('🔍 Auto-checking for CodIn extension...');
        const codinExt = vscode.extensions.all.find(ext => ext.id.includes('codin'));
        if (codinExt) {
            console.log(`📦 CodIn found: ${codinExt.id}, Active: ${codinExt.isActive}`);
        } else {
            console.log('❌ CodIn extension not found in auto-check');
        }
    }, 2000);
}

function deactivate() {
    console.log('🔬 DEBUG EXTENSION: Deactivated');
}

module.exports = {
    activate,
    deactivate
};
