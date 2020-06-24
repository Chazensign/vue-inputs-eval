require("dotenv").config();
const express = require("express");
const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());

app.get("/api/message", (req, res) =>
  res.status(200).send({ message: "Server is serving" })
);

app.listen(SERVER_PORT, () => console.log(`Self destruct in ${SERVER_PORT}`));
