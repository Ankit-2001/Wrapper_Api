import express from "express";
import { addCustomer,getCustomerDetails } from "../controllers/customer.controllers.js";

const router = express.Router();

router.get("/",(req,res) =>{
    res.send("Welcome to the custome api");
})
router.post("/addCustomer", addCustomer);
router.get("/getCustomerDetails/:customerId", getCustomerDetails);

export default router;