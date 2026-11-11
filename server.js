
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is missing. Check your .env file.");
}

const app = express();
const PORT = 3000;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json({ limit: "20kb" }));

// Serve frontend
app.use(express.static(__dirname));

// Content generation route
app.post("/api/generate", async (req, res) => {

    try {

        const {
            topic,
            contentType,
            tone,
            audience
        } = req.body;

        // Validate topic
        if (typeof topic !== "string" || !topic.trim()) {
            return res.status(400).json({
                error: "Please enter a topic."
            });
        }

        if (topic.length > 500) {
            return res.status(400).json({
                error: "Topic must be 500 characters or fewer."
            });
        }

        // Allowed content types
        const allowedTypes = [
            "Instagram Post",
            "Instagram Reel Script",
            "YouTube Video Script",
            "YouTube Description",
            "Blog Article",
            "Creative Ideas"
        ];

        // Allowed writing tones
        const allowedTones = [
            "Creative",
            "Professional",
            "Casual",
            "Funny",
            "Informative"
        ];

        const selectedType = allowedTypes.includes(contentType)
            ? contentType
            : "Instagram Post";

        const selectedTone = allowedTones.includes(tone)
            ? tone
            : "Creative";

        const selectedAudience =
            typeof audience === "string"
                ? audience.trim().slice(0, 150)
                : "";

        // Create AI prompt
        const prompt = `
You are Kreato, an intelligent AI creative assistant.

Your task is to generate high-quality content based on the user's requirements.

CONTENT TYPE:
${selectedType}

TOPIC:
${topic.trim()}

WRITING TONE:
${selectedTone}

TARGET AUDIENCE:
${selectedAudience || "General audience"}

INSTRUCTIONS:

1. Generate content specifically for the selected content type.
2. Follow the requested writing tone.
3. Adapt the language and style to the target audience.
4. Make the content engaging, original and useful.
5. Use appropriate headings and bullet points wherever necessary.
6. Avoid unnecessary introductions and repetitive sentences.
7. For scripts, include a suitable opening hook and a clear structure.
8. For social media content, include relevant captions and hashtags where appropriate.
9. For blog articles, use a proper title, introduction, headings and conclusion.
10. Return clean, properly formatted Markdown.

Remember: You are Kreato. Your goal is to help users turn their ideas into creative content.
`;

        // Generate content using Gemini
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt
        });

        const generatedContent = response.text;

        if (!generatedContent) {
            throw new Error("Gemini returned an empty response.");
        }

        res.json({
            success: true,
            content: generatedContent
        });

    } catch (error) {

        console.error("Gemini API Error:", error);

        res.status(500).json({
            error: "Kreato could not generate content. Please try again."
        });

    }

});

// Start server
app.listen(PORT, () => {
    console.log(`Kreato server running at http://localhost:${PORT}`);
});
