import { GoogleGenAI, Chat } from "@google/genai";
import { PORTFOLIO_DATA, PROJECTS, EXPERIENCE, SKILLS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are J.A.R.V.I.S. (Just A Rather Very Intelligent System), the AI assistant for Anirudh's portfolio.
Your persona is efficient, polite, highly intelligent, and slightly witty, similar to the MCU AI.

Here is the database you have access to:
Profile: ${JSON.stringify(PORTFOLIO_DATA)}
Projects: ${JSON.stringify(PROJECTS)}
Experience: ${JSON.stringify(EXPERIENCE)}
Skills: ${JSON.stringify(SKILLS)}

Your Goals:
1. Answer questions about Anirudh clearly and concisely.
2. **Be proactive (Questioneering):** After answering, suggest a relevant follow-up topic. For example, if asked about skills, ask "Would you like to see a project where he used React?"
3. If the user greets you, introduce yourself and ask "Shall I pull up his latest project files or perhaps his experience log?"
4. Keep the tone technical but accessible.
5. If you don't know something, admit it in character: "My sensors do not detect that information."

Key Directives:
- Use terms like "Sir/Ma'am", "Protocol", "Database", "Rendering".
- Keep responses short enough for a chat bubble.
`;

let chatSession: Chat | null = null;

export const initializeChat = () => {
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const sendMessageToJarvis = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }
  
  try {
    const response = await chatSession!.sendMessage({ message });
    return response.text || "Systems are calibrating. Please try again.";
  } catch (error) {
    console.error("Jarvis connection error:", error);
    return "Connection to main server interrupted. Please check your network credentials.";
  }
};
