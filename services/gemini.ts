import { GoogleGenAI } from "@google/genai";
import { AnalysisType, VideoMetadata } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize only if key is present to avoid immediate errors, handle gracefully in UI
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const analyzeVideoContent = async (metadata: VideoMetadata, type: AnalysisType): Promise<string> => {
  if (!ai) {
    throw new Error("API Key is missing. Please configure your environment.");
  }

  let prompt = "";

  switch (type) {
    case AnalysisType.SUMMARY:
      prompt = `Provide a concise and engaging summary of a YouTube video based on the following metadata. 
      Title: "${metadata.title}"
      Channel: "${metadata.channel}"
      Description Context: "${metadata.description.slice(0, 500)}..."
      
      The summary should be bulleted and easy to read.`;
      break;
    case AnalysisType.TAGS:
      prompt = `Generate a list of 15 high-ranking, SEO-optimized YouTube tags for this video.
      Title: "${metadata.title}"
      Channel: "${metadata.channel}"
      Output format: Comma-separated list.`;
      break;
    case AnalysisType.BLOG:
      prompt = `Write a short introductory blog post (approx 200 words) promoting this video. Use an exciting tone.
      Title: "${metadata.title}"
      Channel: "${metadata.channel}"`;
      break;
    case AnalysisType.SENTIMENT:
      prompt = `Analyze the likely sentiment and target audience appeal of this video title and description.
      Title: "${metadata.title}"
      Description: "${metadata.description.slice(0, 300)}..."
      
      Provide a "Virality Score" out of 10 and explain why.`;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert video content strategist and social media manager.",
      }
    });
    return response.text || "No analysis could be generated.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze video content. Please try again.");
  }
};