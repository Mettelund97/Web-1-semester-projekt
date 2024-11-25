exports.getMembers = async (req, res) => {
  res.render("members", {
    title: "Members",
  });
};
