const readline = require("readline");
const CustomerAgent = require("./agents/customerAgent");

class Orchestrator {
  constructor() {
    this.customerAgent = new CustomerAgent();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  start() {
    this.rl.question(
      "What do you need help with?\n1. Planning a trip \n2. Booking a hotel or restaurant \n3. Booking a cab \n\n",
      (input) => {
        if (input === "1" || input === "1.") {
          this.ask({
            questionText: "Where are you planning to go next?",
            serviceType: "itinerary",
            questionKey: "destination",
          });
        } else if (input === "2" || input === "2.") {
          this.ask({
            questionText: "Which city are planning for?",
            serviceType: "hotel",
            questionKey: "city",
          });
        } else if (input === "3" || input === "3.") {
          this.ask({
            questionText: "What is the pickup location?",
            serviceType: "cab",
            questionKey: "pickupLocation",
          });
        }
      }
    );
  }

  ask({ questionText, serviceType, questionKey }) {
    this.rl.question(`${questionText}\n`, async (input) => {
      await this.customerAgent.processUserInput({
        userInput: input,
        questionKey: questionKey,
        serviceType: serviceType,
        askNext: this.askNext.bind(this),
      });
    });
  }

  askNext({ questionText, serviceType, questionKey }) {
    this.ask({ questionText, questionKey, serviceType });
  }
}

module.exports = Orchestrator;
