const jwt = require("jsonwebtoken");

exports.ensureAuthenticated = (req, res, next) => {
  const token = req.cookies.authToken;
  // console.log(token);

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    return res.redirect("/login");
  }
};

// virker ikke
exports.ensureRole = (role) => (req, res, next) => {
  if (req.user && req.user.role === role) {
    return next();
  }
  res.status(403).json({ message: "Unauthorized" });
};
