import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title: {
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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    platform: {
        type: String,
        required: true,
        enum: ['PC', 'Xbox', 'PlayStation', 'Nintendo Switch'],
    },
    purchaseUser: {
        type: String,
        default: null,
    },
},{
    timestamps: true,
});

export default mongoose.model('Product', productSchema);