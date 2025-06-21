# 🚀 AutoForm Setup Guide

## Prerequisites

Before you can run AutoForm, you need to install Node.js and npm. You can download the LTS version from [https://nodejs.org/](https://nodejs.org/). Follow the installation wizard and ensure Node.js is added to your system's PATH.

To verify the installation, open a new terminal and run `node --version` and `npm --version`.

## Project Setup

### 1. Navigate to the Project
```bash
cd AutoForm
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
1. Copy `env.example` to `.env`. On Windows, use `copy env.example .env`. On macOS/Linux, use `cp env.example .env`.

2. Edit the `.env` file and add your Hugging Face API Token:
   ```
   VITE_HUGGINGFACE_API_KEY="your_hugging_face_token_here"
   ```

### 4. Get a Hugging Face API Token
1. Go to [Hugging Face Tokens](https://huggingface.co/settings/tokens).
2. Sign in or create a new account.
3. Click "New token", give it a name, and select the `read` role.
4. Copy the generated token and paste it into your `.env` file.

### 5. Start the Development Server
```bash
npm run dev
```

### 6. Open Your Browser
Navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## Troubleshooting

- **If `npm` is not recognized**: Ensure Node.js is installed and in your system's PATH. Restart your terminal.
- **If you get API key errors**: Make sure your `.env` file is in the project root and the variable name is exactly `VITE_HUGGINGFACE_API_KEY`.
- **If the app doesn't start**: Run `npm install` again and check the terminal for error messages.

## Project Structure

```
AutoForm/
├── src/
│   ├── components/
│   │   ├── ProfileForm.jsx
│   │   ├── FormUploader.jsx
│   │   ├── PDFUploader.jsx
│   │   └── FilledFormOutput.jsx
│   ├── logic/
│   │   ├── fillFormWithHuggingFace.js
│   │   └── pdfFieldDetector.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── .env
└── README.md
```

## Available Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the app for production.
- `npm run preview` - Previews the production build locally.
- `npm run lint` - Lints the code for errors.

## Support

If you encounter issues, please check the browser's developer console for error messages and verify your Hugging Face token is correct.

---

**Happy form filling! 🎉** 