const mongoose = require('mongoose')

const connectDataBase = () => {
    mongoose.connect('mongodb://localhost:27017/Productreviews').then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
}).catch((err) => {
        throw err;
    })
}
module.exports = connectDataBase 