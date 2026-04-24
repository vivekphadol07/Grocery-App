import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import env from "../config/env.js";
import { productSeed } from "../data/data.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const seedDatabase = async () => {
  await connectDB();
  const shouldClearOnly = process.argv.includes("--clear");

  try {
    await Order.deleteMany({});
    await Product.deleteMany({});

    if (shouldClearOnly) {
      console.log("Orders and products cleared.");
      await mongoose.connection.close();
      process.exit(0);
    }

    const adminEmail = env.adminEmail.toLowerCase().trim();
    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      adminUser = new User({
        firstName: env.adminName,
        lastName: env.adminLastName,
        email: adminEmail,
      });
    }

    adminUser.firstName = env.adminName;
    adminUser.lastName = env.adminLastName;
    adminUser.email = adminEmail;
    adminUser.password = env.adminPassword;
    adminUser.role = "admin";
    adminUser.isActive = true;
    adminUser.isVerified = true;
    await adminUser.save();

    const formattedProducts = productSeed.map((product) => ({
      ...product,
      createdBy: adminUser._id,
      isActive: true,
    }));

    await Product.insertMany(formattedProducts);

    console.log(`Seed complete: ${formattedProducts.length} products inserted.`);
    console.log(`Admin login: ${env.adminEmail} / ${env.adminPassword}`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
