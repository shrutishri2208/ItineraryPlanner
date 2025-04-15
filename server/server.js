const express = require("express");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "working fine" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server up and running");
});
