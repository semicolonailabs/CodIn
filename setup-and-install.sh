#!/bin/bash

echo "🔧 Setting up VS Code Shell Command & Installing Extension"
echo "========================================================="

# Method 1: Install VS Code shell command
echo ""
echo "📋 STEP 1: Install VS Code Shell Command"
echo "1. Open VS Code"
echo "2. Press Cmd+Shift+P (Command Palette)"
echo "3. Type: 'Shell Command: Install code command in PATH'"
echo "4. Press Enter"
echo "5. You may need to enter your password"
echo ""

# Method 2: Manual symlink creation
echo "🔗 STEP 2: Or create manual symlink (if step 1 doesn't work)"
echo "Run this command in terminal:"
echo 'sudo ln -sf "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" /usr/local/bin/code'
echo ""

# Method 3: Alternative installation methods
echo "📦 STEP 3: Install Extension (choose one method)"
echo ""
echo "METHOD A - Drag & Drop (EASIEST):"
echo "1. Open VS Code"
echo "2. Open Extensions panel (Cmd+Shift+X)"
echo "3. Drag codin-1.0.0.vsix file into VS Code"
echo "4. Click Install"
echo ""
echo "METHOD B - From Command Palette:"
echo "1. Open VS Code"
echo "2. Press Cmd+Shift+P"
echo "3. Type: Extensions: Install from VSIX"
echo "4. Select codin-1.0.0.vsix file"
echo ""
echo "METHOD C - Terminal (after fixing code command):"
echo "code --install-extension codin-1.0.0.vsix"
echo ""

echo "🧪 STEP 4: Test the Extension"
echo "1. Reload VS Code (Cmd+Shift+P → Developer: Reload Window)"
echo "2. Open test-workspace/factorial.py"
echo "3. SELECT some code (highlight it)"
echo "4. RIGHT-CLICK → look for 'CodIn: Explain Code'"
echo ""

echo "✅ The extension will create a side panel with AI explanations!"
