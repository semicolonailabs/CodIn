# CodIn - AI-Powered Code Explainer

🤖 **Understand any code in seconds!** CodIn is a powerful VS Code extension that provides instant AI-powered explanations for any code snippet, right in your editor.

![CodIn Logo](CodIn.png)

## ✨ Features

- 🚀 **Instant Code Explanations**: Select any code snippet and get AI-powered explanations instantly
- 🌍 **Multi-Language Support**: Works with Python, JavaScript, TypeScript, C++, Java, C#, Go, Ruby, PHP, Swift, and more
- 🎨 **Beautiful UI**: Modern webview panel with VS Code theme integration
- 🔒 **Secure**: API keys stored securely in VS Code settings
- ⚡ **Fast & Reliable**: Built with modern OpenAI GPT-3.5-turbo API
- 📱 **Responsive**: Clean, mobile-friendly interface

## 🚀 Quick Start

### 1. Installation

Install from the VS Code Marketplace or:
1. Download the `.vsix` file
2. Run `code --install-extension codin-1.0.0.vsix`

### 2. Setup

1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
2. Create a `.env` file in your workspace root
3. Add your API key: `OPENAI_API_KEY=sk-your_actual_api_key_here`
4. The extension will automatically detect and use the API key from the `.env` file

### 3. Usage

1. **Select Code**: Highlight any code snippet in your editor
2. **Right-Click**: Choose "Explain Code" from the context menu  
3. **Get Explanation**: View the AI-generated explanation in the side panel

![Usage Demo](https://via.placeholder.com/800x400?text=Usage+Demo)

## 💡 Example

Select this Python code:
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

**CodIn explains:**
> "This function calculates the nth Fibonacci number using recursion. It returns n if n is 0 or 1 (base cases), otherwise it returns the sum of the two previous Fibonacci numbers by calling itself recursively..."

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

## ⚙️ Configuration

Create a `.env` file in your workspace root:

```bash
# .env
OPENAI_API_KEY=sk-your_actual_api_key_here
```

**Note**: The `.env` file should be added to your `.gitignore` to keep your API key secure and prevent it from being committed to version control.

## 🔒 Privacy & Security

- API keys are stored locally in your `.env` file (never committed to version control)
- Code snippets are only sent to OpenAI for explanation  
- No data is stored or logged by CodIn
- Full compliance with OpenAI's usage policies
- `.env` files are automatically excluded from extension packages

## 🤝 Contributing

We welcome contributions! See our [GitHub repository](https://github.com/semicolonailabs/CodIn) for:
- 🐛 Bug reports
- 💡 Feature requests  
- 🔧 Pull requests
- 📚 Documentation improvements

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙋‍♂️ Support

- 📧 Email: support@semicolonailabs.com
- 🐛 Issues: [GitHub Issues](https://github.com/semicolonailabs/CodIn/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/semicolonailabs/CodIn/discussions)

---

**Enjoy coding with CodIn! 🎉**