import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import orderRoute from "./routes/OrderRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoutes";
import myUserRoute from "./routes/MyUserRoutes";
import restaurantRoute from "./routes/RestaurantRoutes";

mongoose
    .connect(process.env.MONGO_CONNECTION_STRING as string)
    .then(() => console.log("Connected to database!"));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validate critical environment variables early to fail fast with clear messages
const requiredEnvs = [
    "STRIPE_API_KEY",
    "FRONTEND_URL",
];
const missing = requiredEnvs.filter((k) => !process.env[k]);
if (missing.length) {
    console.error(`Missing required environment variables: ${missing.join(", ")}`);
    // don't start the server if critical config is missing
    process.exit(1);
}

const app = express();

app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

app.listen(7000, () => {
    console.log("server started on localhost:7000");
});