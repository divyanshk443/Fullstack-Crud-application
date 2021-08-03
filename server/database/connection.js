const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongodb connection string
        // await / async will let us wait untill mongoose establish connection to mongodb
        const con = await mongoose.connect(process.env.mongodb_uri, {
            // this below will help us from unwanted warnings
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB