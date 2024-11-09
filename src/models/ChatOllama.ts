import { BaseLanguageModel } from "langchain/base_language";
import { AIMessage, BaseMessage, HumanMessage } from "langchain/schema";

export class ChatOllama extends BaseLanguageModel {
  private baseUrl: string;
  private model: string;
  private temperature: number;

  constructor({ baseUrl, model, temperature = 0.7 }) {
    super();
    this.baseUrl = baseUrl;
    this.model = model;
    this.temperature = temperature;
  }

  async call(messages: BaseMessage[]): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        messages: messages.map(m => ({
          role: m._getType(),
          content: m.content,
        })),
        temperature: this.temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.message.content;
  }
}
