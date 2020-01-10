const Product = require('../models/product');
const User = require('../models/user');
const Orders = require('../models/order');



exports.getHome = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/home', {
        prods: products,
        pageTitle: 'home',
        path: '/',
        isAuthenticated:req.session.isAuthenticated
      });
    })
    .catch(err => console.log(err));
};



exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'all Products',
        path: '/product-list',
        isAuthenticated:req.session.isAuthenticated
      });
    })
    .catch(err => console.log(err));

};

exports.getProductDetail = (req, res, next) => {
  const prodId = req.params.productId
  Product.findById(prodId)
    .then((product) => {
      res.render('shop/product-page', {
        product: product,
        pageTitle: product.title,
        path: '/products',
        isAuthenticated:req.session.isAuthenticated

      });

    })
    .catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {

  Product
    .find()
    .then(products => {
      console.log('@@@@@@@@@@@@@@@@@@@@@@',req.user)
      return req.session.user.fetchCart([products])
    })
    .then(user => {

      res.render('shop/cart', {
        cartUser: user._id,
        prods: user.cart.items,
        total: user.cart.total,
        pageTitle: 'shopping cart',
        path: '/cart',
        isAuthenticated:req.session.isAuthenticated
      });
    })
    .catch(err => console.log(err));
};

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId
//   Product.findById(prodId)
//     .then(product => {
//       console.log(product);
//       return req.session.user.addToCart(product);
//     })
//     // .then(result => {
//       res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// };


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId)
    .then(product => {
      return   req.session.user.deleteFromCart(product)
    })
    .then(cart => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));

};



exports.postOrders = (req, res, next) => {

  const prodId = req.body.cartUser
  User.findById(prodId)
    .then(user => {
      const order = new Orders({
        userId: user._id,
        items: user.cart.items,
        total: user.cart.total
      })
      return order.save()
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));

};


exports.getOrders = (req, res, next) => {
  Orders.find()
    .then(orders => {
      return orders
    })
    .then(orders => {
      req.session.user.emptyCart()
      res.render('shop/orders', {
        pageTitle: 'orders history',
        path: '/orders',
        orders: orders,
        isAuthenticated:req.isAuthenticated
      });

    })
    .catch(err => console.log(err));

};


exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'checkout page',
    path: '/checkout',
    isAuthenticated:req.isAuthenticated
  });

};
