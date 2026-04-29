import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const listedProductsDir = path.resolve(__dirname, '../../../frontend/public/listed_products');

router.get('/listed-products', async (req, res, next) => {
  try {
    const entries = await fs.readdir(listedProductsDir, { withFileTypes: true });

    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => /\.(png|jpe?g|webp|gif|svg)$/i.test(name))
      .sort((a, b) => {
        const aNumber = parseInt(a.match(/\d+/)?.[0] || '0', 10);
        const bNumber = parseInt(b.match(/\d+/)?.[0] || '0', 10);
        if (aNumber !== bNumber) return aNumber - bNumber;
        return a.localeCompare(b);
      })
      .map((name) => `/listed_products/${name}`);

    res.json({
      success: true,
      statusCode: 200,
      data: { files },
      message: 'Listed product images loaded successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;