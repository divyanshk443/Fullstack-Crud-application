const express =require ('express');
const dotenv =require('dotenv');
const morgan=require("morgan")
const bodyparser=require("body-parser")
const path=require("path");
const connectDB = require('./server/database/connection');
const axios=require('axios');
const app =express();
const controller=require('./server/controller/controller.js')


dotenv.config( { path :'config.env'});
const PORT=process.env.PORT||8080

// log request
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body parser
app.use(express.urlencoded({extended:true}))

// set view engine
app.set("view engine","ejs")

//load assets to our express app and as express does not allow static server files so we need to use the below function
// to avail that  static files in our application and this app.use will let the rquest from the client go throught the middleware function .

app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))



app.get('/',(req,res)=>{
    // this axios will make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
      .then(function(response)
      {
          console.log(response.data);
          res.render('index',{ users:response.data})
      })
      .catch(err=>{
          res.send(err);
      })
  
  }) 

app.get('/add-user',(req,res)=>{
    res.render('add_user');
  }) 

 
app.get('/update-user',(req,res)=>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
    .then(function(userdata){
      res.render("update_user", { user : userdata.data})
    })
    .catch(err =>{
      res.send(err);
    })
  }) 

// requests
// used postman to test the below url requests, whether it is working fine or not
app.post('/api/users',controller.create);
app.get('/api/users',controller.find);
app.put('/api/users/:id',controller.update);
app.delete('/api/users/:id',controller.delete);

app.listen(PORT, () =>{console.log(`Server is running on http://localhost:${PORT}`)});