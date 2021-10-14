
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require('../config/database.config.js');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Getting the orders data with joins to all
 * tables that are linked to the orders.
 */
exports.getOrderWithAssData = async (req, res) => {
    // const { ProductName } = req.body;
    let sql = `call order_by_productName();`;
    connection.query(sql, (error, result)=>{
        if(error) throw error;
        res.status(200).send(result[0]);
    })

}