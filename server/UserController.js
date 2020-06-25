const mockDB = require("./mockDB.json");
let newUserId = 0;

module.exports = {
  saveUserInfo: (req, res) => {
    let user = req.body;
    user.userId = newUserId;
    mockDB.users.push(user);
    res
      .status(200)
      .send({ userId: newUserId, users: mockDB.users, message: "User saved." });
    newUserId++;
  }
};
