import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Zap, ArrowRight, Tag, Star } from 'lucide-react';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, openProductDetail, addToCart } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults(products.slice(0, 5));
      return;
    }
    const q = searchTerm.toLowerCase();
    const filtered = products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [searchTerm, products]);

  if (!isSearchOpen) return null;

  const popularTags = ['Steam', 'Windows 11', 'Canva', 'Spotify', 'ChatGPT', 'JetBrains', 'Gift Card'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            id="global-search-modal-input"
            autoFocus
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search digital licenses, Steam keys, Canva, Windows, gift cards..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags Quick Filters */}
        <div className="px-4 py-2.5 bg-slate-950/50 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 flex items-center gap-1 shrink-0">
            <Tag className="w-3 h-3 text-cyan-400" /> Popular:
          </span>
          {popularTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-cyan-950/60 hover:text-cyan-300 text-slate-300 text-xs shrink-0 transition-colors border border-slate-700/50"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1 divide-y divide-slate-800/40">
          {results.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No digital products found matching "{searchTerm}". Try searching for Steam, Windows, or Canva.
            </div>
          ) : (
            results.map(prod => (
              <div
                key={prod.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/60 transition-colors group cursor-pointer"
                onClick={() => {
                  openProductDetail(prod.slug);
                  setIsSearchOpen(false);
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0 border border-slate-700/50"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/40">
                        {prod.category}
                      </span>
                      <div className="flex items-center text-amber-400 text-xs gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span className="font-semibold">{prod.rating}</span>
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors mt-0.5">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-slate-400 truncate">{prod.shortDescription}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-3">
                  <div className="text-right">
                    <div className="text-sm font-bold text-white font-mono">
                      ${(prod.salePrice || prod.price).toFixed(2)}
                    </div>
                    {prod.salePrice && (
                      <div className="text-xs text-slate-500 line-through font-mono">
                        ${prod.price.toFixed(2)}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      addToCart(prod);
                      setIsSearchOpen(false);
                    }}
                    className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-colors"
                    title="Quick Add to Cart"
                  >
                    <Zap className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <span>Instant automated key dispatch on checkout ⚡</span>
          <span className="font-mono text-[11px] text-cyan-400">PlayBeat Digital Catalog</span>
        </div>
      </div>
    </div>
  );
};
