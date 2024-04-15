import passport from 'passport';
import LocalStrategy from 'passport-local';
import pool from '../config/connectDB';

const passportlocal = () => {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            // Tìm người dùng trong cơ sở dữ liệu
            pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
                if (err) { return done(err); }
                if (!results || results.length === 0) {
                    return done(null, false, { message: 'Tên người dùng không tồn tại' });
                }
                const user = results[0];
                // So sánh mật khẩu
                if (user.password !== password) {
                    return done(null, false, { message: 'Mật khẩu không chính xác' });
                }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        pool.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
            if (err) { return done(err); }
            const user = results[0];
            done(null, user);
        });
    });
};

export default passportlocal;
