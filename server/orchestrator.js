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
    this.ask({
      questionText: "Where are you planning to go next?",
      questionKey: "destination",
    });
  }

  ask({ questionText, questionKey }) {
    this.rl.question(`${questionText}\n`, async (input) => {
      await this.customerAgent.processUserInput({
        userInput: input,
        key: questionKey,
        askNext: this.askNext.bind(this),
      });
    });
  }

  askNext({ questionText, questionKey }) {
    this.ask({ questionText, questionKey });
  }
}

module.exports = Orchestrator;
