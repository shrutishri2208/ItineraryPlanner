const eventEmitter = require("../eventEmitter");
const cabService = require("../services/cabApi");
const hotelService = require("../services/hotelApi");
const itineraryService = require("../services/itineraryApi");

eventEmitter.on("user-data-collected", async ({ serviceType, data }) => {
  let result = { status: null, response: null };
  try {
    if (serviceType === "cab") {
      result = cabService.getCabData(data);
    } else if (serviceType === "hotel") {
      result = hotelService.getHotelData(data);
    } else if (serviceType === "itinerary") {
      result = await itineraryService.getItineraryData(data);
    }
  } catch (error) {
    result = { status: "ERROR", response: error.message };
  }

  eventEmitter.emit("api-response-ready", { serviceType, result });
});
