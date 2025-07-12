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

// ---------------------------------------------------------------------------
// Données du menu principal (localisées en FR)
// ---------------------------------------------------------------------------
export const menuData: MenuData = {
  shop: {
    sections: [
      {
        title: "Catégories",
        items: ["Nouveautés", "Meilleures ventes", "Édition limitée"],
      },
      {
        title: "Collections",
        items: [
          "Collection printemps",
          "Essentiels été",
          "Équipement d’entraînement",
        ],
      },
    ],
    bottomLinks: ["Tout voir", "Cartes cadeaux", "Guide des tailles"],
  },

  men: {
    sections: [
      {
        title: "Nouveautés & Tendances",
        items: ["Nouveautés", "Offre promotionnelle", "Meilleures ventes"],
      },
      {
        title: "Chaussures",
        items: ["Basket-ball", "Running", "Training & Gym"],
      },
      {
        title: "Vêtements",
        items: ["Survêtements", "Pantalons", "Shorts", "T‑shirts & Tops"],
      },
      {
        title: "Accessoires",
        items: ["Chaussettes", "Lunettes de soleil"],
      },
      {
        title: "Par sport",
        items: ["Football", "Course", "Soccer", "Tennis"],
      },
      {
        title: "Par couleur",
        items: ["Rouge université", "Bleu électrique", "Marron menthe"],
      },
    ],
    bottomLinks: [
      "Tous les vêtements homme",
      "Tous les accessoires homme",
      "Tous les sports homme",
    ],
  },

  women: {
    sections: [
      {
        title: "Nouveautés & Tendances",
        items: ["Nouveautés", "Meilleures ventes"],
      },
      {
        title: "Chaussures",
        items: ["Basket-ball", "Jordan", "Training & Gym"],
      },
      {
        title: "Vêtements",
        items: ["Sweats & Hoodies", "Jordan", "T‑shirts & Tops"],
      },
      {
        title: "Accessoires",
        items: ["Sacs & Sacs à dos", "Casquettes & Chapeaux", "Chaussettes"],
      },
      {
        title: "Par sport",
        items: ["Baseball", "Course", "Yoga"],
      },
      {
        title: "Par couleur",
        items: ["Rose Elemental", "Rouge université", "Noir & Écru"],
      },
    ],
    bottomLinks: [
      "Toutes les chaussures femme",
      "Tous les vêtements femme",
      "Tous les sports femme",
    ],
  },

  trending: {
    sections: [
      {
        title: "Tendance du moment",
        items: [
          "Styles viraux TikTok",
          "Les plus partagés",
          "Succès réseaux sociaux",
        ],
      },
      {
        title: "Tendances saisonnières",
        items: [
          "Ambiance estivale",
          "Prêt pour le festival",
          "Tenues de plage",
        ],
      },
    ],
    bottomLinks: ["Tout voir : Tendances", "Guide de style"],
  },
};

// ---------------------------------------------------------------------------
// Données de navigation mobile (localisées en FR)
// ---------------------------------------------------------------------------
export const navigation: NavigationCategory[] = [
  {
    title: "Boutique",
    children: [
      { title: "Nouveautés", href: "/new-arrivals" },
      { title: "Meilleures ventes", href: "/best-sellers" },
      { title: "Promo", href: "/sale", featured: true },
    ],
  },
  {
    title: "Homme",
    children: [
      { title: "Chaussures", href: "/men/shoes" },
      { title: "Vêtements", href: "/men/clothing" },
      { title: "Accessoires", href: "/men/accessories" },
    ],
  },
  {
    title: "Femme",
    children: [
      { title: "Chaussures", href: "/women/shoes" },
      { title: "Vêtements", href: "/women/clothing" },
      { title: "Accessoires", href: "/women/accessories" },
    ],
  },
  {
    title: "Tendances",
    children: [
      { title: "Articles phares", href: "/trending/hot" },
      { title: "Nouveaux drops", href: "/trending/new" },
      { title: "Styles viraux", href: "/trending/viral" },
    ],
  },
  {
    title: "Saisonnier",
    children: [
      { title: "Collection été", href: "/seasonal/summer" },
      { title: "Édition limitée", href: "/seasonal/limited" },
    ],
  },
  {
    title: "Accessoires",
    children: [
      { title: "Sacs", href: "/accessories/bags" },
      { title: "Chapeaux", href: "/accessories/hats" },
      { title: "Lunettes de soleil", href: "/accessories/sunglasses" },
    ],
  },
];
