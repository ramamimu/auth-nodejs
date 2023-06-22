const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/", (req, res) => {
  res.send("Hello API");
});

app.listen(4444, () => {
  console.log("Server running on", 4444);
});
