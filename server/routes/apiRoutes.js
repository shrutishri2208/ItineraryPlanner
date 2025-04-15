const express = require("express");
const { getItineraryData } = require("../services/itineraryApi");
const { getHotelData } = require("../services/hotelApi");
const { getCabData } = require("../services/cabApi");
const router = express.Router();

router.post("/itinerary", async (req, res) => {
  const result = await getItineraryData(req.body);
  res.json(result);
});

router.post("/hotel", async (req, res) => {
  const result = await getHotelData(req.body);
  res.json(result);
});

router.post("/cab", async (req, res) => {
  const result = await getCabData(req.body);
  res.json(result);
});

module.exports = router;
