import express from "express";
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// app config 
const app = express();
const port = process.env.PORT || 5000

connectCloudinary();

// middlewares 
app.use(express.json())
app.use(cors())


// const allowedOrigins = [
//     "https://prescripto-frontend-blue.vercel.app",
//     "https://prescripto-admin-five-theta.vercel.app"
// ];

// simple allow-list
// app.use(cors({
//     origin: function (origin, callback) {
//         // allow non-browser requests (e.g. curl) which have no origin
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('CORS denied'));
//         }
//     },
//     credentials: true, // if you need cookies/auth
// }));

// api endpoints 
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("api working")
});

connectDB().then(() => app.listen(port, () => console.log("Server running on port ", port)));