const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    isAuthenticated:req.session.isAuthenticated

  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.session.user
  });  
  product.save()
    .then(result => {
    
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err);
    });

};




exports.getProducts = (req, res, next) => {
Product.find()
// .populate('userId')
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'admin products',
        path: '/admin/products',
        isAuthenticated:req.session.isAuthenticated
      });
    })
    .catch(err => console.log(err));


};




exports.getEditProduct = (req, res, next) => {
  // const editMode = req.query.edit


  // if (!editMode) {
  //   return res.redirect('/')
  // }
  const prodId = req.params.productId
 
  Product.findById(prodId)
    .then((product) => {
      res.render('admin/edit-product', {
        pageTitle: 'edit Product',
        path: '/admin/edit-product',
        product: product,
        isAuthenticated:req.session.isAuthenticated
      })
    })
    .catch(err => {
      console.log(err);
    });


};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const title = req.body.title
  const imageUrl = req.body.imgUrl
  const price = req.body.price
  const description = req.body.description

Product.findById(prodId)
.then(product=>{
  product.title =title
  product.imageUrl =imageUrl
  product.price =price
  product.description =description
  return product.save()
})
.then(result => {
     
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err);
    });

};




exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findByIdAndRemove(prodId)
    .then(result => {
  
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err));
};
