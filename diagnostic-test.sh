#!/bin/bash

echo "🔍 CodIn Extension Diagnostic Test"
echo "================================="

# Check if VS Code is running
echo "1. Checking VS Code processes..."
ps aux | grep -i "visual studio code" | grep -v grep || echo "   ❌ VS Code not found in processes"

# Check if extension file exists
echo ""
echo "2. Checking extension package..."
if [ -f "codin-1.0.0.vsix" ]; then
    echo "   ✅ Extension package exists"
    echo "   📦 Size: $(ls -lh codin-1.0.0.vsix | awk '{print $5}')"
else
    echo "   ❌ Extension package not found"
fi

# Check .env file
echo ""
echo "3. Checking .env configuration..."
if [ -f "test-workspace/.env" ]; then
    echo "   ✅ .env file exists"
    if grep -q "sk-" "test-workspace/.env"; then
        echo "   ✅ API key appears to be set"
    else
        echo "   ❌ API key not found or invalid format"
    fi
else
    echo "   ❌ .env file missing"
fi

# Check compiled extension
echo ""
echo "4. Checking compiled files..."
if [ -f "out/extension.js" ]; then
    echo "   ✅ Extension compiled successfully"
else
    echo "   ❌ Extension not compiled"
fi

echo ""
echo "🛠️ MANUAL INSTALLATION STEPS:"
echo ""
echo "METHOD 1 - Drag & Drop:"
echo "1. Open VS Code Extensions panel (Cmd+Shift+X)"
echo "2. Drag codin-1.0.0.vsix file into VS Code window"
echo "3. Click 'Install' when prompted"
echo ""

echo "METHOD 2 - Command Line:"
echo "1. Open Terminal in this folder"
echo "2. Run: /Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code --install-extension codin-1.0.0.vsix --force"
echo ""

echo "METHOD 3 - From VS Code:"
echo "1. Press Cmd+Shift+P"
echo "2. Type 'Extensions: Install from VSIX'"
echo "3. Select codin-1.0.0.vsix file"
echo ""

echo "📋 AFTER INSTALLATION:"
echo "1. Reload VS Code window (Cmd+Shift+P → 'Developer: Reload Window')"
echo "2. Open test-workspace/factorial.py"
echo "3. SELECT the highlighted code you showed me"
echo "4. RIGHT-CLICK and look for 'CodIn: Explain Code'"
echo ""

echo "🚨 COMMON ISSUES:"
echo "- Make sure text is SELECTED (highlighted) before right-clicking"
echo "- Extension must be ENABLED in Extensions panel"
echo "- VS Code version must be 1.70.0 or higher"
