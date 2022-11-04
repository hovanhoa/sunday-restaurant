const authenicateUser = (permission) => {
    return (req, res, next) => {
        let userRole = null;
        if (req.session.user) {
            userRole = req.session.user.role;
        }
        if (permission.includes(userRole)) {
            next();
        }
        else {
            res.status(401).send('<h1>You don\'t have permission to access this page</h1>');
        }
    };
}
module.exports = authenicateUser;