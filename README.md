# 🤖 AutoForm - AI-Powered Form Filler

AutoForm is a React application that uses Google Gemini Pro API to intelligently fill out text-based forms using user profile data. Simply input your personal information, paste a form with placeholders, and let AI do the rest!

## ✨ Features

- **Smart Form Filling**: Uses Google Gemini Pro AI to intelligently fill forms based on your profile
- **User-Friendly Interface**: Clean, modern UI with Tailwind CSS
- **Profile Management**: Comprehensive profile form with personal details, experience, skills, and goals
- **Real-time Generation**: Instant AI-powered form filling with loading indicators
- **Copy to Clipboard**: Easy copying of filled forms
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini Pro API key

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
   - Get your Google Gemini Pro API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add your API key to the `.env` file:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
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

2. **Paste your form** (left panel):
   - Paste any text-based form with placeholders (like `___`)
   - Use the "Load Example Form" button to see a sample
   - The AI will replace placeholders with relevant information

3. **Generate the filled form**:
   - Click the "Generate Filled Form" button
   - Wait for the AI to process your request
   - View the filled form in the right panel

4. **Copy and use**:
   - Use the "Copy" button to copy the filled form
   - Paste it wherever you need the completed form

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini Pro API (`@google/generative-ai`)
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
AutoForm/
├── src/
│   ├── components/
│   │   ├── ProfileForm.jsx      # User profile input form
│   │   ├── FormUploader.jsx     # Form text input area
│   │   └── FilledFormOutput.jsx # AI-generated output display
│   ├── logic/
│   │   └── fillFormWithGemini.js # Gemini API integration
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
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Add it to your `.env` file

## 🎨 Customization

### Styling
The app uses Tailwind CSS. You can customize the design by modifying:
- `src/index.css` - Global styles
- Component files - Individual component styling
- `tailwind.config.js` - Tailwind configuration

### AI Prompt
Modify the prompt in `src/logic/fillFormWithGemini.js` to change how the AI fills forms.

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
3. Verify that your Gemini API key has sufficient quota
4. Check the browser console for any error messages

## 🔮 Future Enhancements

- [ ] Save and load user profiles
- [ ] Form templates library
- [ ] Export to PDF
- [ ] Multiple AI model support
- [ ] Form validation
- [ ] Dark mode
- [ ] Mobile app version

---

**Made with ❤️ using React and Google Gemini Pro** 