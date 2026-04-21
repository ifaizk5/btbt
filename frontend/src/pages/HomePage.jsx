import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productAPI } from '../api/index.js';
import { setProducts, setCategories, setTags, setLoading, setError } from '../redux/slices/productSlice.js';
import { addItem } from '../redux/slices/cartSlice.js';

export default function HomePage() {
  const dispatch = useDispatch();
  const { products, categories, isLoading, error } = useSelector((state) => state.products);
  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '' });

  useEffect(() => {
    fetchProducts();
    fetchFilters();
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

          <div className="card-nb nb-card-tilt-alt lg:col-span-5 bg-nb-cyan relative overflow-hidden">
            <div className="absolute -right-8 -top-8 h-40 w-40 border-4 border-nb-black bg-nb-orange rotate-12" />
            <div className="absolute -left-10 bottom-10 h-24 w-24 border-4 border-nb-black bg-nb-lime rotate-12" />
            <div className="relative flex h-full min-h-[360px] flex-col justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide">Coffee Gear Drop 2026</p>
                <h2 className="text-nb-subheading mt-2 text-[clamp(2.2rem,5.5vw,4.6rem)]">Brew Loud.</h2>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {['BEANS', 'GRIND', 'POUR', 'BLOOM', 'DRIP', 'SERVE'].map((item) => (
                  <div
                    key={item}
                    className="border-4 border-nb-black bg-nb-white p-3 text-center text-lg font-black uppercase"
                  >
                    {item}
                  </div>
                ))}
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
              {products.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <div className="card-nb h-full cursor-pointer transition-transform hover:-translate-y-1 bg-nb-white">
                    <div className="mb-4 flex h-48 items-center justify-center border-4 border-nb-black bg-nb-blue p-3">
                      <span className="text-center text-nb-white text-nb-sm uppercase font-bold">
                        {product.name.substring(0, 20)}...
                      </span>
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
