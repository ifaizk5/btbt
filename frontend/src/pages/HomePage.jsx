import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productAPI } from '../api/index.js';
import { setProducts, setCategories, setTags, setLoading, setError } from '../redux/slices/productSlice.js';
import { addItem } from '../redux/slices/cartSlice.js';
import { selectWishlistItems, toggleWishlistItem } from '../redux/slices/wishlistSlice.js';
import ProductCard from '../components/ProductCard.jsx';
import { getProductImageAlt, getProductImageUrl } from '../utils/productImage.js';

export default function HomePage() {
  const dispatch = useDispatch();
  const { products, categories, isLoading, error } = useSelector((state) => state.products);
  const wishlistItems = useSelector(selectWishlistItems);
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

  const handleToggleWishlist = (product) => {
    dispatch(toggleWishlistItem(product));
  };

  const applyFilters = () => {
    fetchProducts();
  };

  const featuredProduct = products[0];

  const editorialSpans = [
    'lg:col-span-7 lg:row-span-2',
    'lg:col-span-5',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-6',
    'lg:col-span-12',
  ];

  return (
    <div className="premium-shell min-h-screen">
      <section className="premium-section pt-8 lg:pt-12">
        <div className="premium-container grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="premium-fade-up lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="premium-pill">Hand-finished brewing sets</span>
              <span className="premium-meta">PKR / limited seasonal catalog</span>
            </div>

            <h1 className="premium-display mt-6 max-w-4xl text-[clamp(4rem,11vw,8.75rem)]">
              Bean There,
              <br />
              Brew That
              <br />
              Every Day
            </h1>

            <p className="premium-copy mt-6 max-w-2xl text-[1.02rem] md:text-[1.12rem]">
              Premium coffee brewing equipment for a slower ritual. Each object is selected for
              balance, tactile precision, and the kind of restraint that lets the brew do the talking.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="premium-button px-5 py-3">
                Start Brewing -&gt;
              </Link>
              <Link to="/cart" className="premium-button premium-button--ghost px-5 py-3">
                View Cart
              </Link>
            </div>

            <div className="mt-10 grid gap-4 border-t border-[var(--color-line)] pt-6 sm:grid-cols-3">
              <div>
                <div className="premium-meta">Curated for</div>
                <p className="mt-2 text-sm text-[var(--color-text)]">AeroPress, V60, French press, espresso, and all-day pour-over routines.</p>
              </div>
              <div>
                <div className="premium-meta">Shipping</div>
                <p className="mt-2 text-sm text-[var(--color-text)]">Free shipping over PKR 12,000 with careful packing and quick dispatch.</p>
              </div>
              <div>
                <div className="premium-meta">Design</div>
                <p className="mt-2 text-sm text-[var(--color-text)]">Minimal, tactile, and quiet. Built to feel more like a gallery than a shop.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="premium-card premium-card--image overflow-hidden">
              <div className="grid min-h-[34rem] gap-0 md:grid-cols-2">
                <div className="relative flex items-end bg-[linear-gradient(180deg,#efe9de_0%,#f8f4ee_100%)] p-6 md:p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,155,115,0.22),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(26,26,26,0.04),transparent_24%)]" />
                  <div className="relative z-10 w-full">
                    <img
                      src={featuredProduct ? getProductImageUrl(featuredProduct) : '/coffee_mug.png'}
                      alt={featuredProduct ? getProductImageAlt(featuredProduct) : 'Featured brewing set'}
                      className="mx-auto w-[86%] max-w-[340px] object-contain transition-transform duration-700 ease-in-out hover:scale-[1.02]"
                      onError={(e) => {
                        e.currentTarget.src = '/coffee_mug.png';
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-6 border-t border-[var(--color-line)] bg-[var(--color-surface)] p-6 md:border-l md:border-t-0 md:p-8">
                  <div>
                    <div className="premium-meta">Current feature</div>
                    <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
                      Brewing objects, presented with museum-level restraint.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="premium-divider" />
                    <div className="flex items-center justify-between gap-4 text-sm text-[var(--color-muted)]">
                      <span>Catalog</span>
                      <span>{products.length.toString().padStart(2, '0')} pieces</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-sm text-[var(--color-muted)]">
                      <span>Finish</span>
                      <span>Matte, tactile, quiet</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-sm text-[var(--color-muted)]">
                      <span>Hero asset</span>
                      <span>High-resolution still life</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="premium-card--flat p-4">
                  <div className="premium-meta">Edition {item}</div>
                  <p className="mt-2 text-sm text-[var(--color-text)]">
                    A tactile brewing object with a gallery-grade presentation.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section--tight">
        <div className="premium-container premium-card px-5 py-5 md:px-6 md:py-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="premium-kicker">Curate your ritual</div>
              <h2 className="premium-title mt-2 text-[clamp(2.2rem,4vw,4rem)]">
                Filter with intention.
              </h2>
            </div>
            <span className="premium-pill w-fit">{products.length} loaded</span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-4">
            <div>
              <label className="premium-label">Category</label>
              <select
                className="premium-select"
                value={filters.category}
                onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="premium-label">Min Price</label>
              <input
                type="number"
                className="premium-input"
                placeholder="PKR 0"
                value={filters.minPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
              />
            </div>
            <div>
              <label className="premium-label">Max Price</label>
              <input
                type="number"
                className="premium-input"
                placeholder="PKR 100000"
                value={filters.maxPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
              />
            </div>
            <div className="flex items-end">
              <button onClick={applyFilters} className="premium-button w-full px-5 py-3">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section pt-0">
        <div className="premium-container">
          <div className="flex flex-col gap-3 border-b border-[var(--color-line)] pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="premium-kicker">The gallery</div>
              <h2 className="premium-title mt-2 text-[clamp(2.4rem,4vw,4.8rem)]">
                Featured brewing sets.
              </h2>
            </div>
            <p className="premium-copy max-w-xl text-sm md:text-right">
              The grid is intentionally staggered to feel editorial rather than transactional, with
              each object given enough breathing room to read like a product portrait.
            </p>
          </div>

          {error && (
            <div className="premium-card mt-6 border border-[#d8b1a8] bg-[#f8efec] px-4 py-4 text-sm text-[#6a3029]">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex min-h-[18rem] items-center justify-center">
              <p className="premium-meta">Loading the gallery</p>
            </div>
          ) : (
            <div className="premium-grid premium-grid--editorial mt-8">
              {products.map((product, index) => {
                const spanClass = editorialSpans[index] || 'lg:col-span-4';
                const isWishlisted = wishlistItems.some((item) => item._id === product._id);

                return (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isWishlisted={isWishlisted}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    className={spanClass}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="premium-section pt-0">
        <div className="premium-container">
          <div className="premium-card overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-12">
              <div className="lg:col-span-5 border-b border-[var(--color-line)] p-6 md:p-8 lg:border-b-0 lg:border-r">
                <div className="premium-kicker">Brewing philosophy</div>
                <h2 className="mt-4 text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                  “The best brew feels inevitable.”
                </h2>
              </div>
              <div className="lg:col-span-7 p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <p className="premium-copy">
                    Bean There, Brew That treats every brewer as a ritual instrument. The product,
                    the image, and the page itself all move quietly so the craft stays centered.
                  </p>
                  <p className="premium-copy">
                    This section intentionally uses space, scale, and a restrained palette to create
                    the feeling of a lookbook rather than a catalog, with each piece presented as a
                    small object of desire.
                  </p>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {['Slow pour', 'Exacting details', 'Quiet luxury'].map((item) => (
                    <div key={item} className="border-t border-[var(--color-line)] pt-4">
                      <div className="premium-meta">{item}</div>
                      <p className="mt-2 text-sm text-[var(--color-muted)]">
                        Deliberate motion and soft contrast keep the brand calm and tactile.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
