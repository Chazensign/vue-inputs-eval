require("dotenv").config();
const express = require("express");
const SERVER_PORT = 4321;
const userCont = require("./UserController");

const app = express();

app.use(express.json());

app.post("/user/validate", userCont.validateInputs);
app.post("/user", userCont.saveUserInfo);
app.put("/user", userCont.updateUserInfo);

app.listen(SERVER_PORT, () => console.log(`Self destruct in ${SERVER_PORT}`));
