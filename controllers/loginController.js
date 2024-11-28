const userModel = require("../models/UserModel");
const { getConfig, setConfig } = require("../models/configModel");
const jwt = require("jsonwebtoken");
const portainerService = require("../services/portainerService");

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
        { expiresIn: "8h" }
      );
      res.cookie("authToken", token);

      let portainerJWTToken = await getConfig("PORTAINERTOKEN");

      if (!portainerJWTToken) {
        portainerJWTToken = await portainerService.portainerAuthLogin();
        await setConfig("PORTAINERTOKEN", portainerJWTToken);
      }

      console.log("Portainer JWT token:", portainerJWTToken);

      res.send({ message: "Login successful!" });
    } else {
      console.log("Invalid email or password.");
      res.status(401).send("Invalid email or password.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error.");
  }
};
