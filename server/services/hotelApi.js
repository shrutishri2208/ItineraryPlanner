async function getHotelData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "SUCCESS",
        response: `Booked a ${data.type} at ${data.city} from ${data.dates} for ${data.noOfPeople} people, with a preference of ${data.foodPreference}`,
      });
    }, 1000);
  });
}

module.exports = { getHotelData };
