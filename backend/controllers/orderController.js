import asyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";

//desc       Create new order
//route      POST api/orders
//access     Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrices,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  console.log(req.body)
  if (orderItems && orderItems.length == 0) {
    res.status(404);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user_id,
      shippingAddress,
      paymentMethod,
      itemPrices,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(200).json(createdOrder);
  }
});

//desc       Fetch order by ID
//route      GET api/orders/:id
//access     Private
const fetchOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});


//desc       Update order to paid
//route      GET api/orders/:id/pay
//access     Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
     order.isPaid = true,
     order.paidAt = new Date(),
     order.paymentResult = { 
       id:req.body.id, //come from paypal
      status : req.body.status,
      update_time :  req.body.update_time,
      email: req.body.email_address
     }
     let updatedOrder = await order.save();
     res.json(updatedOrder);

  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});



//desc       Get loggedIn user orders
//route      GET api/orders/myorders
//access     Private
const getMyOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({user:req.user_id});
  res.json(order);
});

//desc       Get loggedIn user orders
//route      GET api/orders/myorders
//access     Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({}).populate(
    "user",
    "name email"
  ).sort({createdAt:-1})
  res.json(order);
  
});


//desc       Update order to delivered
//route      GET api/orders/:id/deliver
//access     Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if(order){
    order.isDelivered = true,
    order.deliveredAt= new Date()
  }
  await order.save();
  res.status(200).json({message:'Order marked as Delivered'});
  res.json(order);
  
});

export { addOrderItems,fetchOrderById,updateOrderToPaid,getMyOrder,getOrders,updateOrderToDelivered };
