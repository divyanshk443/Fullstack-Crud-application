var userdb=require('../model/model.js');

// create and sava new user
exports.create= (req,res)=> {
 
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return ;
    }
    // new user
    const user=new userdb({
        name:  req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status:req.body.status
    })

    //save user in the database
    user
       .save(user)
       .then(data=>{
           res.redirect('/');
           //res.send(data)
       })
       .catch(err=>{
           res.status(500).send({
               message: err.message || "Some error occured while creating a create operation"
           })
       })
}

// retrieve and return all users/ single user
exports.find= (req,res)=> {
    if(req.query.id)
    {
       const id =req.query.id;
       userdb.findById(id)
       .then(data =>{
           if(!data)
           {
               res.status(404).send({message: "Not found user with id :"+id})
           }
           else{
               res.send(data)
               res.redirect('/add-user');
           }
       })
       .catch(err=>{
        res.status(500).send({
            message:err.message ||`Error occured while retrieving a user with id : ${id}`
        })
        })     
    }
    else
    {
        userdb.find()
        .then(userdata=>{
            res.send(userdata)
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message ||"Error occured while retrieving users"
            })
        })      
    }
}

//update a new user by user id
exports.update= (req,res)=> {
  if(!req.body)
  {
      return res.status(400).send({message:"Data to update can not be empty "})
  }
  const id=req.params.id;
  userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
  .then(data=>{
      if(!data){
          res.status(404).send({message: `Cannot update user with ${id} `})
      }
      else{
           
        res.send(data);
          
    }
  })
  .catch(err=>{
      res.status(500).send({message: "Error occured while doing Update "})
  })
}

// delete a user with specifies user id in the requests
exports.delete= (req,res)=> {
  const id= req.params.id;
  userdb.findByIdAndDelete(id)
  .then(data=>{
    if(!data){
        res.status(404).send({message: `Cannot delete user with ${id} `})
    }
    else{
        res.send(data)
    }
})
   .catch(err=>{
      res.status(500).send({message: "Error occured while deleting "})
    }) 

 }