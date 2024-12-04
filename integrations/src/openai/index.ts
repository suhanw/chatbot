import OpenAI from "openai";
import { IMessage } from "@data";
import { GenAIClient } from "../";

const openai = new OpenAI();

export class OpenAIClient implements GenAIClient {
  async generateResponse(messages: IMessage[]) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    return completion;
  }
}
