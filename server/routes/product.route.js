import express from "express"
import upload from "../middlewares/upload.js"
import authUser from "../middlewares/auth-user.js"
import { addProduct, changeStock, productById, productList } from "../controllers/product.controller.js"

const router = express.Router()

router.post("/add", authUser, upload.array('images'), addProduct)
router.get("/list", productList)
router.get("/:id", productById)
router.post("/stock", authUser, changeStock)

export default router