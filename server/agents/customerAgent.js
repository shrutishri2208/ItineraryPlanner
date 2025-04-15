const { OPEN_AI_API_KEY } = require("../config");
const eventEmitter = require("../eventEmitter");

class CustomerAgent {
  constructor() {
    this.userData = {
      itinerary: {
        destination: null,
        // date: null,
        // interests: null,
      },
      hotel: {
        // type: null,
        city: null,
        date: null,
        noOfPeople: null,
        foodPreference: null,
      },
      cab: {
        pickupLocation: null,
        dropOffLocation: null,
        date: null,
      },
    };
  }

  async storeUserInputData({ questionKey, serviceType, value, askNext }) {
    this.userData[serviceType][questionKey] = value;

    const nextKey = Object.keys(this.userData[serviceType]).find(
      (k) => !this.userData[serviceType][k]
    );
    if (askNext && nextKey) {
      const nextQuestion = await this.getNextQuestion({ questionKey: nextKey });
      askNext({
        questionText: nextQuestion,
        serviceType,
        questionKey: nextKey,
      });
    } else {
      await this.sendCollectedData({ serviceType });
    }
  }

  async sendCollectedData({ serviceType }) {
    eventEmitter.emit("user-data-collected", {
      serviceType: serviceType,
      data: this.userData[serviceType],
    });
  }

  async processUserInput({ userInput, questionKey, serviceType, askNext }) {
    const prompt = `For the key ${questionKey}, user answer is ${userInput}, return only the extracted structured data. Only return the pure string data, no text with it, not in JSON format`;

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
      this.storeUserInputData({
        questionKey,
        serviceType,
        value: data,
        askNext,
      });
    } else {
      this.storeUserInputData({
        questionKey,
        serviceType,
        value: null,
        askNext,
      });
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
