// import pool from '../config/connectDB';

// let getBooktablepage = (req, res) => {
//     return res.render('booktable.html', {
//         user: req.user
//     });
// }

// let postBooktable = async (req, res) => {
//     try {
//         const {
//             booktable_people,
//             booktable_time,
//             booktable_day,
//             booktable_phone,
//             booktable_note
//         } = req.body;

//         if (!booktable_people || !booktable_time || !booktable_day || !booktable_phone || !booktable_note) {
//             return res.status(400).send('Dữ liệu từ form không đầy đủ');
//         }

//         const userId = req.user.id;
//         const userName = req.user.name;
//         const userEmail = req.user.email;

//         const booktableData = {
//             user_id: userId,
//             user_name: userName,
//             booktable_phone: booktable_phone,
//             booktable_day:  booktable_day,
//             booktable_time: booktable_time,
//             booktable_people: booktable_people,
//             user_email: userEmail,
//             booktable_note: booktable_note
//         };

//         await insertBooktable(booktableData);

//         return res.redirect('/booktable'); // Chuyển hướng đến trang thành công
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Lỗi máy chủ nội bộ');
//     }
// };

// let insertBooktable = async (booktableData) => {
//     try {
//         const {
//             user_id,
//             user_name,
//             booktable_phone,
//             booktable_day,
//             booktable_time,
//             booktable_people,
//             user_email,
//             booktable_note
//         } = booktableData;

//         const query = `
//             INSERT INTO booktable (user_id, user_name, booktable_phone, booktable_day, booktable_time, booktable_people, user_email, booktable_note)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         await pool.query(query, [user_id, user_name, booktable_phone, booktable_day, booktable_time, booktable_people, user_email, booktable_note]);

//         console.log("Dữ liệu đã được chèn vào bảng Booktable thành công!");
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports = {
//     getBooktablepage,
//     postBooktable
// };
