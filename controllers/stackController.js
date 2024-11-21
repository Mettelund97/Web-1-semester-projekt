const portainerService = require('../services/portainerService.js');

exports.getAllStacks = async (req, res, next) => {
  try {
    console.log('Fetching stacks...');
    const stacks = await portainerService.getStacks();
    res.locals.stacks = stacks.map(stack => ({
      id: stack.Id,
      name: stack.Name,
      status: stack.Status === 1, // 1 er active, 2 er inactive
      creationDate: new Date(stack.CreationDate).toLocaleDateString('da-DK'),
      environmentName: stack.EndpointId,
      entryPoint: `${stack.Name}.kubelab.dk`
    }));
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

    // Create the stack
    await portainerService.createStack(projectname, subdomainname);

    
    res.redirect('/');
  } catch (error) {
    console.error('Failed to create project:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create project'
    });
  }
};