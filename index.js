//dependencies required for the app
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const app = express();

const seasonsChange= require('./seasons-change.js')
const SIUUU = require('./siuuu.js')

//placeholders for added task
const task = ["Find the bug in this app 🔎", "Seasons change 🐯"];
//placeholders for removed task
const complete = ["Learn how to debugging stuff in Node"];

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

app.use(SIUUU)

//post route for adding new task 
app.post("/addtask", function(req, res) {
  //add the new task from the post route
  task.push(req.body.newtask);
  res.redirect("/");
});

app.post("/removetask", function({ body }, res) {
  if (body.check) {
    const completeTask = Array.isArray(body.check) ? body.check : [body.check];

    for (let i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});


//render the ejs and display added task, completed task
app.get("/", function(req, res) {
  const showTiger = seasonsChange(req, res)
  res.render("index", { task: task, complete: complete, showTiger });
});

app.get("/healthz", function(req, res) {
  res.status(200).send()
});

//set app to listen on port 3000
const server = app.listen(3000, function() {
  console.log("Server listening on http://localhost:3000");
});

function shutdown() {
  console.log('Signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
  })
}

process.on('SIGTERM', shutdown)
process.on('SIGTINT', shutdown)
