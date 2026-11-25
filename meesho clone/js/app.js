import { CATEGORIES, PRODUCTS } from './data.js';
import { loadState, saveState } from './state.js';

const state = loadState();

const filterState = {
  category: 'all',
  maxPrice: null,
  minPrice: null,
  priceLabel: null,
  minRating: 0,
  freeDeliveryOnly: false,
  trustedOnly: false,
  codOnly: false,
  searchQuery: '',
  sort: 'relevance'
};

const checkoutDraft = {
  couponApplied: false,
  useCredits: false,
  paymentMethod: 'Cash on Delivery'
};

// DOM References
const els = {
  resellerModeToggle: document.getElementById('resellerModeToggle'),
  brandLogo: document.getElementById('brandLogo'),
  searchInput: document.getElementById('searchInput'),
  searchClearBtn: document.getElementById('searchClearBtn'),
  searchDropdown: document.getElementById('searchDropdown'),
  categoryNavList: document.getElementById('categoryNavList'),
  categoryStories: document.getElementById('categoryStories'),
  filterCategories: document.getElementById('filterCategories'),
  filterPricePills: document.getElementById('filterPricePills'),
  filterRatings: document.getElementById('filterRatings'),
  filterFlags: document.getElementById('filterFlags'),
  filtersSidebar: document.getElementById('filtersSidebar'),
  mobileFilterBtn: document.getElementById('mobileFilterBtn'),
  closeMobileFiltersBtn: document.getElementById('closeMobileFiltersBtn'),
  clearAllFiltersBtn: document.getElementById('clearAllFiltersBtn'),
  resultsCountText: document.getElementById('resultsCountText'),
  sortSelect: document.getElementById('sortSelect'),
  activeFiltersBar: document.getElementById('activeFiltersBar'),
  productGrid: document.getElementById('productGrid'),
  wishlistBadge: document.getElementById('wishlistBadge'),
  cartBadge: document.getElementById('cartBadge'),
  overlayBackdrop: document.getElementById('overlayBackdrop'),
  cartDrawer: document.getElementById('cartDrawer'),
  cartBody: document.getElementById('cartBody'),
  cartFooter: document.getElementById('cartFooter'),
  wishlistDrawer: document.getElementById('wishlistDrawer'),
  wishlistBody: document.getElementById('wishlistBody'),
  profileDrawer: document.getElementById('profileDrawer'),
  profileBody: document.getElementById('profileBody'),
  productModal: document.getElementById('productModal'),
  productModalTitle: document.getElementById('productModalTitle'),
  productModalContent: document.getElementById('productModalContent'),
  checkoutModal: document.getElementById('checkoutModal'),
  checkoutModalContent: document.getElementById('checkoutModalContent'),
  supplierModal: document.getElementById('supplierModal'),
  supplierForm: document.getElementById('supplierForm'),
  toastContainer: document.getElementById('toastContainer')
};

const PRICE_RANGES = [
  { id: 'under-299', label: 'Under ₹299', min: 0, max: 299 },
  { id: 'under-499', label: 'Under ₹499', min: 0, max: 499 },
  { id: '500-999', label: '₹500 - ₹999', min: 500, max: 999 },
  { id: 'all-prices', label: 'All Prices', min: null, max: null }
];

function formatINR(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

function getDiscountPercent(price, mrp) {
  return Math.max(0, Math.round(((mrp - price) / mrp) * 100));
}

function getResellerSellPrice(price) {
  return Math.round(price * (1 + state.resellerMarginPercent / 100));
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  els.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2600);
}

window.appToast = showToast;
window.openOrdersDrawer = () => openDrawer('profile');
window.openSupplierModal = () => openModal('supplier');

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// ---------- Filtering & Sorting ----------

function getFilteredProducts() {
  const q = filterState.searchQuery.trim().toLowerCase();

  let list = PRODUCTS.filter((p) => {
    if (filterState.category !== 'all' && p.category !== filterState.category) return false;
    if (filterState.minPrice !== null && p.price < filterState.minPrice) return false;
    if (filterState.maxPrice !== null && p.price > filterState.maxPrice) return false;
    if (filterState.minRating && p.rating < filterState.minRating) return false;
    if (filterState.freeDeliveryOnly && !p.freeDelivery) return false;
    if (filterState.trustedOnly && !p.trusted) return false;
    if (filterState.codOnly && !p.codAvailable) return false;
    if (q) {
      const hay = `${p.title} ${p.subcategory} ${p.category} ${p.seller.name} ${p.id} ${p.fabric}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  switch (filterState.sort) {
    case 'price-asc':
      list = [...list].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      list = [...list].sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      list = [...list].sort((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount);
      break;
    case 'discount':
      list = [...list].sort(
        (a, b) => getDiscountPercent(b.price, b.mrp) - getDiscountPercent(a.price, a.mrp)
      );
      break;
    default:
      break;
  }

  return list;
}

// ---------- Render Navigation & Filter Controls ----------

function renderCategories() {
  els.categoryNavList.innerHTML = CATEGORIES.map(
    (c) => `
      <button
        type="button"
        class="cat-nav-item ${filterState.category === c.id ? 'active' : ''}"
        data-cat="${c.id}"
      >
        ${escapeHtml(c.label)}
      </button>
    `
  ).join('');

  els.categoryStories.innerHTML = CATEGORIES.map(
    (c) => `
      <div class="cat-story-card ${filterState.category === c.id ? 'active' : ''}" data-cat="${c.id}">
        <div class="cat-story-thumb">
          <img src="${escapeHtml(c.image)}" alt="${escapeHtml(c.shortLabel)}" loading="lazy" />
        </div>
        <div class="cat-story-title">${escapeHtml(c.shortLabel)}</div>
      </div>
    `
  ).join('');
}

function renderSidebarFilters() {
  els.filterCategories.innerHTML = CATEGORIES.map(
    (c) => `
      <label class="filter-checkbox">
        <input type="radio" name="catFilter" value="${c.id}" ${filterState.category === c.id ? 'checked' : ''} />
        <span>${escapeHtml(c.label)}</span>
      </label>
    `
  ).join('');

  els.filterPricePills.innerHTML = PRICE_RANGES.map((r) => {
    const isActive =
      (r.min === null && filterState.minPrice === null && filterState.maxPrice === null) ||
      (r.min === filterState.minPrice && r.max === filterState.maxPrice && r.max !== null);
    return `
      <button type="button" class="price-pill ${isActive ? 'active' : ''}" data-price-id="${r.id}">
        ${escapeHtml(r.label)}
      </button>
    `;
  }).join('');

  const ratings = [
    { val: 4.5, label: '4.5 ★ & above' },
    { val: 4.0, label: '4.0 ★ & above' },
    { val: 0, label: 'All Ratings' }
  ];
  els.filterRatings.innerHTML = ratings
    .map(
      (r) => `
      <label class="filter-checkbox">
        <input type="radio" name="ratingFilter" value="${r.val}" ${filterState.minRating === r.val ? 'checked' : ''} />
        <span>${r.label}</span>
      </label>
    `
    )
    .join('');

  els.filterFlags.innerHTML = `
    <label class="filter-checkbox">
      <input type="checkbox" id="flagFreeDelivery" ${filterState.freeDeliveryOnly ? 'checked' : ''} />
      <span>Free Delivery</span>
    </label>
    <label class="filter-checkbox">
      <input type="checkbox" id="flagTrusted" ${filterState.trustedOnly ? 'checked' : ''} />
      <span>Meesho Trusted</span>
    </label>
    <label class="filter-checkbox">
      <input type="checkbox" id="flagCod" ${filterState.codOnly ? 'checked' : ''} />
      <span>Cash on Delivery</span>
    </label>
  `;
}

function renderActiveFilterChips() {
  const chips = [];
  if (filterState.category !== 'all') {
    const cat = CATEGORIES.find((c) => c.id === filterState.category);
    chips.push({ key: 'category', label: cat ? cat.label : filterState.category });
  }
  if (filterState.priceLabel) {
    chips.push({ key: 'price', label: filterState.priceLabel });
  }
  if (filterState.minRating > 0) {
    chips.push({ key: 'rating', label: `${filterState.minRating}★ & above` });
  }
  if (filterState.freeDeliveryOnly) chips.push({ key: 'freeDeliveryOnly', label: 'Free Delivery' });
  if (filterState.trustedOnly) chips.push({ key: 'trustedOnly', label: 'Meesho Trusted' });
  if (filterState.codOnly) chips.push({ key: 'codOnly', label: 'COD Available' });
  if (filterState.searchQuery.trim()) {
    chips.push({ key: 'searchQuery', label: `Search: "${filterState.searchQuery.trim()}"` });
  }

  els.activeFiltersBar.innerHTML = chips
    .map(
      (ch) => `
      <span class="active-filter-chip">
        ${escapeHtml(ch.label)}
        <button type="button" data-clear-chip="${ch.key}" aria-label="Remove filter">✕</button>
      </span>
    `
    )
    .join('');
}

// ---------- Render Product Grid ----------

function renderProducts() {
  const items = getFilteredProducts();
  els.resultsCountText.innerHTML = `Showing <strong>${items.length}</strong> of <strong>${PRODUCTS.length}</strong> products`;

  if (items.length === 0) {
    els.productGrid.innerHTML = `
      <div class="empty-state">
        <h3>No matching products found</h3>
        <p>Try clearing some filters or searching for "Kurti", "Saree", "Shirt", or "Earbuds".</p>
        <button class="btn-primary" id="emptyResetBtn" type="button">Reset All Filters</button>
      </div>
    `;
    document.getElementById('emptyResetBtn')?.addEventListener('click', resetAllFilters);
    return;
  }

  els.productGrid.innerHTML = items
    .map((p) => {
      const discount = getDiscountPercent(p.price, p.mrp);
      const isWishlisted = state.wishlist.includes(p.id);
      const marginEarn = getResellerSellPrice(p.price) - p.price;

      return `
      <article class="product-card" data-product-id="${p.id}">
        <div class="product-img-wrap">
          <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy" />
          ${p.badge ? `<span class="product-badge">${escapeHtml(p.badge)}</span>` : ''}
          <button
            type="button"
            class="wishlist-btn ${isWishlisted ? 'active' : ''}"
            data-wishlist-id="${p.id}"
            aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}"
          >
            ${isWishlisted ? '♥' : '♡'}
          </button>
        </div>
        <div class="product-body">
          <h3 class="product-title" title="${escapeHtml(p.title)}">${escapeHtml(p.title)}</h3>
          <div class="price-row">
            <span class="price-current">${formatINR(p.price)}</span>
            <span class="price-mrp">${formatINR(p.mrp)}</span>
            <span class="price-discount">${discount}% off</span>
          </div>
          ${
            state.resellerMode
              ? `<div class="reseller-margin-pill">Resell at ${formatINR(p.price + marginEarn)} • Earn ${formatINR(marginEarn)}</div>`
              : ''
          }
          <div class="delivery-pill">${p.freeDelivery ? 'Free Delivery' : 'Delivery ₹40'}</div>
          <div class="card-footer-meta">
            <div>
              <span class="rating-pill">${p.rating.toFixed(1)} ★</span>
              <span class="rating-count">(${p.ratingCount.toLocaleString('en-IN')})</span>
            </div>
            ${p.trusted ? `<span class="trusted-tag">mTrusted</span>` : ''}
          </div>
          <button type="button" class="card-quick-add" data-quick-add="${p.id}">Add to Cart</button>
        </div>
      </article>
    `;
    })
    .join('');
}

function updateHeaderBadges() {
  const totalCartItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  els.cartBadge.textContent = totalCartItems;
  els.cartBadge.classList.toggle('empty', totalCartItems === 0);

  const wishCount = state.wishlist.length;
  els.wishlistBadge.textContent = wishCount;
  els.wishlistBadge.classList.toggle('empty', wishCount === 0);
}

// ---------- Cart, Wishlist & Profile Logic ----------

function addToCart(productId, size = null, openAfter = false) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  const chosenSize = size || product.sizes[0] || 'Free Size';

  const existing = state.cart.find((c) => c.productId === productId && c.size === chosenSize);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ productId, size: chosenSize, qty: 1 });
  }
  saveState(state);
  updateHeaderBadges();
  renderCartDrawer();
  showToast(`Added "${product.title.slice(0, 32)}..." (${chosenSize}) to Cart`);
  if (openAfter) openDrawer('cart');
}

function toggleWishlist(productId) {
  const idx = state.wishlist.indexOf(productId);
  if (idx >= 0) {
    state.wishlist.splice(idx, 1);
    showToast('Removed from Wishlist');
  } else {
    state.wishlist.push(productId);
    showToast('Saved to Wishlist ♥');
  }
  saveState(state);
  updateHeaderBadges();
  renderProducts();
  renderWishlistDrawer();
}

function computeCartTotals() {
  let subtotal = 0;
  let mrpTotal = 0;
  let itemCount = 0;

  for (const item of state.cart) {
    const prod = PRODUCTS.find((p) => p.id === item.productId);
    if (!prod) continue;
    subtotal += prod.price * item.qty;
    mrpTotal += prod.mrp * item.qty;
    itemCount += item.qty;
  }

  const productDiscount = Math.max(0, mrpTotal - subtotal);
  const couponDiscount = checkoutDraft.couponApplied ? Math.min(100, Math.round(subtotal * 0.1)) : 0;
  const creditsUsed = checkoutDraft.useCredits
    ? Math.min(state.user.meeshoCredits, Math.max(0, subtotal - couponDiscount))
    : 0;
  const payable = Math.max(0, subtotal - couponDiscount - creditsUsed);
  const resellerMargin = state.resellerMode
    ? Math.round(subtotal * (state.resellerMarginPercent / 100))
    : 0;

  return { subtotal, mrpTotal, productDiscount, couponDiscount, creditsUsed, payable, itemCount, resellerMargin };
}

function renderCartDrawer() {
  if (state.cart.length === 0) {
    els.cartBody.innerHTML = `
      <div style="text-align:center;padding:48px 16px;">
        <div style="font-size:44px;margin-bottom:10px;">🛍️</div>
        <h4 style="margin:0 0 8px;">Your Cart is Empty</h4>
        <p style="margin:0 0 18px;color:var(--text-secondary);font-size:13.5px;">
          Add fashionable kurtis, sarees, electronics & daily essentials at lowest prices.
        </p>
        <button class="btn-primary" type="button" id="cartContinueBtn">Browse Products</button>
      </div>
    `;
    els.cartFooter.innerHTML = '';
    document.getElementById('cartContinueBtn')?.addEventListener('click', closeAllOverlays);
    return;
  }

  els.cartBody.innerHTML = state.cart
    .map((item, idx) => {
      const p = PRODUCTS.find((prod) => prod.id === item.productId);
      if (!p) return '';
      return `
      <div class="cart-item">
        <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" />
        <div>
          <div class="cart-item-title">${escapeHtml(p.title)}</div>
          <div class="cart-item-meta">Size: <strong>${escapeHtml(item.size)}</strong> • Free Delivery</div>
          <div class="cart-item-bottom">
            <div>
              <strong>${formatINR(p.price * item.qty)}</strong>
              <span style="font-size:12px;color:var(--text-muted);text-decoration:line-through;margin-left:4px;">${formatINR(p.mrp * item.qty)}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <div class="qty-stepper">
                <button type="button" data-qty-delta="-1" data-cart-idx="${idx}">−</button>
                <span>${item.qty}</span>
                <button type="button" data-qty-delta="1" data-cart-idx="${idx}">+</button>
              </div>
              <button type="button" class="text-link-btn" data-remove-cart="${idx}" style="color:var(--red-danger);">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join('');

  const totals = computeCartTotals();

  els.cartFooter.innerHTML = `
    <div style="display:flex;gap:8px;margin-bottom:12px;">
      <input id="couponInput" type="text" placeholder="Enter coupon (try MEESHO10)" value="${checkoutDraft.couponApplied ? 'MEESHO10' : ''}" style="flex:1;height:36px;border:1px solid var(--border-strong);border-radius:6px;padding:0 10px;font-size:13px;" />
      <button type="button" class="btn-secondary" id="applyCouponBtn" style="padding:0 14px;height:36px;font-size:12.5px;">
        ${checkoutDraft.couponApplied ? 'Applied ✓' : 'Apply'}
      </button>
    </div>
    ${
      state.user.meeshoCredits > 0
        ? `
      <label class="filter-checkbox" style="margin-bottom:10px;font-size:12.5px;">
        <input type="checkbox" id="useCreditsToggle" ${checkoutDraft.useCredits ? 'checked' : ''} />
        <span>Use Meesho Credits (Available: ${formatINR(state.user.meeshoCredits)})</span>
      </label>`
        : ''
    }
    <div class="price-breakdown">
      <div class="price-breakdown-row"><span>Total Product Price (${totals.itemCount} items)</span><span>${formatINR(totals.mrpTotal)}</span></div>
      <div class="price-breakdown-row" style="color:var(--green-rating);"><span>Total Discounts</span><span>− ${formatINR(totals.productDiscount + totals.couponDiscount)}</span></div>
      ${totals.creditsUsed > 0 ? `<div class="price-breakdown-row" style="color:var(--green-rating);"><span>Meesho Credits</span><span>− ${formatINR(totals.creditsUsed)}</span></div>` : ''}
      <div class="price-breakdown-row"><span>Delivery Charges</span><span style="color:var(--green-rating);font-weight:700;">FREE</span></div>
      <div class="price-breakdown-row total"><span>Order Total</span><span>${formatINR(totals.payable)}</span></div>
      ${state.resellerMode ? `<div class="price-breakdown-row" style="color:var(--brand-primary);font-weight:700;"><span>Your Reseller Margin (${state.resellerMarginPercent}%)</span><span>+ ${formatINR(totals.resellerMargin)}</span></div>` : ''}
    </div>
    <button class="btn-primary" id="proceedCheckoutBtn" type="button" style="width:100%;">Continue to Checkout →</button>
  `;
}

function renderWishlistDrawer() {
  if (state.wishlist.length === 0) {
    els.wishlistBody.innerHTML = `
      <div style="text-align:center;padding:48px 16px;">
        <div style="font-size:40px;margin-bottom:10px;">♡</div>
        <h4 style="margin:0 0 8px;">Your Wishlist is Empty</h4>
        <p style="margin:0;color:var(--text-secondary);font-size:13.5px;">Tap the heart icon on any product to save it for later.</p>
      </div>
    `;
    return;
  }

  els.wishlistBody.innerHTML = state.wishlist
    .map((pid) => {
      const p = PRODUCTS.find((prod) => prod.id === pid);
      if (!p) return '';
      return `
      <div class="cart-item">
        <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" />
        <div>
          <div class="cart-item-title">${escapeHtml(p.title)}</div>
          <div class="cart-item-meta">${formatINR(p.price)} • ${p.rating} ★</div>
          <div style="display:flex;gap:10px;margin-top:8px;">
            <button type="button" class="btn-primary" style="padding:6px 12px;font-size:12px;" data-move-cart="${p.id}">Move to Cart</button>
            <button type="button" class="text-link-btn" data-wishlist-remove="${p.id}" style="color:var(--text-secondary);">Remove</button>
          </div>
        </div>
      </div>
    `;
    })
    .join('');
}

function renderProfileDrawer() {
  const ordersHtml = state.orders.length
    ? state.orders
        .map(
          (ord) => `
      <div class="pdp-box" style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <strong style="font-size:13.5px;">Order #${escapeHtml(ord.orderId)}</strong>
          <span class="rating-pill" style="font-size:11px;">${escapeHtml(ord.status)}</span>
        </div>
        <div style="font-size:12px;color:var(--text-secondary);margin-bottom:8px;">
          ${escapeHtml(ord.date)} • ${escapeHtml(ord.paymentMethod)} • Total: <strong>${formatINR(ord.total)}</strong>
        </div>
        ${ord.items
          .map(
            (it) => `
          <div style="display:flex;align-items:center;gap:10px;margin-top:6px;">
            <img src="${escapeHtml(it.image)}" alt="" style="width:42px;height:42px;object-fit:cover;border-radius:4px;" />
            <div style="font-size:12.5px;">
              <div style="font-weight:600;">${escapeHtml(it.title)}</div>
              <div style="color:var(--text-muted);">Size: ${escapeHtml(it.size)} × ${it.qty}</div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    `
        )
        .join('')
    : '<p style="color:var(--text-secondary);font-size:13px;">No orders placed yet.</p>';

  els.profileBody.innerHTML = `
    <div class="pdp-box" style="background:var(--brand-tint);border-color:var(--brand-tint-strong);">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:46px;height:46px;border-radius:50%;background:var(--brand-primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;">
          ${escapeHtml(state.user.name[0])}
        </div>
        <div>
          <div style="font-weight:800;font-size:15px;">${escapeHtml(state.user.name)}</div>
          <div style="font-size:12.5px;color:var(--text-secondary);">${escapeHtml(state.user.phone)}</div>
        </div>
      </div>
      <div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--brand-tint-strong);display:flex;justify-content:space-between;font-size:13px;">
        <span>Meesho Credits Balance</span>
        <strong style="color:var(--brand-primary);">${formatINR(state.user.meeshoCredits)}</strong>
      </div>
    </div>
    <h4 style="margin:16px 0 10px;font-size:14.5px;">My Orders (${state.orders.length})</h4>
    ${ordersHtml}
  `;
}

// ---------- Product Detail Modal ----------

function openProductModal(productId) {
  const p = PRODUCTS.find((item) => item.id === productId);
  if (!p) return;

  let selectedSize = p.sizes[0] || 'Free Size';
  let activeImage = p.gallery[0] || p.image;
  const discount = getDiscountPercent(p.price, p.mrp);
  const marginEarn = getResellerSellPrice(p.price) - p.price;

  els.productModalTitle.textContent = p.subcategory;

  const renderInner = () => {
    els.productModalContent.innerHTML = `
      <div class="pdp-grid">
        <div>
          <div class="pdp-main-img">
            <img id="pdpHeroImg" src="${escapeHtml(activeImage)}" alt="${escapeHtml(p.title)}" />
          </div>
          <div class="pdp-thumbs">
            ${p.gallery
              .map(
                (img, idx) => `
              <button type="button" class="pdp-thumb ${img === activeImage ? 'active' : ''}" data-thumb-idx="${idx}">
                <img src="${escapeHtml(img)}" alt="Thumbnail ${idx + 1}" />
              </button>
            `
              )
              .join('')}
          </div>
          <div class="pdp-actions">
            <button type="button" class="btn-secondary" id="pdpAddCartBtn">Add to Cart</button>
            <button type="button" class="btn-primary" id="pdpBuyNowBtn">Buy Now</button>
          </div>
        </div>

        <div>
          <div class="pdp-box">
            <h2 style="margin:0 0 10px;font-size:18px;font-weight:700;color:var(--text-primary);">${escapeHtml(p.title)}</h2>
            <div class="price-row">
              <span class="price-current" style="font-size:26px;">${formatINR(p.price)}</span>
              <span class="price-mrp">${formatINR(p.mrp)}</span>
              <span class="price-discount">${discount}% off</span>
            </div>
            ${
              state.resellerMode
                ? `<div class="reseller-margin-pill" style="margin-top:4px;">Reseller Price: ${formatINR(p.price + marginEarn)} (Earn ${formatINR(marginEarn)} profit)</div>`
                : ''
            }
            <div style="display:flex;align-items:center;gap:10px;margin-top:8px;">
              <span class="rating-pill">${p.rating.toFixed(1)} ★</span>
              <span class="rating-count">${p.ratingCount.toLocaleString('en-IN')} Ratings, ${p.reviewsCount.toLocaleString('en-IN')} Reviews</span>
            </div>
            <div class="delivery-pill" style="margin-top:10px;margin-bottom:0;">
              ${p.freeDelivery ? 'Free Delivery' : '₹40 Delivery'} • COD Available • Dispatch in ${escapeHtml(p.dispatchDays)}
            </div>
          </div>

          <div class="pdp-box">
            <strong style="font-size:14px;">Select Size</strong>
            <div class="size-pills">
              ${p.sizes
                .map(
                  (sz) => `
                <button type="button" class="size-pill ${sz === selectedSize ? 'active' : ''}" data-size="${escapeHtml(sz)}">
                  ${escapeHtml(sz)}
                </button>
              `
                )
                .join('')}
            </div>
          </div>

          <div class="pdp-box">
            <strong style="font-size:14px;">Check Delivery Date</strong>
            <div class="pincode-row">
              <input type="text" id="pdpPincodeInput" maxlength="6" value="${escapeHtml(state.pincode)}" placeholder="Enter 6-digit pincode" />
              <button type="button" class="btn-secondary" id="pdpCheckPinBtn" style="padding:0 16px;">Check</button>
            </div>
            <div id="pdpPinStatus" style="margin-top:8px;font-size:12.5px;color:var(--green-rating);font-weight:600;">
              ✓ Delivery by 28 Nov to ${escapeHtml(state.pincode)} • Cash on Delivery available
            </div>
          </div>

          <div class="pdp-box">
            <strong style="font-size:14px;">Product Details</strong>
            <p style="margin:8px 0;font-size:13.5px;color:var(--text-secondary);">${escapeHtml(p.description)}</p>
            <div style="font-size:12.5px;color:var(--text-secondary);">
              <div><b>Material / Spec:</b> ${escapeHtml(p.fabric)}</div>
              <div><b>Available Colors:</b> ${escapeHtml(p.colors.join(', '))}</div>
            </div>
          </div>

          <div class="pdp-box">
            <div class="seller-card">
              <div>
                <div style="font-size:12px;color:var(--text-muted);">Sold By</div>
                <strong style="font-size:14.5px;">${escapeHtml(p.seller.name)}</strong>
                <div style="font-size:12px;color:var(--text-secondary);margin-top:3px;">
                  ${p.seller.rating} ★ • ${p.seller.followers} Followers • ${p.seller.productsCount} Products
                </div>
              </div>
              <button type="button" class="btn-secondary" id="pdpFollowSellerBtn" style="padding:7px 14px;font-size:12.5px;">View Shop</button>
            </div>
          </div>

          <div class="pdp-box" style="margin-bottom:0;">
            <strong style="font-size:14px;">Customer Reviews (${p.reviews.length} featured)</strong>
            ${p.reviews
              .map(
                (rev) => `
              <div class="review-item">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <strong>${escapeHtml(rev.user)}</strong>
                  <span class="rating-pill" style="font-size:11px;padding:2px 7px;">${rev.rating} ★</span>
                </div>
                <div style="color:var(--text-secondary);">${escapeHtml(rev.comment)}</div>
                <div style="color:var(--text-muted);font-size:11.5px;margin-top:4px;">Posted ${escapeHtml(rev.date)}</div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;

    // Bind PDP events
    els.productModalContent.querySelectorAll('[data-thumb-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeImage = p.gallery[Number(btn.dataset.thumbIdx)];
        renderInner();
      });
    });

    els.productModalContent.querySelectorAll('[data-size]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedSize = btn.dataset.size;
        renderInner();
      });
    });

    document.getElementById('pdpCheckPinBtn')?.addEventListener('click', () => {
      const pin = document.getElementById('pdpPincodeInput').value.trim();
      const statusEl = document.getElementById('pdpPinStatus');
      if (/^\d{6}$/.test(pin)) {
        state.pincode = pin;
        saveState(state);
        statusEl.style.color = 'var(--green-rating)';
        statusEl.textContent = `✓ Free Delivery by 28 Nov to ${pin} • Cash on Delivery available`;
      } else {
        statusEl.style.color = 'var(--red-danger)';
        statusEl.textContent = 'Please enter a valid 6-digit Indian pincode.';
      }
    });

    document.getElementById('pdpFollowSellerBtn')?.addEventListener('click', () => {
      closeAllOverlays();
      filterState.searchQuery = p.seller.name;
      els.searchInput.value = p.seller.name;
      els.searchClearBtn.classList.add('visible');
      refreshCatalog();
      showToast(`Showing products from ${p.seller.name}`);
    });

    document.getElementById('pdpAddCartBtn')?.addEventListener('click', () => {
      addToCart(p.id, selectedSize, false);
    });

    document.getElementById('pdpBuyNowBtn')?.addEventListener('click', () => {
      addToCart(p.id, selectedSize, false);
      closeAllOverlays();
      openCheckoutModal();
    });
  };

  renderInner();
  openModal('product');
}

// ---------- Checkout Flow ----------

function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }

  const totals = computeCartTotals();

  els.checkoutModalContent.innerHTML = `
    <form class="form-stack" id="checkoutForm">
      <div class="pdp-box" style="margin-bottom:4px;background:var(--bg-subtle);">
        <div style="display:flex;justify-content:space-between;font-size:14px;">
          <span>Payable Amount (${totals.itemCount} items)</span>
          <strong style="color:var(--brand-primary);font-size:17px;">${formatINR(totals.payable)}</strong>
        </div>
        ${state.resellerMode ? `<div style="font-size:12px;color:var(--brand-primary);margin-top:4px;">Reseller Customer Price: ${formatINR(totals.payable + totals.resellerMargin)} (Profit: ${formatINR(totals.resellerMargin)})</div>` : ''}
      </div>

      <div class="form-field">
        <label for="chkName">Full Name</label>
        <input id="chkName" type="text" required value="${escapeHtml(state.user.name)}" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="form-field">
          <label for="chkPhone">Phone Number</label>
          <input id="chkPhone" type="tel" required value="9876543210" pattern="[0-9]{10}" />
        </div>
        <div class="form-field">
          <label for="chkPin">Pincode</label>
          <input id="chkPin" type="text" required value="${escapeHtml(state.pincode)}" pattern="[0-9]{6}" />
        </div>
      </div>
      <div class="form-field">
        <label for="chkAddress">Delivery Address</label>
        <textarea id="chkAddress" rows="2" required>42, Koramangala 4th Block, Bengaluru, Karnataka</textarea>
      </div>

      <div class="form-field">
        <label>Select Payment Method</label>
        <div class="payment-options" id="paymentOpts">
          <div class="payment-opt ${checkoutDraft.paymentMethod === 'Cash on Delivery' ? 'active' : ''}" data-pay="Cash on Delivery">💵 Cash on Delivery</div>
          <div class="payment-opt ${checkoutDraft.paymentMethod === 'UPI / PhonePe / GPay' ? 'active' : ''}" data-pay="UPI / PhonePe / GPay">📱 UPI / GPay</div>
          <div class="payment-opt ${checkoutDraft.paymentMethod === 'Debit / Credit Card' ? 'active' : ''}" data-pay="Debit / Credit Card">💳 Card</div>
        </div>
      </div>

      <button type="submit" class="btn-primary" style="width:100%;margin-top:4px;">
        Place Order • ${formatINR(totals.payable)}
      </button>
    </form>
  `;

  els.checkoutModalContent.querySelectorAll('[data-pay]').forEach((opt) => {
    opt.addEventListener('click', () => {
      checkoutDraft.paymentMethod = opt.dataset.pay;
      els.checkoutModalContent.querySelectorAll('[data-pay]').forEach((o) => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  document.getElementById('checkoutForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderId = `MSH-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderItems = state.cart
      .map((ci) => {
        const prod = PRODUCTS.find((p) => p.id === ci.productId);
        return prod
          ? {
              productId: prod.id,
              title: prod.title,
              price: prod.price,
              size: ci.size,
              qty: ci.qty,
              image: prod.image
            }
          : null;
      })
      .filter(Boolean);

    const newOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Confirmed',
      paymentMethod: checkoutDraft.paymentMethod,
      address: {
        name: document.getElementById('chkName').value.trim(),
        phone: document.getElementById('chkPhone').value.trim(),
        pincode: document.getElementById('chkPin').value.trim(),
        line: document.getElementById('chkAddress').value.trim()
      },
      items: orderItems,
      total: totals.payable,
      marginEarned: totals.resellerMargin
    };

    if (totals.creditsUsed > 0) {
      state.user.meeshoCredits = Math.max(0, state.user.meeshoCredits - totals.creditsUsed);
    }
    state.orders.unshift(newOrder);
    state.cart = [];
    checkoutDraft.couponApplied = false;
    checkoutDraft.useCredits = false;
    saveState(state);
    updateHeaderBadges();
    renderCartDrawer();

    els.checkoutModalContent.innerHTML = `
      <div style="padding:32px 24px;text-align:center;">
        <div style="width:64px;height:64px;border-radius:50%;background:var(--green-soft);color:var(--green-rating);display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 14px;">✓</div>
        <h2 style="margin:0 0 8px;">Order Placed Successfully!</h2>
        <p style="margin:0 0 16px;color:var(--text-secondary);font-size:14px;">
          Thank you for shopping on Meesho. Your Order ID is <strong>#${orderId}</strong>.
        </p>
        <div class="pdp-box" style="text-align:left;font-size:13px;">
          <div><b>Payment:</b> ${escapeHtml(newOrder.paymentMethod)}</div>
          <div><b>Total Paid:</b> ${formatINR(newOrder.total)}</div>
          <div><b>Delivering To:</b> ${escapeHtml(newOrder.address.name)}, ${escapeHtml(newOrder.address.pincode)}</div>
        </div>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;">
          <button type="button" class="btn-secondary" id="orderSuccessViewOrders">View My Orders</button>
          <button type="button" class="btn-primary" id="orderSuccessContinue">Continue Shopping</button>
        </div>
      </div>
    `;

    document.getElementById('orderSuccessViewOrders')?.addEventListener('click', () => {
      closeAllOverlays();
      openDrawer('profile');
    });
    document.getElementById('orderSuccessContinue')?.addEventListener('click', closeAllOverlays);
  });

  openModal('checkout');
}

// ---------- Search Dropdown ----------

function renderSearchDropdown() {
  const q = els.searchInput.value.trim().toLowerCase();
  const matching = q
    ? PRODUCTS.filter((p) => `${p.title} ${p.subcategory} ${p.category}`.toLowerCase().includes(q)).slice(0, 5)
    : [];

  const chipsHtml = state.recentSearches
    .map((term) => `<button type="button" class="search-chip" data-search-chip="${escapeHtml(term)}">${escapeHtml(term)}</button>`)
    .join('');

  const matchesHtml = matching
    .map(
      (p) => `
      <div class="search-suggestion-item" data-suggest-id="${p.id}">
        <img src="${escapeHtml(p.image)}" alt="" />
        <div class="search-suggestion-meta">
          <div class="search-suggestion-title">${escapeHtml(p.title)}</div>
          <div class="search-suggestion-sub">${formatINR(p.price)} • ${escapeHtml(p.subcategory)}</div>
        </div>
      </div>
    `
    )
    .join('');

  els.searchDropdown.innerHTML = `
    ${q && matching.length ? `<div class="search-dd-title">Top Matches</div>${matchesHtml}` : ''}
    <div class="search-dd-title">Popular & Recent Searches</div>
    <div class="search-chips">${chipsHtml}</div>
  `;
}

// ---------- Overlay Management ----------

function closeAllOverlays() {
  els.overlayBackdrop.classList.remove('open');
  els.cartDrawer.classList.remove('open');
  els.wishlistDrawer.classList.remove('open');
  els.profileDrawer.classList.remove('open');
  els.productModal.classList.remove('open');
  els.checkoutModal.classList.remove('open');
  els.supplierModal.classList.remove('open');
  els.filtersSidebar.classList.remove('mobile-open');
}

function openDrawer(type) {
  closeAllOverlays();
  els.overlayBackdrop.classList.add('open');
  if (type === 'cart') {
    renderCartDrawer();
    els.cartDrawer.classList.add('open');
  } else if (type === 'wishlist') {
    renderWishlistDrawer();
    els.wishlistDrawer.classList.add('open');
  } else if (type === 'profile') {
    renderProfileDrawer();
    els.profileDrawer.classList.add('open');
  }
}

function openModal(type) {
  closeAllOverlays();
  els.overlayBackdrop.classList.add('open');
  if (type === 'product') els.productModal.classList.add('open');
  if (type === 'checkout') els.checkoutModal.classList.add('open');
  if (type === 'supplier') els.supplierModal.classList.add('open');
}

// ---------- Refresh & Reset ----------

function refreshCatalog() {
  renderCategories();
  renderSidebarFilters();
  renderActiveFilterChips();
  renderProducts();
}

function resetAllFilters() {
  filterState.category = 'all';
  filterState.minPrice = null;
  filterState.maxPrice = null;
  filterState.priceLabel = null;
  filterState.minRating = 0;
  filterState.freeDeliveryOnly = false;
  filterState.trustedOnly = false;
  filterState.codOnly = false;
  filterState.searchQuery = '';
  filterState.sort = 'relevance';
  els.searchInput.value = '';
  els.searchClearBtn.classList.remove('visible');
  els.sortSelect.value = 'relevance';
  refreshCatalog();
}

// ---------- Event Listeners ----------

function initEvents() {
  // Reseller Mode Toggle
  els.resellerModeToggle.checked = state.resellerMode;
  els.resellerModeToggle.addEventListener('change', () => {
    state.resellerMode = els.resellerModeToggle.checked;
    saveState(state);
    renderProducts();
    renderCartDrawer();
    showToast(state.resellerMode ? 'Reseller Margin Mode Enabled (+20% profit preview)' : 'Reseller Margin Mode Disabled');
  });

  // Brand logo reset
  els.brandLogo.addEventListener('click', (e) => {
    e.preventDefault();
    resetAllFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Hero & View All CTAs
  document.getElementById('heroShopBtn')?.addEventListener('click', () => {
    document.getElementById('catalogSection').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('heroDealsBtn')?.addEventListener('click', () => {
    filterState.minPrice = 0;
    filterState.maxPrice = 499;
    filterState.priceLabel = 'Under ₹499';
    refreshCatalog();
    document.getElementById('catalogSection').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('viewAllCatsBtn')?.addEventListener('click', () => {
    filterState.category = 'all';
    refreshCatalog();
    document.getElementById('catalogSection').scrollIntoView({ behavior: 'smooth' });
  });

  // Category Nav & Stories Delegation
  const handleCategoryPick = (catId) => {
    filterState.category = catId;
    refreshCatalog();
    document.getElementById('catalogSection').scrollIntoView({ behavior: 'smooth' });
  };

  els.categoryNavList.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cat]');
    if (btn) handleCategoryPick(btn.dataset.cat);
  });

  els.categoryStories.addEventListener('click', (e) => {
    const card = e.target.closest('[data-cat]');
    if (card) handleCategoryPick(card.dataset.cat);
  });

  document.querySelectorAll('[data-footer-cat]').forEach((link) => {
    link.addEventListener('click', () => handleCategoryPick(link.dataset.footerCat));
  });

  // Sidebar Filters Delegation
  els.filterCategories.addEventListener('change', (e) => {
    if (e.target.name === 'catFilter') {
      filterState.category = e.target.value;
      refreshCatalog();
    }
  });

  els.filterPricePills.addEventListener('click', (e) => {
    const pill = e.target.closest('[data-price-id]');
    if (!pill) return;
    const range = PRICE_RANGES.find((r) => r.id === pill.dataset.priceId);
    if (!range) return;
    filterState.minPrice = range.min;
    filterState.maxPrice = range.max;
    filterState.priceLabel = range.max !== null ? range.label : null;
    refreshCatalog();
  });

  els.filterRatings.addEventListener('change', (e) => {
    if (e.target.name === 'ratingFilter') {
      filterState.minRating = Number(e.target.value);
      refreshCatalog();
    }
  });

  els.filterFlags.addEventListener('change', (e) => {
    if (e.target.id === 'flagFreeDelivery') filterState.freeDeliveryOnly = e.target.checked;
    if (e.target.id === 'flagTrusted') filterState.trustedOnly = e.target.checked;
    if (e.target.id === 'flagCod') filterState.codOnly = e.target.checked;
    refreshCatalog();
  });

  els.clearAllFiltersBtn.addEventListener('click', resetAllFilters);

  els.activeFiltersBar.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-clear-chip]');
    if (!btn) return;
    const key = btn.dataset.clearChip;
    if (key === 'category') filterState.category = 'all';
    if (key === 'price') {
      filterState.minPrice = null;
      filterState.maxPrice = null;
      filterState.priceLabel = null;
    }
    if (key === 'rating') filterState.minRating = 0;
    if (key === 'freeDeliveryOnly') filterState.freeDeliveryOnly = false;
    if (key === 'trustedOnly') filterState.trustedOnly = false;
    if (key === 'codOnly') filterState.codOnly = false;
    if (key === 'searchQuery') {
      filterState.searchQuery = '';
      els.searchInput.value = '';
      els.searchClearBtn.classList.remove('visible');
    }
    refreshCatalog();
  });

  // Sort Select
  els.sortSelect.addEventListener('change', () => {
    filterState.sort = els.sortSelect.value;
    renderProducts();
  });

  // Mobile Filter Drawer
  els.mobileFilterBtn.addEventListener('click', () => {
    els.overlayBackdrop.classList.add('open');
    els.filtersSidebar.classList.add('mobile-open');
    els.closeMobileFiltersBtn.style.display = 'inline-block';
  });
  els.closeMobileFiltersBtn.addEventListener('click', closeAllOverlays);

  // Search Input & Autocomplete
  els.searchInput.addEventListener('focus', () => {
    renderSearchDropdown();
    els.searchDropdown.classList.add('open');
  });

  els.searchInput.addEventListener('input', () => {
    const val = els.searchInput.value;
    filterState.searchQuery = val;
    els.searchClearBtn.classList.toggle('visible', val.length > 0);
    renderSearchDropdown();
    els.searchDropdown.classList.add('open');
    renderActiveFilterChips();
    renderProducts();
  });

  els.searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const term = els.searchInput.value.trim();
      if (term && !state.recentSearches.includes(term)) {
        state.recentSearches = [term, ...state.recentSearches].slice(0, 6);
        saveState(state);
      }
      els.searchDropdown.classList.remove('open');
    }
  });

  els.searchClearBtn.addEventListener('click', () => {
    els.searchInput.value = '';
    filterState.searchQuery = '';
    els.searchClearBtn.classList.remove('visible');
    renderActiveFilterChips();
    renderProducts();
  });

  els.searchDropdown.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-search-chip]');
    if (chip) {
      const term = chip.dataset.searchChip;
      els.searchInput.value = term;
      filterState.searchQuery = term;
      els.searchClearBtn.classList.add('visible');
      els.searchDropdown.classList.remove('open');
      renderActiveFilterChips();
      renderProducts();
      return;
    }
    const item = e.target.closest('[data-suggest-id]');
    if (item) {
      els.searchDropdown.classList.remove('open');
      openProductModal(item.dataset.suggestId);
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
      els.searchDropdown.classList.remove('open');
    }
  });

  // Product Grid Click Delegation
  els.productGrid.addEventListener('click', (e) => {
    const wishBtn = e.target.closest('[data-wishlist-id]');
    if (wishBtn) {
      e.stopPropagation();
      toggleWishlist(wishBtn.dataset.wishlistId);
      return;
    }
    const quickAddBtn = e.target.closest('[data-quick-add]');
    if (quickAddBtn) {
      e.stopPropagation();
      addToCart(quickAddBtn.dataset.quickAdd, null, false);
      return;
    }
    const card = e.target.closest('[data-product-id]');
    if (card) {
      openProductModal(card.dataset.productId);
    }
  });

  // Header Buttons for Drawers & Modals
  document.getElementById('openCartBtn').addEventListener('click', () => openDrawer('cart'));
  document.getElementById('openWishlistBtn').addEventListener('click', () => openDrawer('wishlist'));
  document.getElementById('openProfileBtn').addEventListener('click', () => openDrawer('profile'));
  document.getElementById('openSupplierBtn').addEventListener('click', () => openModal('supplier'));
  document.getElementById('openSupplierBannerBtn').addEventListener('click', () => openModal('supplier'));

  document.getElementById('closeCartBtn').addEventListener('click', closeAllOverlays);
  document.getElementById('closeWishlistBtn').addEventListener('click', closeAllOverlays);
  document.getElementById('closeProfileBtn').addEventListener('click', closeAllOverlays);
  document.getElementById('closeProductModalBtn').addEventListener('click', closeAllOverlays);
  document.getElementById('closeCheckoutModalBtn').addEventListener('click', closeAllOverlays);
  document.getElementById('closeSupplierModalBtn').addEventListener('click', closeAllOverlays);
  els.overlayBackdrop.addEventListener('click', closeAllOverlays);

  // Cart Drawer Delegation
  els.cartBody.addEventListener('click', (e) => {
    const qtyBtn = e.target.closest('[data-qty-delta]');
    if (qtyBtn) {
      const idx = Number(qtyBtn.dataset.cartIdx);
      const delta = Number(qtyBtn.dataset.qtyDelta);
      if (state.cart[idx]) {
        state.cart[idx].qty += delta;
        if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
        saveState(state);
        updateHeaderBadges();
        renderCartDrawer();
      }
      return;
    }
    const remBtn = e.target.closest('[data-remove-cart]');
    if (remBtn) {
      state.cart.splice(Number(remBtn.dataset.removeCart), 1);
      saveState(state);
      updateHeaderBadges();
      renderCartDrawer();
    }
  });

  els.cartFooter.addEventListener('click', (e) => {
    if (e.target.id === 'applyCouponBtn') {
      const code = (document.getElementById('couponInput')?.value || '').trim().toUpperCase();
      if (code === 'MEESHO10') {
        checkoutDraft.couponApplied = true;
        showToast('Coupon MEESHO10 applied! (10% up to ₹100 OFF)');
        renderCartDrawer();
      } else {
        showToast('Invalid coupon. Try MEESHO10');
      }
    }
    if (e.target.id === 'proceedCheckoutBtn') {
      openCheckoutModal();
    }
  });

  els.cartFooter.addEventListener('change', (e) => {
    if (e.target.id === 'useCreditsToggle') {
      checkoutDraft.useCredits = e.target.checked;
      renderCartDrawer();
    }
  });

  // Wishlist Drawer Delegation
  els.wishlistBody.addEventListener('click', (e) => {
    const moveBtn = e.target.closest('[data-move-cart]');
    if (moveBtn) {
      const pid = moveBtn.dataset.moveCart;
      addToCart(pid, null, false);
      const idx = state.wishlist.indexOf(pid);
      if (idx >= 0) state.wishlist.splice(idx, 1);
      saveState(state);
      updateHeaderBadges();
      renderWishlistDrawer();
      renderProducts();
      return;
    }
    const remBtn = e.target.closest('[data-wishlist-remove]');
    if (remBtn) {
      toggleWishlist(remBtn.dataset.wishlistRemove);
    }
  });

  // Supplier Onboarding Form
  els.supplierForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const biz = document.getElementById('supBizName').value.trim();
    closeAllOverlays();
    els.supplierForm.reset();
    showToast(`Application submitted for "${biz}"! Onboarding link sent via SMS.`);
  });

  // Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllOverlays();
  });
}

// ---------- Boot ----------
updateHeaderBadges();
refreshCatalog();
initEvents();

