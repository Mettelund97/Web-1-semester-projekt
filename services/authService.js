const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");

exports.protectedRoutes = (req, res, next) => {
  const token = req.cookies.authToken;
  // console.log("current logged in user auth-token:", token);

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log("current logged in user roleId:", req.user.roleId);
    next();
  } catch (error) {
    return res.redirect("/login");
  }
};

exports.authorizeRole = (roleId) => async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      console.log("No user information found in request.");
      return res.redirect("/login");
    }

    const user = await userModel.getUserById(req.user.id);

    if (user && user.roleId === roleId) {
      return next();
    }

    console.log("Access denied, you are not authorized to visit that page.");
    return res.redirect("/");
  } catch (error) {
    console.error("Error checking user role:", error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.authorizeRoles = (allowedRoles) => async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      console.log("No user information found in request.");
      return res.redirect("/login");
    }

    const user = await userModel.getUserById(req.user.id);

    if (user && allowedRoles.includes(user.roleId)) {
      return next();
    }

    console.log("Access denied, you are not authorized to visit that page.");
    return res.redirect("/?error=accessDenied");
  } catch (error) {
    console.error("Error checking user role:", error);
    return res.status(500).send("Internal Server Error");
  }
};
