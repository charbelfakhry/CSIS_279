
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require('../config/database.config.js');


exports.getAll = async (req, res) => {
    let tableName = "users";
    let sql = `SELECT * FROM ${tableName}`;
    connection.query(sql, (error, result)=>{
        if(error) throw error;
        res.status(200).send(result);
    })

}







exports.updateProduct = (req, res) => {
    const {id, name, username, password, occupation, hobby, age} = req.body;

    let saveSQL = "";
    if(id && id !== ''){
        saveSQL = `UPDATE users set user_name = "${name}", user_username = "${username}", user_password = "${password}",\
        user_occupation = "${occupation}", user_hobby = "${hobby}", user_age="${age}"\
        WHERE user_id = ${id}`;
    }else{
        saveSQL = `INSERT INTO users (user_name, user_username, user_password, user_occupation, user_hobby) VALUES\
        ("${name}", "${username}", "${password}", "${occupation}", "${hobby}" )`;
    }

    console.log(saveSQL);

    connection.query(saveSQL, (err, result)=>{
        if(err) throw err;
        res.status(200).send({msg: "User Saved."});
    })
}

exports.insertProduct = (req, res) => {


    const { 
        ProductName, 
        SupplierID, 
        CategoryID, 
        UnitPrice,
        UnitsInStock,
        UnitsOnOrder,
        ReorderLevel,
        Discontinued 
    } = req.body;

    let sql = `INSERT INTO products (ProductName, SupplierID, CategoryID, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)\
     VALUES\
      ("${ProductName}","${SupplierID}", ,"${CategoryID}", ,"${UnitPrice}", ,"${UnitsInStock}", ,"${UnitsOnOrder}", ,"${ReorderLevel}", "${Discontinued}")`;
    console.log(sql)

    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).send(result)

    })

}

exports.deleteProduct = (req, res) => {
    const { user_id } = req.body
    let sql = `delete from users WHERE user_id=${user_id}`;
    console.log(sql);
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).send(result)

    })
}

exports.loadProducts = (req, res) =>{
    let sql = `select * from products`;
    connection.query(sql, (err, result)=>{
        if(err) throw err;
        res.status(200).send(result);
    })
}

