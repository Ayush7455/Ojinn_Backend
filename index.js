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

app.use(bodyParser.json());
app.use(addTask);
app.use(addUser);
app.use(getTasks);
app.use(overlappingSchedule);
app.use(autoSchedule);

app.listen(port, () => {
    console.log("Server is running on port " + port);
})