const portainerService = require('../services/portainerService.js');
const StackModel = require('../models/stackModel.js');
const dayjs = require('dayjs');

exports.getAllStacks = async (req, res, next) => {
  try {
    console.log('Fetching stacks...');
    // Get stacks from both Portainer and database
    const [portainerStacks, dbStacks] = await Promise.all([
      portainerService.getStacks(),
      StackModel.getAllStacks()
    ]);

    // Map Portainer stacks and combine with DB data
    res.locals.stacks = portainerStacks.map(portainerStack => {
      const dbStack = dbStacks.find(db => db.title === portainerStack.Name);
      
      // Format creator name
      const creator = dbStack && dbStack.firstName && dbStack.lastName 
        ? `${dbStack.firstName} ${dbStack.lastName}`
        : 'Unknown';

      // Format dates
      const formatDate = (date) => {
        return date ? new Date(date).toLocaleString('da-DK', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }) : 'Never';
      };

      return {
        id: portainerStack.Id,
        name: portainerStack.Name,
        status: portainerStack.Status === 1,
        creationDate: formatDate(portainerStack.CreationDate),
        environmentName: portainerStack.EndpointId,
        entryPoint: `${portainerStack.Name}.kubelab.dk`,
        creator,
        lastStarted: formatDate(dbStack?.lastStarted),
        lastStopped: formatDate(dbStack?.lastStopped),
        template: dbStack?.template || 'wordpress'
      };
    });

    console.log('Processed stacks:', res.locals.stacks);
    next();
  } catch (error) {
    console.error('Error getting stacks:', error);
    res.locals.stacks = [];
    next();
  }
};

exports.getStartNewProject = (req, res) => {
  res.render("startNewProject", {
    title: "Start new project"
  });
};

exports.createNewProject = async (req, res) => {
  try {
    const { projectname, subdomainname } = req.body;
    console.log('Creating new project:', { projectname, subdomainname });

    // Create the stack in Portainer
    const portainerStack = await portainerService.createStack(projectname, subdomainname);

    // Save stack information to database with proper userId
    const stackData = {
      title: projectname,
      subdomain: `${subdomainname}.kubelab.dk`,
      status: true, 
      template: 'wordpress', 
      userId: req.user.id 
    };

    console.log('Saving stack to database with data:', stackData);
    await StackModel.createStack(stackData);

    res.redirect('/');
  } catch (error) {
    console.error('Failed to create project:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create project'
    });
  }
};

exports.deleteStack = async (req, res) => {
  try {
    const stackId = req.params.stackId;
    console.log('Deleting stack with ID:', stackId);

    // Delete from Portainer
    await portainerService.deleteStack(stackId);
    
    // Delete from database
    await StackModel.deleteStack(stackId);

    res.json({
      success: true,
      message: 'Stack deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete stack:', error);
    if (error.response && error.response.status === 403) {
      res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this stack'
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete stack'
      });
    }
  }
};