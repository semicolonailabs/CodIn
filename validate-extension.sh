#!/bin/bash

# CodIn Extension Validation Script
echo "🔍 CodIn VS Code Extension - Comprehensive Validation"
echo "=================================================="

# Check if extension is installed
echo -n "✅ Extension Installation: "
if code --list-extensions | grep -q "semicolonailabs.codin"; then
    echo "PASSED"
else
    echo "FAILED"
    exit 1
fi

# Check package structure
echo -n "📦 Package Structure: "
if [ -f "package.json" ] && [ -f "src/extension.ts" ] && [ -f "README.md" ] && [ -f "LICENSE" ]; then
    echo "PASSED"
else
    echo "FAILED"
    exit 1
fi

# Check compilation
echo -n "🔨 TypeScript Compilation: "
npm run compile > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "PASSED"
else
    echo "FAILED"
    exit 1
fi

# Check linting
echo -n "🧹 Code Linting: "
npm run lint > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "PASSED"
else
    echo "FAILED"
    exit 1
fi

# Check package creation
echo -n "📋 Package Creation: "
if [ -f "codin-1.0.0.vsix" ]; then
    echo "PASSED"
else
    echo "FAILED"
    exit 1
fi

# Check required files
echo -n "📄 Required Files: "
if [ -f ".env.example" ] && [ -f "CHANGELOG.md" ] && [ -f "SETUP.md" ]; then
    echo "PASSED"
else
    echo "FAILED"
    exit 1
fi

echo ""
echo "🎉 All validation checks PASSED!"
echo "✨ Extension is ready for professional use and publication!"
