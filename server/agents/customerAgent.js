const { OPEN_AI_API_KEY } = require("../config");
const eventEmitter = require("../eventEmitter");

class CustomerAgent {
  constructor() {
    this.userData = {
      destination: null,
      // date: null,
      // interests: null,
    };
  }

  async storeUserInputData({ key, value, askNext }) {
    this.userData[key] = value;

    const nextKey = Object.keys(this.userData).find((k) => !this.userData[k]);
    if (askNext && nextKey) {
      const nextQuestion = await this.getNextQuestion({ questionKey: nextKey });
      askNext({ questionText: nextQuestion, questionKey: nextKey });
    } else {
      await this.sendCollectedData();
    }
  }

  async sendCollectedData() {
    eventEmitter.emit("user-data-collected", {
      serviceType: "itinerary",
      data: this.userData,
    });
  }

  async processUserInput({ userInput, key, askNext }) {
    const prompt = `For the key ${key}, user answer is ${userInput}, return only the extracted structured data. Only return the pure string data, no text with it, not in JSON format`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You extract structured data.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });
    const result = await response.json();
    const data = result.choices[0].message.content;
    if (data) {
      this.storeUserInputData({ key, value: data, askNext });
    } else {
      this.storeUserInputData({ key, value: null, askNext });
    }
  }

  async getNextQuestion({ questionKey }) {
    const prompt = `For the key ${questionKey}, ask relevant question to get the user data for that key, in minimum words. Ask question relevant only to the ${questionKey}. No extra questions`;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that gathers trip planning details from users.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });
    const result = await response.json();
    const nextQuestion = result.choices[0].message.content.trim();
    return nextQuestion;
  }
}

module.exports = CustomerAgent;
