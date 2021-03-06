import mongoose from 'mongoose';


const orderModel = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems:[ {
       name : {type: String,required:true},
       quantity : {type: String,required:true},
       image : {type: String,required:true},
       price : {type: String,required:true},
       product : {
           type : mongoose.Types.ObjectId,
           required : true,
           ref : 'Product'
       }
    }],
    shippingAddress: {
        address : {type: String,required:true},
        zip_code : {type: String,required:true},
        country : {type: String,required:true},
        state : {type: String,required:true},
        city : {type: String,required:true}
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult : {
        city : {type: String},
        status : {type: String},
        update_time : {type: String},
        email_address : {type: String}
    },
    itemPrices:{
        type:Number,
        required:true,
        default:0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default : 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default : 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default : 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default : false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default : false
    },
    deliveredAt :{
        type : Date
    }
},
    {timestamps : true}
)

export default mongoose.model("order", orderModel);