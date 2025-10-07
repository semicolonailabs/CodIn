# CodIn Setup Guide

## Quick Setup

1. **Get OpenAI API Key**
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key (starts with `sk-`)

2. **Create .env File**
   - In your workspace root, create a file named `.env`
   - Add the following line:
   ```
   OPENAI_API_KEY=sk-your_actual_api_key_here
   ```
   - Replace `sk-your_actual_api_key_here` with your actual API key

3. **Add .env to .gitignore**
   - Ensure your `.gitignore` includes:
   ```
   .env
   ```

## Example .env File

```bash
# OpenAI API Configuration
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-1234567890abcdef1234567890abcdef1234567890abcdef

# Optional: You can add other environment variables here
# MODEL_NAME=gpt-3.5-turbo
```

## Troubleshooting

### "API key not found" Error
- Ensure the `.env` file is in your workspace root directory
- Check that the file is named exactly `.env` (no extension)
- Verify the API key line starts with `OPENAI_API_KEY=`
- Make sure there are no extra spaces around the `=` sign

### "Invalid API key" Error  
- Verify your API key starts with `sk-`
- Check that you copied the complete key from OpenAI
- Ensure you have credits available in your OpenAI account

### Extension Not Working
- Reload VS Code window (Cmd/Ctrl + Shift + P → "Developer: Reload Window")
- Check that you have a workspace folder open
- Ensure the `.env` file is in the workspace root, not a subfolder

## Security Notes

- **Never commit `.env` files to version control**
- **Never share your API key publicly**
- The extension automatically excludes `.env` files from packaging
- Consider using a separate API key for development

## File Structure

```
your-workspace/
├── .env                 # Your API key (keep private)
├── .env.example         # Template file (can be committed)
├── .gitignore          # Include .env in here
└── your-code-files/
```
