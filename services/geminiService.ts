
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { Language } from "../translations";

const API_KEY = process.env.API_KEY || "";

export const getStyleAdvice = async (userPrompt: string, lang: Language = 'en', imageData?: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `You are an elite master barber at 'The G-Burg Cut' in Gaithersburg, MD. 
  Your goal is to provide professional, trendy, and personalized hair and beard styling advice. 
  Keep your tone cool, expert, and encouraging. 
  When suggesting styles, consider the user's input and image (if provided).
  Focus on modern trends like fades, crops, and well-groomed beards.
  IMPORTANT: You must provide your response in the language: ${lang === 'es' ? 'Spanish' : lang === 'ru' ? 'Russian' : 'English'}.`;

  const contents: any[] = [{ text: userPrompt }];
  
  if (imageData) {
    contents.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageData.split(',')[1] // Remove base64 prefix
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts: contents },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendation: { type: Type.STRING, description: "A detailed style recommendation" },
            tips: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Pro tips for achieving this look"
            },
            maintenance: { type: Type.STRING, description: "How to maintain this style" }
          },
          required: ["recommendation", "tips", "maintenance"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

/**
 * Visualizes a specific haircut on a provided user image.
 */
export const visualizeHaircut = async (baseImageData: string, styleName: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Modify the hair in this image to be a ${styleName}. 
  Preserve the person's face, features, and the background exactly as they are. 
  Only change the hairstyle to a professionally cut ${styleName}. 
  Ensure the results look photorealistic and natural as if taken in a barbershop.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: baseImageData.split(',')[1],
              mimeType: 'image/jpeg'
            }
          },
          { text: prompt }
        ]
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image part returned from Gemini");
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};

/**
 * Generates a video preview of a specific haircut.
 */
export const generateHaircutVideo = async (baseImageData: string, styleName: string) => {
  // Create a fresh instance to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `A professional cinematic preview showing a person with a fresh ${styleName} haircut. The hair should have realistic texture and slight natural movement. The background is a high-end modern barbershop with soft bokeh lighting. High quality, 4k detail.`;

  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt,
      image: {
        imageBytes: baseImageData.split(',')[1],
        mimeType: 'image/jpeg',
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '9:16'
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed: No URI returned.");

    const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const videoBlob = await videoResponse.blob();
    return URL.createObjectURL(videoBlob);
  } catch (error: any) {
    console.error("Video Generation Error:", error);
    if (error.message?.includes("Requested entity was not found")) {
      throw new Error("API_KEY_RESET");
    }
    throw error;
  }
};

export const getNearbyPlaces = async (lat?: number, lng?: number, lang: Language = 'en') => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `What are some highly-rated coffee shops or restaurants near Main Street in Gaithersburg, MD? Provide a brief summary. Answer in ${lang === 'es' ? 'Spanish' : lang === 'ru' ? 'Russian' : 'English'}.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: lat && lng ? {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        }
      } : undefined
    },
  });

  return {
    text: response.text,
    chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const createBarberChat = (lang: Language): Chat => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const languageName = lang === 'es' ? 'Spanish' : lang === 'ru' ? 'Russian' : 'English';
  
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the friendly AI assistant for 'The G-Burg Cut', a premium barbershop located in Gaithersburg, Maryland.
      Your job is to answer questions about our shop, our services (Haircuts, Beard Trims, Fades, etc.), and general grooming tips.
      Our location is 123 Main St, Gaithersburg, MD 20878.
      Be concise, professional, and slightly edgy/modern in your tone. 
      If users want to book, tell them to click the 'Book Now' button in the navbar.
      ALWAYS respond in ${languageName}.`,
    },
  });
};
