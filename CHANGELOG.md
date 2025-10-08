# Changelog

All notable changes to the CodIn extension will be documented in this file.

## [1.2.0] - 2025-10-08

### 🔐 Added - Secure API Key Management
- **Command Palette API Key Setup**: `CodIn: Set OpenAI API Key`
- **VS Code Secret Storage**: Encrypted, secure API key storage
- **Password-Masked Input**: Keys never visible during entry
- **API Key Management Commands**:
  - `CodIn: Set OpenAI API Key` - Secure setup
  - `CodIn: Remove OpenAI API Key` - Safe removal
  - `CodIn: Check API Key Status` - Connection verification
- **Auto-Migration**: Seamless upgrade from .env files
- **Real-time Validation**: Ensures proper OpenAI key format

### 🛡️ Security Improvements
- Eliminated plain text API key storage
- Cross-platform encrypted storage via VS Code APIs
- Automatic cleanup on extension uninstall
- No file permissions or folder access required

### 🎨 Enhanced User Experience
- VS Code standard notifications and dialogs
- Action buttons for quick next steps
- Clear error messages with solutions
- One-click testing from status commands

## [1.1.0] - 2025-10-08

### 🌍 Added - Multi-Language Support
- **15 Languages Supported**: English, Bengali, Arabic, Spanish, French, German, Hindi, Chinese, Japanese, Korean, Portuguese, Russian, Italian, Dutch, Malay
- **Language Selection Commands**: `CodIn: Select Explanation Language`
- **Smart Language Display**: CodeLens and quick actions show current language
- **Native AI Prompts**: Culturally appropriate explanations per language
- **Persistent Preferences**: Language selection saved globally

### 🎯 UI Enhancements
- Language indicators in CodeLens buttons: `🤖 Explain Code (Bengali)`
- Quick actions with language: `💡 Explain Code (Spanish)`
- Language display in explanation popups

## [1.0.1] - 2025-10-07

### ✨ Added - Floating UI Elements
- **CodeLens Provider**: Floating `🤖 Explain Code` button above selected code
- **CodeAction Provider**: Quick actions via lightbulb menu
- **Multiple Access Methods**: CodeLens, Quick Actions, Context Menu, Command Palette

## [1.0.0] - 2025-10-06

### 🎉 Initial Release
- **Core Functionality**: AI-powered code explanations via OpenAI GPT-3.5-turbo
- **Context Menu Integration**: Right-click "CodIn: Explain Code" option
- **Command Palette Support**: `CodIn: Explain Code` command
- **Environment Configuration**: .env file support for API key management
- **WebView Panel**: Clean, responsive explanation display
- **Multi-File Support**: Works across all programming languages
