# CodIn Extension Troubleshooting Guide

## Step-by-Step Testing Instructions

### 1. Check Extension Installation
Open VS Code and check if CodIn is installed:
- Press `Cmd+Shift+P` (or `Ctrl+Shift+P` on Windows/Linux)
- Type "Extensions: Show Installed Extensions"
- Look for "CodIn - AI Code Explainer" by semicolonailabs

### 2. Manual Extension Installation
If the extension is not installed:
```bash
# From the CodIn directory
code --install-extension codin-1.0.0.vsix --force
```

### 3. Test the "Explain Code" Feature

#### Method 1: Right-Click Menu
1. Open VS Code with the test workspace: `code /Users/sushivid/Desktop/CodIn/test-workspace`
2. Open the `bst.js` file
3. **SELECT some code** (this is crucial - the menu only appears when text is selected)
   - For example, select these lines:
   ```javascript
   insert(value) {
       const newNode = { value, left: null, right: null };
       
       if (this.root === null) {
           this.root = newNode;
           return;
       }
   }
   ```
4. **Right-click** on the selected text
5. Look for "Explain Code" in the context menu

#### Method 2: Command Palette
1. Select some code in any file
2. Press `Cmd+Shift+P` (or `Ctrl+Shift+P`)
3. Type "Explain Code"
4. Press Enter

### 4. Common Issues and Solutions

#### Issue: "Explain Code" option not visible
**Possible Causes:**
- No text is selected (the option only appears when text is selected)
- Extension is not activated
- Extension failed to install properly

**Solutions:**
1. **Ensure text is selected** - This is the most common issue!
2. Reload VS Code window: `Cmd+Shift+P` → "Developer: Reload Window"
3. Check VS Code console for errors: `Cmd+Shift+P` → "Developer: Toggle Developer Tools"

#### Issue: Extension not activating
**Solutions:**
1. Open a supported file type (.js, .py, .cpp, .java, etc.)
2. The extension should auto-activate when you open these files
3. Check VS Code Output panel: View → Output → Select "CodIn" from dropdown

#### Issue: API key errors
**Solutions:**
1. Ensure `.env` file exists in your workspace root
2. Verify API key format: `OPENAI_API_KEY=sk-your_key_here`
3. Check the API key is valid and has credits

### 5. Debug Mode Testing

#### Option A: Run in Extension Development Host
1. Open the CodIn extension project in VS Code
2. Press `F5` to launch Extension Development Host
3. In the new VS Code window, open your test files
4. Test the "Explain Code" functionality

#### Option B: Check Extension Output
1. In VS Code, go to View → Output
2. Select "Extensions" from the dropdown
3. Look for any error messages related to CodIn

### 6. Manual Command Testing
1. Open VS Code Developer Console: `Cmd+Option+I` (or `Ctrl+Shift+I`)
2. In Console tab, type:
   ```javascript
   vscode.commands.executeCommand('extension.explainCode')
   ```
3. This should trigger the command directly

### 7. File Requirements Checklist
- ✅ VS Code 1.70.0 or higher
- ✅ Workspace folder is open (not just individual files)
- ✅ `.env` file exists in workspace root
- ✅ Valid OpenAI API key in `.env` file
- ✅ Text is selected before right-clicking

## Expected Behavior

When working correctly:
1. Select code → Right-click → "Explain Code" appears in menu
2. Click "Explain Code" → Progress notification appears
3. New panel opens on the side with AI explanation
4. Panel shows selected code + AI-generated explanation

## Getting Help

If the extension still doesn't work:
1. Check VS Code version: Help → About
2. Check extension logs in Output panel
3. Try restarting VS Code completely
4. Verify the .vsix file was created properly (should be ~800KB)

## Quick Test Code Snippets

### JavaScript (bst.js)
```javascript
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```

### Python (factorial.py)  
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

Select any of these code blocks and test the right-click menu!
