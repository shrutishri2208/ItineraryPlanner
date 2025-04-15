async function getItineraryData(data) {
  return {
    status: "SUCCESS",
    response: `Travel to ${data.destination}, from dates ${data.date}, with specific interests in ${data.interests}`,
  };
}

module.exports = { getItineraryData };
