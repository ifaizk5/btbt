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
        description: 'Begin your pour-over journey with our essential V60 kit. This complete bundle includes a ceramic V60 dripper for superior water control, borosilicate glass server with measurement marks, 100 natural paper filters, and precision dosing scoop. Perfect for coffee enthusiasts seeking clean extraction and full-bodied flavor. The ceramic construction retains heat evenly while the included server allows for elegant presentation at the table. Ideal starter set for exploring single-origin coffees.',
        price: 10490,
        cost: 8200,
        category: 'pour-over',
        tags: ['v60', 'starter-kit', 'pour-over', 'home-brewing'],
        imageUrl: '/listed_products/product5.png',
        imageAlt: 'Bean There V60 Starter Kit',
        images: [{ url: '/listed_products/product5.png', alt: 'Bean There V60 Starter Kit' }],
        stock: 35,
        createdBy: users[0]._id,
      },
      {
        name: 'Brew That Precision Kettle 900ml',
        description: 'Professional-grade gooseneck kettle crafted from brushed stainless steel with precision temperature control. The thin swan-neck spout delivers pinpoint water placement for pour-over excellence, while the water level window ensures accurate measurement. Rapid boil technology heats 900ml in minutes without sacrificing control. Features an ergonomic handle, removable lid, and integrated stand. Essential for baristas and coffee perfectionists who demand consistency in every brew.',
        price: 13490,
        cost: 10200,
        category: 'kettles',
        tags: ['kettle', 'gooseneck', 'pour-control', 'barista'],
        imageUrl: '/listed_products/product0.png',
        imageAlt: 'Brew That Precision Kettle 900ml',
        images: [{ url: '/listed_products/product0.png', alt: 'Brew That Precision Kettle 900ml' }],
        stock: 22,
        createdBy: users[0]._id,
      },
      {
        name: 'Flat Burr Hand Grinder Pro',
        description: 'Micro-adjust hand grinder featuring commercial-quality flat burrs for uniform grind sizes across all settings. Stepped adjustment dial enables precise tuning from espresso-fine to French press coarse without jumping between extremes. Stainless steel hopper holds 25g of beans with low retention design—minimal grounds stick to burr chamber. Hardwood handle and compact footprint make it ideal for travel or countertop display. Produces optimal flavor for every brewing method.',
        price: 18990,
        cost: 13100,
        category: 'grinders',
        tags: ['grinder', 'hand-grinder', 'burr', 'precision'],
        imageUrl: '/listed_products/product1.png',
        imageAlt: 'Flat Burr Hand Grinder Pro',
        images: [{ url: '/listed_products/product1.png', alt: 'Flat Burr Hand Grinder Pro' }],
        stock: 18,
        createdBy: users[0]._id,
      },
      {
        name: 'AeroPress Travel Brew Set',
        description: 'Compact brewing powerhouse designed for coffee lovers on the move. This portable AeroPress set includes the iconic chamber and plunger for rich, smooth espresso-style shots in 60 seconds flat. Comes with stainless steel micro-filter cartridge, 350 paper filters, and precision scoop. Includes durable neoprene travel case with carrying strap for backpacks, cars, or office drawers. Weighs just 400g—brew café-quality coffee anywhere, anytime.',
        price: 7490,
        cost: 6400,
        category: 'aeropress',
        tags: ['aeropress', 'travel', 'compact', 'quick-brew'],
        imageUrl: '/listed_products/product2.png',
        imageAlt: 'AeroPress Travel Brew Set',
        images: [{ url: '/listed_products/product2.png', alt: 'AeroPress Travel Brew Set' }],
        stock: 40,
        createdBy: users[0]._id,
      },
      {
        name: 'French Press Ritual Bundle',
        description: 'Embrace the ritual of classic immersion brewing with this elegant French press bundle. Features a 1L borosilicate glass carafe with stainless steel mesh plunger, designed for full-bodied extraction that celebrates coffee oils and complexity. Includes two double-walled ceramic mugs to keep your brew hot longer while adding a refined touch to morning routine. Perfect for sharing or solo indulgence. Dishwasher safe and built to last through thousands of brews.',
        price: 5490,
        cost: 5400,
        category: 'french-press',
        tags: ['french-press', 'full-body', 'bundle', 'daily-brew'],
        imageUrl: '/listed_products/product3.png',
        imageAlt: 'French Press Ritual Bundle',
        images: [{ url: '/listed_products/product3.png', alt: 'French Press Ritual Bundle' }],
        stock: 28,
        createdBy: users[0]._id,
      },
      {
        name: 'Digital Brew Scale + Timer',
        description: 'Precision 2kg digital scale with integrated brew timer for coffee laboratory accuracy. Measure beans and water to 0.1g increments while the countdown timer tracks brewing duration. Illuminated LCD display, auto-shutoff, and waterproof platform make it barista-ready. Perfect for dialing in espresso ratios, pour-over blooms, and cold brew timing. Non-slip rubber feet and compact 15cm platform fit any brewing station. Take the guesswork out of consistency.',
        price: 4990,
        cost: 3900,
        category: 'tools',
        tags: ['scale', 'timer', 'ratio', 'consistency'],
        imageUrl: '/listed_products/product4.png',
        imageAlt: 'Digital Brew Scale + Timer',
        images: [{ url: '/listed_products/product4.png', alt: 'Digital Brew Scale + Timer' }],
        stock: 45,
        createdBy: users[0]._id,
      },
      {
        name: 'Home Espresso Accessory Pack',
        description: 'Elevate your espresso pulls with this comprehensive barista toolkit. Includes bottomless portafilter body for crema observation and shot diagnosis, stainless steel distribution tool for even puck settling, calibrated dosing ring for proper machine compatibility, and hardwood tamper with ergonomic grip. Perfectly balanced weight and construction ensure consistent 30-second extractions. Compatible with standard 58mm group heads. Professional results every morning.',
        price: 15990,
        cost: 15200,
        category: 'espresso-tools',
        tags: ['espresso', 'tamper', 'portafilter', 'distribution'],
        imageUrl: '/listed_products/product6.png',
        imageAlt: 'Home Espresso Accessory Pack',
        images: [{ url: '/listed_products/product6.png', alt: 'Home Espresso Accessory Pack' }],
        stock: 16,
        createdBy: users[0]._id,
      },
      {
        name: 'Cold Brew Tower Set',
        description: 'Watch as water slowly drips over 24 hours to extract a smooth, naturally sweet cold brew concentrate. This striking Yama glass tower combines function and aesthetics—perfect as a permanent kitchen installation. Manual valve control lets you adjust drip speed for flavor tuning. Includes glass collection flask (600ml capacity), reusable metal 4-hole dripper, and 100 paper filters. Produces 6-8 cold brew servings per cycle. A showpiece that brews.',
        price: 19990,
        cost: 18900,
        category: 'cold-brew',
        tags: ['cold-brew', 'slow-drip', 'summer', 'showpiece'],
        imageUrl: '/listed_products/product3.png',
        imageAlt: 'Cold Brew Tower Set',
        images: [{ url: '/listed_products/product3.png', alt: 'Cold Brew Tower Set' }],
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

