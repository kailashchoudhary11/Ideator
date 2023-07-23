import { Configuration, OpenAIApi } from "openai";

export default function getOpenAi() {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);
  return openai;
}