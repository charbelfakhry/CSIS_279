const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');
const https = require('https');
const http = require('http');
const app = express();
const helmet = require("helmet");
const morgan = require('morgan');
var schedule = require('node-schedule')
var useragent = require('express-useragent');

const expressip = require('express-ip');
var cron = require("node-cron")
var axios = require("axios");
const connection = require('./config/database.config');
var moment = require("moment-timezone");


// SETUP MIDDLEWARE
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short')); // combine

app.use(cors());
app.use(helmet());
app.enable('trust proxy');
app.use(useragent.express());
app.use(expressip().getIpInfoMiddleware);


const port = 3001

var routes = require('./routes/route')
app.use('/', cors(), routes);

var task = cron.schedule('* * * * *', () => {
    console.log("this will be triggered every minute");
    //listCryptoCurrencies();
});


const listCryptoCurrencies = async () => {

    /**
     * this is the constant url for the external API.
     */
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,ENJ,DOT,ADA,DOGE,LTC,XRP,BCH,XMR,NEO&tsyms=USD`;
    /**
     * We are loading the results from the url using the fetch functionality.
     */

    let response = await axios.get(url);
    let result = response.data;
    console.log(result);
    /**
     * Parsing the data into JSON Object.
     */
    // let result = await response.json();
    let data = [];

    /**
     * Parsed the JSON Object to array for 
     * looping.
     */
    Object.keys(result.RAW).map((key)=>{
      let item = {
        NAME: key,
        PRICE: Number(result.RAW[key].USD.PRICE).toFixed(2),
        OPEN24HOUR: Number(result.RAW[key].USD.OPEN24HOUR).toFixed(2),
        VOLUME24HOUR: Number(result.RAW[key].USD.VOLUME24HOUR).toFixed(2),
        OPENDAY: Number(result.RAW[key].USD.OPENDAY).toFixed(2),
        CHANGEPCT24HOUR: Number(result.RAW[key].USD.CHANGEPCT24HOUR).toFixed(2),
      }
      data.push(item);
    });

    // console.log(data);

    beforeInsertCoin(data);

  }

  const fillData = async (data) => {

    for(let i in data)
    {
        let coin = data[i];
        let sql = `insert into coins (coin_date, NAME, PRICE, OPEN24HOURS, VOLUME24HOUR, OPENDAY, CHANGEPCT24HOUR)\
         values ("${moment(new Date()).format("YYYY-MM-DD")}", "${coin.NAME}", "${coin.PRICE}", "${coin.OPEN24HOUR}", "${coin.VOLUME24HOUR}", "${coin.OPENDAY}", "${coin.CHANGEPCT24HOUR}")`;

        //  console.log(sql);
         connection.query(sql, (error, result)=>{
             if(error) throw error;
         })
    }

  }

  const updateCoins = (data) => {
    for(let i in data)
      {
          let coin = data[i];
          let sql = `update coins set NAME = "${coin.NAME}", PRICE = "${coin.PRICE}", OPEN24HOURS = "${coin.OPEN24HOURS}", VOLUME24HOUR = "${coin.VOLUME24HOUR}", OPENDAY = "${coin.OPENDAY}", CHANGEPCT24HOUR = "${coin.CHANGEPCT24HOUR}"`;
          console.log("update");
          connection.query(sql, (error, result)=>{
              if(error) throw error;

          })
      }
      
  }

  const beforeInsertCoin = (data) => {
      let sql = `select * from coins where coin_date = date(now())`;
      connection.query(sql, (error, result)=>{
          if(error) throw error;
          if(result.length > 0)
          {
              updateCoins();
          }else{
              fillData(data);
          }
      })
  }



// task.start();
// listCryptoCurrencies();


app.listen(port, () => {
    console.log(`App server is listening at http://localhost:${port}`)
})