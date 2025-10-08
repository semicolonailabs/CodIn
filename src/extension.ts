import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import fetch from 'node-fetch';

// Constants
const API_KEY_SECRET_KEY = 'codin.openai.apikey';

// Supported languages with their display names and prompts
const SUPPORTED_LANGUAGES = {
    'English': 'English',
    'Bengali': 'Bengali (বাংলা)',
    'Melayu': 'Malay (Bahasa Melayu)',
    'Arabic': 'Arabic (العربية)',
    'Spanish': 'Spanish (Español)',
    'French': 'French (Français)',
    'German': 'German (Deutsch)',
    'Hindi': 'Hindi (हिंदी)',
    'Chinese (Simplified)': 'Chinese Simplified (简体中文)',
    'Japanese': 'Japanese (日本語)',
    'Korean': 'Korean (한국어)',
    'Portuguese': 'Portuguese (Português)',
    'Russian': 'Russian (Русский)',
    'Italian': 'Italian (Italiano)',
    'Dutch': 'Dutch (Nederlands)'
};

// Load environment variables
function loadEnvFile(workspaceFolder: string): { [key: string]: string } {
    const envPath = path.join(workspaceFolder, '.env');
    const env: { [key: string]: string } = {};
    
    try {
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            const lines = envContent.split('\n');
            
            for (const line of lines) {
                const trimmedLine = line.trim();
                if (trimmedLine && !trimmedLine.startsWith('#')) {
                    const [key, ...valueParts] = trimmedLine.split('=');
                    if (key && valueParts.length > 0) {
                        env[key.trim()] = valueParts.join('=').trim();
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error reading .env file:', error);
    }
    
    return env;
}

// CodeAction Provider for floating "Explain Code" button
class CodInCodeActionProvider implements vscode.CodeActionProvider {
    provideCodeActions(
        _document: vscode.TextDocument,
        _range: vscode.Range | vscode.Selection,
        _context: vscode.CodeActionContext,
        _token: vscode.CancellationToken
    ): vscode.CodeAction[] | undefined {
        
        // Only show action if there's a selection
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.selection.isEmpty) {
            return undefined;
        }

        // Get current language preference
        const config = vscode.workspace.getConfiguration('codin');
        const currentLanguage = config.get<string>('explanationLanguage', 'English');
        
        // Create the "Explain Code" action with language info
        const explainAction = new vscode.CodeAction(`💡 Explain Code (${currentLanguage})`, vscode.CodeActionKind.QuickFix);
        explainAction.command = {
            title: 'Explain Code',
            command: 'extension.explainCode'
        };

        // Create "Select Language" action
        const selectLanguageAction = new vscode.CodeAction('🌍 Select Explanation Language', vscode.CodeActionKind.QuickFix);
        selectLanguageAction.command = {
            title: 'Select Language',
            command: 'extension.selectLanguage'
        };

        // Make explain action preferred so it appears first
        explainAction.isPreferred = true;

        return [explainAction, selectLanguageAction];
    }
}

// CodeLens Provider for inline "Explain Code" button
class CodInCodeLensProvider implements vscode.CodeLensProvider {
    private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

    provideCodeLenses(document: vscode.TextDocument, _token: vscode.CancellationToken): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document !== document || editor.selection.isEmpty) {
            return [];
        }

        // Create a CodeLens at the start of the selection
        const selectionStart = editor.selection.start;
        const range = new vscode.Range(selectionStart, selectionStart);
        
        // Get current language preference
        const config = vscode.workspace.getConfiguration('codin');
        const currentLanguage = config.get<string>('explanationLanguage', 'English');
        
        const codeLens = new vscode.CodeLens(range);
        codeLens.command = {
            title: `🤖 Explain Code (${currentLanguage})`,
            command: 'extension.explainCode'
        };

        return [codeLens];
    }

    refresh(): void {
        this._onDidChangeCodeLenses.fire();
    }
}

// Helper function to get API key from secure storage
async function getApiKey(context: vscode.ExtensionContext): Promise<string | undefined> {
    const apiKey = await context.secrets.get(API_KEY_SECRET_KEY);
    return apiKey;
}

// Helper function to set API key in secure storage
async function setApiKey(context: vscode.ExtensionContext, apiKey: string): Promise<void> {
    await context.secrets.store(API_KEY_SECRET_KEY, apiKey);
}

// Helper function to remove API key from secure storage
async function removeApiKey(context: vscode.ExtensionContext): Promise<void> {
    await context.secrets.delete(API_KEY_SECRET_KEY);
}

// Helper function to validate API key format
function validateApiKey(apiKey: string): boolean {
    return !!(apiKey && apiKey.trim().length > 0 && apiKey.startsWith('sk-'));
}

export function activate(context: vscode.ExtensionContext) {
    // Create CodeLens provider instance
    const codeLensProvider = new CodInCodeLensProvider();

    // Register the CodeAction provider for all file types
    const codeActionProvider = vscode.languages.registerCodeActionsProvider(
        { scheme: 'file' }, // Works for all file types
        new CodInCodeActionProvider(),
        {
            providedCodeActionKinds: [vscode.CodeActionKind.QuickFix, vscode.CodeActionKind.Empty]
        }
    );

    // Register CodeLens provider for all file types
    const codeLensProviderDisposable = vscode.languages.registerCodeLensProvider(
        { scheme: 'file' },
        codeLensProvider
    );

    // Listen for selection changes to refresh CodeLens
    const selectionChangeListener = vscode.window.onDidChangeTextEditorSelection(() => {
        codeLensProvider.refresh();
    });

    // Register API key setup command
    const setApiKeyDisposable = vscode.commands.registerCommand('extension.setApiKey', async () => {
        const apiKey = await vscode.window.showInputBox({
            prompt: 'Enter your OpenAI API Key',
            placeHolder: 'sk-...',
            password: true, // Masks the input for security
            ignoreFocusOut: true,
            validateInput: (value: string) => {
                if (!value || value.trim().length === 0) {
                    return 'API key cannot be empty';
                }
                if (!value.startsWith('sk-')) {
                    return 'OpenAI API keys must start with "sk-"';
                }
                if (value.length < 20) {
                    return 'API key appears to be too short';
                }
                return undefined; // Valid
            }
        });

        if (apiKey) {
            try {
                await setApiKey(context, apiKey.trim());
                vscode.window.showInformationMessage(
                    '✅ OpenAI API Key saved successfully!',
                    'Test with Code'
                ).then((action) => {
                    if (action === 'Test with Code') {
                        vscode.commands.executeCommand('extension.explainCode');
                    }
                });
            } catch (error) {
                vscode.window.showErrorMessage(`❌ Failed to save API key: ${error}`);
            }
        }
    });

    // Register API key removal command
    const removeApiKeyDisposable = vscode.commands.registerCommand('extension.removeApiKey', async () => {
        const currentKey = await getApiKey(context);
        
        if (!currentKey) {
            vscode.window.showInformationMessage('ℹ️ No API key is currently stored.');
            return;
        }

        const confirm = await vscode.window.showWarningMessage(
            'Are you sure you want to remove the stored OpenAI API key?',
            { modal: true },
            'Remove Key'
        );

        if (confirm === 'Remove Key') {
            try {
                await removeApiKey(context);
                vscode.window.showInformationMessage('✅ OpenAI API Key removed successfully!');
            } catch (error) {
                vscode.window.showErrorMessage(`❌ Failed to remove API key: ${error}`);
            }
        }
    });

    // Register API key check command
    const checkApiKeyDisposable = vscode.commands.registerCommand('extension.checkApiKey', async () => {
        const apiKey = await getApiKey(context);
        
        if (apiKey) {
            const maskedKey = apiKey.substring(0, 7) + '...' + apiKey.substring(apiKey.length - 4);
            vscode.window.showInformationMessage(
                `✅ API Key Status: Connected\n🔑 Key: ${maskedKey}`,
                'Test Connection',
                'Remove Key'
            ).then((action) => {
                if (action === 'Test Connection') {
                    vscode.commands.executeCommand('extension.explainCode');
                } else if (action === 'Remove Key') {
                    vscode.commands.executeCommand('extension.removeApiKey');
                }
            });
        } else {
            vscode.window.showWarningMessage(
                '⚠️ No API Key Found\nPlease set your OpenAI API key to use CodIn.',
                'Set API Key',
                'Learn More'
            ).then((action) => {
                if (action === 'Set API Key') {
                    vscode.commands.executeCommand('extension.setApiKey');
                } else if (action === 'Learn More') {
                    vscode.env.openExternal(vscode.Uri.parse('https://platform.openai.com/api-keys'));
                }
            });
        }
    });

    // Register language selection command
    const selectLanguageDisposable = vscode.commands.registerCommand('extension.selectLanguage', async () => {
        const languageOptions = Object.entries(SUPPORTED_LANGUAGES).map(([key, display]) => ({
            label: display,
            description: key === vscode.workspace.getConfiguration('codin').get('explanationLanguage') ? '(Current)' : '',
            value: key
        }));

        const selected = await vscode.window.showQuickPick(languageOptions, {
            placeHolder: 'Select your preferred language for code explanations',
            matchOnDescription: true,
            matchOnDetail: true
        });

        if (selected) {
            const config = vscode.workspace.getConfiguration('codin');
            await config.update('explanationLanguage', selected.value, vscode.ConfigurationTarget.Global);
            
            // Refresh CodeLens to show new language
            codeLensProvider.refresh();
            
            vscode.window.showInformationMessage(
                `Code explanations will now be generated in ${selected.label}`,
                'Test with Code'
            ).then((action) => {
                if (action === 'Test with Code') {
                    vscode.commands.executeCommand('extension.explainCode');
                }
            });
        }
    });

    // Register the explain code command
    let disposable = vscode.commands.registerCommand('extension.explainCode', async () => {
        // Get API key from secure storage
        let apiKey = await getApiKey(context);

        // Fallback: Try to get from .env file if not in secure storage (backward compatibility)
        if (!apiKey) {
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
            if (workspaceFolder) {
                const env = loadEnvFile(workspaceFolder);
                apiKey = env.OPENAI_API_KEY;
                
                // If found in .env, offer to migrate to secure storage
                if (apiKey && validateApiKey(apiKey)) {
                    const migrate = await vscode.window.showInformationMessage(
                        'Found API key in .env file. Would you like to migrate to secure storage?',
                        'Yes, Migrate',
                        'Keep .env',
                        'Not Now'
                    );
                    
                    if (migrate === 'Yes, Migrate') {
                        await setApiKey(context, apiKey);
                        vscode.window.showInformationMessage('✅ API key migrated to secure storage!');
                    }
                }
            }
        }

        if (!apiKey) {
            const action = await vscode.window.showErrorMessage(
                'OpenAI API key not found. Please set your API key to use CodIn.',
                'Set API Key',
                'Learn More'
            );

            if (action === 'Set API Key') {
                await vscode.commands.executeCommand('extension.setApiKey');
            } else if (action === 'Learn More') {
                vscode.env.openExternal(vscode.Uri.parse('https://platform.openai.com/api-keys'));
            }
            return;
        }

        if (!validateApiKey(apiKey)) {
            const action = await vscode.window.showErrorMessage(
                'Invalid API key format. OpenAI API keys must start with "sk-".',
                'Set New Key',
                'Check Key Status'
            );
            
            if (action === 'Set New Key') {
                await vscode.commands.executeCommand('extension.setApiKey');
            } else if (action === 'Check Key Status') {
                await vscode.commands.executeCommand('extension.checkApiKey');
            }
            return;
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active editor found.');
            return;
        }

        const selection = editor.selection;
        const code = editor.document.getText(selection);

        if (!code || code.trim() === '') {
            vscode.window.showInformationMessage('No code selected. Please select some code to explain.');
            return;
        }

        // Show progress indicator
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Explaining code...",
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 0, message: "Generating explanation..." });

            const panel = vscode.window.createWebviewPanel(
                'codeExplanation',
                'Code Explanation',
                vscode.ViewColumn.Beside,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true
                }
            );

            panel.webview.html = getLoadingWebviewContent();

            try {
                progress.report({ increment: 50, message: "Getting AI response..." });
                
                // Get current language preference
                const config = vscode.workspace.getConfiguration('codin');
                const selectedLanguage = config.get<string>('explanationLanguage', 'English');
                
                const explanation = await getExplanation(code, apiKey!, selectedLanguage);
                progress.report({ increment: 100, message: "Complete!" });
                panel.webview.html = getWebviewContent(explanation, code, selectedLanguage);
            } catch (error: any) {
                console.error('Error explaining code:', error);
                vscode.window.showErrorMessage(`Error getting explanation: ${error.message}`);
                panel.webview.html = getErrorWebviewContent(error.message);
            }
        });
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(setApiKeyDisposable);
    context.subscriptions.push(removeApiKeyDisposable);
    context.subscriptions.push(checkApiKeyDisposable);
    context.subscriptions.push(selectLanguageDisposable);
    context.subscriptions.push(codeActionProvider);
    context.subscriptions.push(codeLensProviderDisposable);
    context.subscriptions.push(selectionChangeListener);
}

// Helper function to get language-specific instructions for AI
function getLanguageInstructions(language: string): string {
    const instructions: { [key: string]: string } = {
        'English': 'You are a helpful coding assistant that explains code clearly and concisely in English.',
        'Bengali': 'আপনি একজন সহায়ক কোডিং সহায়ক যিনি বাংলায় স্পষ্ট এবং সংক্ষিপ্তভাবে কোড ব্যাখ্যা করেন।',
        'Melayu': 'Anda adalah pembantu pengekodan yang membantu menjelaskan kod dengan jelas dan ringkas dalam Bahasa Melayu.',
        'Arabic': 'أنت مساعد برمجة مفيد يشرح الكود بوضوح وإيجاز باللغة العربية.',
        'Spanish': 'Eres un asistente de programación útil que explica el código de manera clara y concisa en español.',
        'French': 'Vous êtes un assistant de codage utile qui explique le code clairement et de manière concise en français.',
        'German': 'Du bist ein hilfreicher Coding-Assistent, der Code klar und prägnant auf Deutsch erklärt.',
        'Hindi': 'आप एक सहायक कोडिंग सहायक हैं जो हिंदी में स्पष्ट और संक्षिप्त रूप से कोड समझाते हैं।',
        'Chinese (Simplified)': '你是一个有用的编程助手，用简体中文清晰简洁地解释代码。',
        'Japanese': 'あなたは日本語でコードを明確かつ簡潔に説明する有用なコーディングアシスタントです。',
        'Korean': '당신은 한국어로 코드를 명확하고 간결하게 설명하는 유용한 코딩 도우미입니다.',
        'Portuguese': 'Você é um assistente de codificação útil que explica o código de forma clara e concisa em português.',
        'Russian': 'Вы полезный помощник по программированию, который ясно и кратко объясняет код на русском языке.',
        'Italian': 'Sei un assistente di codifica utile che spiega il codice chiaramente e concisamente in italiano.',
        'Dutch': 'Je bent een nuttige codeerassistent die code duidelijk en beknopt uitlegt in het Nederlands.'
    };

    return instructions[language] || instructions['English'];
}

async function getExplanation(code: string, apiKey: string, language: string = 'English'): Promise<string> {
    const languageInstructions = getLanguageInstructions(language);
    
    const prompt = `${languageInstructions}

Explain the following code snippet in simple, clear language. Focus on what the code does, how it works, and any important concepts:

\`\`\`
${code}
\`\`\`

Please provide a concise but thorough explanation in ${language}.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: languageInstructions + " Focus on functionality, purpose, and key concepts."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 500,
            temperature: 0.3,
        }),
    });

    if (!response.ok) {
        let errorMessage = 'Unknown error';
        try {
            const errorData = await response.json();
            errorMessage = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
        } catch {
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(`OpenAI API error: ${errorMessage}`);
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
        throw new Error('No explanation generated by OpenAI');
    }
    
    return data.choices[0].message.content.trim();
}

function getWebviewContent(explanation: string, code: string, language: string = 'English'): string {
    const config = vscode.workspace.getConfiguration('codin');
    const showLanguage = config.get<boolean>('showLanguageInPopup', true);
    const languageDisplay = (SUPPORTED_LANGUAGES as any)[language] || language;
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Code Explanation</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                padding: 20px;
                line-height: 1.6;
                color: var(--vscode-foreground);
                background-color: var(--vscode-editor-background);
            }
            .header {
                border-bottom: 1px solid var(--vscode-panel-border);
                padding-bottom: 15px;
                margin-bottom: 20px;
            }
            .code-block {
                background-color: var(--vscode-textBlockQuote-background);
                border: 1px solid var(--vscode-panel-border);
                border-radius: 6px;
                padding: 12px;
                margin: 10px 0;
                font-family: 'Courier New', Consolas, 'Liberation Mono', Menlo, monospace;
                font-size: 13px;
                white-space: pre-wrap;
                word-wrap: break-word;
                overflow-x: auto;
            }
            .explanation {
                background-color: var(--vscode-editor-background);
                padding: 15px;
                border-radius: 6px;
                border-left: 4px solid var(--vscode-focusBorder);
                margin-top: 15px;
            }
            h2 {
                margin-top: 0;
                color: var(--vscode-foreground);
                font-size: 18px;
            }
            h3 {
                color: var(--vscode-foreground);
                font-size: 16px;
                margin-bottom: 10px;
            }
            .loading {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 200px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>🤖 Code Explanation</h2>
            ${showLanguage ? `<div style="font-size: 14px; color: var(--vscode-descriptionForeground); margin-top: 5px;">
                🌍 Language: ${languageDisplay}
            </div>` : ''}
        </div>
        
        <h3>📝 Selected Code:</h3>
        <div class="code-block">${escapeHtml(code)}</div>
        
        <h3>💡 Explanation:</h3>
        <div class="explanation">
            ${explanation.replace(/\n/g, '<br>')}
        </div>
        
        <div style="margin-top: 20px; padding: 10px; background-color: var(--vscode-textBlockQuote-background); border-radius: 4px; font-size: 12px; color: var(--vscode-descriptionForeground);">
            💡 <strong>Quick Commands:</strong><br>
            • Different language? <strong>Cmd+Shift+P</strong> → <strong>"CodIn: Select Explanation Language"</strong><br>
            • Manage API key? <strong>Cmd+Shift+P</strong> → <strong>"CodIn: Set OpenAI API Key"</strong>
        </div>
    </body>
    </html>`;
}

function getLoadingWebviewContent(): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Code Explanation</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                padding: 20px;
                color: var(--vscode-foreground);
                background-color: var(--vscode-editor-background);
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 200px;
                flex-direction: column;
            }
            .spinner {
                border: 3px solid var(--vscode-panel-border);
                border-top: 3px solid var(--vscode-focusBorder);
                border-radius: 50%;
                width: 30px;
                height: 30px;
                animation: spin 1s linear infinite;
                margin-bottom: 15px;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    </head>
    <body>
        <div class="spinner"></div>
        <p>Analyzing your code and generating explanation...</p>
    </body>
    </html>`;
}

function getErrorWebviewContent(errorMessage: string): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Code Explanation</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                padding: 20px;
                color: var(--vscode-foreground);
                background-color: var(--vscode-editor-background);
            }
            .error {
                background-color: var(--vscode-inputValidation-errorBackground);
                border: 1px solid var(--vscode-inputValidation-errorBorder);
                border-radius: 6px;
                padding: 15px;
                margin: 15px 0;
            }
            .retry-button {
                background-color: var(--vscode-button-background);
                color: var(--vscode-button-foreground);
                border: none;
                padding: 10px 15px;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <h2>❌ Error</h2>
        <div class="error">
            <strong>Failed to generate explanation:</strong><br>
            ${escapeHtml(errorMessage)}
        </div>
        <p>Please try again or check your API key configuration.</p>
    </body>
    </html>`;
}

function escapeHtml(unsafe: string): string {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export function deactivate() {}
