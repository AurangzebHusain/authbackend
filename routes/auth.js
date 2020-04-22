const { signin,signup,signout }=require("../controllers/authController");

const Router=require("express").Router();

Router.route("/signup").post(signup);
Router.route("/signin").post(signin);
Router.route("/signout").get(signout);




module.exports=Router;