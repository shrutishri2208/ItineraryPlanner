async function getCabData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "SUCCESS",
        response: `Cab booked from ${data.pickup} to ${data.dropOff}, at time ${data.pickupTime}`,
      });
    }, 1000);
  });
}

module.exports = { getCabData };
