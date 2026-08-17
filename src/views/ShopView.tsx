import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import {
  SlidersHorizontal,
  Search,
  RotateCcw,
  LayoutGrid,
  List,
  Star,
  Check,
  ChevronDown,
  Zap,
} from 'lucide-react';
import { ProductType } from '../types';

export const ShopView: React.FC = () => {
  const { products, categories, selectedCategorySlug, openCategory } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>(selectedCategorySlug || 'all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync category if passed from outside
  React.useEffect(() => {
    if (selectedCategorySlug) {
      setSelectedCategory(selectedCategorySlug);
    }
  }, [selectedCategorySlug]);

  const productTypes: { label: string; value: ProductType | 'all' }[] = [
    { label: 'All Digital Types', value: 'all' },
    { label: 'Gaming PC Keys', value: 'gaming_product' },
    { label: 'Software & OS Licenses', value: 'software_license' },
    { label: 'SaaS & Subscriptions', value: 'subscription' },
    { label: 'Streaming Passes', value: 'streaming_service' },
    { label: 'Digital Gift Cards', value: 'gift_card' },
    { label: 'Digital Services', value: 'digital_service' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (selectedCategory !== 'all' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
        if (selectedType !== 'all' && p.productType !== selectedType) {
          return false;
        }
        const effectivePrice = p.salePrice || p.price;
        if (effectivePrice < minPrice || effectivePrice > maxPrice) {
          return false;
        }
        if (selectedRating > 0 && p.rating < selectedRating) {
          return false;
        }
        if (searchFilter.trim()) {
          const q = searchFilter.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.tags.some(t => t.toLowerCase().includes(q));
          if (!matches) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice || a.price;
        const priceB = b.salePrice || b.price;
        if (sortBy === 'price_asc') return priceA - priceB;
        if (sortBy === 'price_desc') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
      });
  }, [products, selectedCategory, selectedType, minPrice, maxPrice, selectedRating, sortBy, searchFilter]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedType('all');
    setMinPrice(0);
    setMaxPrice(300);
    setSelectedRating(0);
    setSearchFilter('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedType !== 'all' ||
    minPrice > 0 ||
    maxPrice < 300 ||
    selectedRating > 0 ||
    searchFilter.trim() !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Official Storefront</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Digital Marketplace Catalog</h1>
          <p className="text-xs text-slate-400 mt-1">
            Showing {filteredProducts.length} verified digital items with instant automated delivery.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="shop-inline-search"
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            placeholder="Filter catalog..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR FILTERS (Desktop) */}
        <div className="hidden lg:block space-y-6 bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Filters</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Departments</h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>All Departments</span>
                <span className="font-mono text-[11px]">{products.length}</span>
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="font-mono text-[11px]">{cat.productCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Type Filter */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Product Type</h4>
            <div className="space-y-1">
              {productTypes.map(t => (
                <button
                  key={t.value}
                  onClick={() => setSelectedType(t.value)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedType === t.value
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-300">Price Range</span>
              <span className="text-cyan-400 font-mono font-bold">${minPrice} - ${maxPrice}</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              step="5"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Customer Rating</h4>
            <div className="flex gap-1.5">
              {[4, 4.5, 4.8].map(r => (
                <button
                  key={r}
                  onClick={() => setSelectedRating(selectedRating === r ? 0 : r)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 border transition-colors ${
                    selectedRating === r
                      ? 'bg-amber-950/80 border-amber-600 text-amber-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{r}+</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN PRODUCT LISTING */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort & Filter Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 gap-4">
            <div className="text-xs text-slate-400">
              Showing <strong className="text-white font-mono">{filteredProducts.length}</strong> items
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden sm:inline font-medium">Sort By:</span>
              <select
                id="shop-sort-select"
                aria-label="Sort products by"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-medium focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="featured">Featured & Trending</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="newest">Newest Releases</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-500 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white">No products match your filters</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try widening your price range or clearing active keyword filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
