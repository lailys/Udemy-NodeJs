const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    total: {
      type: Number,
      required: true
    }
  },
  
})

UserSchema.methods.fetchCart=function(products){
    let arrPros=[]
    if(!this.cart.items){
      this.cart={items:[],total:0}
    }else{

  if(this.cart.items){
      products.map(product => arrPros.push(JSON.stringify(product._id)))

      for(let i=0;i<this.cart.items.length;i++){
        if(!arrPros.includes(JSON.stringify(this.cart.items[i]._id))){

          this.cart.total= this.cart.total - parseFloat(this.cart.items[i].price*this.cart.items[i].quantity)
          this.cart.items.splice(i ,1)
          this.cart = {
            items: this.cart.items,
            total:  this.cart.total
          }

        }
      }

    }

    }
  this.save()

    return this


}

UserSchema.methods.emptyCart = function () {
    const updatedCart = {
        items: [],
        total:0
      }
      this.cart = updatedCart
  
      return this.save()
}
UserSchema.methods.addToCart = function (product) {

  let updatedCart

  if (!this.cart || this.cart.items.length <= 0) {
    console.log("first")
    updatedCart = {
      items: [{
        _id: product._id,
        productId:product._id,
        quantity: 1
      }],
      total: parseFloat(product.price)
    }

  } else {
    console.log("has items already")
    const addedProduct = this.cart.items.findIndex(item => {

      return JSON.stringify(item.productId) === JSON.stringify(product._id)
    })
    if (addedProduct > -1) {

      this.cart.items[addedProduct].quantity++
      const updatedTotal = this.cart.total + parseFloat(product.price)


      updatedCart = {
        items: this.cart.items,
        total: updatedTotal
      }
    } else {

      const oldcart = this.cart.items
      const updatedTotal = this.cart.total + parseFloat(product.price)
      updatedCart = {
        items: [...oldcart, {
            _id:product._id,
          productId: product._id,
          quantity: 1
        }],
        total: updatedTotal
      }
    }
  }

  this.cart = updatedCart
  
  return this.save()
}


UserSchema.methods.deleteFromCart = function (product) {

  let updatedCart
  const deletedProduct = this.cart.items.findIndex(item => {
    return JSON.stringify(item.productId) === JSON.stringify(product._id)
  })

  this.cart.items[deletedProduct].quantity--
  const updatedTotal = this.cart.total - parseFloat(product.price)


  if(updatedTotal===0){
    updatedCart= {items:[],total:0}
  }else if(this.cart.items[deletedProduct].quantity===0){
    updatedCart= {
        items:this.cart.items.filter(item=>item._id!==this.cart.items[deletedProduct]._id),
        total:updatedTotal
    }
  }else{
    updatedCart= {
        items:this.cart.items,
        total:updatedTotal
    }
  }

  this.cart = updatedCart
  return this.save()

}
module.exports = mongoose.model('User', UserSchema);


