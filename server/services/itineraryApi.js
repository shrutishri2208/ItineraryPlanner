// module.exports = {
//   getItineraryData: (data) => {
//     return {
//       status: "SUCCESS",
//       response: `Travel to ${data.destination}, from dates ${data.dates}, with specific interests in ${data.interests}`,
//     };
//   },
// };

async function getItineraryData(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "SUCCESS",
        response: `Travel to ${data.destination}, from dates ${data.dates}, with specific interests in ${data.interests}`,
      });
    }, 1000);
  });
}

module.exports = { getItineraryData };
