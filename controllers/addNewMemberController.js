exports.getAddNewMember = (req, res) => {
  const roles = res.locals.roles || [];
  const groups = res.locals.groups || [];
  
  res.render('addNewMember', {
      roles: roles,
      groups: groups,
      title: 'Add New Member'
  });
};