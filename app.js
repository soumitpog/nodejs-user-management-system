// for the .env file
require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const { flash } = require("express-flash-message");
const session = require("express-session");
const methodOverride = require("method-override");
const connectDB = require("./server/config/db");

const app = express();
const port = process.env.PORT || 5000;

// connect to db.
connectDB();

// middleware: This is useful when you're handling form submissions from HTML forms on your website.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// static files
app.use(express.static("public"));

// Express Session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Flash Messages
app.use(flash({ sessionKeyName: "flashMessage" }));

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Routes
app.use("/", require("./server/routes/customer"));

// Handle 404
app.get("*", (req, res) => {
  res.status(404).render("404");
});

// start the server
app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
