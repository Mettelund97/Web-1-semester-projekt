const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.getLogin = (req, res) => {
  res.render("login", {
    title: "Login",
    hideSidebar: true,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.checkIfUserCanLogin(email, password);

    if (user) {
      const token = jwt.sign(
        { id: user.id, roleId: user.roleId },
        process.env.JWT_SECRET,
        { expiresIn: "4h" }
      );
      res.cookie("authToken", token);
      res.send();
    } else {
      console.log("Invalid email or password.");
      res.status(401).send("Invalid email or password.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error.");
  }
};
