
import { GoogleGenAI } from "@google/genai";
import { MatchState } from "../types";

export const generateCommentary = async (state: MatchState): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `
    You are a professional football (soccer) commentator. 
    Current Match: ${state.team1.name} ${state.team1.score} - ${state.team2.score} ${state.team2.name}
    Competition: ${state.competition}
    Stadium: ${state.stadium}
    Minute: ${state.minute}'
    Status: ${state.status}

    Write a single, exciting one-sentence "live" commentary snippet for the current situation. 
    Make it sound like a top-tier BBC or Sky Sports broadcast.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.trim() || "The atmosphere is electric as the game continues!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "What a spectacle we're witnessing today!";
  }
};
