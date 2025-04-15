const eventEmitter = require("../eventEmitter");

eventEmitter.on("api-response-ready", ({ serviceType, result }) => {
  console.log(`\n🟢 ${serviceType.toUpperCase()} booking successful:`);
  if (result.status === "SUCCESS") {
    console.log(result.response);
    process.exit(0);
  } else {
    console.log("❌ Something went wrong:", result.response);
    process.exit(0);
  }
});
