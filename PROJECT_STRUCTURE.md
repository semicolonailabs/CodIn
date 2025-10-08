# Project Structure

This document describes the organization and structure of the CodIn VS Code extension project.

## 📁 **Root Directory Structure**

```
CodIn/
├── .github/                    # GitHub configuration
│   ├── ISSUE_TEMPLATE/         # Issue templates
│   │   ├── bug_report.yml      # Bug report template
│   │   └── feature_request.yml # Feature request template
│   └── workflows/              # GitHub Actions
│       ├── ci.yml              # Continuous integration
│       └── release.yml         # Release automation
├── .vscode/                    # VS Code workspace settings
├── landing-page/               # Marketing/landing page
├── node_modules/               # Dependencies (generated)
├── out/                        # Compiled output (generated)
├── src/                        # Source code
│   └── extension.ts            # Main extension entry point
├── .env.example                # Environment variables template
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── .vscodeignore               # VS Code packaging ignore
├── CHANGELOG.md                # Version history
├── CONTRIBUTING.md             # Contribution guidelines
├── LICENSE                     # MIT license
├── README.md                   # Main documentation
├── SECURITY.md                 # Security policy
├── package.json                # Node.js project configuration
└── tsconfig.json               # TypeScript configuration
```

## 📝 **File Descriptions**

### **Core Extension Files**

#### `src/extension.ts`
Main extension entry point containing:
- Extension activation and deactivation logic
- Command registration and implementations
- CodeLens and CodeAction providers
- API key management functions
- AI explanation logic with OpenAI integration
- Webview content generation
- Multi-language support

#### `package.json`
Extension manifest defining:
- Extension metadata (name, version, publisher)
- VS Code engine compatibility
- Command contributions and menus
- Activation events and categories
- Dependencies and scripts
- Marketplace information

#### `tsconfig.json`
TypeScript compiler configuration:
- Target ES2020 for modern JavaScript features
- CommonJS modules for Node.js compatibility
- Source maps for debugging
- Strict type checking enabled

### **Configuration Files**

#### `.eslintrc.json`
ESLint configuration for code quality:
- TypeScript-specific rules
- Best practices enforcement
- Code style consistency
- Import/export validations

#### `.vscodeignore`
Packaging exclusions:
- Source TypeScript files (only compiled JS included)
- Development and test files
- Documentation (except essential files)
- Node.js development dependencies

#### `.gitignore`
Version control exclusions:
- Node.js dependencies
- Compiled output
- Temporary and cache files
- Environment variables and secrets

### **Documentation Files**

#### `README.md`
Primary documentation including:
- Feature overview and screenshots
- Installation instructions
- Usage examples and tutorials
- Configuration options
- Troubleshooting guide

#### `CHANGELOG.md`
Version history with:
- Feature additions and improvements
- Bug fixes and security patches
- Breaking changes and migrations
- Release dates and version numbers

#### `CONTRIBUTING.md`
Developer guidelines covering:
- Development environment setup
- Code style and conventions
- Pull request process
- Testing requirements
- Issue reporting templates

#### `SECURITY.md`
Security policy detailing:
- Vulnerability reporting process
- Supported versions for security updates
- Security best practices for users
- Data privacy and protection measures

#### `LICENSE`
MIT license for open source usage

### **Development Files**

#### `.env.example`
Template for environment variables:
- OpenAI API key configuration
- Development settings
- Local testing parameters

#### GitHub Actions (`.github/workflows/`)
- **`ci.yml`**: Continuous integration pipeline
  - Multi-version Node.js testing
  - TypeScript compilation
  - Linting and code quality checks
  - Extension packaging
- **`release.yml`**: Automated release process
  - Version tagging
  - VSIX generation
  - GitHub release creation
  - Marketplace publishing

#### Issue Templates (`.github/ISSUE_TEMPLATE/`)
- **`bug_report.yml`**: Structured bug reporting
- **`feature_request.yml`**: Feature suggestion format

## 🏗️ **Build Process**

### **Development Workflow**
1. **Source**: Write TypeScript in `src/`
2. **Compile**: `npm run compile` → generates `out/extension.js`
3. **Package**: `npm run package` → creates `.vsix` file
4. **Test**: Install VSIX in VS Code for testing

### **Release Process**
1. **Version**: Update version in `package.json`
2. **Changelog**: Document changes in `CHANGELOG.md`
3. **Tag**: Create git tag (`v1.2.3`)
4. **Automate**: GitHub Actions handles building and publishing

## 🔧 **Key Technologies**

### **Core Stack**
- **TypeScript**: Primary programming language
- **Node.js**: Runtime environment
- **VS Code Extension API**: Platform integration

### **AI Integration**
- **OpenAI API**: GPT-3.5-turbo for code explanations
- **Fetch API**: HTTP client for API requests
- **VS Code Secret Storage**: Secure API key management

### **Development Tools**
- **ESLint**: Code linting and quality
- **TypeScript Compiler**: Code compilation
- **VSCE**: VS Code extension packaging
- **GitHub Actions**: CI/CD automation

## 📊 **Extension Architecture**

### **Activation Flow**
1. VS Code loads extension on startup (universal activation)
2. Commands registered in extension.ts
3. Providers registered for CodeLens and Quick Actions
4. Event listeners established for UI updates

### **User Interaction Flow**
1. User selects code in editor
2. CodeLens button appears above selection
3. User clicks button or uses context menu
4. Extension validates API key
5. Code sent to OpenAI API
6. Explanation displayed in webview panel

### **Security Architecture**
1. API keys stored in VS Code Secret Storage (encrypted)
2. No plain text storage of sensitive data
3. Minimal data transmission (selected code only)
4. HTTPS-only communication with OpenAI

## 🚀 **Deployment**

### **Local Installation**
```bash
code --install-extension codin-1.2.3.vsix
```

### **Marketplace Publishing**
```bash
vsce publish -p $PERSONAL_ACCESS_TOKEN
```

### **Automated Deployment**
- Push to `main` branch triggers CI/CD
- Successful builds auto-publish to marketplace
- Releases created automatically from git tags

This structure ensures maintainability, security, and ease of development while providing a professional user experience.
