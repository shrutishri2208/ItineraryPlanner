async function getHotelData(data) {
  return {
    status: "SUCCESS",
    response: `Booked a hotel at ${data.city} from ${data.date} for ${data.noOfPeople} people, with a preference of ${data.foodPreference}`,
  };
}

module.exports = { getHotelData };
