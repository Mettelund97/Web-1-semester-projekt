exports.getMembers = (req, res) => {
    const users = res.locals.users || [];
    console.log("Users data in members controller:", users); 
    res.render('members', {
        users: users
    });
};