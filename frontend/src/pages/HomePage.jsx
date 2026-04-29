import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productAPI, mediaAPI } from '../api/index.js';
import { setProducts, setCategories, setTags, setLoading, setError } from '../redux/slices/productSlice.js';
import { addItem } from '../redux/slices/cartSlice.js';

export default function HomePage() {
  const dispatch = useDispatch();
  const { products, categories, isLoading, error } = useSelector((state) => state.products);
  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '' });
  const [listedProductImages, setListedProductImages] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchFilters();
    fetchListedProductImages();
  }, []);

  const fetchProducts = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await productAPI.getAll({ page: 1, limit: 20, ...filters });
      dispatch(setProducts(data.data));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Failed to load products'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchFilters = async () => {
    try {
      const [catRes, tagsRes] = await Promise.all([
        productAPI.getCategories(),
        productAPI.getTags(),
      ]);
      dispatch(setCategories(catRes.data.data.categories));
      dispatch(setTags(tagsRes.data.data.tags));
    } catch (err) {
      console.error('Failed to load filters');
    }
  };

  const fetchListedProductImages = async () => {
    try {
      const { data } = await mediaAPI.getListedProducts();
      setListedProductImages(data.data.files || []);
    } catch (err) {
      console.error('Failed to load listed product images');
      setListedProductImages([]);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addItem({
      product,
      quantity: 1,
      variant: null,
    }));
  };

  const applyFilters = () => {
    fetchProducts();
  };

  const getListedProductImage = (index) =>
    listedProductImages.length > 0
      ? listedProductImages[index % listedProductImages.length]
      : '/coffee_mug.png';

  return (
    <div className="nb-shell min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="card-nb nb-card-tilt lg:col-span-7 bg-nb-white">
            <span className="nb-badge mb-4 bg-nb-lime">Bean There, Brew That / PKR / Neo Brutal</span>
            <h1 className="text-nb-heading mb-5 text-[clamp(3rem,8vw,7rem)]">
              BEAN THERE,
              <br />
              BREW THAT
              <br />
              EVERY DAY
            </h1>
            <p className="max-w-xl text-xl font-semibold leading-tight md:text-2xl">
              Pro-grade coffee brewing sets with brutalist energy. Build your ritual with drippers, grinders, kettles, and barista tools that look as sharp as they brew.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn-nb-primary px-6 py-3">Start Brewing</Link>
              <Link to="/cart" className="btn-nb-secondary px-6 py-3">Open Brew Cart</Link>
            </div>
          </div>

          <div className="card-nb nb-card-tilt-alt lg:col-span-5 overflow-hidden bg-[linear-gradient(135deg,#f5efe7_0%,#efe4d7_44%,#d3f050_100%)] p-0 relative">
            <div className="absolute left-4 top-4 z-20 nb-badge bg-nb-white">Coffee Gear Drop 2026</div>
            <div className="absolute right-4 bottom-4 z-20 rotate-[-6deg] border-4 border-nb-black bg-nb-white px-3 py-2 shadow-[8px_8px_0px_#000]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-nb-black">Bean There, Brew That</p>
            </div>

            <div className="relative flex min-h-[360px] items-center justify-center p-6 md:p-8">
              <div className="absolute inset-6 border-4 border-dashed border-nb-black/20 bg-[radial-gradient(circle_at_1px_1px,rgba(10,10,10,0.08)_1px,transparent_0)] bg-[length:18px_18px] opacity-80" />

              <div className="relative z-10 flex h-full w-full items-center justify-center">
                <img
                  src="/coffee_mug.png"
                  alt="Bean There, Brew That coffee mugs"
                  className="h-[75%] w-[75%] min-h-[260px] min-w-[260px] max-h-[520px] max-w-[520px] object-contain drop-shadow-[18px_18px_0px_rgba(10,10,10,0.45)] transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
            </div>
                        <div className="relative flex min-h-[360px] items-center justify-center p-6 md:p-8">
              <div className="absolute inset-6 border-4 border-dashed border-nb-black/20 bg-[radial-gradient(circle_at_1px_1px,rgba(10,10,10,0.08)_1px,transparent_0)] bg-[length:18px_18px] opacity-80" />

              <div className="relative z-10 flex h-full w-full items-center justify-center">
                <img
                  src="/coffee_mug2.png"
                  alt="Bean There, Brew That coffee mugs"
                  className="h-[75%] w-[75%] min-h-[260px] min-w-[260px] max-h-[520px] max-w-[520px] object-contain drop-shadow-[18px_18px_0px_rgba(10,10,10,0.45)] transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="card-nb mb-8 bg-nb-yellow">
          <h2 className="text-nb-title mb-4 text-[clamp(2rem,4vw,3rem)]">Filter Your Brew Set</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="block text-nb-sm uppercase font-bold mb-2">Category</label>
              <select
                className="input-nb"
                value={filters.category}
                onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-nb-sm uppercase font-bold mb-2">Min Price</label>
              <input
                type="number"
                className="input-nb"
                placeholder="PKR 0"
                value={filters.minPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-nb-sm uppercase font-bold mb-2">Max Price</label>
              <input
                type="number"
                className="input-nb"
                placeholder="PKR 100000"
                value={filters.maxPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
              />
            </div>
            <div className="flex items-end">
              <button onClick={applyFilters} className="btn-nb-primary w-full">Apply Filters</button>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-nb-title text-[clamp(2rem,4vw,3.4rem)]">Featured Brewing Sets</h2>
            <span className="nb-badge bg-nb-cyan">{products.length} Loaded</span>
          </div>

          {error && (
            <div className="card-nb mb-6 border-4 border-nb-red bg-nb-red text-nb-white">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-nb-lg font-bold uppercase">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {products.map((product, index) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <div className="card-nb h-full cursor-pointer transition-transform hover:-translate-y-1 bg-nb-white">
                    <div className="mb-4 flex h-48 items-center justify-center overflow-hidden border-4 border-nb-black bg-nb-blue p-3">
                      <img
                        src={getListedProductImage(index)}
                        alt={product.name}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = '/coffee_mug.png';
                        }}
                      />
                    </div>
                    <h3 className="mb-2 line-clamp-2 text-nb-sm font-bold uppercase">
                      {product.name}
                    </h3>
                    <p className="mb-4 text-nb-lg font-bold text-nb-red">
                      ₨ {product.price.toLocaleString()}
                    </p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      className="btn-nb-success w-full"
                    >
                      Add Brew Set
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
