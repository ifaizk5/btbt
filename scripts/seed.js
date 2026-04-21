import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { User } from '../backend/src/models/User.js';
import { Product } from '../backend/src/models/Product.js';
import logger from '../backend/src/utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-ecommerce');
    logger.info('Connected to database');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    logger.info('Cleared existing data');

    // Seed users
    const users = await User.create([
      {
        email: 'admin@beantherebrewthat.com',
        password: 'admin123456',
        firstName: 'Bean',
        lastName: 'Master',
        role: 'admin',
      },
      {
        email: 'customer@beantherebrewthat.com',
        password: 'customer123',
        firstName: 'Pour',
        lastName: 'Over',
        role: 'customer',
      },
      {
        email: 'test@beantherebrewthat.com',
        password: 'test123456',
        firstName: 'Brew',
        lastName: 'Tester',
        role: 'customer',
      },
    ]);

    logger.info(`Created ${users.length} users`);

    // Seed products
    const products = await Product.create([
      {
        name: 'Bean There V60 Starter Kit',
        description: 'Complete V60 pour-over bundle with ceramic dripper, server, filters, and dosing scoop.',
        price: 14900,
        cost: 8200,
        category: 'pour-over',
        tags: ['v60', 'starter-kit', 'pour-over', 'home-brewing'],
        stock: 35,
        createdBy: users[0]._id,
      },
      {
        name: 'Brew That Precision Kettle 900ml',
        description: 'Gooseneck kettle with precision spout for controlled pours and repeatable extraction.',
        price: 18900,
        cost: 10200,
        category: 'kettles',
        tags: ['kettle', 'gooseneck', 'pour-control', 'barista'],
        stock: 22,
        createdBy: users[0]._id,
      },
      {
        name: 'Flat Burr Hand Grinder Pro',
        description: 'Stepped micro-adjust grinder for espresso to French press with low retention burrs.',
        price: 22900,
        cost: 13100,
        category: 'grinders',
        tags: ['grinder', 'hand-grinder', 'burr', 'precision'],
        stock: 18,
        createdBy: users[0]._id,
      },
      {
        name: 'AeroPress Travel Brew Set',
        description: 'Portable AeroPress setup with chamber, stirrer, filters, and compact carrying sleeve.',
        price: 11900,
        cost: 6400,
        category: 'aeropress',
        tags: ['aeropress', 'travel', 'compact', 'quick-brew'],
        stock: 40,
        createdBy: users[0]._id,
      },
      {
        name: 'French Press Ritual Bundle',
        description: '1L borosilicate French press with stainless plunger and dual-wall serving mugs.',
        price: 9900,
        cost: 5400,
        category: 'french-press',
        tags: ['french-press', 'full-body', 'bundle', 'daily-brew'],
        stock: 28,
        createdBy: users[0]._id,
      },
      {
        name: 'Digital Brew Scale + Timer',
        description: 'Fast-response coffee scale with built-in timer for bloom tracking and ratio accuracy.',
        price: 7900,
        cost: 3900,
        category: 'tools',
        tags: ['scale', 'timer', 'ratio', 'consistency'],
        stock: 45,
        createdBy: users[0]._id,
      },
      {
        name: 'Home Espresso Accessory Pack',
        description: 'Bottomless portafilter, distribution tool, dosing ring, and tamper for cleaner shots.',
        price: 26400,
        cost: 15200,
        category: 'espresso-tools',
        tags: ['espresso', 'tamper', 'portafilter', 'distribution'],
        stock: 16,
        createdBy: users[0]._id,
      },
      {
        name: 'Cold Brew Tower Set',
        description: 'Slow-drip cold brew tower with valve control, reusable filters, and glass collection flask.',
        price: 31900,
        cost: 18900,
        category: 'cold-brew',
        tags: ['cold-brew', 'slow-drip', 'summer', 'showpiece'],
        stock: 10,
        createdBy: users[0]._id,
      },
    ]);

    logger.info(`Created ${products.length} products`);

    logger.info('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    logger.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
