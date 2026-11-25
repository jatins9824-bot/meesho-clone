// Persistent Storefront State (Cart, Wishlist, Orders, Pincode, Filters, Reseller Mode)

const STORAGE_KEY = 'meesho_clone_state_v1';

const DEFAULT_STATE = {
  cart: [
    {
      productId: 'msh-101',
      size: 'M',
      qty: 1
    }
  ],
  wishlist: ['msh-102', 'msh-107'],
  orders: [
    {
      orderId: 'MSH-894210',
      date: '22 Nov 2026',
      status: 'Delivered',
      paymentMethod: 'Cash on Delivery',
      address: {
        name: 'Aarav Sharma',
        phone: '9876543210',
        pincode: '560034',
        line: '42, Koramangala 4th Block, Bengaluru, Karnataka'
      },
      items: [
        {
          productId: 'msh-107',
          title: 'Rajasthani Handcrafted Oxidized Silver Jhumka & Afghani Choker Set',
          price: 199,
          size: 'Free Size',
          qty: 1,
          image: 'assets/images/jewellery.jpg'
        }
      ],
      total: 199,
      marginEarned: 0
    }
  ],
  pincode: '560034',
  recentSearches: ['Anarkali Kurti', 'Banarasi Saree', 'Oxidized Jhumka', 'Smartwatch'],
  resellerMode: false,
  resellerMarginPercent: 20,
  user: {
    name: 'Aarav Sharma',
    phone: '+91 98765 43210',
    meeshoCredits: 120
  }
};

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(DEFAULT_STATE),
      ...parsed,
      user: { ...DEFAULT_STATE.user, ...(parsed.user || {}) }
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

