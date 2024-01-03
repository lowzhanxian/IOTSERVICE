

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Todos = require('./models/Todos')


//create express app 
const app = express()


//handle cors + middleware
app.use(function(req , res , next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // If using .fetch and not axios
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
})
//end handle cors + middleware


//handle database 
const uri = "mongodb://127.0.0.1:27017/iotCentre";
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

  //end handle databse



  app.use(bodyParser.json())
  
  //handle  routes
  app.get("/device", async (req, res) => {

   const device = await Todos.find();
   console.log(device);
   res.json(device)

  });
  
  
  
  const TodosRoute = require('./routes/Todos');
   app.use('/device', TodosRoute)
  
  // start server
  app.listen(3000, () => {
    console.log("Listening at port 3000")
  })