import dotenv from 'dotenv';
import connectDB from './config/db.js';
import users from './data/users.js';
import products from './data/products.js';
import Order from './models/OrderModel.js';
import Product from './models/ProductModel.js';
import Users from './models/UserModel.js';

dotenv.config(); //make .env file to come into play

connectDB();

const importData = async () => {
    try {
       // await Users.deleteMany();
        await Product.deleteMany();
        //const createdUsers = await Users.insertMany(users);
        //const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            delete product._id;
            return { ...product, user: "61ae01640b6607801747a0aa" }
        })
        await Product.insertMany(sampleProducts);
        console.log("Data successfully inserted");
        process.exit();
    }
    catch (error) {
        console.log("Error while inserting the data", error);
        process.exit(1);
    }
}

const deleteData = async () => {
    try {
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser }
        })
        await insertMany(sampleProducts);
        console.log("Data successfully inserted");
        process.exit();
    }
    catch (error) {
        console.log("Error while inserting the data",error);
        process.exit(1);
    }
}
if (process.argv[2] === "-d") {
    deleteData();
} else {
    importData();
}


