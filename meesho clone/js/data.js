// Meesho Storefront Catalog & Category Metadata

export const CATEGORIES = [
  {
    id: 'all',
    label: 'All Products',
    shortLabel: 'All',
    image: 'assets/images/kurti.jpg',
    subcategories: []
  },
  {
    id: 'women-ethnic',
    label: 'Women Ethnic',
    shortLabel: 'Women Ethnic',
    image: 'assets/images/saree.jpg',
    subcategories: ['Kurtis', 'Sarees', 'Kurta Sets', 'Lehengas', 'Dupattas']
  },
  {
    id: 'women-western',
    label: 'Women Western',
    shortLabel: 'Women Western',
    image: 'assets/images/kurti.jpg',
    subcategories: ['Tops & Tunics', 'Dresses', 'Jeans & Jeggings', 'Co-ord Sets']
  },
  {
    id: 'men',
    label: 'Men',
    shortLabel: 'Men',
    image: 'assets/images/mens-shirt.svg',
    subcategories: ['Casual Shirts', 'T-Shirts', 'Denim Jeans', 'Ethnic Kurtas']
  },
  {
    id: 'kids',
    label: 'Kids',
    shortLabel: 'Kids',
    image: 'assets/images/kids.svg',
    subcategories: ['Boys Festive', 'Girls Frocks', 'Infant Combos', 'Toys']
  },
  {
    id: 'home-kitchen',
    label: 'Home & Kitchen',
    shortLabel: 'Home & Kitchen',
    image: 'assets/images/home-bedsheet.jpg',
    subcategories: ['Bedsheets', 'Kitchen Appliances', 'Storage Jars', 'Curtains']
  },
  {
    id: 'beauty-health',
    label: 'Beauty & Health',
    shortLabel: 'Beauty & Health',
    image: 'assets/images/beauty.svg',
    subcategories: ['Lipsticks', 'Skincare Serums', 'Makeup Combos', 'Hair Care']
  },
  {
    id: 'jewellery',
    label: 'Jewellery & Accessories',
    shortLabel: 'Jewellery',
    image: 'assets/images/jewellery.svg',
    subcategories: ['Earrings', 'Necklace Sets', 'Bangles', 'Watches']
  },
  {
    id: 'bags-footwear',
    label: 'Bags & Footwear',
    shortLabel: 'Bags & Footwear',
    image: 'assets/images/footwear.svg',
    subcategories: ['Handbags', 'Ethnic Juttis', 'Sneakers', 'Backpacks']
  },
  {
    id: 'electronics',
    label: 'Electronics',
    shortLabel: 'Electronics',
    image: 'assets/images/electronics.jpg',
    subcategories: ['Earbuds & Audio', 'Smartwatches', 'Mobile Accessories', 'Lights']
  }
];

export const PRODUCTS = [
  {
    id: 'msh-101',
    title: 'Aagam Attractive Women Floral Cotton Anarkali Kurti',
    category: 'women-ethnic',
    subcategory: 'Kurtis',
    price: 349,
    mrp: 799,
    rating: 4.3,
    ratingCount: 18420,
    reviewsCount: 3412,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Best Seller',
    image: 'assets/images/kurti.jpg',
    gallery: ['assets/images/kurti.jpg', 'assets/images/saree.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Magenta', 'Maroon', 'Mustard'],
    fabric: '100% Pure Jaipur Cotton',
    dispatchDays: '2 days',
    seller: {
      name: 'Jaipur Vastra Bhandar',
      rating: 4.2,
      followers: '48.2K',
      productsCount: 312
    },
    description:
      'Breathable Jaipur floral printed Anarkali kurti crafted from soft pure cotton with flared hem and intricate gota patti neckline detailing. Ideal for daily wear, office, and festive gatherings.',
    reviews: [
      { user: 'Priya Sharma', rating: 5, date: '2 days ago', comment: 'Fabric is super soft and colour did not bleed after first wash. Worth every rupee!' },
      { user: 'Ananya Verma', rating: 4, date: '1 week ago', comment: 'True to size. Fitting is flattering and delivery arrived in 3 days.' }
    ]
  },
  {
    id: 'msh-102',
    title: 'Kanjivaram Royal Teal Zari Woven Banarasi Silk Saree with Blouse',
    category: 'women-ethnic',
    subcategory: 'Sarees',
    price: 579,
    mrp: 1499,
    rating: 4.4,
    ratingCount: 26910,
    reviewsCount: 5190,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Meesho Trusted',
    image: 'assets/images/saree.jpg',
    gallery: ['assets/images/saree.jpg', 'assets/images/jewellery.svg'],
    sizes: ['Free Size'],
    colors: ['Royal Teal', 'Crimson Red', 'Emerald'],
    fabric: 'Banarasi Art Silk (5.5m + 0.8m Blouse)',
    dispatchDays: '2 days',
    seller: {
      name: 'Surat Looms Hub',
      rating: 4.3,
      followers: '112K',
      productsCount: 540
    },
    description:
      'Richly woven Banarasi silk saree featuring classic gold zari pallu and traditional motifs. Comes with an unstitched matching brocade blouse piece.',
    reviews: [
      { user: 'Kavita Nair', rating: 5, date: '3 days ago', comment: 'Looks like a ₹2500 boutique saree! The zari shine is very elegant.' },
      { user: 'Meenakshi Iyer', rating: 4, date: '6 days ago', comment: 'Great drape and lightweight for weddings.' }
    ]
  },
  {
    id: 'msh-103',
    title: 'UrbanThread Men Slim Fit Checkered Pure Cotton Casual Shirt',
    category: 'men',
    subcategory: 'Casual Shirts',
    price: 389,
    mrp: 999,
    rating: 4.1,
    ratingCount: 12350,
    reviewsCount: 2140,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Top Rated',
    image: 'assets/images/mens-shirt.svg',
    gallery: ['assets/images/mens-shirt.svg'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Navy Check', 'Olive', 'Charcoal'],
    fabric: '100% Twill Cotton',
    dispatchDays: '1 day',
    seller: {
      name: 'Tiruppur Apparel Co.',
      rating: 4.1,
      followers: '29.4K',
      productsCount: 195
    },
    description:
      'Tailored slim-fit men’s casual shirt with crisp button-down collar, chest pocket, and pre-washed soft cotton finish for all-day comfort.',
    reviews: [
      { user: 'Rohan Malhotra', rating: 4, date: '4 days ago', comment: 'Good stitching and fabric thickness. M size fits 38 chest nicely.' },
      { user: 'Siddharth Rao', rating: 5, date: '2 weeks ago', comment: 'Best budget shirt on Meesho, ordered two more colors.' }
    ]
  },
  {
    id: 'msh-104',
    title: 'ProBass ANC True Wireless Earbuds + AMOLED Smart Watch Combo',
    category: 'electronics',
    subcategory: 'Earbuds & Audio',
    price: 749,
    mrp: 2499,
    rating: 4.2,
    ratingCount: 9840,
    reviewsCount: 1875,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Mega Deal',
    image: 'assets/images/electronics.jpg',
    gallery: ['assets/images/electronics.jpg'],
    sizes: ['Free Size'],
    colors: ['Matte Black', 'Midnight Blue'],
    fabric: 'ABS + Silicone Strap (Bluetooth 5.3)',
    dispatchDays: '2 days',
    seller: {
      name: 'GizmoKart India',
      rating: 4.0,
      followers: '64.1K',
      productsCount: 142
    },
    description:
      '2-in-1 value tech combo featuring Bluetooth 5.3 TWS earbuds with 32-hour playback and a Bluetooth-calling fitness smartwatch with heart rate tracking.',
    reviews: [
      { user: 'Aditya Kulkarni', rating: 4, date: '5 days ago', comment: 'Sound bass is punchy and watch connects smoothly with Android.' },
      { user: 'Vikas Yadav', rating: 5, date: '1 week ago', comment: 'Unbeatable price for both watch and earbuds together.' }
    ]
  },
  {
    id: 'msh-105',
    title: 'Jaipur Cotton 220TC Pastel Floral King Size Bedsheet with 2 Pillow Covers',
    category: 'home-kitchen',
    subcategory: 'Bedsheets',
    price: 429,
    mrp: 1199,
    rating: 4.5,
    ratingCount: 31200,
    reviewsCount: 6410,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Best Seller',
    image: 'assets/images/home-bedsheet.jpg',
    gallery: ['assets/images/home-bedsheet.jpg', 'assets/images/kitchen.svg'],
    sizes: ['Double', 'King Size'],
    colors: ['Pastel Rose', 'Sky Mint', 'Ivory'],
    fabric: '100% Glace Cotton (90x100 inches)',
    dispatchDays: '2 days',
    seller: {
      name: 'Sanganer Home Linens',
      rating: 4.4,
      followers: '89.7K',
      productsCount: 410
    },
    description:
      'Soft-touch breathable floral double/king bedsheet set with fade-resistant reactive print and two oversized zippered pillow covers.',
    reviews: [
      { user: 'Neha Kapoor', rating: 5, date: '1 day ago', comment: 'Colors are exactly like the photo, very soft and covers king mattress easily.' },
      { user: 'Sunita Joshi', rating: 5, date: '1 week ago', comment: 'Washed twice already—zero shrinkage or lint.' }
    ]
  },
  {
    id: 'msh-106',
    title: 'GlamAura Rose Gold Matte Lipstick, Compact & Vitamin C Serum 4-Pc Kit',
    category: 'beauty-health',
    subcategory: 'Makeup Combos',
    price: 299,
    mrp: 899,
    rating: 4.3,
    ratingCount: 15870,
    reviewsCount: 2980,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Trending',
    image: 'assets/images/beauty.svg',
    gallery: ['assets/images/beauty.svg'],
    sizes: ['Standard Pack'],
    colors: ['Nude Rose', 'Berry Plum'],
    fabric: 'Dermatologically Tested • Paraben Free',
    dispatchDays: '1 day',
    seller: {
      name: 'GlowNest Cosmetics',
      rating: 4.2,
      followers: '53.5K',
      productsCount: 230
    },
    description:
      'Complete daily glow combo including 2 smudge-proof velvety matte lipsticks, oil-control compact powder, and brightening 10% Vitamin C face serum.',
    reviews: [
      { user: 'Ritika Singh', rating: 5, date: '3 days ago', comment: 'Lipstick shades stay for 8 hours without drying lips. Great gift set!' },
      { user: 'Pooja Desai', rating: 4, date: '9 days ago', comment: 'Serum absorbs quickly and packaging arrived intact.' }
    ]
  },
  {
    id: 'msh-107',
    title: 'Rajasthani Handcrafted Oxidized Silver Jhumka & Afghani Choker Set',
    category: 'jewellery',
    subcategory: 'Necklace Sets',
    price: 199,
    mrp: 599,
    rating: 4.6,
    ratingCount: 42150,
    reviewsCount: 8930,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: '4.6 ★ Super Hit',
    image: 'assets/images/jewellery.svg',
    gallery: ['assets/images/jewellery.svg', 'assets/images/kurti.jpg'],
    sizes: ['Free Size'],
    colors: ['Antique Silver', 'Black Polish'],
    fabric: 'German Silver Alloy with Ghungroo Drops',
    dispatchDays: '1 day',
    seller: {
      name: 'Zaveri Artisan Studio',
      rating: 4.5,
      followers: '134K',
      productsCount: 680
    },
    description:
      'Intricately detailed oxidized silver-tone choker paired with lightweight ghungroo jhumka earrings. Effortlessly elevates kurtis, sarees, and Indo-western outfits.',
    reviews: [
      { user: 'Shruti Menon', rating: 5, date: 'Yesterday', comment: 'Stunning finish for under ₹200! Not heavy on the ears at all.' },
      { user: 'Divya Chauhan', rating: 5, date: '5 days ago', comment: 'Wore it for Navratri and got so many compliments.' }
    ]
  },
  {
    id: 'msh-108',
    title: 'KalaKriti Embroidered Ethnic Mojari Jutti & Comfort Walk Combo',
    category: 'bags-footwear',
    subcategory: 'Ethnic Juttis',
    price: 449,
    mrp: 1199,
    rating: 4.2,
    ratingCount: 8420,
    reviewsCount: 1520,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Value Combo',
    image: 'assets/images/footwear.svg',
    gallery: ['assets/images/footwear.svg'],
    sizes: ['IND-5', 'IND-6', 'IND-7', 'IND-8'],
    colors: ['Ivory Gold', 'Classic White'],
    fabric: 'Cushioned Memory Foam Sole',
    dispatchDays: '2 days',
    seller: {
      name: 'Agra Footwear Craft',
      rating: 4.1,
      followers: '37.8K',
      productsCount: 265
    },
    description:
      'Dual-occasion footwear combo combining handcrafted thread-embroidered ethnic juttis and everyday cushioned casual sneakers with anti-slip TPR sole.',
    reviews: [
      { user: 'Nisha Patel', rating: 4, date: '4 days ago', comment: 'Very comfortable sole, zero shoe bite on the juttis.' }
    ]
  },
  {
    id: 'msh-109',
    title: 'LittleStar Festive Cotton Kurta Pajama & Embroidered Frock Ethnic Set',
    category: 'kids',
    subcategory: 'Boys Festive',
    price: 399,
    mrp: 999,
    rating: 4.4,
    ratingCount: 11290,
    reviewsCount: 2050,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Kids Favorite',
    image: 'assets/images/kids.svg',
    gallery: ['assets/images/kids.svg'],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Sunshine Yellow', 'Rose Pink'],
    fabric: 'Soft Organic Cotton Blend',
    dispatchDays: '2 days',
    seller: {
      name: 'TinyTrends Boutique',
      rating: 4.4,
      followers: '44.6K',
      productsCount: 280
    },
    description:
      'Skin-friendly, breathable festive kids ethnic wear tailored in soft cotton so children stay comfortable during celebrations and family events.',
    reviews: [
      { user: 'Archana Gupta', rating: 5, date: '2 days ago', comment: 'Super cute and soft on skin. My 5-year-old loved wearing it!' }
    ]
  },
  {
    id: 'msh-110',
    title: 'BellaTote Structured Vegan Leather Office & College Handbag',
    category: 'bags-footwear',
    subcategory: 'Handbags',
    price: 479,
    mrp: 1399,
    rating: 4.3,
    ratingCount: 19400,
    reviewsCount: 3820,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Best Seller',
    image: 'assets/images/handbag.svg',
    gallery: ['assets/images/handbag.svg'],
    sizes: ['Large (Fits 14" Laptop)'],
    colors: ['Caramel Tan', 'Espresso Brown', 'Jet Black'],
    fabric: 'Premium Textured PU Leather',
    dispatchDays: '2 days',
    seller: {
      name: 'ModaBags Mumbai',
      rating: 4.3,
      followers: '71.2K',
      productsCount: 190
    },
    description:
      'Spacious structured tote bag with 3 main compartments, zip pocket, detachable sling strap, and sturdy gold-toned hardware.',
    reviews: [
      { user: 'Sneha Reddy', rating: 5, date: '3 days ago', comment: 'Zips are smooth and easily fits my notebook, bottle, and lunch box.' }
    ]
  },
  {
    id: 'msh-111',
    title: 'ChefPro 1.8L Electric Kettle + 6-Pc Airtight Glass Spice Jar Set',
    category: 'home-kitchen',
    subcategory: 'Kitchen Appliances',
    price: 689,
    mrp: 1699,
    rating: 4.2,
    ratingCount: 14120,
    reviewsCount: 2670,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Kitchen Essential',
    image: 'assets/images/kitchen.svg',
    gallery: ['assets/images/kitchen.svg'],
    sizes: ['1.8L Combo'],
    colors: ['Steel & Matte Black'],
    fabric: '304 Stainless Steel & Borosilicate Glass',
    dispatchDays: '2 days',
    seller: {
      name: 'HomeEase Appliances',
      rating: 4.1,
      followers: '58.9K',
      productsCount: 160
    },
    description:
      'Fast-boil 1500W stainless steel electric kettle with auto shut-off, bundled with 6 modular airtight spice jars for an organized modern kitchen.',
    reviews: [
      { user: 'Rakesh Tiwari', rating: 4, date: '6 days ago', comment: 'Boils water in under 3 minutes and the spice jars look super neat.' }
    ]
  },
  {
    id: 'msh-112',
    title: 'Vastraa Women Maroon & Gold Straight Rayon Kurti with Palazzo',
    category: 'women-ethnic',
    subcategory: 'Kurta Sets',
    price: 499,
    mrp: 1299,
    rating: 4.4,
    ratingCount: 22100,
    reviewsCount: 4180,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Top Pick',
    image: 'assets/images/kurti.jpg',
    gallery: ['assets/images/kurti.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Magenta Gold', 'Wine'],
    fabric: 'Heavy 140 GSM Rayon',
    dispatchDays: '2 days',
    seller: {
      name: 'Jaipur Vastra Bhandar',
      rating: 4.2,
      followers: '48.2K',
      productsCount: 312
    },
    description:
      'Two-piece straight kurti and wide-leg palazzo co-ord set featuring delicate gold foil block print and breathable rayon drape.',
    reviews: [
      { user: 'Sonal Bansal', rating: 5, date: '5 days ago', comment: 'Very comfortable palazzo waist elastic and rich color.' }
    ]
  },
  {
    id: 'msh-113',
    title: 'Boho Chic Floral Georgette A-Line Midi Dress for Women',
    category: 'women-western',
    subcategory: 'Dresses',
    price: 419,
    mrp: 1099,
    rating: 4.2,
    ratingCount: 9630,
    reviewsCount: 1710,
    freeDelivery: true,
    trusted: false,
    codAvailable: true,
    badge: 'Under ₹499',
    image: 'assets/images/kurti.jpg',
    gallery: ['assets/images/kurti.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Berry Floral', 'Peach'],
    fabric: 'Soft Georgette with Crepe Lining',
    dispatchDays: '3 days',
    seller: {
      name: 'TrendLane Delhi',
      rating: 4.0,
      followers: '31.4K',
      productsCount: 225
    },
    description:
      'Flowy A-line western dress with flutter sleeves, tie-up waist belt, and full inner lining for brunch, vacations, and casual outings.',
    reviews: [
      { user: 'Rhea Dsouza', rating: 4, date: '1 week ago', comment: 'Love the flare and inner lining isn’t see-through at all.' }
    ]
  },
  {
    id: 'msh-114',
    title: 'Classic Navy Oxford Men Button-Down Full Sleeve Formal Shirt',
    category: 'men',
    subcategory: 'Casual Shirts',
    price: 329,
    mrp: 899,
    rating: 4.0,
    ratingCount: 7410,
    reviewsCount: 1120,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Lowest Price',
    image: 'assets/images/mens-shirt.svg',
    gallery: ['assets/images/mens-shirt.svg'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'White', 'Sky Blue'],
    fabric: 'Cotton Rich Oxford Weave',
    dispatchDays: '2 days',
    seller: {
      name: 'Tiruppur Apparel Co.',
      rating: 4.1,
      followers: '29.4K',
      productsCount: 195
    },
    description:
      'Crisp office-ready Oxford weave shirt designed for wrinkle resistance and clean tailored comfort from morning meetings to evening dinners.',
    reviews: [
      { user: 'Karan Mehta', rating: 4, date: '10 days ago', comment: 'Value for money office shirt, collar holds shape well.' }
    ]
  },
  {
    id: 'msh-115',
    title: 'VelvetMatte 12-Hour Long Stay Liquid Lipstick Trio + Serum',
    category: 'beauty-health',
    subcategory: 'Lipsticks',
    price: 249,
    mrp: 699,
    rating: 4.4,
    ratingCount: 18900,
    reviewsCount: 3340,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Under ₹299',
    image: 'assets/images/beauty.svg',
    gallery: ['assets/images/beauty.svg'],
    sizes: ['Pack of 4'],
    colors: ['Rosewood', 'Mauve'],
    fabric: 'Waterproof Transfer-Proof Formula',
    dispatchDays: '1 day',
    seller: {
      name: 'GlowNest Cosmetics',
      rating: 4.2,
      followers: '53.5K',
      productsCount: 230
    },
    description:
      'Lightweight non-sticky matte lipsticks enriched with Jojoba oil and Vitamin E for intense one-stroke pigmentation.',
    reviews: [
      { user: 'Tanya Kapoor', rating: 5, date: '4 days ago', comment: 'Shades flatter Indian skin tones beautifully.' }
    ]
  },
  {
    id: 'msh-116',
    title: 'Temple Gold & Oxidized Bridal Jhumka Earrings Combo (Pack of 2)',
    category: 'jewellery',
    subcategory: 'Earrings',
    price: 159,
    mrp: 499,
    rating: 4.5,
    ratingCount: 28700,
    reviewsCount: 5400,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Steal Deal',
    image: 'assets/images/jewellery.svg',
    gallery: ['assets/images/jewellery.svg'],
    sizes: ['Free Size'],
    colors: ['Oxidized Silver'],
    fabric: 'Hypoallergenic Brass Alloy',
    dispatchDays: '1 day',
    seller: {
      name: 'Zaveri Artisan Studio',
      rating: 4.5,
      followers: '134K',
      productsCount: 680
    },
    description:
      'Dual pack of statement oxidized silver jhumkas with mirror work and pearl tassels—perfect everyday and festive ethnic accessories.',
    reviews: [
      { user: 'Aarti Kulkarni', rating: 5, date: '2 days ago', comment: 'Cute packaging and zero skin irritation.' }
    ]
  },
  {
    id: 'msh-117',
    title: 'SonicPod Pro Wireless Charging Earbuds with Environmental Noise Cancellation',
    category: 'electronics',
    subcategory: 'Earbuds & Audio',
    price: 549,
    mrp: 1999,
    rating: 4.1,
    ratingCount: 16300,
    reviewsCount: 2890,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Fast Dispatch',
    image: 'assets/images/electronics.jpg',
    gallery: ['assets/images/electronics.jpg'],
    sizes: ['Free Size'],
    colors: ['Obsidian Black'],
    fabric: 'IPX5 Sweat Resistant • Type-C Fast Charge',
    dispatchDays: '1 day',
    seller: {
      name: 'GizmoKart India',
      rating: 4.0,
      followers: '64.1K',
      productsCount: 142
    },
    description:
      'Ultra-low latency 50ms gaming earbuds with touch controls, quad-mic ENC for clear calls, and pocket-friendly charging case.',
    reviews: [
      { user: 'Harsh Vardhan', rating: 4, date: '3 days ago', comment: 'Battery easily lasts 5 days on a single case charge.' }
    ]
  },
  {
    id: 'msh-118',
    title: 'Royal Heritage Paithani Silk Saree with Rich Peacock Zari Pallu',
    category: 'women-ethnic',
    subcategory: 'Sarees',
    price: 699,
    mrp: 1899,
    rating: 4.6,
    ratingCount: 19840,
    reviewsCount: 4120,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: '4.6 ★ Festival Hit',
    image: 'assets/images/saree.jpg',
    gallery: ['assets/images/saree.jpg'],
    sizes: ['Free Size'],
    colors: ['Peacock Teal', 'Purple Gold'],
    fabric: 'Soft Jacquard Silk Blend',
    dispatchDays: '2 days',
    seller: {
      name: 'Surat Looms Hub',
      rating: 4.3,
      followers: '112K',
      productsCount: 540
    },
    description:
      'Celebratory Paithani-inspired silk saree with vivid peacock muniya border and soft lustrous finish suitable for weddings and poojas.',
    reviews: [
      { user: 'Pallavi Deshmukh', rating: 5, date: '4 days ago', comment: 'Gifted to my mother and she adored the teal gold sheen.' }
    ]
  },
  {
    id: 'msh-119',
    title: 'Everyday Tan Crossbody Saddle & Tote Handbag 2-Pc Combo',
    category: 'bags-footwear',
    subcategory: 'Handbags',
    price: 529,
    mrp: 1499,
    rating: 4.3,
    ratingCount: 10940,
    reviewsCount: 1940,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: '2-Pc Combo',
    image: 'assets/images/handbag.svg',
    gallery: ['assets/images/handbag.svg'],
    sizes: ['Medium + Pouch'],
    colors: ['Tan', 'Mocha'],
    fabric: 'Water-Resistant Faux Leather',
    dispatchDays: '2 days',
    seller: {
      name: 'ModaBags Mumbai',
      rating: 4.3,
      followers: '71.2K',
      productsCount: 190
    },
    description:
      'Stylish structured tote paired with a matching zippered utility pouch for cosmetics, cards, and daily essentials.',
    reviews: [
      { user: 'Simran Kaur', rating: 4, date: '5 days ago', comment: 'Sturdy handles and clean stitching.' }
    ]
  },
  {
    id: 'msh-120',
    title: 'Breezy Pastel Cotton Printed Bedspread + 4 Cushion Covers Set',
    category: 'home-kitchen',
    subcategory: 'Bedsheets',
    price: 499,
    mrp: 1299,
    rating: 4.4,
    ratingCount: 15430,
    reviewsCount: 2810,
    freeDelivery: true,
    trusted: true,
    codAvailable: true,
    badge: 'Home Makeover',
    image: 'assets/images/home-bedsheet.jpg',
    gallery: ['assets/images/home-bedsheet.jpg'],
    sizes: ['King Size'],
    colors: ['Blossom Pink', 'Sage'],
    fabric: '100% Combed Cotton',
    dispatchDays: '2 days',
    seller: {
      name: 'Sanganer Home Linens',
      rating: 4.4,
      followers: '89.7K',
      productsCount: 410
    },
    description:
      'Instantly brighten your bedroom with this breathable cotton floral bedsheet and coordinated pillow covers crafted for Indian summers.',
    reviews: [
      { user: 'Geeta Nair', rating: 5, date: '1 week ago', comment: 'Very soothing pastel shades and neat stitching.' }
    ]
  }
];
