const express = require('express');
const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://127.0.0.1:27017/docvita_assignment';
const app = express();
const PORT =  8001;
const bookingRouter = require("./routes/bookingRoutes")


const start = async () => {
    try {
      try {
         await mongoose.connect(MONGO_URI, {
          useNewUrlParser: true,
        });
        console.log('MongoDB Connected');
      } catch (error) {
        console.error(error.message);
        process.exit(1);
      }


        app.set('view engine', 'ejs');
       
       
      app.use(express.json());

      app.use(function (req, res, next){
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        next();
      })
      
      app.use("/", bookingRouter);

      

      app.listen(PORT, () => console.log("Server started on port 8001"));

      
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  start();