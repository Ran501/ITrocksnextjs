const { PrismaClient } = require('@prisma/client');
const mongoose = require('mongoose');
require('dotenv').config();

const prisma = new PrismaClient();

// Import the Product model schema
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: {
    type: String,
    enum: ['jerseys', 'apparel', 'accessories'],
    default: 'apparel'
  },
  image: String,
  discount: Number,
  createdAt: Date,
  updatedAt: Date
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

async function migrateProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all products from Prisma
    const prismaProducts = await prisma.product.findMany();
    console.log(`Found ${prismaProducts.length} products in Prisma`);

    // Delete existing products in MongoDB
    await Product.deleteMany({});
    console.log('Cleared existing products in MongoDB');

    // Convert and insert products into MongoDB
    const mongoProducts = prismaProducts.map(product => ({
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category.toLowerCase(),
      image: product.image,
      discount: product.discount,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    await Product.insertMany(mongoProducts);
    console.log(`Migrated ${mongoProducts.length} products to MongoDB`);

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    // Close connections
    await mongoose.disconnect();
    await prisma.$disconnect();
  }
}

migrateProducts(); 