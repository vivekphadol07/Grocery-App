import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import env from "../config/env.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const addSummerProducts = async () => {
  await connectDB();
  try {
    const adminEmail = env.adminEmail.toLowerCase().trim();
    const adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
        console.error("Admin user not found. Please run seed script first.");
        process.exit(1);
    }

    const summerProducts = [
      {
        name: "Fresh Lemonade Mix",
        category: "Cold Drinks",
        price: 45,
        unit: "250g Pack",
        image: "/images/summer/lemonade.jpg",
        stock: 50,
        rating: 4.5,
        description: "Refresh yourself with our instant lemon mix. Just add water and ice!"
      },
      {
        name: "Aam Panna Concentrate",
        category: "Cold Drinks",
        price: 120,
        unit: "500ml Bottle",
        image: "/images/summer/aam_panna.jpg",
        stock: 30,
        rating: 4.8,
        description: "Authentic roasted raw mango drink. A perfect summer coolant."
      },
      {
        name: "Sparkling Iced Tea",
        category: "Cold Drinks",
        price: 65,
        unit: "350ml Bottle",
        image: "/images/summer/sparkling.jpg",
        stock: 40,
        rating: 4.2,
        description: "Light and bubbly iced tea with a hint of peach."
      },
      {
        name: "Electrolyte Energy Drink",
        category: "Cold Drinks",
        price: 35,
        unit: "250ml Can",
        image: "/images/summer/electrolyte.png",
        stock: 100,
        rating: 4.6,
        description: "Stay hydrated and energized during hot summer days."
      },
      {
        name: "Barley Water",
        category: "Cold Drinks",
        price: 55,
        unit: "500ml Bottle",
        image: "/images/summer/barley.jpg",
        stock: 25,
        rating: 4.3,
        description: "Natural cooling barley water with a touch of lemon."
      },
      {
        name: "Mango Sorbet",
        category: "Dairy Products",
        price: 150,
        unit: "200ml Cup",
        image: "/images/summer/mongo_sorbet.jpg",
        stock: 15,
        rating: 4.9,
        description: "100% natural mango sorbet. Dairy-free and refreshing."
      },
      {
        name: "Chocolate Fudge Kulfi",
        category: "Dairy Products",
        price: 40,
        unit: "1 Stick",
        image: "/images/summer/choco_kulfi.jpg",
        stock: 60,
        rating: 4.7,
        description: "Traditional kulfi with a rich chocolate fudge twist."
      },
      {
        name: "Frozen Greek Yogurt",
        category: "Dairy Products",
        price: 99,
        unit: "150g Cup",
        image: "/images/summer/greek_yogurt.jpg",
        stock: 45,
        rating: 4.4,
        description: "Healthy and creamy frozen yogurt with blueberry swirls."
      },
      {
        name: "Falooda Mix Kit",
        category: "Instant Food",
        price: 85,
        unit: "100g Pack",
        image: "/images/summer/falooda_mix.jpg",
        stock: 35,
        rating: 4.6,
        description: "DIY Falooda kit with vermicelli, basil seeds and rose syrup."
      },
      {
        name: "Muskmelon",
        category: "Fresh Fruits",
        price: 60,
        unit: "1 pc",
        image: "/images/summer/muskmelon.jpg",
        stock: 20,
        rating: 4.3,
        description: "Sweet and hydrated muskmelon, perfect for fruit salads."
      },
      {
        name: "Fresh Mint Leaves",
        category: "Organic Veggies",
        price: 15,
        unit: "1 Bunch",
        image: "/images/summer/mint.jpg",
        stock: 50,
        rating: 4.1,
        description: "Fresh aromatic mint leaves for your summer drinks and chutneys."
      }
    ];

    const formattedProducts = summerProducts.map(p => ({
      ...p,
      createdBy: adminUser._id,
      isActive: true
    }));

    await Product.insertMany(formattedProducts);
    console.log(`Successfully added ${formattedProducts.length} summer products.`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Error adding summer products: ${error.message}`);
    await mongoose.connection.close();
    process.exit(1);
  }
};

addSummerProducts();
