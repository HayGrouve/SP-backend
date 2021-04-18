const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fixtures = require('./routes/fixtures');
require('dotenv/config');

const app = express();

//MongoDB config
mongoose.connect(
  process.env.DB_CONN,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log(`Connected to ${process.env.DB_CONN}`);
  }
);

//Express config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/', fixtures);

app.listen(process.env.PORT | 5000, () => {
  console.log(`Server is running on ${process.env.PORT | 5000}!`);
});
