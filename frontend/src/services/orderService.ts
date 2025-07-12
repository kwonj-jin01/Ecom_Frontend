import api from "./api"; // ← même dossier que api.ts
import { ShippingInfo, PaymentInfo } from "../types";
import { CartItem } from "../context/CartContext";

export interface OrderItemPayload {
  product_id: string;
  quantity: number;
  size?: string | null;
  unit_price: number;
  total_price: number;
}

export interface OrderPayload {
  user_id: string;
  shipping_address: string;
  shipping_city: string;
  shipping_country: string;
  shipping_zip: string | null;
  total: number;
  status: string;
  items: OrderItemPayload[];
  payment: {
    amount: number;
    method: string;
    status: string;
  };
  customer_info: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    cardholderName: string;
  };
  metadata: Record<string, unknown>;
}

/* ------------------------------------------------------------------ */
/*                           VALIDATION                               */
/* ------------------------------------------------------------------ */
export const validateShipping = (info: ShippingInfo): boolean =>
  !!(
    info.email &&
    info.phone &&
    info.firstName &&
    info.lastName &&
    info.address &&
    info.city
  );

export const validatePayment = (info: PaymentInfo): boolean =>
  !!(
    info.cardNumber &&
    info.expiryDate &&
    info.cvv &&
    info.cardholderName
  );

/* ------------------------------------------------------------------ */
/*                       PAYLOAD BUILDER                               */
/* ------------------------------------------------------------------ */
export const buildOrderPayload = (
  userId: string,
  shippingInfo: ShippingInfo,
  paymentInfo: PaymentInfo,
  cart: CartItem[],
  totals: { subtotal: number; deliveryCharge: number; total: number },
  shippingMethod: string,
  discountCode: string | null = null
): OrderPayload => ({
  user_id: userId,
  shipping_address: `${shippingInfo.address}${
    shippingInfo.district ? `, ${shippingInfo.district}` : ""
  }`,
  shipping_city: shippingInfo.city,
  shipping_country: shippingInfo.country,
  shipping_zip: shippingInfo.district || null,
  total: totals.total,
  status: "en_attente",
  items: cart.map((item) => ({
    product_id: item.product.id,
    quantity: item.quantity,
    size: item.size ?? null,
    unit_price: Number(item.product.price),
    total_price: Number(item.product.price) * item.quantity,
  })),
  payment: {
    amount: totals.total,
    method: "carte",
    status: "en_attente",
  },
  customer_info: {
    email: shippingInfo.email,
    phone: shippingInfo.phone,
    firstName: shippingInfo.firstName,
    lastName: shippingInfo.lastName,
    cardholderName: paymentInfo.cardholderName,
  },
  metadata: {
    shipping_method: shippingMethod,
    discount_code: discountCode,
    delivery_charge: totals.deliveryCharge,
    subtotal: totals.subtotal,
    order_source: "web",
  },
});

/* ------------------------------------------------------------------ */
/*                          API CALL                                   */
/* ------------------------------------------------------------------ */
export const createOrder = async (payload: OrderPayload) => {
  // Pas besoin de passer le token : l’interceptor le fait déjà
  const { data } = await api.post("/orders", payload);
  return data; // { order: …, message: … }
};
