const mongoose= require('mongoose')
const {db} = require('../models/index')
const User = require('../models/user')

exports.addNewUser = async (req, res) =>{
    var User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password:req.body.password
    }

    db.collection('collectors').insertOne(User, function(err, res) {
        if(err) throw err;
        console.log("One User added");
        console.log(User);
    });
}

const updateUser = async(req, res)=> {
    db.collection('collectors').findOneAndUpdateOne(
        {_username : req.body.username}, req.body, {new:true}, function(err, res){
            if(err) throw err;
            console.log("One User updated");
        }
    )
};

const deleteUser = async(req, res) => {
    var User = req.body.User
    db.collection('collectors').deleteOne(User, function(err, res) {
        if(err) throw err;
        console.log("One User deleted");
    });
}