import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import fetch from 'node-fetch';

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

export function activate(context: vscode.ExtensionContext) {
    // Register the explain code command
    let disposable = vscode.commands.registerCommand('extension.explainCode', async () => {
        // Get workspace folder
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('Please open a workspace folder to use CodIn.');
            return;
        }

        // Load environment variables from .env file
        const env = loadEnvFile(workspaceFolder);
        let apiKey = env.OPENAI_API_KEY;

        if (!apiKey) {
            // Show helpful message about .env file
            const action = await vscode.window.showErrorMessage(
                'OpenAI API key not found. Please create a .env file in your workspace root with your API key.',
                'Create .env file',
                'Learn more'
            );

            if (action === 'Create .env file') {
                // Create .env file from template
                const envPath = path.join(workspaceFolder, '.env');
                const envContent = `# OpenAI API Configuration
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here`;

                try {
                    fs.writeFileSync(envPath, envContent);
                    const doc = await vscode.workspace.openTextDocument(envPath);
                    await vscode.window.showTextDocument(doc);
                    vscode.window.showInformationMessage('Please replace "your_openai_api_key_here" with your actual API key from OpenAI.');
                } catch (error) {
                    vscode.window.showErrorMessage(`Failed to create .env file: ${error}`);
                }
            } else if (action === 'Learn more') {
                vscode.env.openExternal(vscode.Uri.parse('https://platform.openai.com/api-keys'));
            }
            return;
        }

        if (apiKey === 'your_openai_api_key_here' || apiKey === 'sk-test_replace_with_your_actual_key_here' || !apiKey.startsWith('sk-')) {
            vscode.window.showErrorMessage('Please set a valid OpenAI API key in your .env file. The key should start with "sk-".');
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
                const explanation = await getExplanation(code, apiKey!);
                progress.report({ increment: 100, message: "Complete!" });
                panel.webview.html = getWebviewContent(explanation, code);
            } catch (error: any) {
                console.error('Error explaining code:', error);
                vscode.window.showErrorMessage(`Error getting explanation: ${error.message}`);
                panel.webview.html = getErrorWebviewContent(error.message);
            }
        });
    });

    context.subscriptions.push(disposable);
}

async function getExplanation(code: string, apiKey: string): Promise<string> {
    const prompt = `Explain the following code snippet in simple, clear language. Focus on what the code does, how it works, and any important concepts:

\`\`\`
${code}
\`\`\`

Please provide a concise but thorough explanation.`;

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
                    content: "You are a helpful coding assistant that explains code clearly and concisely. Focus on functionality, purpose, and key concepts."
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

function getWebviewContent(explanation: string, code: string): string {
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
        </div>
        
        <h3>📝 Selected Code:</h3>
        <div class="code-block">${escapeHtml(code)}</div>
        
        <h3>💡 Explanation:</h3>
        <div class="explanation">
            ${explanation.replace(/\n/g, '<br>')}
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
