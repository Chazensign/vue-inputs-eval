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
  },
  updateUserInfo: (req, res) => {
    const user = req.body;
    const index = mockDB.users.findIndex(
      savedUser => savedUser.userId === user.userId
    );
    mockDB.users[index] = user;
    res.status(200).send({ users: mockDB.users, message: "User updated." });
  },
  validateInputs: (req, res) => {
    const { inputs } = req.body;
    const validationErrors = inputs.filter(
      input => !input.value && input.type !== "checkbox"
    );

    if (validationErrors.length === 1) {
      return res
        .status(406)
        .send({ message: `${validationErrors[0].label} is required.` });
    } else if (validationErrors.length > 1) {
      const lastError = validationErrors.pop().label;
      const alertStr = validationErrors.map(input => input.label).join(", ");
      return res
        .status(406)
        .send({ message: `Fields ${alertStr} and ${lastError} are required.` });
    }

    const salaryInput = inputs.find(input => input.name === "salary");
    // eslint-disable-next-line no-useless-escape
    const regex = /^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;
    const validSalary = regex.test(salaryInput.value);

    if (!validSalary) {
      return res.status(406).send({ message: "Salary input is invalid." });
    }
    const salaryNumber = salaryInput.value.replace(/[^0-9.]/g, "");
    if (+salaryNumber < 10000) {
      return res
        .status(406)
        .send({ message: "Salary must be greater than $10,000." });
    }
    return res.status(200).send(salaryNumber);
  }
};
