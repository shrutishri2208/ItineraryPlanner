async function getItineraryData(data) {
  return {
    status: "SUCCESS",
    response: `Traveling to ${data.destination}, from date ${data.date}, with specific interests in ${data.interests}`,
  };
}

module.exports = { getItineraryData };
