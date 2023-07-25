const app = require ('./app')
const connectDataBase = require('./Controlers/DataBase')



// connecting to database 
connectDataBase()

app.listen(8080, () =>{
    console.log(`Server running at http://localhost:${8080}`);
})