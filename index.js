const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
require('./db');
require('./models/User');
const addTask = require('./routes/addTask');
const overlappingSchedule=require("./routes/overlappingSchedule")
const addUser = require('./routes/addUser');
const getTasks = require('./routes/getTasks');
const autoSchedule = require('./routes/autoSchedule');
const syncEmail = require('./routes/syncEmail');
const getAllTasks = require('./routes/getAllTasks');
const deleteTask=require("./routes/deleteTask")
app.use(bodyParser.json());
app.use(addTask);
app.use(addUser);
app.use(getTasks);
app.use(overlappingSchedule);
app.use(autoSchedule);
app.use(syncEmail);
app.use(getAllTasks);
app.use(deleteTask);


app.listen(port, () => {
    console.log("Server is running on port " + port);
})