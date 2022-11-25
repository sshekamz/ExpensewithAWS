const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app= express();

app.use(cors());
app.use(bodyParser.json());

const sequelize=require('./util/database');

const signUpRoute=require('./routes/signupRouter');

app.use(signUpRoute);

sequelize
  .sync()
  .then(result => {
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });