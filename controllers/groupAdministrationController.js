exports.getGroupAdministration = async (req, res) => {
  try {
    res.render("groupAdministration", {
      groups: res.locals.groups
    });
  } catch (error) {
    console.error("Error rendering group administration:", error);
    res.status(500).send("Internal Server Error");
  }
};