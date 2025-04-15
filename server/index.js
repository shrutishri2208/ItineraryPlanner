const Orchestrator = require("./orchestrator");
require("./agents/statusAgent");
require("./agents/apiAgent");
require("./agents/customerAgent");

const orchestrator = new Orchestrator();

orchestrator.start();
