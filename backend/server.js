const app = require ('./app')
const connectDataBase = require('./Controlers/DataBase')
const dotenv = require('dotenv').config({path : './dot.env'})

let myPort = process.env.PORT

// connecting to database 
connectDataBase()

app.listen(myPort || 8080, () =>{
    console.log(`Server running at http://localhost:${myPort}`);
})