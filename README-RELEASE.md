# 🤖 CodIn - AI Code Explainer

**Get instant AI-powered explanations for any code snippet in 15+ languages with secure API key management!**

[![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)](https://github.com/semicolonailabs/CodIn)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.70+-orange.svg)](https://code.visualstudio.com/)

## 🌟 **Features**

### 🎯 **Smart Code Explanation**
- **Select any code** → Get instant AI explanations
- **Multiple access methods**: CodeLens buttons, Quick Actions, Context Menu
- **Real-time explanations** with progress indicators
- **Works across all file types**: Python, JavaScript, TypeScript, Java, C++, and more

### 🌍 **Multi-Language Support (15 Languages)**
- **English** • **Bengali** (বাংলা) • **Arabic** (العربية) • **Spanish** • **French**
- **German** • **Hindi** • **Chinese** • **Japanese** • **Korean** 
- **Portuguese** • **Russian** • **Italian** • **Dutch** • **Malay**
- **Culturally appropriate** explanations with native technical terms

### 🔐 **Secure API Key Management**
- **VS Code Secret Storage** - Encrypted and secure
- **Command Palette setup** - No manual file editing
- **Password-masked input** - Keys never visible on screen
- **Auto-migration** from .env files

### 🎨 **Professional UI**
- **Clean, responsive popups** with VS Code theming
- **Language indicators** in buttons and explanations  
- **Progress indicators** and error handling
- **Floating CodeLens buttons** above selected code

---

## 🚀 **Quick Start**

### 1. **Install Extension**
```bash
# Download codin-1.2.0.vsix
# In VS Code: Cmd+Shift+P → "Extensions: Install from VSIX"
```

### 2. **Set Your API Key**
```bash
# Command Palette (Cmd+Shift+P)
CodIn: Set OpenAI API Key
# Enter your OpenAI API key (password-masked)
```

### 3. **Explain Code**
1. **Select any code snippet**
2. **Click the floating "🤖 Explain Code" button**
3. **Get instant explanation in your language!**

---

## 📖 **How to Use**

### 🎯 **Method 1: CodeLens (Floating Button)**
- Select code → See `🤖 Explain Code (Language)` button above
- Click to get explanation in side panel

### 🎯 **Method 2: Quick Actions**  
- Select code → Press `Cmd+.` → Choose `💡 Explain Code`
- Or click the lightbulb icon

### 🎯 **Method 3: Context Menu**
- Select code → Right-click → `CodIn: Explain Code`

### 🎯 **Method 4: Command Palette**
- Select code → `Cmd+Shift+P` → `CodIn: Explain Code`

---

## 🌍 **Multi-Language Setup**

### **Change Explanation Language:**
```bash
Cmd+Shift+P → "CodIn: Select Explanation Language"
# Choose from 15 supported languages
```

### **Via Settings:**
```bash
Cmd+, → Search "codin" → Set "Explanation Language"
```

**Example: Bengali Developer**
1. Set language to Bengali
2. Select: `def factorial(n):`  
3. Get explanation: "এই ফাংশনটি ফ্যাক্টোরিয়াল গণনা করে..."

---

## 🔐 **API Key Management**

### **Secure Setup Commands:**
- `CodIn: Set OpenAI API Key` - Secure password-masked setup
- `CodIn: Check API Key Status` - View connection status  
- `CodIn: Remove OpenAI API Key` - Safe removal with confirmation

### **Get Your OpenAI API Key:**
1. Visit: [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create new secret key
3. Copy key (starts with `sk-`)
4. Use Command Palette to set securely

### **Security Features:**
- ✅ **VS Code Secret Storage** (encrypted)
- ✅ **Password-masked input**
- ✅ **No plain text storage**
- ✅ **Cross-platform secure**

---

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

### **Access Settings:**
- `Cmd+,` → Search "codin"
- Or: `Cmd+Shift+P` → "Preferences: Open Settings (UI)"

---

## 🎯 **Examples**

### **Python Function Explanation:**
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    # Select this code and click "Explain Code"
```

**Result:** Detailed explanation of binary search algorithm in your chosen language.

### **JavaScript React Component:**
```javascript
const [count, setCount] = useState(0);
// Select this line for React hooks explanation
```

**Result:** Clear explanation of React useState hook functionality.

---

## 🔧 **Troubleshooting**

### **CodeLens Not Showing?**
1. Check: `Cmd+,` → Search "editor.codeLens" → Enable
2. Reload: `Cmd+Shift+P` → "Developer: Reload Window"

### **API Key Issues?**
1. Check status: `Cmd+Shift+P` → "Check API Key Status"  
2. Verify format: Must start with "sk-"
3. Reset: `Cmd+Shift+P` → "Set OpenAI API Key"

### **Language Not Working?**
1. Change: `Cmd+Shift+P` → "Select Explanation Language"
2. Reload VS Code after changes

---

## 🏗️ **Development**

### **Requirements:**
- VS Code 1.70.0+
- Node.js 16+
- TypeScript 4.8+

### **Build:**
```bash
npm install
npm run compile
npm run package
```

### **Test:**
```bash
npm run lint
npm test
```

---

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`  
5. Open Pull Request

---

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **OpenAI** for powerful GPT models
- **VS Code Team** for excellent extension APIs
- **Community** for feature requests and feedback

---

## 📞 **Support**

- **Issues**: [GitHub Issues](https://github.com/semicolonailabs/CodIn/issues)
- **Discussions**: [GitHub Discussions](https://github.com/semicolonailabs/CodIn/discussions)
- **Email**: [SemicolonAI Labs](mailto:contact@semicolonailabs.com)

---

## 🔗 **Links**

- [🏠 Homepage](https://github.com/semicolonailabs/CodIn)
- [📚 Documentation](https://github.com/semicolonailabs/CodIn/wiki)
- [🐛 Report Bug](https://github.com/semicolonailabs/CodIn/issues)
- [💡 Request Feature](https://github.com/semicolonailabs/CodIn/issues)

---

**Made with ❤️ by [SemicolonAI Labs](https://semicolonailabs.com)**

*Transform your coding experience with AI-powered explanations in your native language!* 🚀🌍
