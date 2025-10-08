// Quick diagnostic script to check VS Code CodeLens settings
// Run this in VS Code's Developer Console (Cmd+Option+I)

console.log('🔍 CodIn Extension Diagnostics');
console.log('================================');

// Check if extension is loaded
const extension = vscode.extensions.getExtension('semicolonailabs.codin');
console.log('Extension loaded:', extension ? '✅ YES' : '❌ NO');

if (extension) {
    console.log('Extension active:', extension.isActive ? '✅ YES' : '❌ NO');
    console.log('Extension version:', extension.packageJSON.version);
}

// Check VS Code settings
const config = vscode.workspace.getConfiguration();
const codeLensEnabled = config.get('editor.codeLens');
console.log('VS Code CodeLens enabled:', codeLensEnabled ? '✅ YES' : '❌ NO');

const codinConfig = config.get('codin');
console.log('CodIn settings:', codinConfig);

// Check active editor
const editor = vscode.window.activeTextEditor;
console.log('Active editor:', editor ? '✅ YES' : '❌ NO');

if (editor) {
    console.log('File type:', editor.document.languageId);
    console.log('Has selection:', !editor.selection.isEmpty ? '✅ YES' : '❌ NO');
    
    if (!editor.selection.isEmpty) {
        const selectedText = editor.document.getText(editor.selection);
        console.log('Selected text length:', selectedText.length);
        console.log('Selected text preview:', selectedText.substring(0, 50) + '...');
    }
}

console.log('\n💡 To test:');
console.log('1. Select some code in a file');
console.log('2. Look for floating "🤖 Explain Code" button above selection');
console.log('3. If not visible, check if editor.codeLens is enabled in settings');
