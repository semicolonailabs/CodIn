# 🤖 CodIn - AI Code Explainer v1.2.3

**Get instant AI-powered explanations for any code snippet in 15+ languages with secure API key management!**

[![Version](https://img.shields.io/badge/version-1.2.3-blue.svg)](https://github.com/semicolonailabs/CodIn)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.70+-orange.svg)](https://code.visualstudio.com/)

![CodIn Logo](CodIn.png)

## 🌟 **Features**

### 🎯 **Smart Code Explanation**
- **Multiple Access Methods**: CodeLens buttons, Quick Actions, Context Menu, Command Palette
- **Real-time Explanations**: Instant AI responses with progress indicators
- **Cross-Language Support**: Works with Python, JavaScript, TypeScript, Java, C++, and 50+ languages

### 🌍 **Multi-Language Support (15 Languages)**
- **English** • **Bengali** (বাংলা) • **Arabic** (العربية) • **Spanish** • **French**
- **German** • **Hindi** • **Chinese** • **Japanese** • **Korean** 
- **Portuguese** • **Russian** • **Italian** • **Dutch** • **Malay**
- **Native AI Prompts**: Culturally appropriate explanations with local technical terms

### � **Secure API Key Management**
- **VS Code Secret Storage**: Encrypted, cross-platform security
- **Command Palette Setup**: No manual file editing required
- **Password-Masked Input**: Keys never visible on screen
- **Auto-Migration**: Seamless upgrade from .env files

### 🎨 **Professional UI**
- **Floating CodeLens Buttons**: `🤖 Explain Code` appears above selected code
- **Quick Actions**: Press `Cmd+.` for lightbulb menu integration
- **Clean Popups**: VS Code theme-compatible explanation panels
- **Language Indicators**: Shows current language in UI elements

## 🚀 Quick Start

### 1. **Install Extension**
```bash
# Download codin-1.2.3.vsix from releases
# In VS Code: Cmd+Shift+P → "Extensions: Install from VSIX"
```

### 2. **Set Your API Key Securely**
```bash
# Command Palette (Cmd+Shift+P)
CodIn: Set OpenAI API Key
# Enter your OpenAI API key (password-masked for security)
```

**Get Your API Key:**
1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create new secret key
3. Copy key (starts with `sk-`)

### 3. **Select Your Language**
```bash
# Command Palette (Cmd+Shift+P)  
CodIn: Select Explanation Language
# Choose from 15 supported languages
```

### 4. **Explain Code**
1. **Select any code snippet**
2. **See floating `🤖 Explain Code` button** above selection
3. **Click to get instant explanation** in your chosen language!

![Usage Demo](https://via.placeholder.com/800x400?text=Usage+Demo)

## 🎯 **How to Use**

### **Method 1: CodeLens (Floating Button)**
- Select code → See `🤖 Explain Code (Language)` button above
- Click to get explanation in side panel

### **Method 2: Quick Actions**  
- Select code → Press `Cmd+.` → Choose `💡 Explain Code`
- Or click the lightbulb icon

### **Method 3: Context Menu**
- Select code → Right-click → `CodIn: Explain Code`

### **Method 4: Command Palette**
- Select code → `Cmd+Shift+P` → `CodIn: Explain Code`

## 💡 **Multi-Language Example**

**Select this Python code:**
```python
def factorial(n):
    if n < 0:
        raise ValueError("Factorial not defined for negative numbers")
    return 1 if n <= 1 else n * factorial(n - 1)
```

**CodIn explains in your chosen language:**

🇺🇸 **English**: "This function calculates the factorial of a number using recursion..."

🇧🇩 **Bengali**: "এই ফাংশনটি রিকার্শন ব্যবহার করে একটি সংখ্যার ফ্যাক্টোরিয়াল গণনা করে..."

🇸🇦 **Arabic**: "تحسب هذه الدالة العاملية لرقم باستخدام العودية..."

🇪🇸 **Spanish**: "Esta función calcula el factorial de un número usando recursión..."

## 🛠️ Supported Languages

- Python (.py)
- JavaScript (.js)
- TypeScript (.ts)
- C++ (.cpp, .cc, .cxx)
- Java (.java)
- C# (.cs)
- Go (.go)
- Ruby (.rb)
- PHP (.php)
- Swift (.swift)
- And many more!

## 🔐 **API Key Management**

### **Secure Setup Commands:**
- `CodIn: Set OpenAI API Key` - Password-masked secure setup
- `CodIn: Check API Key Status` - View connection status  
- `CodIn: Remove OpenAI API Key` - Safe removal with confirmation

### **Security Features:**
- ✅ **VS Code Secret Storage** (encrypted)
- ✅ **Password-masked input** 
- ✅ **No plain text storage**
- ✅ **Auto-migration from .env files**

## 📦 **Installation**

### **From VS Code Marketplace (Recommended)**
1. Open VS Code
2. Go to Extensions view (`Cmd+Shift+X`)
3. Search for "CodIn"
4. Click "Install" on "CodIn - AI Code Explainer" by SemicolonAILabs

### **From VSIX File**
1. Download the latest `codin-1.2.3.vsix` from [GitHub Releases](https://github.com/semicolonailabs/CodIn/releases)
2. In VS Code: `Cmd+Shift+P` → "Extensions: Install from VSIX..."
3. Select the downloaded file

### **Requirements**
- VS Code 1.70.0 or higher
- OpenAI API key (get one from [OpenAI Platform](https://platform.openai.com/api-keys))
- Internet connection for AI explanations

## ⚙️ **Configuration**

### **Available Settings:**
```json
{
  "codin.explanationLanguage": "English",
  "codin.showLanguageInPopup": true,
  "codin.enableCodeLens": true,
  "codin.enableCodeActions": true
}
```

**Access Settings:** `Cmd+,` → Search "codin"

## �️ **Privacy & Security**

### **Enterprise-Grade Security:**
- **Encrypted Storage**: API keys stored using VS Code Secret Storage (encrypted at rest)
- **No Plain Text**: Keys never stored in files or visible on screen
- **Secure Transmission**: HTTPS-only communication with OpenAI
- **Privacy First**: Code snippets only sent to OpenAI for explanation
- **No Logging**: CodIn doesn't store or log any user data
- **Cross-Platform**: Secure on macOS, Windows, and Linux

### **What We Don't Store:**
- ❌ API keys in plain text
- ❌ User code snippets  
- ❌ Explanation history
- ❌ Personal information
- ❌ Usage analytics

## 🛠️ **Development**

### **Setup for Development**
```bash
# Clone the repository
git clone https://github.com/semicolonailabs/CodIn.git
cd CodIn

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes
npm run watch

# Package extension
npm run package

# Run linting
npm run lint
```

### **Testing**
```bash
# Install locally for testing
code --install-extension codin-1.2.3.vsix

# Or press F5 in VS Code to launch Extension Development Host
```

## 🤝 **Contributing**

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

Quick links:
- 🐛 [Report Bugs](https://github.com/semicolonailabs/CodIn/issues/new?template=bug_report.yml)
- 💡 [Request Features](https://github.com/semicolonailabs/CodIn/issues/new?template=feature_request.yml)  
- 🔧 [Pull Requests](https://github.com/semicolonailabs/CodIn/pulls)
- 📚 [Documentation](https://github.com/semicolonailabs/CodIn/wiki)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙋‍♂️ Support

- 📧 Email: support@semicolonailabs.com
- 🐛 Issues: [GitHub Issues](https://github.com/semicolonailabs/CodIn/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/semicolonailabs/CodIn/discussions)

---

**Enjoy coding with CodIn! 🎉**