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
      ? `Correct! The ${targetRole.name} is a key role in Cantonese Opera.`
      : `Not quite. That was ${droppedCostume.name}.`;
  }

  const prompt = isCorrect
    ? `The user correctly matched the costume "${droppedCostume.name}" to the Cantonese Opera role "${targetRole.chineseName}" (${targetRole.name}). Provide a fascinating, very short cultural fact (max 30 words) about this role or costume.`
    : `The user incorrectly tried to put the costume "${droppedCostume.name}" (which belongs to a different role) onto the "${targetRole.chineseName}" (${targetRole.name}). Briefly explain (max 30 words) what role "${droppedCostume.name}" is actually for.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.trim() || "Insight unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The spirits of the opera house are quiet today.";
  }
};