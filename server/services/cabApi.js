async function getCabData(data) {
  return {
    status: "SUCCESS",
    response: `Cab booked from ${data.pickupLocation} to ${data.dropOffLocation}, at time ${data.dateTime}`,
  };
}

module.exports = { getCabData };
