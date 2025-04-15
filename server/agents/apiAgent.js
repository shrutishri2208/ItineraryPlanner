const eventEmitter = require("../eventEmitter");

eventEmitter.on("user-data-collected", async ({ serviceType, data }) => {
  let result = { status: null, response: null };
  try {
    if (serviceType === "cab") {
      result = await callApi("cab", data);
    } else if (serviceType === "hotel") {
      result = await callApi("hotel", data);
    } else if (serviceType === "itinerary") {
      result = await callApi("itinerary", data);
    }
  } catch (error) {
    result = { status: "ERROR", response: error.message };
  }

  eventEmitter.emit("api-response-ready", { serviceType, result });
});

async function callApi(endpoint, data) {
  try {
    const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log("RESULT", result);
    return result;
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
}
