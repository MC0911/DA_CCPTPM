import mysql from 'mysql2/promise';


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'db_damh_ccptpm',
})

export default pool;
