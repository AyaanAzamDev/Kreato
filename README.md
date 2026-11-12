# Kreato – AI-Powered Creative Content Assistant

Kreato is an AI-powered creative content assistant that helps users generate engaging and customized content using Google's Gemini AI.

Our goal is to make content creation easier, faster and more accessible for students, bloggers and digital content creators.

## 🚀 Live Demo

Try Kreato here: https://kreato-rkmn.onrender.com

## Features

- AI-powered content generation.
- Multiple content formats:
  - Instagram Posts
  - Instagram Reel Scripts
  - YouTube Video Scripts
  - YouTube Descriptions
  - Blog Articles
  - Creative Ideas
- Multiple writing tones: Creative, Professional, Casual, Funny and Informative.
- Target audience customization.
- Regenerate generated content.
- Copy generated content.
- Download content as a text file.
- Content history using browser localStorage.
- Markdown-based content formatting.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Frontend structure |
| CSS | Styling and responsive design |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | Backend server |
| Google Gemini API | AI content generation |
| Marked.js | Markdown rendering |
| DOMPurify | HTML sanitization |
| localStorage | Content history |
| Git & GitHub | Version control |
| Render | Deployment |

## How to Run Locally

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

### 4. Configure your API key

Create a `.env` file in the root directory and add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Replace `your_gemini_api_key` with your own Google Gemini API key.

### 5. Start the server

```bash
npm start
```

### 6. Open Kreato

Visit:

http://localhost:3000

## Project Structure

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

Note: `.env` and `node_modules` are excluded from GitHub.

## Current Development Status

Kreato currently has a working prototype with AI content generation, content customization, copy, download, regeneration and content history.

Further improvements are planned, including enhanced AI-assisted editing, additional creative tools, improved user experience and deployment.

## Team

**Team Name:** CodeCatalyst

**Project:** Kreato

## Repository

https://github.com/AyaanAzamDev/Kreato

---

*Kreato – Turning Ideas into Content with AI.*