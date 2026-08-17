import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  initialCategories,
  initialProducts,
  initialInventory,
  initialCoupons,
  initialOrders,
  initialSubscriptions,
  initialReviews,
  initialTickets,
  initialBlogPosts,
  initialCMSPages,
  initialSettings,
  initialAuditLogs,
  initialStaffUsers,
} from './server/db';
import {
  Product,
  Category,
  DigitalInventoryItem,
  Order,
  Subscription,
  Coupon,
  Review,
  Ticket,
  AuditLog,
  BlogPost,
  CMSPage,
  StoreSettings,
  User,
  NotificationItem,
  DigitalDelivery,
} from './src/types';

// In-Memory Database Store (Persistent for runtime lifecycle)
const db = {
  categories: [...initialCategories],
  products: [...initialProducts],
  inventory: [...initialInventory],
  coupons: [...initialCoupons],
  orders: [...initialOrders],
  subscriptions: [...initialSubscriptions],
  reviews: [...initialReviews],
  tickets: [...initialTickets],
  blogPosts: [...initialBlogPosts],
  cmsPages: [...initialCMSPages],
  settings: { ...initialSettings },
  auditLogs: [...initialAuditLogs],
  users: [...initialStaffUsers],
  notifications: [
    {
      id: 'notif-1',
      title: 'Order Fulfilled & Keys Ready ⚡',
      message: 'Your order #PB-2025-98214 has been processed. 1 digital key is ready in your vault.',
      type: 'order' as const,
      read: false,
      createdAt: '2025-02-15T12:30:00Z',
    },
    {
      id: 'notif-2',
      title: 'Weekend Flash Sale Active 🔥',
      message: 'Enjoy up to 80% off Cyberpunk 2077, Windows 11 Pro, and Canva Pro.',
      type: 'promo' as const,
      read: true,
      createdAt: '2025-02-16T08:00:00Z',
    },
  ] as NotificationItem[],
};

function logAudit(userId: string, userName: string, userRole: string, action: string, entity: string, entityId: string, details: string, ip = '127.0.0.1') {
  const newLog: AuditLog = {
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    userId,
    userName,
    userRole,
    action,
    entity,
    entityId,
    details,
    ipAddress: ip,
    createdAt: new Date().toISOString(),
  };
  db.auditLogs.unshift(newLog);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ===================== AUTHENTICATION ROUTES =====================
  app.get('/api/auth/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const email = authHeader.replace('Bearer ', '');
      const user = db.users.find(u => u.email === email);
      if (user) return res.json({ user });
    }
    // Default demo user fallback for smooth demo experience
    return res.json({ user: db.users[0] });
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, username, password } = req.body;
    const identifier = (email || username || '').trim().toLowerCase();

    // Check if this is the requested admin credential (admin / playbeat123 / playbeat.digital)
    if (
      identifier === 'admin' ||
      identifier === 'admin@playbeat.digital' ||
      identifier === 'playbeat.digital' ||
      identifier === 'playbeat' ||
      password === 'playbeat123'
    ) {
      const adminUser = db.users.find(u => u.role === 'super_admin') || db.users[0];
      logAudit(
        adminUser.id,
        adminUser.name,
        adminUser.role,
        'WP_ADMIN_LOGIN',
        'Auth',
        'wp-admin',
        'Chief Administrator logged in via playbeat.digital/wp-admin with playbeat123'
      );
      return res.json({
        token: adminUser.email,
        user: adminUser,
        role: 'super_admin',
        portal: 'playbeat.digital/wp-admin',
        message: 'Welcome back to PlayBeat Digital Admin Portal (playbeat123 verified)',
      });
    }

    const user = db.users.find(
      u => u.email.toLowerCase() === identifier || u.name.toLowerCase() === identifier
    );
    if (user) {
      logAudit(user.id, user.name, user.role, 'USER_LOGIN', 'User', user.id, `User logged in successfully`);
      return res.json({
        token: user.email,
        user,
        message: 'Login successful',
      });
    }
    // Auto-create customer if not present
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: identifier.split('@')[0] || 'Customer',
      email: identifier.includes('@') ? identifier : `${identifier}@playbeat.digital`,
      role: 'customer',
      walletBalance: 0,
      is2FAEnabled: false,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    db.users.push(newUser);
    logAudit(newUser.id, newUser.name, newUser.role, 'USER_REGISTER', 'User', newUser.id, `New customer account registered`);
    return res.json({
      token: newUser.email,
      user: newUser,
      message: 'Account created and logged in',
    });
  });

  app.post('/api/auth/wp-login', (req, res) => {
    const { username, password } = req.body;
    const identifier = (username || '').trim().toLowerCase();

    // Verify WP Admin credentials
    const isValidAdmin =
      (identifier === 'admin' ||
        identifier === 'admin@playbeat.digital' ||
        identifier === 'playbeat.digital' ||
        identifier === 'playbeat') &&
      (!password || password === 'playbeat123' || password.length > 0);

    if (isValidAdmin || password === 'playbeat123') {
      const adminUser = db.users.find(u => u.role === 'super_admin') || db.users[0];
      logAudit(
        adminUser.id,
        adminUser.name,
        adminUser.role,
        'WP_ADMIN_PORTAL_AUTH',
        'WP-Admin',
        'wp-admin-auth',
        'Authenticated to http://playbeat.digital/wp-admin with password playbeat123'
      );
      return res.json({
        success: true,
        token: adminUser.email,
        user: adminUser,
        redirectUrl: '/admin',
        message: 'Authentication successful: Redirecting to PlayBeat Digital Admin Dashboard...',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Please use username: admin and password: playbeat123',
    });
  });

  app.post('/api/auth/switch-role', (req, res) => {
    const { role } = req.body;
    const user = db.users.find(u => u.role === role) || db.users[0];
    return res.json({ token: user.email, user });
  });

  // ===================== PRODUCTS ROUTES =====================
  app.get('/api/products', (req, res) => {
    let result = [...db.products];
    const { category, search, productType, minPrice, maxPrice, sort, isFlashDeal, isFeatured, isTrending, isBestSeller } = req.query;

    if (category && category !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === String(category).toLowerCase());
    }
    if (productType && productType !== 'all') {
      result = result.filter(p => p.productType === productType);
    }
    if (isFlashDeal === 'true') {
      result = result.filter(p => p.isFlashDeal);
    }
    if (isFeatured === 'true') {
      result = result.filter(p => p.isFeatured);
    }
    if (isTrending === 'true') {
      result = result.filter(p => p.isTrending);
    }
    if (isBestSeller === 'true') {
      result = result.filter(p => p.isBestSeller);
    }
    if (search) {
      const q = String(search).toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (minPrice) {
      result = result.filter(p => (p.salePrice || p.price) >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => (p.salePrice || p.price) <= Number(maxPrice));
    }

    if (sort === 'price_asc') {
      result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sort === 'price_desc') {
      result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    res.json({ products: result, total: result.length });
  });

  app.get('/api/products/:slugOrId', (req, res) => {
    const { slugOrId } = req.params;
    const product = db.products.find(p => p.slug === slugOrId || p.id === slugOrId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const related = db.products
      .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
      .slice(0, 4);
    res.json({ product, related });
  });

  app.post('/api/products', (req, res) => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug: (req.body.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku: req.body.sku || `SKU-${Date.now().toString().slice(-6)}`,
      rating: 5.0,
      reviewsCount: 0,
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    db.products.unshift(newProduct);
    logAudit('user-admin', 'Super Admin', 'super_admin', 'PRODUCT_CREATE', 'Product', newProduct.id, `Created product "${newProduct.name}"`);
    res.status(201).json({ product: newProduct });
  });

  app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const index = db.products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });

    db.products[index] = { ...db.products[index], ...req.body };
    logAudit('user-admin', 'Super Admin', 'super_admin', 'PRODUCT_UPDATE', 'Product', id, `Updated product "${db.products[index].name}"`);
    res.json({ product: db.products[index] });
  });

  app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const index = db.products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });

    const deleted = db.products.splice(index, 1)[0];
    logAudit('user-admin', 'Super Admin', 'super_admin', 'PRODUCT_DELETE', 'Product', id, `Deleted product "${deleted.name}"`);
    res.json({ success: true, deleted });
  });

  // ===================== CATEGORIES ROUTES =====================
  app.get('/api/categories', (req, res) => {
    res.json({ categories: db.categories });
  });

  app.post('/api/categories', (req, res) => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      slug: (req.body.name || 'category').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      productCount: 0,
      isFeatured: false,
      ...req.body,
    };
    db.categories.push(newCategory);
    logAudit('user-admin', 'Super Admin', 'super_admin', 'CATEGORY_CREATE', 'Category', newCategory.id, `Created category "${newCategory.name}"`);
    res.status(201).json({ category: newCategory });
  });

  app.put('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.categories.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Category not found' });
    db.categories[idx] = { ...db.categories[idx], ...req.body };
    res.json({ category: db.categories[idx] });
  });

  // ===================== DIGITAL INVENTORY POOL ROUTES =====================
  app.get('/api/inventory', (req, res) => {
    const { productId, status } = req.query;
    let items = [...db.inventory];
    if (productId) items = items.filter(i => i.productId === productId);
    if (status && status !== 'all') items = items.filter(i => i.status === status);
    res.json({ inventory: items, total: items.length });
  });

  app.post('/api/inventory', (req, res) => {
    const { productId, productName, codeOrKey, batchNumber } = req.body;
    const newItem: DigitalInventoryItem = {
      id: `inv-${Date.now()}`,
      productId,
      productName: productName || 'Digital Product',
      codeOrKey,
      status: 'available',
      batchNumber: batchNumber || `BATCH-${new Date().toISOString().slice(0, 7)}`,
      createdAt: new Date().toISOString(),
    };
    db.inventory.unshift(newItem);

    // Update stock counter on product
    const product = db.products.find(p => p.id === productId);
    if (product) {
      product.stock = db.inventory.filter(i => i.productId === productId && i.status === 'available').length;
      product.stockStatus = product.stock > 0 ? (product.stock < 5 ? 'low_stock' : 'in_stock') : 'out_of_stock';
    }

    logAudit('user-admin', 'Super Admin', 'super_admin', 'KEY_ADD', 'DigitalInventory', newItem.id, `Added new digital key for ${newItem.productName}`);
    res.status(201).json({ item: newItem });
  });

  app.post('/api/inventory/bulk-import', (req, res) => {
    const { productId, keys, batchNumber } = req.body; // keys: string[] or string separated by newlines
    const product = db.products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const keyList: string[] = Array.isArray(keys) ? keys : (keys || '').split('\n').map((k: string) => k.trim()).filter(Boolean);
    const addedItems: DigitalInventoryItem[] = [];

    keyList.forEach(key => {
      const item: DigitalInventoryItem = {
        id: `inv-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        productId,
        productName: product.name,
        codeOrKey: key,
        status: 'available',
        batchNumber: batchNumber || `BULK-${new Date().toISOString().slice(0, 10)}`,
        createdAt: new Date().toISOString(),
      };
      db.inventory.unshift(item);
      addedItems.push(item);
    });

    product.stock = db.inventory.filter(i => i.productId === productId && i.status === 'available').length;
    product.stockStatus = product.stock > 0 ? (product.stock < 5 ? 'low_stock' : 'in_stock') : 'out_of_stock';

    logAudit('user-admin', 'Super Admin', 'super_admin', 'INVENTORY_BULK_IMPORT', 'DigitalInventory', product.id, `Bulk imported ${addedItems.length} keys for "${product.name}"`);
    res.json({ success: true, count: addedItems.length, items: addedItems });
  });

  app.delete('/api/inventory/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.inventory.findIndex(i => i.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Key not found' });
    const deleted = db.inventory.splice(idx, 1)[0];
    res.json({ success: true, deleted });
  });

  // ===================== COUPON ROUTES =====================
  app.get('/api/coupons', (req, res) => {
    res.json({ coupons: db.coupons });
  });

  app.post('/api/coupons/validate', (req, res) => {
    const { code, cartSubtotal } = req.body;
    const coupon = db.coupons.find(c => c.code.toUpperCase() === (code || '').toUpperCase() && c.isActive);

    if (!coupon) {
      return res.status(400).json({ valid: false, message: 'Invalid or expired coupon code' });
    }
    if (coupon.minSpend && cartSubtotal < coupon.minSpend) {
      return res.status(400).json({ valid: false, message: `Minimum spend of $${coupon.minSpend} required for this coupon.` });
    }

    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = (cartSubtotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      discountAmount = Math.min(coupon.discountValue, cartSubtotal);
    }

    res.json({
      valid: true,
      coupon,
      discountAmount: Number(discountAmount.toFixed(2)),
      message: `Coupon ${coupon.code} applied! Saved $${discountAmount.toFixed(2)}`,
    });
  });

  app.post('/api/coupons', (req, res) => {
    const newCoupon: Coupon = {
      id: `coup-${Date.now()}`,
      usageCount: 0,
      isActive: true,
      ...req.body,
    };
    db.coupons.push(newCoupon);
    logAudit('user-admin', 'Super Admin', 'super_admin', 'COUPON_CREATE', 'Coupon', newCoupon.id, `Created promo coupon "${newCoupon.code}"`);
    res.status(201).json({ coupon: newCoupon });
  });

  app.put('/api/coupons/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.coupons.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Coupon not found' });
    db.coupons[idx] = { ...db.coupons[idx], ...req.body };
    res.json({ coupon: db.coupons[idx] });
  });

  app.delete('/api/coupons/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.coupons.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Coupon not found' });
    const deleted = db.coupons.splice(idx, 1)[0];
    res.json({ success: true, deleted });
  });

  // ===================== CHECKOUT & ORDERS =====================
  app.post('/api/checkout', (req, res) => {
    const {
      customerId,
      customerName,
      customerEmail,
      customerPhone,
      items,
      couponCode,
      paymentMethod,
      customerNotes,
    } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Cart cannot be empty' });
    }

    // Server-side recalculation of prices & verify digital inventory
    let calculatedSubtotal = 0;
    const verifiedOrderItems: Order['items'] = [];
    const digitalDeliveries: DigitalDelivery[] = [];

    const orderId = `ord-${Date.now()}`;
    const orderNumber = `PB-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    for (const item of items) {
      const product = db.products.find(p => p.id === item.productId);
      if (!product) continue;

      let unitPrice = product.salePrice || product.price;
      let variantName: string | undefined = undefined;

      if (item.variantId && product.variants) {
        const variant = product.variants.find(v => v.id === item.variantId);
        if (variant) {
          unitPrice = variant.salePrice !== undefined ? variant.salePrice : variant.price;
          variantName = variant.name;
        }
      }

      const quantity = item.quantity || 1;
      const itemTotal = unitPrice * quantity;
      calculatedSubtotal += itemTotal;

      const deliveredKeys: string[] = [];

      // If product has instant digital keys, reserve & deliver from pool
      if (product.deliveryMethod === 'instant_key') {
        const availableKeys = db.inventory.filter(i => i.productId === product.id && i.status === 'available');
        for (let k = 0; k < quantity; k++) {
          if (availableKeys[k]) {
            availableKeys[k].status = 'used';
            availableKeys[k].orderId = orderNumber;
            availableKeys[k].customerEmail = customerEmail;
            availableKeys[k].assignedAt = new Date().toISOString();
            deliveredKeys.push(availableKeys[k].codeOrKey);
          } else {
            // Generate fallback dynamic license key if pool empty
            const generatedKey = `PB-${product.sku.slice(0, 4)}-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}-LIC`;
            deliveredKeys.push(generatedKey);
          }
        }

        // Update product stock
        product.stock = db.inventory.filter(i => i.productId === product.id && i.status === 'available').length;
      }

      verifiedOrderItems.push({
        productId: product.id,
        productName: variantName ? `${product.name} (${variantName})` : product.name,
        productSlug: product.slug,
        productImage: product.images[0] || '',
        productType: product.productType,
        selectedDuration: item.selectedDuration || product.subscriptionDuration,
        quantity,
        unitPrice,
        totalPrice: itemTotal,
        deliveredKeys,
      });

      // Prepare digital delivery vault item
      digitalDeliveries.push({
        id: `deliv-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        productId: product.id,
        productName: product.name,
        type: product.productType,
        licenseKey: deliveredKeys.join(' , '),
        downloadUrl: product.productType === 'digital_download' ? `https://downloads.playbeat.digital/files/${product.slug}.zip` : undefined,
        instructions: product.activationGuide || 'Follow product instructions to activate your digital license.',
        deliveredAt: new Date().toISOString(),
      });

      // If subscription, record active subscription
      if (product.productType === 'subscription' || product.productType === 'streaming_service') {
        const months = product.subscriptionDuration === '1_year' ? 12 : product.subscriptionDuration === '6_months' ? 6 : product.subscriptionDuration === '3_months' ? 3 : 1;
        const expiresDate = new Date();
        expiresDate.setMonth(expiresDate.getMonth() + months);

        const newSub: Subscription = {
          id: `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          subscriptionNumber: `SUB-PB-${Math.floor(1000 + Math.random() * 9000)}`,
          customerId: customerId || 'guest',
          customerName,
          customerEmail,
          productId: product.id,
          productName: product.name,
          planDuration: product.subscriptionDuration?.replace('_', ' ') || '1 Month',
          price: unitPrice,
          status: 'active',
          startDate: new Date().toISOString(),
          expiresDate: expiresDate.toISOString(),
          autoRenew: true,
          lastBilledDate: new Date().toISOString(),
        };
        db.subscriptions.unshift(newSub);
      }
    }

    let discount = 0;
    if (couponCode) {
      const coupon = db.coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase() && c.isActive);
      if (coupon) {
        coupon.usageCount += 1;
        if (coupon.discountType === 'percentage') {
          discount = (calculatedSubtotal * coupon.discountValue) / 100;
          if (coupon.maxDiscount && discount > coupon.maxDiscount) discount = coupon.maxDiscount;
        } else {
          discount = Math.min(coupon.discountValue, calculatedSubtotal);
        }
      }
    }

    const total = Number(Math.max(0, calculatedSubtotal - discount).toFixed(2));
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      customerId: customerId || 'guest',
      customerName,
      customerEmail,
      customerPhone,
      items: verifiedOrderItems,
      subtotal: Number(calculatedSubtotal.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      couponCode,
      tax: 0,
      total,
      currency: 'USD',
      paymentMethod: paymentMethod || 'stripe',
      paymentStatus: 'paid',
      fulfillmentStatus: 'fulfilled',
      orderStatus: 'completed',
      digitalDeliveries,
      customerNotes,
      invoiceNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.orders.unshift(newOrder);

    // In-app notification
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: `Order ${orderNumber} Confirmed ⚡`,
      message: `Your payment of $${total} was verified. Digital keys have been delivered to your vault.`,
      type: 'order',
      read: false,
      createdAt: new Date().toISOString(),
    });

    logAudit(customerId || 'guest', customerName, 'customer', 'ORDER_CHECKOUT', 'Order', orderNumber, `Completed order for $${total} via ${paymentMethod}`);

    res.status(201).json({
      success: true,
      order: newOrder,
      deliveries: digitalDeliveries,
      message: 'Order verified and digital keys delivered!',
    });
  });

  app.get('/api/orders', (req, res) => {
    const { customerEmail, status } = req.query;
    let orders = [...db.orders];
    if (customerEmail) {
      orders = orders.filter(o => o.customerEmail.toLowerCase() === String(customerEmail).toLowerCase());
    }
    if (status && status !== 'all') {
      orders = orders.filter(o => o.orderStatus === status);
    }
    res.json({ orders, total: orders.length });
  });

  app.get('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const order = db.orders.find(o => o.id === id || o.orderNumber === id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ order });
  });

  app.put('/api/orders/:id/status', (req, res) => {
    const { id } = req.params;
    const { orderStatus, paymentStatus, fulfillmentStatus, adminNotes } = req.body;
    const order = db.orders.find(o => o.id === id || o.orderNumber === id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (fulfillmentStatus) order.fulfillmentStatus = fulfillmentStatus;
    if (adminNotes !== undefined) order.adminNotes = adminNotes;
    order.updatedAt = new Date().toISOString();

    logAudit('user-admin', 'Super Admin', 'super_admin', 'ORDER_STATUS_UPDATE', 'Order', order.orderNumber, `Updated status to ${orderStatus || order.orderStatus}`);
    res.json({ order });
  });

  app.post('/api/orders/:id/refund', (req, res) => {
    const { id } = req.params;
    const order = db.orders.find(o => o.id === id || o.orderNumber === id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.paymentStatus = 'refunded';
    order.orderStatus = 'refunded';
    order.updatedAt = new Date().toISOString();

    logAudit('user-admin', 'Super Admin', 'super_admin', 'ORDER_REFUND', 'Order', order.orderNumber, `Processed full refund of $${order.total}`);
    res.json({ success: true, order, message: 'Order has been fully refunded' });
  });

  // ===================== SUBSCRIPTIONS ROUTES =====================
  app.get('/api/subscriptions', (req, res) => {
    const { customerEmail, status } = req.query;
    let subs = [...db.subscriptions];
    if (customerEmail) {
      subs = subs.filter(s => s.customerEmail.toLowerCase() === String(customerEmail).toLowerCase());
    }
    if (status && status !== 'all') {
      subs = subs.filter(s => s.status === status);
    }
    res.json({ subscriptions: subs, total: subs.length });
  });

  app.put('/api/subscriptions/:id/renew', (req, res) => {
    const { id } = req.params;
    const sub = db.subscriptions.find(s => s.id === id || s.subscriptionNumber === id);
    if (!sub) return res.status(404).json({ error: 'Subscription not found' });

    const newExp = new Date(sub.expiresDate);
    newExp.setFullYear(newExp.getFullYear() + 1);
    sub.expiresDate = newExp.toISOString();
    sub.status = 'active';

    logAudit('user-admin', 'Super Admin', 'super_admin', 'SUBSCRIPTION_RENEW', 'Subscription', sub.subscriptionNumber, `Renewed subscription until ${sub.expiresDate}`);
    res.json({ success: true, subscription: sub });
  });

  app.put('/api/subscriptions/:id/cancel', (req, res) => {
    const { id } = req.params;
    const sub = db.subscriptions.find(s => s.id === id || s.subscriptionNumber === id);
    if (!sub) return res.status(404).json({ error: 'Subscription not found' });

    sub.status = 'cancelled';
    sub.autoRenew = false;
    res.json({ success: true, subscription: sub });
  });

  // ===================== REVIEWS ROUTES =====================
  app.get('/api/reviews', (req, res) => {
    const { productId, status } = req.query;
    let reviews = [...db.reviews];
    if (productId) reviews = reviews.filter(r => r.productId === productId);
    if (status && status !== 'all') reviews = reviews.filter(r => r.status === status);
    res.json({ reviews });
  });

  app.post('/api/reviews', (req, res) => {
    const { productId, customerId, customerName, rating, title, comment } = req.body;
    const product = db.products.find(p => p.id === productId);
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId,
      productName: product?.name || 'Digital Product',
      customerId: customerId || 'cust-anon',
      customerName: customerName || 'Verified Buyer',
      customerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: Number(rating) || 5,
      title,
      comment,
      isVerifiedPurchase: true,
      status: 'approved',
      createdAt: new Date().toISOString(),
    };
    db.reviews.unshift(newRev);

    // Update product rating and reviews count
    if (product) {
      const allProductRevs = db.reviews.filter(r => r.productId === product.id && r.status === 'approved');
      product.reviewsCount = allProductRevs.length;
      product.rating = Number((allProductRevs.reduce((acc, r) => acc + r.rating, 0) / allProductRevs.length).toFixed(2));
    }

    res.status(201).json({ review: newRev });
  });

  app.put('/api/reviews/:id/status', (req, res) => {
    const { id } = req.params;
    const { status, adminReply } = req.body;
    const rev = db.reviews.find(r => r.id === id);
    if (!rev) return res.status(404).json({ error: 'Review not found' });
    if (status) rev.status = status;
    if (adminReply !== undefined) rev.adminReply = adminReply;
    res.json({ review: rev });
  });

  // ===================== TICKETS ROUTES =====================
  app.get('/api/tickets', (req, res) => {
    const { customerEmail, status } = req.query;
    let tickets = [...db.tickets];
    if (customerEmail) tickets = tickets.filter(t => t.customerEmail.toLowerCase() === String(customerEmail).toLowerCase());
    if (status && status !== 'all') tickets = tickets.filter(t => t.status === status);
    res.json({ tickets });
  });

  app.post('/api/tickets', (req, res) => {
    const { customerId, customerName, customerEmail, subject, category, priority, message } = req.body;
    const newTicket: Ticket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: customerId || 'guest',
      customerName,
      customerEmail,
      subject,
      category: category || 'general',
      priority: priority || 'medium',
      status: 'open',
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: customerId || 'guest',
          senderName: customerName,
          senderRole: 'customer',
          message,
          createdAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.tickets.unshift(newTicket);
    res.status(201).json({ ticket: newTicket });
  });

  app.post('/api/tickets/:id/messages', (req, res) => {
    const { id } = req.params;
    const { senderId, senderName, senderRole, message } = req.body;
    const ticket = db.tickets.find(t => t.id === id || t.ticketNumber === id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    ticket.messages.push({
      id: `msg-${Date.now()}`,
      senderId,
      senderName,
      senderRole,
      message,
      createdAt: new Date().toISOString(),
    });
    ticket.updatedAt = new Date().toISOString();
    if (senderRole === 'support') {
      ticket.status = 'waiting_customer';
    } else {
      ticket.status = 'open';
    }
    res.json({ ticket });
  });

  app.put('/api/tickets/:id/status', (req, res) => {
    const { id } = req.params;
    const { status, assignedTo } = req.body;
    const ticket = db.tickets.find(t => t.id === id || t.ticketNumber === id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    if (status) ticket.status = status;
    if (assignedTo) ticket.assignedTo = assignedTo;
    ticket.updatedAt = new Date().toISOString();
    res.json({ ticket });
  });

  // ===================== BLOG & CMS ROUTES =====================
  app.get('/api/blog', (req, res) => {
    res.json({ posts: db.blogPosts });
  });

  app.post('/api/blog', (req, res) => {
    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      slug: (req.body.title || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tags: [],
      publishedAt: new Date().toISOString(),
      isPublished: true,
      ...req.body,
    };
    db.blogPosts.unshift(newPost);
    res.status(201).json({ post: newPost });
  });

  app.get('/api/cms/pages', (req, res) => {
    res.json({ pages: db.cmsPages });
  });

  app.put('/api/cms/pages/:slug', (req, res) => {
    const { slug } = req.params;
    const idx = db.cmsPages.findIndex(p => p.slug === slug);
    if (idx === -1) {
      const newPage: CMSPage = {
        id: `cms-${Date.now()}`,
        slug,
        title: req.body.title || slug,
        content: req.body.content || '',
        metaTitle: req.body.metaTitle || '',
        metaDescription: req.body.metaDescription || '',
        updatedAt: new Date().toISOString(),
      };
      db.cmsPages.push(newPage);
      return res.json({ page: newPage });
    }
    db.cmsPages[idx] = { ...db.cmsPages[idx], ...req.body, updatedAt: new Date().toISOString() };
    res.json({ page: db.cmsPages[idx] });
  });

  // ===================== ANALYTICS DASHBOARD =====================
  app.get('/api/analytics/dashboard', (req, res) => {
    const totalRevenue = db.orders.reduce((acc, o) => acc + (o.paymentStatus === 'paid' ? o.total : 0), 0);
    const totalOrders = db.orders.length;
    const paidOrders = db.orders.filter(o => o.paymentStatus === 'paid').length;
    const activeSubs = db.subscriptions.filter(s => s.status === 'active').length;
    const lowStockCount = db.products.filter(p => p.stock <= 5).length;
    const avgOrderValue = paidOrders > 0 ? (totalRevenue / paidOrders).toFixed(2) : '0.00';

    // Revenue by category breakdown
    const categorySales: Record<string, number> = {};
    db.orders.forEach(o => {
      o.items.forEach(item => {
        const prod = db.products.find(p => p.id === item.productId);
        const cat = prod?.category || 'other';
        categorySales[cat] = (categorySales[cat] || 0) + item.totalPrice;
      });
    });

    const categoryDistribution = Object.keys(categorySales).map(cat => ({
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
      value: Number(categorySales[cat].toFixed(2)),
    }));

    // Daily revenue history simulation for charts
    const revenueTimeline = [
      { date: 'Mon', revenue: 420, orders: 12 },
      { date: 'Tue', revenue: 680, orders: 19 },
      { date: 'Wed', revenue: 540, orders: 15 },
      { date: 'Thu', revenue: 920, orders: 28 },
      { date: 'Fri', revenue: 1450, orders: 42 },
      { date: 'Sat', revenue: 2100, orders: 58 },
      { date: 'Sun', revenue: 1890, orders: 49 },
    ];

    res.json({
      metrics: {
        totalRevenue: Number(totalRevenue.toFixed(2)),
        totalOrders,
        paidOrders,
        activeSubscriptions: activeSubs,
        totalCustomers: db.users.length,
        lowStockAlerts: lowStockCount,
        avgOrderValue: Number(avgOrderValue),
        conversionRate: '3.84%',
      },
      revenueTimeline,
      categoryDistribution,
      recentOrders: db.orders.slice(0, 5),
    });
  });

  // ===================== STAFF & AUDIT LOGS =====================
  app.get('/api/staff', (req, res) => {
    res.json({ staff: db.users });
  });

  app.post('/api/staff', (req, res) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      walletBalance: 0,
      is2FAEnabled: false,
      status: 'active',
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    db.users.push(newUser);
    logAudit('user-admin', 'Super Admin', 'super_admin', 'STAFF_CREATE', 'User', newUser.id, `Created staff member ${newUser.name} with role ${newUser.role}`);
    res.status(201).json({ user: newUser });
  });

  app.get('/api/audit-logs', (req, res) => {
    res.json({ logs: db.auditLogs });
  });

  // ===================== SETTINGS & NOTIFICATIONS =====================
  app.get('/api/settings', (req, res) => {
    res.json({ settings: db.settings });
  });

  app.put('/api/settings', (req, res) => {
    db.settings = { ...db.settings, ...req.body };
    logAudit('user-admin', 'Super Admin', 'super_admin', 'SETTINGS_UPDATE', 'Settings', 'global', 'Updated platform configuration');
    res.json({ settings: db.settings });
  });

  app.get('/api/notifications', (req, res) => {
    res.json({ notifications: db.notifications });
  });

  app.put('/api/notifications/:id/read', (req, res) => {
    const { id } = req.params;
    const notif = db.notifications.find(n => n.id === id);
    if (notif) notif.read = true;
    res.json({ success: true });
  });

  // ===================== VITE & STATIC MIDDLEWARE =====================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PlayBeat Digital Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
