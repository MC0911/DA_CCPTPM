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

let getAddFloorPage = (req, res) => {
    return res.render('add_floor.ejs')
}

// Thêm mới một tầng
let addFloor = async (req, res) => {
    try {
        let name = req.body.name
        await pool.query("INSERT INTO floors (name) VALUES (?)", [name]);
        return res.redirect('/admin');
    } catch (error) {
        console.error("Error adding floor: ", error);
        throw error;
    }
};


// Xóa một tầng
let deleteFloor = async (req, res) => {
    try {
        let id = req.params.id;
        await pool.query("DELETE FROM floors WHERE id = ?", [id]);
        return res.redirect('/admin');
    } catch (error) {
        console.error("Error deleting floor: ", error);
        throw error;
    }
};

let getAddTablepage = async (req, res) => {
    try {
        let floors = await pool.query("SELECT * FROM floors");
        return res.render("add_table.ejs", { floors: floors[0] });
    } catch (error) {
        console.error("Error fetching data: ", error);
        return res.status(500).send("Internal server error");
    }
};

// Thêm mới một bàn
let addTable = async (req, res) => {
    try {
        let { name, floor_id, status } = req.body;
        await pool.query("INSERT INTO tables (name, floor_id, status) VALUES (?, ?, ?)", [name, floor_id, status]);
        return res.redirect('/admin');
    } catch (error) {
        console.error("Error adding table: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

let editTablePage = async (req, res) => {
    try {
        let id = req.params.id;
        // Truy vấn SQL để lấy thông tin về bàn từ cơ sở dữ liệu
        let [table] = await pool.query("SELECT * FROM tables WHERE id = ?", [id]);
        // Truy vấn SQL để lấy thông tin về các tầng từ cơ sở dữ liệu
        let floors = await pool.query("SELECT * FROM floors");

        // Render trang edit_table.ejs và truyền dữ liệu table và floors vào
        res.render("edit_table.ejs", { table: table[0], floors: floors[0] });
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).send("Internal server error");
    }
};



// Sửa thông tin của một bàn
let editTable = async (req, res) => {
    try {
        console.log(name, floor_id, status, id)
        let { name, floor_id, status, id } = req.body;
        await pool.query("UPDATE tables SET name = ?, floor_id = ?, status = ? WHERE id = ?", [name, floor_id, status, id]);
        return res.redirect('/admin');
    } catch (error) {
        console.error("Error editing table: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Xóa một bàn
let deleteTable = async (req, res) => {
    try {
        let id = req.params.id;
        await pool.query("DELETE FROM tables WHERE id = ?", [id]);
        return res.redirect('/admin');
    } catch (error) {
        console.error("Error deleting table: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

//Xác nhận đặt bàn
// Cập nhật trạng thái của bàn thành "Trống"
let updateTableStatus = async (tableId) => {
    try {
        console.log("Updating table status to 'Trống' for table with ID:", tableId); // Thêm lệnh log vào đây
        await pool.query("UPDATE tables SET status = 'Trống' WHERE id = ?", [tableId]);
    } catch (error) {
        console.error("Error updating table status: ", error);
        throw error;
    }
};

let completeTable = async (req, res) => {
    try {
        let bookingId = req.params.id;
        let tableId = req.body.table_id;

        await pool.query("DELETE FROM booktable WHERE id = ?", [bookingId]);
        
        console.log("Calling updateTableStatus for table with ID:", tableId); // Thêm lệnh log vào đây
        await updateTableStatus(tableId);

        return res.redirect('/admin');
    } catch (error) {
        console.error("Error completing table booking: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};






module.exports = {
    getPageAdmin: getPageAdmin,
    getAddFloorPage: getAddFloorPage,
    addFloor: addFloor,
    deleteFloor: deleteFloor,
    addTable: addTable,
    editTable: editTable,
    deleteTable: deleteTable,
    getAddTablepage: getAddTablepage,
    editTablePage: editTablePage,
    completeTable: completeTable
}