import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import jwtToken from "../utils/generateToken.js";
import { validationResult } from "express-validator";
import bycrpt from "bcryptjs";

//desc       Auth user and get token
//route      GET api/users/login
//access     public
export const authUser = asyncHandler(async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log("Userrrrr",user,email)
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: jwtToken(user._id)   
  });
  // if (user && (await user.matchPass(password))) {
  //   res.json({
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     isAdmin: user.isAdmin,
  //     token: jwtToken(user._id)   
  //   });
  // } else {
  //   res.status(404);
  //   throw new Error("Incorrect email or password");
  // }
});

//desc       Register a user
//route      POST api/users/register
//access     public
export const registerUser = asyncHandler(async (req, res) => {
  let errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exist with this email id");
  } else {
    user = new User({
      name, //we can also use User.create({name, email,password})
      email,
      password: bycrpt.hashSync(password, 10),
    });
    user.save();
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: jwtToken(user._id),
    });
  }
});

//desc       Get user profile
//route      GET api/users/profile
//access     Private
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user_id).select("-password");
  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404).json({ msg: "User not found" });
  }
};

//desc       Update user profile
//route      GET api/users/profile
//access     Private
export const updateUserProfile = async (req, res) => {
  console.log("req body",req.body)
  let user = await User.findById(req.user_id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = bycrpt.hashSync(req.body.password, 10) || user.password;
  }
  const Updateduser = await user.save();
  console.log(Updateduser);
  res.status(200).json({
    id: Updateduser._id,
    name: Updateduser.name,
    email: Updateduser.email,
    isAdmin: Updateduser.isAdmin,
  });
};

//desc       Get all users
//route      GET api/users
//access     Private/Admin
export const getUsers = async (req, res) => {
  let users = await User.find({});
  if (users) {
    res.json(users);
  } else {
    throw new Error({ message: "Error while listing users" });
  }
};

//desc       Delete user
//route      DELETE api/users/:id
//access     Private/Admin
export const deleteUser = async (req, res) => {
  let user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.status(200).json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(users);
};

//desc       Get user by id
//route      GET api/users/:id
//access     Private/Admin
export const getUser = async (req, res) => {
  let user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.status(200);
    res.json(user);
  } else {
    throw new Error({ message: "No user found" });
  }
};

//desc       Update user by id
//route      PUT api/users/:id
//access     Private/Admin
export const updateUser = async (req, res) => {
  let user = await User.findById(req.params.id).select("-password");
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || false;
    const Updateduser = await user.save();
    res.status(200).json({
      id: Updateduser._id,
      name: Updateduser.name,
      email: Updateduser.email,
      isAdmin: Updateduser.isAdmin,
    });
  } else {
    throw new Error({ message: "User not found" });
  }
};
