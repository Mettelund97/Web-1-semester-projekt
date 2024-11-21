const userModel = require("../models/UserModel");
const configModel = require("../models/configModel");
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
        { expiresIn: "8h" }
      );
      res.cookie("authToken", token);

      // when login is accpcted, then get the jwttoken to portainer.
      fetch("https://portainer.kubelab.dk/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "ABMM",
          password: "Ladida.12",
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const portainerJWTToken = data.jwt;

          if (portainerJWTToken) {
            configModel.setConfig("PORTAINERTOKEN", portainerJWTToken);
            // console.log(configModel.getConfig("PORTAINERTOKEN"));
          } else {
            console.error("JWT token not found in response.");
          }

          const decoded = jwt.decode(portainerJWTToken);
          console.log("decoded", decoded);
          console.log("jwt", portainerJWTToken);
          if (!decoded || !decoded.exp) {
            console.error("Invalid token");
            return null;
          }

          const timeNow = Math.floor(Date.now() / 1000);
          if (decoded.exp < timeNow) {
            console.log("Token has expired.");
            return null;
          }

          if (!portainerJWTToken) {
            // setting new jwt token, when curret is expired.
            configModel.setConfig("PORTAINERTOKEN", portainerJWTToken);
            console.error("YOUR JWT-TOKEN IS EXPIRED!");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

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
