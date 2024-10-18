import mongoose from "mongoose";
export const connectWithDb = async () => {
    if (mongoose.connection.readyState !== 0) return;

    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connection is established with MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};