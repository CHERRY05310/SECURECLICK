
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ThreatAnalysisResult } from "../types";

export type AnalysisCategory = 'Auto-Detect' | 'URL' | 'Email' | 'SMS/WhatsApp' | 'Image';

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async analyzeThreat(
    content: string, 
    category: AnalysisCategory = 'Auto-Detect',
    imageUrl?: string,
    eli5: boolean = false
  ): Promise<ThreatAnalysisResult> {
    // Creating a fresh instance to ensure the most up-to-date API key
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const model = 'gemini-3-pro-preview'; 
    
    const systemInstruction = `You are the SAFECLICK "Neural-X" Advanced Forensic Engine. 
      Your task is to provide a rigorous, hyper-analytical security audit.
      
      CORE AUDIT PROTOCOL:
      1. ANALYTICAL REASONING: Break down the input logically. Don't just give a result; show the "Chain of Thought".
      2. TECHNICAL AUDIT: Scan for typosquatting, hidden redirects, character encoding tricks (Punycode), or metadata anomalies.
      3. PSYCHOLOGICAL AUDIT: Identify manipulative triggers: Urgency, Fear, Social Proof, Authority, Scarcity, or Liking.
      
      CATEGORY CONTEXT: ${category === 'Auto-Detect' ? 'Automatically identify if this is a URL, Email, or SMS first.' : category}
      
      ${eli5 ? "IMPORTANT: Use simple, clear language for the 'summary' and 'suggestedActions' (ELI5 Mode)." : "Use professional, technical cybersecurity terminology."}
      
      OUTPUT REQUIREMENTS:
      - Risk Level: 0 (Purely Safe) to 100 (Immediate Critical Threat).
      - Status: Safe, Suspicious, or Dangerous.
      - AnalyticalReasoning: A step-by-step list of your logical deductions.`;

    const prompt = `Perform a Deep Forensic Scan on the following input:
      CONTENT: "${content}"
      ${imageUrl ? "IMAGE: [Attached Screenshot provided below]" : ""}
      
      Respond STRICTLY in JSON format following the schema.`;

    const parts: any[] = [{ text: prompt }];
    if (imageUrl) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageUrl.split(',')[1]
        }
      });
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: { parts },
      config: {
        systemInstruction,
        thinkingConfig: { thinkingBudget: 4000 }, // Enable deep thinking for complex reasoning
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, enum: ['Safe', 'Suspicious', 'Dangerous'] },
            riskLevel: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            analyticalReasoning: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "A step-by-step logical breakdown of how you reached the conclusion."
            },
            technicalAudit: {
              type: Type.OBJECT,
              properties: {
                anomalies: { type: Type.ARRAY, items: { type: Type.STRING } },
                riskScore: { type: Type.NUMBER }
              },
              required: ["anomalies", "riskScore"]
            },
            psychologicalAudit: {
              type: Type.OBJECT,
              properties: {
                triggers: { type: Type.ARRAY, items: { type: Type.STRING } },
                riskScore: { type: Type.NUMBER }
              },
              required: ["triggers", "riskScore"]
            },
            suggestedActions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING }
            },
          },
          required: ["status", "riskLevel", "summary", "analyticalReasoning", "technicalAudit", "psychologicalAudit", "suggestedActions"]
        }
      }
    });

    try {
      return JSON.parse(response.text || "{}") as ThreatAnalysisResult;
    } catch (e) {
      console.error("Analysis Failed:", e);
      return {
        status: 'Suspicious',
        riskLevel: 50,
        summary: "Neural scan interrupted. The content contains complex patterns that require caution.",
        analyticalReasoning: ["Failed to complete deep-node traversal.", "Heuristic safety fallback triggered."],
        technicalAudit: { anomalies: ["Inconclusive"], riskScore: 50 },
        psychologicalAudit: { triggers: ["Unknown Manipulation Pattern"], riskScore: 50 },
        suggestedActions: ['Do not interact with the content.', 'Report to a security professional.']
      };
    }
  }

  async getChatbotResponse(message: string, history: { role: string; parts: { text: string }[] }[]) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const model = 'gemini-3-flash-preview';
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: "You are SENTINEL CORE, the central AI of SAFECLICK. You analyze cyber threats with cold, precise logic. When explaining attacks, use the 'Actionable Intelligence' approach. Guide victims through recovery steps with calm authority.",
      }
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text;
  }
}

export const gemini = new GeminiService();
