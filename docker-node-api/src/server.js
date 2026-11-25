const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || "development";

const users = [
  { id: 1, name: "Suyog" },
  { id: 2, name: "Rahul" },
];

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Docker Node API!",
    environment: APP_ENV,
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API is running",
  });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});