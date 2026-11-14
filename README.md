# Kreato – AI-Powered Multi-Model Creative Assistant

**Turning Ideas into Content with the Power of Multiple AI Models.**

Kreato is an AI-powered creative content assistant designed to help students, bloggers, social media creators, and digital content creators transform their ideas into engaging, customized content.

Unlike traditional AI content generators that rely on a single model, Kreato uses a **Multi-Model AI Ensemble** to generate, compare, evaluate, and synthesize content using multiple AI providers.

Our vision is to make AI a creative partner that enhances human imagination, productivity, and originality rather than replacing human creativity.

## 🚀 Live Demo

Try Kreato here:

**https://kreato-1.onrender.com**

## ✨ Key Features

### 1. Multi-Model AI Generation

Kreato integrates three AI models through different providers:

- **Google Gemini** – AI-powered content generation and synthesis.
- **Adaption AI (Qwen)** – Generates alternative creative responses.
- **Groq (GPT-OSS)** – Provides another independent AI-generated response.

The models work together to provide multiple perspectives on the same creative prompt.

### 2. AI Response Comparison

- Generates responses from multiple AI models.
- Displays individual model-generated outputs.
- Allows users to compare different creative approaches.
- Shows the generation time for each provider.

### 3. AI-Powered Evaluation

Kreato evaluates the generated responses based on their relevance, creativity, and overall quality.

- AI-generated scores for individual responses.
- Identification of the strongest ideas.
- Suggestions for improving the generated content.

### 4. Final AI Synthesis

Instead of simply presenting multiple AI responses, Kreato combines the strongest ideas into one optimized final output.

- Combines useful ideas from different models.
- Produces a consolidated final response.
- Uses available AI providers as fallbacks when a provider is unavailable.

### 5. Feedback-Based Regeneration

Users can provide feedback on generated content and request improvements.

This helps Kreato refine its output according to the user's creative direction rather than relying only on repeated generation.

### 6. Content Customization

- Multiple content formats:
  - Instagram Posts
  - Instagram Reel Scripts
  - YouTube Video Scripts
  - YouTube Descriptions
  - Blog Articles
  - Creative Ideas
- Multiple writing tones:
  - Creative
  - Professional
  - Casual
  - Funny
  - Informative
- Target audience customization.

### 7. Content Management

- Regenerate content.
- Copy generated content.
- Download content as a text file.
- Maintain content history using browser localStorage.
- View previous generated content.
- Delete individual history entries or clear the complete history.
- Markdown-based content formatting.

### 8. Reliability and Fallback Handling

Kreato is designed to handle temporary AI provider failures.

- Independent handling of provider responses.
- Alternative evaluation and synthesis providers.
- Fallback to an available generated response when synthesis is unsuccessful.

This helps maintain functionality even when one of the integrated AI providers is temporarily unavailable.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Frontend structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | Backend server |
| Google Gemini API | AI generation, evaluation and synthesis |
| Adaption AI API | Access to Qwen models |
| Groq API | Access to GPT-OSS models |
| OpenAI SDK | API client used for Groq integration |
| Marked.js | Markdown rendering |
| DOMPurify | HTML sanitization |
| localStorage | Browser-based content history |
| dotenv | Environment variable management |
| Git & GitHub | Version control |
| Render | Cloud deployment |

---

## 🧠 How Kreato Works

Kreato follows a Multi-Model AI Ensemble workflow.

1. **User Input:** The user enters a topic and selects the content type, tone, and target audience.
2. **Parallel Generation:** The prompt is sent to Gemini, Adaption/Qwen, and Groq/GPT-OSS.
3. **Response Collection:** Kreato collects the available responses from the different AI providers.
4. **AI Evaluation:** An available evaluator assesses the responses and identifies their strengths and areas for improvement.
5. **Final Synthesis:** An available synthesis model combines the strongest ideas into a final optimized response.
6. **User Feedback:** Users can provide feedback to guide further content improvements.

*Note: AI-generated evaluation scores are estimates intended to assist comparison, not objective measurements of content quality. Provider availability may also affect which responses are returned.*

---

## 💻 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/AyaanAzamDev/Kreato.git
```

### 2. Open the project folder

```bash
cd Kreato
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure API keys

Create a `.env` file in the root directory and add the following configuration:

```env
GEMINI_API_KEY=your_gemini_api_key
ADAPTION_API_KEY=your_adaption_api_key
GROQ_API_KEY=your_groq_api_key

GEMINI_MODEL=gemini-3.5-flash-lite
ADAPTION_MODEL=qwen3.5-397b
GROQ_MODEL=openai/gpt-oss-20b
```

Replace the placeholder API keys with your own authorized API credentials.

**Important:** Never upload your `.env` file or expose your API keys publicly.

### 5. Start the server

```bash
npm start
```

### 6. Open Kreato

Visit:

```text
http://localhost:3000
```

---

## 📁 Project Structure

```text
Kreato/
│
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

**Note:** The `.env` file and `node_modules` directory are excluded from GitHub through `.gitignore`.

---

## 🔮 Future Enhancements

The following features are planned for development during the upcoming hackathon sprint. They are proposed enhancements and are not necessarily available in the current live version.

### 1. Improved Frontend and User Experience
- Modernize the user interface.
- Improve the overall layout and responsiveness.
- Add smoother interactions and animations.
- Improve the presentation of AI-generated responses and evaluation results.

### 2. Read Aloud – Text-to-Speech
- Allow users to listen to their generated content.
- Add play, pause, and resume controls.
- Provide a more accessible content consumption experience.

### 3. Advanced AI-Assisted Editing
- Rewrite selected paragraphs.
- Expand or shorten generated content.
- Improve grammar and clarity.
- Change the tone of existing content.
- Generate alternative versions of selected text.

### 4. Multilingual Content Generation
- Support content generation in multiple languages.
- Allow users to translate generated content.
- Make Kreato more accessible to creators from different linguistic backgrounds.

### 5. More Creative Tools
- Generate catchy headlines and hooks.
- Suggest social media captions and hashtags.
- Generate content ideas from a simple topic.
- Add platform-specific content optimization.

### 6. Export and Sharing Improvements
- Export content in additional formats.
- Improve content-sharing options.
- Provide better organization of saved projects.

### 7. Enhanced Multi-Model Intelligence
- Improve AI response evaluation.
- Introduce more detailed comparison criteria.
- Explore additional AI models and providers.
- Improve synthesis quality and provider reliability.

---

## 👥 Team

**Team Name:** CodeCatalyst

**Project Name:** Kreato

**Hackathon:** GeNarrative Clash 2026

**Theme:** Where GenAI Meets Human Creativity

---

## 🔗 Repository

GitHub: https://github.com/AyaanAzamDev/Kreato

Live Application: https://kreato-1.onrender.com

---

## ❤️ Our Vision

We believe AI should empower human creativity, not replace it.

Kreato brings multiple AI perspectives together to help creators explore ideas, improve their content, and express their creativity more effectively.

**Kreato – Turning Ideas into Content with AI.**