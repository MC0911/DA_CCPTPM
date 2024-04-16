import pool from "../config/connectDB";

let findUserByEmail = async (email) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM `users` WHERE `email` = ?', [email]);
        if (rows.length > 0) {
            let user = rows[0];
            return user;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

let findUserById = async (id) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM `users` WHERE `id` = ?', [id]);

        if (rows.length > 0) {
            let user = rows[0];
            return user;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

let comparePassword = (password, user) => {
    return new Promise((resolve, reject) => {
        try {
            if (password === user.password) {
                resolve(true);
            } else {
                resolve(`Mật khẩu bạn đã nhập không chính xác!!`);
            }
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
    comparePassword: comparePassword
};
