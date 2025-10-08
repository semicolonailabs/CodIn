#!/bin/bash

echo "🚀 CodIn Extension Installation Solution"
echo "======================================="

# Check if VS Code is running
if ! pgrep -x "Visual Studio Code" > /dev/null; then
    echo "❌ VS Code is not running. Please open VS Code first."
    exit 1
fi

echo "✅ VS Code is running"

# Try to install code command first
echo "🔧 Step 1: Setting up code command..."

# Method 1: Try to find VS Code in Applications
if [ -d "/Applications/Visual Studio Code.app" ]; then
    echo "📍 Found VS Code in /Applications"
    CODE_PATH="/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code"
elif [ -d "/System/Applications/Visual Studio Code.app" ]; then
    echo "📍 Found VS Code in /System/Applications"
    CODE_PATH="/System/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code"
else
    echo "⚠️  VS Code not found in standard locations"
    CODE_PATH=""
fi

# Try to install extension using found path
if [ -n "$CODE_PATH" ] && [ -f "$CODE_PATH" ]; then
    echo "🎯 Installing extension using: $CODE_PATH"
    "$CODE_PATH" --install-extension codin-1.0.0.vsix --force
    
    if [ $? -eq 0 ]; then
        echo "✅ Extension installed successfully!"
        echo "🔄 Please reload VS Code window (Cmd+Shift+P → 'Developer: Reload Window')"
        echo "🧪 Then test by selecting code and right-clicking for 'CodIn: Explain Code'"
        exit 0
    else
        echo "❌ Installation failed, trying alternative method..."
    fi
fi

# Alternative method: Open VSIX file directly
echo "🔄 Step 2: Opening VSIX file with VS Code..."
open -a "Visual Studio Code" codin-1.0.0.vsix

echo ""
echo "📋 Manual Installation Steps:"
echo "1. VS Code should show an extension installation dialog"
echo "2. Click 'Install' when prompted"
echo "3. If no dialog appears:"
echo "   a) Press Cmd+Shift+P in VS Code"
echo "   b) Type: Extensions: Install from VSIX"
echo "   c) Select: codin-1.0.0.vsix"
echo ""
echo "4. After installation:"
echo "   a) Press Cmd+Shift+P"
echo "   b) Type: Developer: Reload Window"
echo "   c) Test by selecting code and right-clicking"
echo ""
echo "🎉 Look for 'CodIn: Explain Code' in the context menu!"

