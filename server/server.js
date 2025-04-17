import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import session from "express-session";
import passport from "passport";
import "./configs/passport.js";
import connectDB from "./configs/db.js"
import userRoutes from "./routes/user.route.js"
import sellerRoutes from "./routes/seller.route.js"
import productRoutes from "./routes/product.route.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000
const allowedOrigins = ['http://localhost:5173']


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }))

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax"
}));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
    res.send("ok")
})

app.use("/api/user", userRoutes)
app.use("/api/seller", sellerRoutes)
app.use("/api/product", productRoutes)


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on ${PORT}`);
    });
}).catch((err) => {
    console.error("❌ Connetion error:", err);
});