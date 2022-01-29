import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const auth = async (req, res, next) => {
  let token;
  try {  
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).send("Not token found");
    } else {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user_id = decoded.id;
      req.user = await User.findById(req.user_id).select('-password');  
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Please try after sometime ${error}` });
  }
};

export const admin = (req,res,next)=>{
  if(req.user && req.user.isAdmin){
    next();
  }else{
    res.status(401);
    throw new Error('Not authorized as a admin');
  }
}
