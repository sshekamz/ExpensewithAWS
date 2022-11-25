const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app= express();

app.use(cors());
app.use(bodyParser.json());

const sequelize=require('./util/database');

const userRoute=require('./routes/userRouter');

app.use(userRoute);

sequelize
  .sync()
  .then(result => {
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });