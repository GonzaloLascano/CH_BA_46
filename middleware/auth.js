const login = (req, res, next) => {
    if(req.session?.user) {
        next();
    }
    else {
        res.render('indexLogin.hbs');
    }
}

module.exports = { login,}