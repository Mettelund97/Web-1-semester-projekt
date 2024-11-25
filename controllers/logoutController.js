exports.logout = async (req, res) => {
  res.clearCookie("authToken");
  res.redirect("/login");
};
