const { stopStack } = require("../services/portainerService");
exports.getMembers = async (req, res) => {
  const stackId = 85;
  const stopResult = await stopStack(stackId);
  console.log(`Stack ${stackId} stopped successfully:`, stopResult);

  res.render("members", {
    title: "Members",
  });
};
