import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

    name:{type:String,require:true,unique:true},
    category:{type: String, require:true},
  	ImageColor:[
                {
                    image: {type:String,require:true}, 
                    color: {type:String,require:true}
                }
               ],
    price:{type:Number,require:true},
    countInStock:{type:Number,require:true},
    rating:{type:Number,min:0,max:5},

})


const Product = mongoose.model("Product", productSchema);

export default Product;