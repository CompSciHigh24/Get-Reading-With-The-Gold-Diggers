const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});

const mongoDBConnectionString =
  "mongodb+srv://compscihigh:crystal02@cluster0.xrvf2xg.mongodb.net/goaldiggers3?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoDBConnectionString)
  .then(() => console.log("MongoDB connection successful."))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use(express.json());



//Student Schema
const StudentInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  
});
const Student = mongoose.model("Student", StudentInfoSchema);
// const Student = mongoose.model("StudentInfo", StudentInfoSchema);
// mongoose;

app.get("/", (req, res) => {
  Student.find({}).then((students) => {
    // res.json(students);
    res.render("admin.ejs", {students: students })
  }).catch((error)=>{
    console.error("Error fetching items:", error);
    res.status(500).sendFile(__dirname + "/public/500.html");
  });
});

app.get("/admin", (req, res) => {
  Student.find({}).then((students) => {
    // res.json(students);
    res.render("admin.ejs", {students: students })
  }).catch((error)=>{
    console.error("Error fetching items:", error);
    res.status(500).sendFile(__dirname + "/public/500.html");
  });
});
// app.get("/students", (req,res)=>{

//   res.render(__dirname+"/views/student.ejs")
// })
app.get("/student/:id", (req, res) => {
  //create a filter that gets the student's id
  const id = req.params.id;
  
  Book.find({studentId: id}).populate("studentId").then((books) => {
    console.log(books)
    //res.json(books)
    res.render("student.ejs", {_id:id,books:books});
    
    
  }).catch((error)=>{
    console.error("Error fetching items:", error);
    res.status(500).sendFile(__dirname + "/public/500.html");
  });
  //Student.find({}).then((students) => {
   // res.render("student.ejs", {books : students});
    
    //console.log()
    // res.render("student", {student: student })
  //});
  //Book.find({}).then((books) => {
    //console.log(books)
    //res.render("student.ejs", {books:books});

  //});
});

//Book Schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  currentBook: { type: Boolean, required: true }
  
   
 
});
const Book = mongoose.model("Book", bookSchema);

//return Book.find({}).populate('studentId');

//app.get("/student/:id", (req, res)=>{
//   // res.sendFile(__dirname+"/public/form.html")
//   const id = req.params.id;
//   Books.find({studentId: id})
//     .then((books)=>{
//       res.render("student.ejs", {books: books })
//     })
// })

//adds book 
app.post("/student/:id", (req, res) => {
  const id = req.params.id;
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    studentId: req.body.studentId,
    currentBook: req.body.currentBook,
  }).save()
    .then((newBook) => {
    res.json(newBook);
  });
});
// gets the book associated with student
//app.get("/student/:id", (req, res)=>{
  //const i = req.params.id;
  //console.log(i)
  //Book.find({}).then((books) => {
  //  console.log(books)
   // res.render("student.ejs", {books:books});
   
  //});
//})

//update book

app.patch("/student/:id", (req, res)=>{
  const filter = {_id: req.params.id}
  const update = {$set: {currentBook: false}}
  Book.findOneAndUpdate(filter, update, {new: true})
    .then((up)=>{
      res.json(up)
    });
})
//deletes student
app.delete("/student/:id", (req, res)=>{
  const filter = {_id: req.params.id}
  Book.findOneAndDelete(filter)
  .then((up)=>{
    res.json(up)
  });
})

//add student
app.post("/student", (req, res)=>{
  const student = new Student({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    
  })
  student.save().then((newStudent)=>{
    res.render(newStudent)
  })
})
app.use((req, res, next)=>{
  res.status(404).sendFile(__dirname + "/public/404.html")
})
 
app.listen(3000, () => {
  console.log(`Server running.`);
});
