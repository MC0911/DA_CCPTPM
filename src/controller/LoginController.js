let getPageLogin = (req, res) => {
    return res.render("login.ejs");
};

let postLogOut = (req, res) => {
    req.session.destroy(function(err) {
        return res.redirect("/login");
    });
}

module.exports = {
    getPageLogin, postLogOut
}
