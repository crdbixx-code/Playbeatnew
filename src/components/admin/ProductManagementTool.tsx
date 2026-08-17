import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductType } from '../../types';
import {
  Package,
  Plus,
  Search,
  Filter,
  Sliders,
  DollarSign,
  Key,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Tag,
  Sparkles,
  Layers,
  ArrowUpDown,
  Download,
  Upload,
  RefreshCw,
  Eye,
  TrendingUp,
  Boxes,
  Zap,
} from 'lucide-react';

export const ProductManagementTool: React.FC = () => {
  const { products, categories, refreshData, showToast } = useApp();

  // Search, Filter & Sorter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'sold'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Modal / Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Batch Selection for Quick Bulk Actions
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [bulkPriceChangePercent, setBulkPriceChangePercent] = useState<number>(10);

  // Form State
  const [formState, setFormState] = useState<Partial<Product>>({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    price: 29.99,
    salePrice: 19.99,
    category: 'gaming',
    productType: 'gaming_product',
    brand: 'PlayBeat Digital',
    sku: '',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'],
    isFeatured: true,
    isFlashDeal: false,
    isBestSeller: false,
    tags: ['instant_dispatch', 'verified_license'],
  });

  // Filtered & Sorted Products Calculation
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCat = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesType = selectedType === 'all' || product.productType === selectedType;

        let matchesStock = true;
        if (stockFilter === 'in_stock') matchesStock = product.stock > 5;
        if (stockFilter === 'low_stock') matchesStock = product.stock > 0 && product.stock <= 5;
        if (stockFilter === 'out_of_stock') matchesStock = product.stock === 0;

        return matchesSearch && matchesCat && matchesType && matchesStock;
      })
      .sort((a, b) => {
        let diff = 0;
        if (sortBy === 'name') diff = a.name.localeCompare(b.name);
        if (sortBy === 'price') diff = a.price - b.price;
        if (sortBy === 'stock') diff = a.stock - b.stock;
        if (sortBy === 'sold') diff = (a.unitsSold || 0) - (b.unitsSold || 0);
        return sortOrder === 'asc' ? diff : -diff;
      });
  }, [products, searchTerm, selectedCategory, selectedType, stockFilter, sortBy, sortOrder]);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormState({
      name: '',
      slug: '',
      shortDescription: '',
      description: '',
      price: 29.99,
      salePrice: 19.99,
      category: 'gaming',
      productType: 'gaming_product',
      brand: 'PlayBeat Digital',
      sku: 'PB-' + Math.floor(1000 + Math.random() * 9000),
      stock: 30,
      images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'],
      isFeatured: true,
      isFlashDeal: false,
      isBestSeller: false,
      tags: ['digital_license', 'instant_delivery'],
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormState({
      ...p,
      images: p.images && p.images.length > 0 ? p.images : ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'],
    });
    setIsEditorOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name) {
      showToast('Product name is required', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const isEdit = !!editingProduct;
      const url = isEdit ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        ...formState,
        slug: formState.slug || formState.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        price: Number(formState.price) || 0,
        salePrice: formState.salePrice ? Number(formState.salePrice) : undefined,
        stock: Number(formState.stock) || 0,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsEditorOpen(false);
        setEditingProduct(null);
        await refreshData();
        showToast(isEdit ? 'Product updated successfully!' : 'New product published to catalog!', 'success');
      } else {
        showToast('Failed to save product', 'error');
      }
    } catch {
      showToast('Error connecting to product server', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await refreshData();
        showToast(`Product "${name}" deleted`, 'info');
      }
    } catch {
      showToast('Failed to delete product', 'error');
    }
  };

  const handleToggleSelectAll = () => {
    if (selectedProductIds.length === filteredProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filteredProducts.map(p => p.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(selectedProductIds.filter(item => item !== id));
    } else {
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };

  // Bulk Discount / Mark-up Action
  const handleApplyBulkDiscount = async (type: 'discount' | 'markup') => {
    if (selectedProductIds.length === 0) {
      showToast('Select at least one product first', 'error');
      return;
    }

    const multiplier = type === 'discount' ? 1 - bulkPriceChangePercent / 100 : 1 + bulkPriceChangePercent / 100;

    let updatedCount = 0;
    for (const id of selectedProductIds) {
      const prod = products.find(p => p.id === id);
      if (!prod) continue;
      const newPrice = Math.max(1, Math.round(prod.price * multiplier * 100) / 100);
      try {
        await fetch(`/api/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ price: newPrice }),
        });
        updatedCount++;
      } catch {}
    }

    await refreshData();
    setSelectedProductIds([]);
    showToast(`Bulk updated ${updatedCount} products by ${bulkPriceChangePercent}%!`, 'success');
  };

  // Bulk Stock Adjust
  const handleBulkRestock = async (units: number) => {
    if (selectedProductIds.length === 0) {
      showToast('Select at least one product first', 'error');
      return;
    }

    for (const id of selectedProductIds) {
      const prod = products.find(p => p.id === id);
      if (!prod) continue;
      try {
        await fetch(`/api/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stock: prod.stock + units }),
        });
      } catch {}
    }

    await refreshData();
    setSelectedProductIds([]);
    showToast(`Restocked ${units} units to selected products!`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Tool Top Header & Metrics */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800 font-mono">
            <Boxes className="w-3.5 h-3.5" />
            <span>Advanced Product Management Suite</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-2">Catalog, Inventory & Pricing Controller</h2>
          <p className="text-xs text-slate-400 font-mono">
            Manage {products.length} products across 6 active categories with batch price adjustments and automated stock sync.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => refreshData()}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>
      </div>

      {/* Summary KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold block">Total Catalog Items</span>
          <span className="text-2xl font-black text-white font-mono">{products.length}</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-emerald-400 font-semibold block">In Stock & Dispatched</span>
          <span className="text-2xl font-black text-emerald-400 font-mono">
            {products.filter(p => p.stock > 0).length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-amber-400 font-semibold block">Low Stock Alert (&lt;= 5)</span>
          <span className="text-2xl font-black text-amber-400 font-mono">
            {products.filter(p => p.stock > 0 && p.stock <= 5).length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-cyan-400 font-semibold block">Featured Storefront Items</span>
          <span className="text-2xl font-black text-cyan-400 font-mono">
            {products.filter(p => p.isFeatured).length}
          </span>
        </div>
      </div>

      {/* Interactive Search, Category Filters, and Sorters Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Input */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by title, SKU, brand..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Selector */}
          <div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          <div>
            <select
              value={stockFilter}
              onChange={e => setStockFilter(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            >
              <option value="all">All Stock Statuses</option>
              <option value="in_stock">In Stock (&gt; 5)</option>
              <option value="low_stock">Low Stock (1–5)</option>
              <option value="out_of_stock">Out of Stock (0)</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            >
              <option value="name">Sort: Name</option>
              <option value="price">Sort: Price</option>
              <option value="stock">Sort: Stock</option>
              <option value="sold">Sort: Units Sold</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300"
              title="Toggle Sort Order"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Batch Operations Bar when items selected */}
        {selectedProductIds.length > 0 && (
          <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold font-mono">
                {selectedProductIds.length} Selected
              </span>
              <span className="text-slate-300">Bulk Operations:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[11px]">%</span>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={bulkPriceChangePercent}
                  onChange={e => setBulkPriceChangePercent(Number(e.target.value))}
                  className="w-12 bg-transparent text-white font-mono text-center text-xs"
                />
              </div>

              <button
                onClick={() => handleApplyBulkDiscount('discount')}
                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold"
              >
                Apply -{bulkPriceChangePercent}% Discount
              </button>

              <button
                onClick={() => handleApplyBulkDiscount('markup')}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold"
              >
                Apply +{bulkPriceChangePercent}% Markup
              </button>

              <button
                onClick={() => handleBulkRestock(20)}
                className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-lg font-bold"
              >
                +20 Restock Keys
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Data Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3.5 w-8">
                <input
                  type="checkbox"
                  checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={handleToggleSelectAll}
                  className="rounded border-slate-700 bg-slate-900"
                />
              </th>
              <th className="p-3.5">Product & SKU</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Pricing</th>
              <th className="p-3.5">Stock Status</th>
              <th className="p-3.5">Badges</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60 font-sans">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-500">
                  No products found matching your filters.
                </td>
              </tr>
            ) : (
              filteredProducts.map(p => {
                const isSelected = selectedProductIds.includes(p.id);
                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isSelected ? 'bg-blue-950/20' : ''
                    }`}
                  >
                    <td className="p-3.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(p.id)}
                        className="rounded border-slate-700 bg-slate-900"
                      />
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&auto=format&fit=crop&q=80'}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                        />
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-white max-w-xs truncate">{p.name}</h4>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                            <span>{p.sku || 'PB-GEN-001'}</span>
                            <span>•</span>
                            <span>{p.brand}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px] uppercase">
                        {p.category}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <div className="space-y-0.5 font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white text-sm">
                            ${(p.salePrice || p.price).toFixed(2)}
                          </span>
                          {p.salePrice && (
                            <span className="text-[10px] text-slate-500 line-through">
                              ${p.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-mono font-bold">
                          {p.stock > 5 ? (
                            <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" /> {p.stock} In Stock
                            </span>
                          ) : p.stock > 0 ? (
                            <span className="text-amber-400 flex items-center gap-1 text-[11px]">
                              <Zap className="w-3.5 h-3.5" /> Low: {p.stock}
                            </span>
                          ) : (
                            <span className="text-rose-400 flex items-center gap-1 text-[11px]">
                              <XCircle className="w-3.5 h-3.5" /> Out of Stock
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          {p.unitsSold || 0} units dispatched
                        </span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex flex-wrap items-center gap-1">
                        {p.isFeatured && (
                          <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-[9px] font-bold">
                            Featured
                          </span>
                        )}
                        {p.isFlashDeal && (
                          <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 text-[9px] font-bold">
                            Flash
                          </span>
                        )}
                        {p.isBestSeller && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 text-[9px] font-bold">
                            Best Seller
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-1.5 bg-slate-800 hover:bg-rose-900/60 text-rose-400 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Product Creator / Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-400" />
                <span>{editingProduct ? 'Edit Catalog Product' : 'Create New Product'}</span>
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Windows 11 Pro Retail License"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Category *</label>
                  <select
                    value={formState.category}
                    onChange={e => setFormState({ ...formState, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Standard Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formState.price}
                    onChange={e => setFormState({ ...formState, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Sale Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formState.salePrice || ''}
                    onChange={e => setFormState({ ...formState, salePrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Initial Stock</label>
                  <input
                    type="number"
                    value={formState.stock}
                    onChange={e => setFormState({ ...formState, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Brand / Publisher</label>
                  <input
                    type="text"
                    value={formState.brand}
                    onChange={e => setFormState({ ...formState, brand: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">SKU Code</label>
                  <input
                    type="text"
                    value={formState.sku}
                    onChange={e => setFormState({ ...formState, sku: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Image URL</label>
                <input
                  type="url"
                  value={formState.images?.[0] || ''}
                  onChange={e => setFormState({ ...formState, images: [e.target.value] })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Short Summary</label>
                <input
                  type="text"
                  value={formState.shortDescription}
                  onChange={e => setFormState({ ...formState, shortDescription: e.target.value })}
                  placeholder="Key features shown in product card"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Full Description</label>
                <textarea
                  rows={4}
                  value={formState.description}
                  onChange={e => setFormState({ ...formState, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formState.isFeatured}
                    onChange={e => setFormState({ ...formState, isFeatured: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800"
                  />
                  <span>Featured in Hero</span>
                </label>

                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formState.isFlashDeal}
                    onChange={e => setFormState({ ...formState, isFlashDeal: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800"
                  />
                  <span>Flash Deal</span>
                </label>

                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formState.isBestSeller}
                    onChange={e => setFormState({ ...formState, isBestSeller: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800"
                  />
                  <span>Best Seller</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-2"
                >
                  {isSaving ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
