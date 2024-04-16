import pool from '../config/connectDB';

const getFloors = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM floors');
        connection.release();
        
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error occurred while fetching floors: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getTablesByFloor = async (req, res) => {
    try {
        const { floor } = req.query;
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM tables WHERE floor_id = ?', [floor]);
        connection.release();

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error occurred while fetching tables by floor: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const bookTable = async (req, res) => {
    const { table_id, name, phonenumber, date, time, people, note } = req.body;

    try {
        // Bước 1: Cập nhật trạng thái của bàn trong cơ sở dữ liệu thành "Có"
        const connection = await pool.getConnection();
        await connection.query('UPDATE tables SET status = ? WHERE id = ?', ['Có', table_id]);
        connection.release();

        // Bước 2: Kiểm tra xem người dùng đã đăng nhập hay chưa
        const user_id = req.user ? req.user.id : null;

        // Bước 3: Thêm thông tin đặt bàn vào bảng booktable
        await pool.query('INSERT INTO booktable (table_id, user_id, name, phonenumber, date, time, people, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [table_id, user_id, name, phonenumber, date, time, people, note]);

        // Gửi phản hồi thành công
        res.status(200).json({ message: 'Đặt bàn thành công' });
    } catch (error) {
        // Nếu có lỗi, gửi phản hồi lỗi
        console.error('Error booking table: ', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi đặt bàn' });
    }
};

module.exports = {
    getFloors: getFloors,
    getTablesByFloor: getTablesByFloor,
    bookTable: bookTable
};
