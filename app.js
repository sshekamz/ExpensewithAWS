const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');

const app= express();

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const sequelize=require('./util/database');
const User=require('./model/signupTable');
const Expense=require('./model/expensListTable');
const Order = require('./model/orderTable');

const userRoute=require('./routes/userRouter');
const puchaseRoutes=require('./routes/purchaseRoutes')

app.use(userRoute);
app.use(puchaseRoutes)

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  .sync()
  .then(()=> {
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });