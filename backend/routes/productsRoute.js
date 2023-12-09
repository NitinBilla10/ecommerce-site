import express, { Router } from "express";
import { braintreeController, braintreepaymentController, createProductController,deleteproductController,getProductbycategory,getproductController, getproductsbyemail, myorderController, productfilter, singleproductController } from "../controllers/productController.js";
const router = express.Router()

router.post('/createproduct',createProductController);
router.get('/getproducts',getproductController);
router.get('/getproducts/:slug',singleproductController);
router.delete('/getproducts/:pid',deleteproductController);
router.get('/getproductsbyemail/:email',getproductsbyemail);
router.get('/getproductbycategory/:category',getProductbycategory);
router.post('/productbyfilter',productfilter);
router.get('/braintree/token',braintreeController);
router.post('/braintree/payment',braintreepaymentController);
router.get('/myorders/:email',myorderController);



export default router;