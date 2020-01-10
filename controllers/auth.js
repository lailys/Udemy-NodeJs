const Product = require('../models/product');
const User = require('../models/user');
const Orders = require('../models/order');

exports.getUserInfo = (req, res, next) => {

  res.render('auth/signup', {
      pageTitle: 'signup page',
      path: '/signup',
      isAuthenticated:req.isAuthenticated
    })

};
exports.postUserInfo = (req, res, next) => {

  const username = req.body.username;
  const email = req.body.email;
  const password= req.body.password;
  const cart={items:[],total:0}
const user=new User({
  username:username,
  email:email,
  password:password,
  cart:cart,
}) 

 user.save()
    .then(result => {
    
      res.redirect('/login')
    })
    .catch(err => {
      console.log(err);
    });

};
exports.getUserAuth = (req, res, next) => {
// const isAuthenticated=req.get('cookie').split(";")[2].trim().split("=")[1]===true
  res.render('auth/login', {
      pageTitle: 'login page',
      path: '/login',
      isAuthenticated:false
    })

};
exports.getLogout = (req, res, next) => {
// const isAuthenticated=req.get('cookie').split(";")[2].trim().split("=")[1]===true
  res.render('auth/login', {
      pageTitle: 'login page',
      path: '/login',
      isAuthenticated:false
    })

};
exports.postUserAuth = (req, res, next) => {

  
  User.find({ username:req.body.username,password:req.body.password})
    .then(user=> {

        req.session.isAuthenticated=true
        req.session.user = user[0]

        
        res.redirect('/')
    }
    )
    .catch(err => {
      console.log(err)
      res.redirect('/signup')
    });

};
exports.postLogout  = (req, res, next) => {

req.session.destroy(()=>{
  res.redirect('login')
})

};