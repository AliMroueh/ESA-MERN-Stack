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
    name: {
        type: String,
        required: true,
    },
    // category: {
    //     type: String,
    //     required: true,

    // },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },

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

productSchema.plugin(uniqueArrayPlugin);
const Product = mongoose.model("Product", productSchema);

export default Product;