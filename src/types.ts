export type ProductType = 
  | 'digital_key'
  | 'subscription'
  | 'software_license'
  | 'gaming_product'
  | 'gift_card'
  | 'streaming_service'
  | 'digital_service'
  | 'digital_download'
  | 'saas'
  | 'custom_product';

export type InventoryKey = DigitalInventoryItem;

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'pre_order';

export type UserRole = 
  | 'super_admin'
  | 'admin'
  | 'store_manager'
  | 'support_agent'
  | 'content_manager'
  | 'finance'
  | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  walletBalance: number;
  is2FAEnabled: boolean;
  status: 'active' | 'suspended' | 'banned';
  createdAt: string;
  lastLogin?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  salePrice?: number;
  pricePKR?: number;
  costPricePKR?: number;
  profitPKR?: number;
  duration?: string;
  region?: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  productType: ProductType;
  brand: string;
  category: string;
  subcategory?: string;
  description: string;
  shortDescription: string;
  images: string[];
  videoUrl?: string;
  price: number;
  salePrice?: number;
  costPrice?: number;
  pricePKR?: number;
  costPricePKR?: number;
  profitPKR?: number;
  profitMarginPercent?: number;
  sourceUrl?: string;
  currency: string;
  stock: number;
  stockStatus: StockStatus;
  deliveryMethod: 'instant_key' | 'download_link' | 'account_credentials' | 'manual_service';
  subscriptionDuration?: '1_month' | '3_months' | '6_months' | '1_year' | 'lifetime';
  tags: string[];
  attributes?: Record<string, string>;
  variants?: ProductVariant[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isPopular?: boolean;
  isFlashDeal?: boolean;
  profitMarginPKR?: number;
  reviewCount?: number;
  flashDealEndsAt?: string;
  rating: number;
  reviewsCount: number;
  seoTitle?: string;
  seoDescription?: string;
  systemRequirements?: string[];
  activationGuide?: string;
  createdAt: string;
}

export interface DigitalInventoryItem {
  id: string;
  productId: string;
  productName: string;
  codeOrKey: string;
  status: 'available' | 'reserved' | 'used' | 'failed';
  orderId?: string;
  customerEmail?: string;
  assignedAt?: string;
  createdAt: string;
  batchNumber?: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  variantId?: string;
  variantName?: string;
  selectedDuration?: string;
  quantity: number;
  unitPrice: number;
}

export interface DigitalDelivery {
  id: string;
  productId: string;
  productName: string;
  type: ProductType;
  licenseKey?: string;
  downloadUrl?: string;
  instructions: string;
  credentials?: {
    username?: string;
    password?: string;
  };
  deliveredAt: string;
}

export type OrderStatus = 
  | 'pending'
  | 'awaiting_payment'
  | 'paid'
  | 'processing'
  | 'fulfilled'
  | 'completed'
  | 'cancelled'
  | 'refunded'
  | 'failed';

export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'partially_refunded' | 'failed';

export interface OrderItem {
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  productType: ProductType;
  variantName?: string;
  selectedDuration?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  deliveredKeys?: string[];
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  tax: number;
  total: number;
  currency: string;
  paymentMethod: 'stripe' | 'jazzcash' | 'easypaisa' | 'crypto' | 'bank_transfer' | 'wallet';
  paymentStatus: PaymentStatus;
  fulfillmentStatus: 'unfulfilled' | 'partially_fulfilled' | 'fulfilled';
  orderStatus: OrderStatus;
  digitalDeliveries: DigitalDelivery[];
  customerNotes?: string;
  adminNotes?: string;
  invoiceNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  subscriptionNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  productId: string;
  productName: string;
  planDuration: string;
  price: number;
  status: 'active' | 'expiring' | 'expired' | 'cancelled';
  startDate: string;
  expiresDate: string;
  autoRenew: boolean;
  lastBilledDate?: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  maxDiscount?: number;
  applicableCategory?: string;
  startsAt: string;
  expiresAt: string;
  usageLimit: number;
  usageCount: number;
  perCustomerLimit: number;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  status: 'approved' | 'pending' | 'rejected';
  adminReply?: string;
  createdAt: string;
}

export interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'customer' | 'support';
  message: string;
  attachments?: string[];
  createdAt: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  category: 'order_issue' | 'license_activation' | 'payment' | 'subscription' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'pending' | 'waiting_customer' | 'resolved' | 'closed';
  assignedTo?: string;
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  ipAddress: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  parentId?: string;
  isFeatured: boolean;
  productCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
  isPublished: boolean;
}

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  updatedAt: string;
}

export interface StoreSettings {
  general: {
    storeName: string;
    tagline: string;
    supportEmail: string;
    supportPhone: string;
    address: string;
    currency: string;
    currencySymbol: string;
    timezone: string;
    maintenanceMode: boolean;
  };
  payments: {
    stripeEnabled: boolean;
    jazzcashEnabled: boolean;
    easypaisaEnabled: boolean;
    cryptoEnabled: boolean;
    bankTransferEnabled: boolean;
    testMode: boolean;
  };
  digitalDelivery: {
    autoDeliverOnPayment: boolean;
    duplicateDeliveryProtection: boolean;
    maskLicenseKeysInAdmin: boolean;
    maxDownloadLimit: number;
    downloadExpiryDays: number;
  };
  appearance: {
    primaryColor: string;
    accentColor: string;
    heroHeadline: string;
    heroSubheadline: string;
    announcementBar: {
      enabled: boolean;
      text: string;
      linkText?: string;
      linkUrl?: string;
    };
  };
}

export interface NotificationItem {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type: 'order' | 'system' | 'promo' | 'security';
  read: boolean;
  link?: string;
  createdAt: string;
}
