import axios from "axios";
import {
  Product,
  ProcessedProduct,
  ProductDetailData,
  ApiResponse,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

// Configuration axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erreur API:", error);
    return Promise.reject(error);
  }
);

// Fonction utilitaire pour convertir les strings en numbers
const parseNumericValue = (value: string | null): number => {
  if (!value) return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

// Fonction pour traiter les produits
const processProduct = (product: Product): ProcessedProduct => {
  return {
    ...product,
    // Créer un tableau d'images à partir des propriétés individuelles
    images: [
      product.thumbnail,
      product.image,
      product.hover_image,
      ...product.images,
    ].filter(Boolean), // Filtrer les valeurs null/undefined

    // Utiliser l'image principale ou le thumbnail comme fallback
    image: product.image || product.thumbnail,

    // Convertir les strings en numbers
    price: parseNumericValue(product.price),
    original_price: parseNumericValue(product.original_price),
    discount: parseNumericValue(product.discount),
    rating: parseNumericValue(product.rating),
  };
};

// Récupérer tous les produits
export const fetchAllProducts = async (): Promise<ProcessedProduct[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Product[]>>("/products");

    if (response.data.status !== "success" || !response.data.data) {
      throw new Error("Réponse API invalide");
    }

    console.log("Produits récupérés depuis l'API :", response.data.data);

    // Traiter les produits
    const processedProducts: ProcessedProduct[] =
      response.data.data.map(processProduct);

    return processedProducts;
  } catch (error) {
    console.error("Erreur chargement produits :", error);

    // Gérer les différents types d'erreurs
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;

        if (status === 404) {
          throw new Error("Endpoint non trouvé");
        } else if (status >= 500) {
          throw new Error("Erreur serveur");
        }
      } else if (error.code === "ECONNABORTED") {
        throw new Error("Timeout - Serveur trop lent");
      } else {
        throw new Error("Erreur inconnue");
      }
    } else {
      throw new Error("Erreur non Axios");
    }

    throw new Error("Erreur lors du chargement des produits");
  }
};

// Récupérer un produit spécifique
export const fetchProductById = async (
  id: string
): Promise<ProcessedProduct | null> => {
  try {
    const response = await apiClient.get<ApiResponse<ProductDetailData>>(
      `/products/${id}`
    );

    if (response.data.status !== "success" || !response.data.data) {
      throw new Error("Produit non trouvé");
    }

    console.log("Produit récupéré depuis l'API :", response.data.data);

    return processProduct(response.data.data);
  } catch (error) {
    console.error(`Erreur chargement produit ${id} :`, error);

    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw new Error("Erreur lors du chargement du produit");
  }
};

// Récupérer les produits par catégorie
export const fetchProductsByCategory = async (
  categoryId: string
): Promise<ProcessedProduct[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      `/products?category=${categoryId}`
    );

    if (response.data.status !== "success" || !response.data.data) {
      throw new Error("Réponse API invalide");
    }

    return response.data.data.map(processProduct);
  } catch (error) {
    console.error(
      `Erreur chargement produits catégorie ${categoryId} :`,
      error
    );
    throw new Error("Erreur lors du chargement des produits");
  }
};

// Fonction de recherche
export const searchProducts = async (
  query: string
): Promise<ProcessedProduct[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      `/products/search?q=${encodeURIComponent(query)}`
    );

    if (response.data.status !== "success" || !response.data.data) {
      throw new Error("Réponse API invalide");
    }

    return response.data.data.map(processProduct);
  } catch (error) {
    console.error(`Erreur recherche produits "${query}" :`, error);
    throw new Error("Erreur lors de la recherche");
  }
};
