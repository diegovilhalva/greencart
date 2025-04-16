import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./configs/db.js"
import userRoutes from "./routes/user.route.js"


dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000
const allowedOrigins = ['http://localhost:5173/']


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }))


app.get("/", (req, res) => {
    res.send("ok")
})

app.use("/api/user", userRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on ${PORT}`);
    });
}).catch((err) => {
    console.error("❌ Connetion error:", err);
});