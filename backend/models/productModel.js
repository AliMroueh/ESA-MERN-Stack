import mongoose from 'mongoose';
import uniqueArrayPlugin from 'mongoose-unique-array'

const imageColor = new mongoose.Schema(
    {
            image: { type: String, required: true, unique: true },
            color: { type: String, required: true, unique: true }
    },
    {
      timestamps: true,
    }
  );
imageColor.plugin(uniqueArrayPlugin);
const productSchema = new mongoose.Schema({

<<<<<<< Updated upstream
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
=======
    name: { type: String, require: true, unique: true },
    category: { type: String, require: true },

    // rating:{type:Number,min:0,max:5},


    imageColor: [imageColor],
    brand: {
        type: String,
        required: true,
    },


    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        default: 0,
    },

    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },


},
    {
        timestamps: true,
    }

)
>>>>>>> Stashed changes

productSchema.plugin(uniqueArrayPlugin);
const Product = mongoose.model("Product", productSchema);

export default Product;