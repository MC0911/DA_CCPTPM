let getHomepage = (req, res) => {
    return res.render('index.ejs', {
        user: req.user
    });
}

module.exports = {
    getHomepage
}

