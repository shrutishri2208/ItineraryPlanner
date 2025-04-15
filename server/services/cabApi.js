async function getCabData(data) {
  return {
    status: "SUCCESS",
    response: `Cab booked from ${data.pickup} to ${data.dropOff}, at time ${data.pickupTime}`,
  };
}

module.exports = { getCabData };
