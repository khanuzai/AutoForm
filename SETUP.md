# 🚀 AutoForm Setup Guide

## Prerequisites

Before you can run AutoForm, you need to install Node.js and npm:

### Installing Node.js

1. **Download Node.js**:
   - Go to [https://nodejs.org/](https://nodejs.org/)
   - Download the LTS (Long Term Support) version
   - Choose the Windows installer (.msi file)

2. **Install Node.js**:
   - Run the downloaded installer
   - Follow the installation wizard
   - Make sure to check "Add to PATH" during installation

3. **Verify Installation**:
   - Open a new terminal/command prompt
   - Run: `node --version`
   - Run: `npm --version`
   - Both commands should show version numbers

## Project Setup

Once Node.js is installed, follow these steps:

### 1. Navigate to the Project
```bash
cd AutoForm
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
1. Copy `env.example` to `.env`:
   ```bash
   copy env.example .env
   ```

2. Edit the `.env` file and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 4. Get a Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Paste it in your `.env` file

### 5. Start the Development Server
```bash
npm run dev
```

### 6. Open Your Browser
Navigate to `http://localhost:5173`

## Troubleshooting

### If npm is not recognized:
- Make sure Node.js is properly installed
- Restart your terminal/command prompt
- Check if Node.js is in your system PATH

### If you get API key errors:
- Ensure your `.env` file exists in the project root
- Verify the API key is correct and has no extra spaces
- Make sure the environment variable name is exactly `VITE_GEMINI_API_KEY`

### If the app doesn't start:
- Check that all dependencies are installed: `npm install`
- Look for error messages in the terminal
- Ensure you're in the correct directory

## Project Structure

```
AutoForm/
├── src/
│   ├── components/
│   │   ├── ProfileForm.jsx      # User profile input
│   │   ├── FormUploader.jsx     # Form text input
│   │   └── FilledFormOutput.jsx # AI output display
│   ├── logic/
│   │   └── fillFormWithGemini.js # Gemini API logic
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS configuration
├── .env                        # Environment variables (create this)
├── env.example                 # Environment template
└── README.md                   # Full documentation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Next Steps

1. **Test the Application**:
   - Fill in your profile information
   - Paste a sample form
   - Click "Generate Filled Form"
   - Verify the AI fills the form correctly

2. **Customize**:
   - Modify the styling in `src/index.css`
   - Adjust the AI prompt in `src/logic/fillFormWithGemini.js`
   - Add new profile fields in `src/components/ProfileForm.jsx`

3. **Deploy**:
   - Run `npm run build` to create a production build
   - Deploy the `dist` folder to your preferred hosting service

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your API key is working
3. Ensure all dependencies are installed
4. Check the README.md for more detailed information

---

**Happy form filling! 🎉** 