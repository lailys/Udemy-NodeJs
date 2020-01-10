const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const productsSchema = new Schema({
    title:{type:String,required:true},
    price:{type:Number,required:true},
    description:String,
    imageUrl:String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
})

module.exports = mongoose.model('Product',productsSchema);

// var ObjectId = require('mongodb').ObjectID;
// const getDb = require('../util/database').getDb



// class Product {
//   constructor(title, price, description, imageUrl, id,email) {
//     this.title = title
//     this.price = price
//     this.description = description
//     this.imageUrl = imageUrl
//     this._id = id
//     this.userEmail=email
//   }

//   save() {
//     const db = getDb()
//     let dbop
//     if (this._id) {
//       dbop = db.collection('products')
//         .updateOne(
//           {_id: ObjectId(this._id)},
//           {$set:this}
//         )

//     } else {

//       dbop = db.collection('products')
//         .insertOne(this)

//     }
//     return dbop.then(res => {
//         console.log(res)
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }

//   static fetchShopProducts() {
//     const db = getDb()
//     return db.collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         return products
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }

//   static fetchShopProduct(prodId) {
//     const db = getDb()
//     return db.collection('products')
//       .find({
//         _id: ObjectId(prodId)
//       })
//       .next()
//       .then(product => {
//         return product
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }
//   static deleteShopProduct(prodId) {
//     const db = getDb()
//     return db.collection('products')
//       .deleteOne({
//         _id: ObjectId(prodId)
//       })
//       .then(product => {
       
    
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }

// }



