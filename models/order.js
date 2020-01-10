
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const OrdersSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },


  items: [{type:Object,required:true}],
  total:{type:Number,required:true}
  
})



module.exports = mongoose.model('Orders', OrdersSchema);







// var ObjectId = require('mongodb').ObjectID;
// const getDb = require('../util/database').getDb



// class Order {
//   constructor(id) {
//     this.title = title
//     this.price = price
//     this.description = description
//     this.imageUrl = imageUrl
//     this._id = id
//     this.userEmail=email
//   }

//   addToOrders(orders) {
    

//     let updatedOrders=[]
//     const db = getDb()
//     updatedOrders=[...orders,this.cart]
    
//     db.collection('users').updateOne({
//       _id: ObjectId(this._id)
//     }, {
//       $set: {
//         cart:{items:[],total:0}
//       }
//     })
//     return db.collection('users').updateOne({
//       _id: ObjectId(this._id)
//     }, {
//       $set: {
//         orders: updatedOrders
//       }
//     })
    
//       }
//     }
// module.exports = Order;
