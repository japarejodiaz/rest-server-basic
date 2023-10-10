const mongoose = require('mongoose');

const dbConnection = async (    ) => {

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect( process.env.MONGODB_CONN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
            });
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.log(err);
        throw new Error('Error a la hora de conectar a la base de datos');
    }

}

module.exports = {
    dbConnection
}
