const express = require("express");

const app = express();
app.use(express.json());

app.use("/api/test", (req, res) => {
  res.json({ message: "HELLO" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server up and running");
});
