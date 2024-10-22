import conf from "../../conf/conf";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = conf.geminiApiKey;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const response= async(prompt)=>{
  const result = await model.generateContent(prompt);
  return result
}

export default response;
