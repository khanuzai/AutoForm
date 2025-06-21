# 🤖 AutoForm - AI-Powered Form Filler

AutoForm is a React application that uses OpenRouter AI to intelligently fill out text-based forms and PDFs using user profile data. Simply input your personal information, paste a form with placeholders, and let AI do the rest!

## ✨ Features

- **Smart Form Filling**: Uses OpenRouter AI to intelligently fill forms based on your profile
- **Multiple AI Models**: Access to GPT-4, Claude, Llama, and more through OpenRouter
- **PDF Processing**: Upload and automatically fill PDF forms
- **User-Friendly Interface**: Clean, modern UI with Apple-inspired design
- **Profile Management**: Comprehensive profile form with personal details
- **Real-time Generation**: Instant AI-powered form filling with loading indicators
- **Copy to Clipboard**: Easy copying of filled forms
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenRouter API key (free to get!)

### Installation

1. **Clone or download the project**
   ```bash
   cd AutoForm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**
   - Copy `env.example` to `.env`
   - Get your OpenRouter API key from [OpenRouter](https://openrouter.ai/keys)
   - **No credit card required!** You get free credits to start
   - Add your API key to the `.env` file:
     ```
     VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
     VITE_AI_MODEL=gpt-3.5-turbo
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 How to Use

1. **Fill in your profile** (left panel):
   - Enter your personal information
   - Add your education, experience, skills, and goals
   - The more detailed your profile, the better the AI can fill your forms

2. **Choose your method**:
   - **Text Form**: Paste any text-based form with placeholders (like `___`)
   - **PDF Form**: Upload a PDF form and let AI detect and fill fields

3. **Generate the filled form**:
   - Click the "Generate Filled Form" button
   - Wait for the AI to process your request
   - View the filled form in the right panel

4. **Copy and use**:
   - Use the "Copy" button to copy the filled form
   - For PDFs, the filled file will be downloaded automatically

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with Apple-inspired design
- **AI Integration**: OpenRouter API (multiple models)
- **PDF Processing**: pdf-lib, pdfjs-dist
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
AutoForm/
├── src/
│   ├── components/
│   │   ├── ProfileForm.jsx      # User profile input form
│   │   ├── FormUploader.jsx     # Form text input area
│   │   ├── FilledFormOutput.jsx # AI-generated output display
│   │   └── PDFUploader.jsx      # PDF upload and processing
│   ├── logic/
│   │   ├── fillFormWithOpenRouter.js # OpenRouter API integration
│   │   └── pdfFieldDetector.js  # PDF field detection logic
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
VITE_AI_MODEL=gpt-3.5-turbo
```

### Getting an OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/keys)
2. Sign up for a free account
3. **No credit card required!** You get free credits to start
4. Copy your API key
5. Add it to your `.env` file

### Available AI Models

You can change the AI model by setting `VITE_AI_MODEL` in your `.env` file:

- `gpt-3.5-turbo` - Fast and efficient (default)
- `gpt-4` - Most capable model
- `claude-3-haiku` - Fast and accurate
- `claude-3-sonnet` - Balanced performance
- `claude-3-opus` - Most advanced
- `llama-3.1-8b-instruct` - Open source model

## 🎨 Design Features

- **Apple-inspired UI**: Modern, minimalistic design
- **Glassmorphism effects**: Translucent cards with backdrop blur
- **Smooth animations**: Fade-in effects and hover transitions
- **Responsive layout**: Works perfectly on all devices
- **Professional aesthetics**: Clean typography and spacing

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add your environment variables in the Vercel dashboard

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Add your environment variables in the Netlify dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check that your API key is correctly set in the `.env` file
2. Ensure you have a stable internet connection
3. Verify that your OpenRouter account has sufficient credits
4. Check the browser console for any error messages

## 🔮 Future Enhancements

- [ ] Save and load user profiles
- [ ] Form templates library
- [ ] Export to PDF
- [ ] Multiple AI model selection UI
- [ ] Form validation
- [ ] Dark mode
- [ ] Mobile app version
- [ ] Batch form processing

## 💡 Why OpenRouter?

- **No Credit Card Required**: Get started immediately with free credits
- **Multiple AI Models**: Access to GPT-4, Claude, Llama, and more
- **Cost Effective**: Pay only for what you use
- **Easy Integration**: Simple API with great documentation
- **Reliable**: Enterprise-grade infrastructure

---

**Made with ❤️ using React and OpenRouter AI** 