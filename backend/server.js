const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const userJobRouter = require('./routes/userJobRoutes');
const DBConnection = require('./config/DBConnection');
const path = require('path');

const app = express();
// connect to the database
DBConnection();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.use(userJobRouter)

const port = process.env.PORT || 5000;

// deployment
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "../build", "index.html"));
  });

} else {
  // home router
  app.get('/', (req, res) => {
    res.send('Hello from express');
  });
}
try{
  app.listen(port)
}catch(err){
  console.log(err)
}
