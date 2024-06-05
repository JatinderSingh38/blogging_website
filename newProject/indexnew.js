import mongoose from "mongoose";
import express from "express";
import authRouter from "./routes/auth.js";
import dotenv from "dotenv";
import { join } from "path";

// Initialize Express application
const app = express();

// Load environment variables from .env file
dotenv.config();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

// Set up routes
app.use("/", authRouter);

// Connect to MongoDB
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DATABASE CONNECTED");
    })
    .catch((error) => {
        console.error("DATABASE CONNECTION ERROR:", error);
    });

// Serve static files (if needed)
// app.use("/uploads", express.static(join(__dirname, "uploads")));

// Define serverless function for Vercel deployment
export default app;

// You can also define additional API routes here as separate serverless functions
// Example:
/*
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  // Your API logic here
  res.status(200).json({ message: "Hello from the backend!" });
}
*/


// import mongoose from "mongoose";
// import express from "express";
// import authRouter from "./routes/auth.js";
// import dotenv from "dotenv";
// import cors from "cors";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";
// const app = express();
// //const port = 5000;
// dotenv.config();
// const port = process.env.PORT;   //import dotenv
// app.use(cors());
// app.use(express.json())
// app.use("/", authRouter)
// //////////////////////////////////////////////////////////////////////////////////////////////////////////
// const _filename = fileURLToPath(import.meta.url); // Using 'fileUrlToPath' to get the current file path
// const _dirname = dirname(_filename); // Using 'dirname' to get the directory name

// // Creating an instance of the Express application

// // Serving static files from the 'uploads' directory
// app.use("/uploads", express.static(join(_dirname, "uploads")));

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mongoose.connect(process.env.CONNECTION_STRING, {

//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }
// ).then(() => {
//     console.log("_______________________DATABASE CONNECTED______________________________")
// }).catch((error) => {
//     console.log("Database is not connected", error);
// })
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// })



