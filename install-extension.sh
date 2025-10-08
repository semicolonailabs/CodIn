#!/bin/bash

echo "🚀 Installing CodIn Extension"
echo "============================"

# Method 1: Try to use VS Code if code command exists
if command -v code &> /dev/null; then
    echo "📦 Installing using code command..."
    code --install-extension codin-1.0.0.vsix --force
    if [ $? -eq 0 ]; then
        echo "✅ Extension installed successfully!"
        exit 0
    fi
fi

# Method 2: Try to open the VSIX file directly
echo "📦 Opening VSIX file with VS Code..."
open -a "Visual Studio Code" codin-1.0.0.vsix

echo ""
echo "🎯 Manual Installation Steps:"
echo "1. VS Code should open with the extension installer"
echo "2. Click 'Install' when prompted"
echo "3. If nothing happens, follow these steps:"
echo ""
echo "   a) Open VS Code"
echo "   b) Press Cmd+Shift+P"
echo "   c) Type 'Extensions: Install from VSIX'"
echo "   d) Select the codin-1.0.0.vsix file"
echo ""
echo "4. After installation:"
echo "   - Press Cmd+Shift+P"
echo "   - Type 'Developer: Reload Window'"
echo "   - Test by selecting code and right-clicking"
echo ""
echo "✨ The extension should now appear in your context menu!"
