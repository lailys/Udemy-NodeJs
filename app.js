
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const errorController = require('./controllers/error');
const User=require('./models/user')
const URI='mongodb+srv://lailys:herbaghm333@cluster0-hucrn.mongodb.net/shop?retryWrites=true&w=majority'
const app = express();
const store=new MongoDBStore({
  uri:URI,
  collection:'sessions'

})

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');
 const authRoutes = require('./routes/auth');



app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({

secret:'my secret',
 resave:false,
 saveUninitialized:false,
 store:store}))


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(URI)
.then(client => {
  User.findOne()
  .then(user=>{

    if(!user){
      
      const user=new User({
        username:"lailys",
        password:"herbaghm333",
        email:"laily@lailys.com",
        cart:{items:[],total:0}
      })
      
      user.save()
    }
   
  })


  console.log('Connected!');
  app.listen(3000)
})
.catch(err => {
  console.log(err);
  throw err;
});;

