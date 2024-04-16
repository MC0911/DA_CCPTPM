import pool from '../config/connectDB';


let getPageRegister = (req, res) => {
    return res.render("register.ejs");
};

let createNewUser = async (req, res) => {
    try {
        const { name, email, password, phonenumber } = req.body;

        const userItem = {
            name,
            email,
            password,
            phonenumber,
        };

        await pool.query('INSERT INTO `users` SET ?', [userItem]);

        res.redirect('/login');
        } catch (error) {
            console.error('Lỗi khi tạo người dùng mới:', error);
            res.redirect('/register');
        }
}

module.exports = {
    getPageRegister, createNewUser
}