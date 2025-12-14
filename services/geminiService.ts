import { GoogleGenAI } from "@google/genai";
import { OperaRole, Costume } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMatchFeedback = async (
  targetRole: OperaRole, 
  droppedCostume: Costume, 
  isCorrect: boolean
): Promise<string> => {
  if (!process.env.API_KEY) {
    return isCorrect 
      ? `Correct! The ${targetRole.name} is a key role in Cantonese Opera. (Add API_KEY for more facts)`
      : `Not quite. That was ${droppedCostume.name}. (Add API_KEY for more facts)`;
  }

  const prompt = isCorrect
    ? `The user correctly matched the costume "${droppedCostume.name}" to the Cantonese Opera role "${targetRole.chineseName}" (${targetRole.name}). Provide a fascinating, short cultural fact (max 50 words) about this role or costume.`
    : `The user incorrectly tried to put the costume "${droppedCostume.name}" (which belongs to a different role) onto the "${targetRole.chineseName}" (${targetRole.name}). Briefly explain (max 50 words) what role "${droppedCostume.name}" is actually for, or a fun fact about it.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Insight unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The spirits of the opera house are quiet today. (API Error)";
  }
};
