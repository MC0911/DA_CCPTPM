import pool from "../config/connectDB";

let getPageAdmin = async (req, res) => {
    try {
        // Truy vấn SQL để lấy thông tin về các tầng
        let floors = await pool.query("SELECT * FROM floors");

        // Truy vấn SQL để lấy thông tin về các bàn
        let tables = await pool.query("SELECT * FROM tables");

        // Truy vấn SQL để lấy thông tin về các đặt bàn
        let bookings = await pool.query("SELECT * FROM booktable");

        // Kết quả của các truy vấn đã được lấy thành công, truyền vào trang admin.ejs để render
        return res.render("admin.ejs", { floors: floors[0], tables: tables[0], bookings: bookings[0] });
    } catch (error) {
        console.error("Error fetching data: ", error);
        return res.status(500).send("Internal server error");
    }
};





module.exports = {
    getPageAdmin: getPageAdmin
}