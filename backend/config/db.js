const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        const connectMongo = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          console.log(`MongoDB Connected: ${connectMongo.connection.host}`);

    }
    catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with a non-zero status code to indicate an error
    }
}

module.exports= connectDB;