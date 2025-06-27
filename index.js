

import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config(); // Load .env variables BEFORE anything else
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
  secure: true,
});


import { app } from "./app.js";

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
