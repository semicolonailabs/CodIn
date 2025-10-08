# Contributing to CodIn

Thank you for your interest in contributing to CodIn! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- **Bug Reports**: Use GitHub Issues with the "bug" label
- **Feature Requests**: Use GitHub Issues with the "enhancement" label
- **Questions**: Use GitHub Discussions for general questions

### Development Setup

1. **Prerequisites**
   ```bash
   # Node.js 16+ and npm
   node --version  # Should be 16+
   npm --version
   
   # VS Code and VS Code Extension Development
   code --version
   ```

2. **Clone and Setup**
   ```bash
   git clone https://github.com/semicolonailabs/CodIn.git
   cd CodIn
   npm install
   ```

3. **Development Commands**
   ```bash
   # Compile TypeScript
   npm run compile
   
   # Watch mode for development
   npm run watch
   
   # Package extension
   vsce package
   
   # Publish to marketplace
   vsce publish
   ```

4. **Testing**
   ```bash
   # Install locally for testing
   code --install-extension codin-1.2.3.vsix
   
   # Test in VS Code Extension Development Host
   # Press F5 in VS Code with the project open
   ```

### Code Style

- **TypeScript**: Follow existing code style
- **Linting**: Use ESLint configuration provided
- **Formatting**: Use Prettier for consistent formatting
- **Comments**: Document complex logic and API interactions

### Pull Request Process

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR-USERNAME/CodIn.git
   cd CodIn
   git remote add upstream https://github.com/semicolonailabs/CodIn.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

3. **Make Changes**
   - Follow existing code patterns
   - Add/update tests if applicable
   - Update documentation if needed
   - Test thoroughly in VS Code

4. **Commit Guidelines**
   ```bash
   # Use conventional commit format
   git commit -m "feat: add new language support for Python"
   git commit -m "fix: resolve CodeLens activation issue"
   git commit -m "docs: update README with new features"
   ```

5. **Submit Pull Request**
   - Provide clear description of changes
   - Reference related issues
   - Include screenshots/demos for UI changes
   - Ensure all checks pass

### Development Guidelines

#### **Extension Structure**
```
src/
├── extension.ts          # Main extension entry point
├── commands/            # Command implementations
├── providers/           # CodeLens, CodeAction providers
├── utils/              # Utility functions
└── test/              # Test files
```

#### **Adding New Features**

1. **New Commands**
   ```typescript
   // 1. Register in package.json contributes.commands
   // 2. Implement in extension.ts
   // 3. Add to context.subscriptions
   ```

2. **New Languages**
   ```typescript
   // Add to SUPPORTED_LANGUAGES constant
   // Add language-specific instructions
   // Update documentation
   ```

3. **UI Components**
   ```typescript
   // Follow VS Code theming guidelines
   // Use semantic HTML in webviews
   // Ensure accessibility compliance
   ```

#### **Testing Guidelines**

1. **Manual Testing**
   - Test all command variants
   - Test different programming languages
   - Test API key management
   - Test error scenarios

2. **Automated Testing**
   ```bash
   # Run test suite (when available)
   npm test
   
   # Test extension activation
   # Use verification scripts in repository
   ```

### Security Considerations

- **API Keys**: Never commit actual API keys
- **User Data**: Minimize data collection and storage
- **Dependencies**: Keep dependencies up-to-date
- **Permissions**: Request minimal necessary permissions

### Performance Guidelines

- **Activation**: Use specific activation events when possible
- **Memory**: Clean up resources properly
- **Network**: Handle API rate limits gracefully
- **UI**: Don't block the main thread

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

## 📝 Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Follow GitHub Community Guidelines

## 🛠️ Development Tips

### **Debugging Extensions**
```typescript
// Use VS Code Developer Tools
console.log('Debug message');

// Access in VS Code: Help > Toggle Developer Tools
// Check Extension Development Host console
```

### **Common Issues**
- **Commands not registered**: Check package.json declarations
- **Extension not activating**: Verify activation events
- **API errors**: Check network connectivity and API keys
- **TypeScript errors**: Ensure proper type definitions

### **Useful Resources**
- [VS Code Extension API](https://code.visualstudio.com/api)
- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

## 📧 Contact

- **Maintainer**: SemicolonAI Labs
- **Email**: support@semicolonailabs.com
- **Issues**: [GitHub Issues](https://github.com/semicolonailabs/CodIn/issues)
- **Discussions**: [GitHub Discussions](https://github.com/semicolonailabs/CodIn/discussions)

Thank you for contributing to CodIn! 🎉
