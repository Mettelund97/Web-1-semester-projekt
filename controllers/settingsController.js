const { startStack } = require("../services/portainerService");

exports.getSettings = async (req, res) => {
  const stackId = 85;
  const startResult = await startStack(stackId);
  console.log(`Stack ${stackId} started successfully:`, startResult);
  res.render("settings", {
    title: "Settings",
  });
};
