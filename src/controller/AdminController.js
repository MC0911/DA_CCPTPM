import pool from "../config/connectDB";


let getFoodmenu= async (req, res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM `food` ');

    return res.render('admin.ejs',{dataFoodmenu: rows})
}


let getAddFoodpage = (req, res) => {
    return res.render('admin-add.ejs')
}

let addFood = async (req, res) => {
    let {food_name, food_loai, food_gia, food_img} = req.body;
    await pool.execute('INSERT INTO food(food_name, food_loai, food_gia, food_img) values(?, ?, ?, ?)', 
    [food_name, food_loai, food_gia, food_img]);
    return res.redirect('/admin')
}

let deleteFood = async (req, res) => {
    let foodId = req.body.food_id;
    await pool.execute('DELETE FROM food WHERE food_id = ?', [foodId])
    return res.redirect('/admin');
}

let getEditPage = async (req, res) => {
    let foodId = req.params.food_id;
    let [food] = await pool.execute(`SELECT * FROM food WHERE food_id  = ?`, [foodId]);
    return res.render('admin-edit.ejs',{dataFoodmenu: food[0] });
}

let postUpdateFood = async (req, res) => {
    let {food_name, food_loai, food_gia, food_img, food_id} = req.body;
    await pool.execute('UPDATE food SET food_name= ?, food_loai = ? , food_gia = ? , food_img= ? WHERE food_id = ?',
        [food_name, food_loai, food_gia, food_img, food_id]);
    return res.redirect('/admin');
}

let getBookTablepage = async(req, res) =>{
    const [rows, fields] = await pool.execute('SELECT * FROM `booktable` ');
    return res.render('admin-booktable.ejs',{databooktable: rows})
}

let deleteBookTable = async (req, res) => {
    let booktableId = req.body.booktable_id;
    await pool.execute('DELETE FROM booktable WHERE booktable_id = ?', [booktableId])
    return res.redirect('/admin-booktable');
}



module.exports = {
    getFoodmenu, getAddFoodpage, addFood, deleteFood, getEditPage, postUpdateFood, getBookTablepage, deleteBookTable
}