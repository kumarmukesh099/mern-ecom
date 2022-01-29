import {Router} from 'express';
const router = Router();
import { listProducts,fetchProduct, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts } from '../controllers/productController.js';
import { auth, admin } from "../middleware/authMiddleware.js";



router.get('/',listProducts);
router.route('/top').get(getTopProducts);
router.route('/:id').get(fetchProduct);
router.route('/:id').delete(auth,admin,deleteProduct);
router.route('/:id').delete(auth,admin,deleteProduct);
router.route('/').post(auth,admin,createProduct);
router.route('/:id').put(auth,admin,updateProduct);
router.route('/:id/reviews').post(auth,createProductReview);

getTopProducts




export default router; 