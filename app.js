const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

//connect to mongodb
const dbURI =
  "mongodb+srv://admin:database1234@myblogs.tptfc.mongodb.net/<myBlogs>?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    //first connect to DB
    console.log("connected to db");
    //then listen for requests
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

//middleware and static files
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  const blogs = [];
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create new Blog" });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Blog details", blog: result });
    })
    .catch((err) => console.log(err));
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
