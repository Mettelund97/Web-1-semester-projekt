const portainerService = require("../services/portainerService.js");
const StackModel = require("../models/stackModel.js");
const dbConn = require("../config/db.js");
const templateModel = require("../models/templateModel");
const dayjs = require("dayjs");
require("dayjs/locale/da");
dayjs.locale("da");

exports.getAllStacks = async (req, res, next) => {
  try {
    console.log("Fetching stacks...");
    const [portainerStacks, dbStacks] = await Promise.all([
      portainerService.getStacks(),
      StackModel.getAllStacks(),
    ]);

    res.locals.stacks = portainerStacks.map((portainerStack) => {
      // const dbStack = dbStacks.find((db) => db.title === portainerStack.Name);
      const dbStack = dbStacks.find(
        (db) => db.title.toLowerCase() === portainerStack.Name.toLowerCase()
      );

      const creator =
        dbStack && dbStack.firstName && dbStack.lastName
          ? `${dbStack.firstName} ${dbStack.lastName}`
          : "Unknown";

      const groupName = dbStack?.groupName || "No Group";

      const formatDate = (date) => {
        if (!date) return "Never";
        const timestamp =
          typeof date === "number" ? date * 1000 : new Date(date).getTime();
        return dayjs(timestamp).format("D. MMMM YYYY - HH:mm");
      };

      const creationDate = dbStack?.createdAt
        ? formatDate(dbStack.createdAt)
        : formatDate(portainerStack.CreationDate);

      return {
        id: portainerStack.Id,
        name: portainerStack.Name,
        status: portainerStack.Status === 1,
        creationDate,
        environmentName: portainerStack.EndpointId,
        entryPoint: `${dbStack?.subdomain}`,
        groupName,
        creator,
        template: dbStack?.templateName || "No template found!",
      };
    });

    console.log("Processed stacks:", res.locals.stacks);
    next();
  } catch (error) {
    console.error("Error getting stacks:", error);
    res.locals.stacks = [];
    next();
  }
};

exports.createNewProject = async (req, res) => {
  try {
    const { projectname, template } = req.body;
    const selectedTemplate = await templateModel.getTemplateById(template);

    if (!selectedTemplate) {
      throw new Error("Selected template not found");
    }

    const [userGroups] = await dbConn.query(
      `SELECT g.id as groupId, g.name as groupName 
       FROM UserGroup ug 
       JOIN \`Groups\` g ON ug.groupId = g.id 
       WHERE ug.userId = ?`,
      [req.user.id]
    );

    const groupId = userGroups.length > 0 ? userGroups[0].groupId : null;
    console.log(
      "User's group:",
      userGroups.length > 0 ? userGroups[0] : "No group found"
    );

    console.log("Creating new project:", {
      projectname,
      selectedTemplate,
      userGroups,
    });

    // // const replacedService = selectedTemplate.service
    // //   .replace(/CHANGEME/g, websiteId)
    // //   .replace(/SUBDOMAIN/g, subdomainname);

    // Object.entries(req.body).map((param) => {
    //   const key = param[0];
    //   const value = param[1];

    //   if (key.includes("SUBDOMAIN")) {
    //     selectedTemplate.service = selectedTemplate.service.replace(key, value);
    //   }
    // });

    const websiteId = Math.random().toString(36).substring(7);

    // Replace CHANGEME with websiteId in selectedTemplate.service
    selectedTemplate.service = selectedTemplate.service.replace(
      /CHANGEME/g,
      websiteId
    );

    // Now, continue with the rest of the code
    Object.entries(req.body).map((param) => {
      const key = param[0];
      const value = param[1];

      if (key.includes("SUBDOMAIN")) {
        selectedTemplate.service = selectedTemplate.service.replace(key, value);
      }
    });

    const portainerStack = await portainerService.createStack(
      projectname,
      selectedTemplate.service
    );

    const stackData = {
      title: projectname,
      // subdomain: `${subdomainname}`,
      subdomain: "TEST2",
      status: true,
      template: selectedTemplate.id,
      userId: req.user.id,
      groupId: groupId,
      portainerStackId: portainerStack.Id,
      createdAt: new Date(),
    };

    console.log("Saving stack to database with data:", stackData);
    await StackModel.createStack(stackData);

    res.redirect("/");
  } catch (error) {
    console.error("Failed to create project:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create project",
    });
  }
};

exports.getStartNewProject = (req, res) => {
  res.render("startNewProject", {
    title: "Start new project",
  });
};

exports.deleteStack = async (req, res) => {
  try {
    const stackId = req.params.stackId;
    console.log("Deleting stack with ID:", stackId);

    // Delete from Portainer
    await portainerService.deleteStack(stackId);

    // Delete from database
    await StackModel.deleteStack(stackId);

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
