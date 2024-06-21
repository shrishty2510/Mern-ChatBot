const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require('../config/generateToken')



const allUsers = asyncHandler(async(req,res)=>{
      const keyword = req.query.search? {
        $or:[{ name:{$regex:req.query.search, $options:"i"}},
        { email:{$regex:req.query.search, $options:"i"}}]
      }:{}
      const users = await User.find(keyword).find({ _id:{$ne:req.user._id} });
      res.send(users);

});

const authUser = asyncHandler(async(req,res) => {
    console.log(req.body,'values');
    const { email,password } = req.body;

    if( !email || !password ){
        return res.status(400).send({ message: "please fill the details completely!" });
        
 }

    const user = await User.findOne({email});
    if(!user){
        return res.status(401).send({ message: "User doesn't exits!" });
    }

    if(user && ( await user.matchPassword(password))){   //true
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
          });
    }else{
        return res.status(401).send({ message: 'Invalid password!' });
    }

});

const registerUser = asyncHandler(async(req,res)=>{
    const { name,email,password,pic } = req.body;
    if(!name || !email || !password){
        return res.status(400).send({ message: "please fill the details completely!" });

    }
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).send({ message: "User already exits!" });
    }

    const user = await User.create({
        name,
        email,
        password,
        pic: pic ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41A81cAVOwJ6e58SZMxg_Fh-VSwnYIWb3Bw&s"
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            pic:user.pic,
            token:generateToken(user._id)
        });

    }else{
        return res.status(400).send({ message: "oops something went wrong! Try again!" });
    }

});

module.exports = {registerUser,authUser, allUsers};