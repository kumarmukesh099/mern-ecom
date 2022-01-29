import { Router } from "express";
const router = Router();
import { auth,admin } from "../middleware/authMiddleware.js";
import { addOrderItems,fetchOrderById,updateOrderToPaid, getMyOrder,getOrders,updateOrderToDelivered } from '../controllers/orderController.js';


//router.put("/profile", middleware, updateUserProfile);
router.route('/myorders').get(auth,getMyOrder);
router.route('/').post(auth,addOrderItems);
router.route('/:id').get(auth,fetchOrderById);
router.route('/:id/pay').put(auth,updateOrderToPaid);
router.route('/').get(auth,admin,getOrders);
router.route('/:id/deliver').put(auth,admin,updateOrderToDelivered);








export default router;
