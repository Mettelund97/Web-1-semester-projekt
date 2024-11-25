const portainerService = require("../services/portainerService.js");

exports.getAllStacks = async (req, res, next) => {
  try {
    console.log("Fetching stacks...");
    const stacks = await portainerService.getStacks();
    res.locals.stacks = stacks.map((stack) => ({
      id: stack.Id,
      name: stack.Name,
      status: stack.Status === 1, // 1 er active, 2 er inactive
      creationDate: new Date(stack.CreationDate).toLocaleDateString("da-DK"),
      environmentName: stack.EndpointId,
      entryPoint: `${stack.Name}.kubelab.dk`,
    }));
    console.log("Processed stacks:", res.locals.stacks);
    next();
  } catch (error) {
    console.error("Error getting stacks:", error);
    res.locals.stacks = [];
    next();
  }
};

exports.getStartNewProject = (req, res) => {
  res.render("startNewProject", {
    title: "Start new project",
  });
};

exports.createNewProject = async (req, res) => {
  try {
    const { projectname, subdomainname } = req.body;
    console.log("Creating new project:", { projectname, subdomainname });

    // Create the stack
    await portainerService.createStack(projectname, subdomainname);

    res.redirect("/");
  } catch (error) {
    console.error("Failed to create project:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create project",
    });
  }
};

exports.deleteStack = async (req, res) => {
  try {
    const stackId = req.params.stackId;
    console.log("Deleting stack with ID:", stackId);

    await portainerService.deleteStack(stackId);
    res.json({
      success: true,
      message: "Stack deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete stack:", error);
    if (error.response && error.response.status === 403) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to delete this stack",
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to delete stack",
      });
    }
  }
};

exports.startStack = async (req, res) => {
  try {
    const stackId = req.params.stackId;
    console.log("Starting stack with ID:", stackId);

    await portainerService.startStack(stackId);

    res.status(200).json({ message: "Stack started successfully" });
  } catch (error) {
    console.error("Error starting stack:", error);
    res.status(500).json({ error: "Failed to start stack" });
  }
};

exports.stopStack = async (req, res) => {
  try {
    const stackId = req.params.stackId;
    console.log("Stopping stack with ID:", stackId);

    await portainerService.stopStack(stackId);

    res.status(200).json({ message: "Stack stopped successfully" });
  } catch (error) {
    console.error("Error stopping stack:", error);
    res.status(500).json({ error: "Failed to stop stack" });
  }
};
