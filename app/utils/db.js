import mongoose from "mongoose";
 
const connect = async () => {
    if (mongoose.connections[0].readyState) return;
 
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongo Connection successfully established.");
    } catch (error) {
        throw new Error("Error connecting to Mongoose");
    }
};

const getCollection = (collectionName) => {
    return mongoose.connection.db.collection(collectionName);
};

export { connect, getCollection };