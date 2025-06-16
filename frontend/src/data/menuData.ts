// Types pour les données du menu
export type MenuSection = {
  title: string;
  items: string[];
};

export type MenuCategory = {
  sections: MenuSection[];
  bottomLinks?: string[];
};

export type MenuData = {
  shop: MenuCategory;
  men: MenuCategory;
  women: MenuCategory;
  trending: MenuCategory;
};

// Type pour la navigation mobile
export type NavigationItem = {
  title: string;
  href: string;
  featured?: boolean;
};

export type NavigationCategory = {
  title: string;
  children?: NavigationItem[];
};

// Données du menu principal
export const menuData: MenuData = {
  shop: {
    sections: [
      {
        title: "Categories",
        items: [
          "New Arrivals",
          "Best Sellers",
          "Sale Items",
          "Featured Products",
          "Limited Edition",
        ],
      },
      {
        title: "Collections",
        items: [
          "Spring Collection",
          "Summer Essentials",
          "Workout Gear",
          "Casual Wear",
        ],
      },
    ],
    bottomLinks: ["View All", "Gift Cards", "Size Guide"],
  },
  men: {
    sections: [
      {
        title: "New & Trending",
        items: ["New Arrivals", "Sale Offer", "Best Sellers", "Latest Drops"],
      },
      {
        title: "Shoes",
        items: ["Basketball", "Jordan", "Running", "Training & Gym"],
      },
      {
        title: "Clothing",
        items: [
          "Hoodies & Sweatshirts",
          "Jordan",
          "Jackets & Vests",
          "Tracksuits",
          "24/7 Collection",
          "Pants",
          "Shorts",
          "Tops & T-Shirts",
        ],
      },
      {
        title: "Accessories",
        items: [
          "Bags & Backpacks",
          "Hats & Headwear",
          "Socks",
          "Sunglasses",
          "Belts",
        ],
      },
      {
        title: "SHOP BY SPORT",
        items: [
          "Basketball",
          "Cycling",
          "Football",
          "Running",
          "Soccer",
          "Tennis",
        ],
      },
      {
        title: "Shop By Color",
        items: [
          "Elemental Pink",
          "University Red",
          "Electric Blue",
          "Mint Brown",
          "Black And Sail",
        ],
      },
    ],
    bottomLinks: [
      "All Men's Shoes",
      "All Men's Clothing",
      "All Men's Accessories",
      "All Men's Sport",
      "All Men's",
    ],
  },
  women: {
    sections: [
      {
        title: "New & Trending",
        items: [
          "New Arrivals",
          "Sale Offer",
          "Best Sellers",
          "Latest Drops",
          "New In Air Max",
          "Shop Latest Sale Styles",
        ],
      },
      {
        title: "Shoes",
        items: [
          "Basketball",
          "Lifestyle",
          "Jordan",
          "Retro Running",
          "Running",
          "Training & Gym",
        ],
      },
      {
        title: "Clothing",
        items: [
          "Hoodies & Sweatshirts",
          "Jordan",
          "Jackets & Vests",
          "Tracksuits",
          "24/7 Collection",
          "Pants",
          "Shorts",
          "Tops & T-Shirts",
        ],
      },
      {
        title: "Accessories",
        items: [
          "Bags & Backpacks",
          "Hats & Headwear",
          "Socks",
          "Sunglasses",
          "Belts",
        ],
      },
      {
        title: "SHOP BY SPORT",
        items: [
          "Baseball",
          "Basketball",
          "Cycling",
          "Football",
          "Running",
          "Soccer",
          "Tennis",
          "Workout & Gym",
          "Yoga",
        ],
      },
      {
        title: "Shop By Color",
        items: [
          "Elemental Pink",
          "University Red",
          "Electric Blue",
          "Mint Brown",
          "Black And Sail",
        ],
      },
    ],
    bottomLinks: [
      "All Women's Shoes",
      "All Women's Clothing",
      "All Women's Accessories",
      "All Women's Sport",
      "All Women's",
    ],
  },
  trending: {
    sections: [
      {
        title: "Hot Right Now",
        items: [
          "Viral TikTok Styles",
          "Celebrity Favorites",
          "Influencer Picks",
          "Most Shared",
          "Social Media Hits",
        ],
      },
      {
        title: "Seasonal Trends",
        items: [
          "Summer Vibes",
          "Festival Ready",
          "Vacation Essentials",
          "Beach Wear",
        ],
      },
    ],
    bottomLinks: ["View All Trending", "Style Guide"],
  },
};

// Données de navigation pour le menu mobile
export const navigation: NavigationCategory[] = [
  {
    title: "Shop",
    children: [
      { title: "New Arrivals", href: "/new-arrivals" },
      { title: "Best Sellers", href: "/best-sellers" },
      { title: "Sale", href: "/sale", featured: true },
    ],
  },
  {
    title: "Men",
    children: [
      { title: "Shoes", href: "/men/shoes" },
      { title: "Clothing", href: "/men/clothing" },
      { title: "Accessories", href: "/men/accessories" },
    ],
  },
  {
    title: "Women",
    children: [
      { title: "Shoes", href: "/women/shoes" },
      { title: "Clothing", href: "/women/clothing" },
      { title: "Accessories", href: "/women/accessories" },
    ],
  },
  {
    title: "Trending",
    children: [
      { title: "Hot Items", href: "/trending/hot" },
      { title: "New Drops", href: "/trending/new" },
      { title: "Viral Styles", href: "/trending/viral" },
    ],
  },
  {
    title: "Seasonal",
    children: [
      { title: "Summer Collection", href: "/seasonal/summer" },
      { title: "Limited Edition", href: "/seasonal/limited" },
    ],
  },
  {
    title: "Accessories",
    children: [
      { title: "Bags", href: "/accessories/bags" },
      { title: "Hats", href: "/accessories/hats" },
      { title: "Sunglasses", href: "/accessories/sunglasses" },
    ],
  },
];
