require("dotenv").config();
const express = require("express");
const { SERVER_PORT } = process.env;
const userCont = require("./UserController");

const app = express();

app.use(express.json());

app.post("/api/user", userCont.saveUserInfo);

app.listen(SERVER_PORT, () => console.log(`Self destruct in ${SERVER_PORT}`));
