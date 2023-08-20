const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const router = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3500;

// mongodb connecion
mongoose
  .connect("mongodb://127.0.0.1:27017/employeeDB")
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log(err));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//session and flash message
app.use(session({
	secret: "This is session Secret.",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());

app.use("/employees", router);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
