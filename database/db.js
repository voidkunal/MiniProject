import mongoose from "mongoose";


export const connectDB = () => {
    mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "mini-library",
    })
    .then(() => {
        console.log("MongoDB_connected_Done");
    })
    .catch((error) => {
        console.log("MongoDB_connection_error: ", error);
    });
};


