import React from "react";
import { ShippingInfo } from "../../types";

type ShippingMethod = "free" | "regular" | "express";

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  shippingMethod: ShippingMethod;
  onShippingChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  onShippingMethodChange: (method: ShippingMethod) => void;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  shippingInfo,
  shippingMethod,
  onShippingChange,
  onShippingMethodChange,
}) => (
  <div className="space-y-8">
    {/* ----------------------- Infos de livraison ----------------------- */}
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Informations de livraison
      </h2>

      {/* ---------- Contact ---------- */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Informations de contact</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Adresse e‑mail"
            value={shippingInfo.email}
            onChange={onShippingChange}
            autoComplete="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            required
          />

          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Numéro de téléphone"
            value={shippingInfo.phone}
            onChange={onShippingChange}
            autoComplete="tel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            required
          />
        </div>

        <label className="flex items-center text-sm text-gray-600">
          <input type="checkbox" className="mr-2 rounded" />
          M'envoyer les actualités et les offres
        </label>
      </div>

      {/* ---------- Adresse ---------- */}
      <div className="mt-8 space-y-4">
        <h3 className="font-medium text-gray-900">Adresse de livraison</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={shippingInfo.firstName}
            onChange={onShippingChange}
            autoComplete="given-name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            required
          />
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Nom"
            value={shippingInfo.lastName}
            onChange={onShippingChange}
            autoComplete="family-name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            required
          />
        </div>

        <select
          id="country"
          name="country"
          value={shippingInfo.country}
          onChange={onShippingChange}
          autoComplete="country"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        >
          <option value="France">France</option>
          <option value="Canada">Canada</option>
          <option value="Royaume-Uni">Royaume-Uni</option>
          <option value="États-Unis">États-Unis</option>
          <option value="Allemagne">Allemagne</option>
        </select>

        <input
          id="city"
          type="text"
          name="city"
          placeholder="Ville"
          value={shippingInfo.city}
          onChange={onShippingChange}
          autoComplete="address-level2"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          required
        />

        <select
          id="district"
          name="district"
          value={shippingInfo.district}
          onChange={onShippingChange}
          autoComplete="address-level1"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        >
          <option value="">Sélectionner un département</option>
          <option value="Paris">Paris</option>
          <option value="Lyon">Lyon</option>
          <option value="Marseille">Marseille</option>
          <option value="Toulouse">Toulouse</option>
        </select>

        <textarea
          id="address"
          name="address"
          placeholder="Adresse complète"
          value={shippingInfo.address}
          onChange={onShippingChange}
          rows={3}
          autoComplete="street-address"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
          required
        />
      </div>
    </section>

    {/* ---------------------- Mode de livraison ---------------------- */}
    <section>
      <h3 className="font-medium text-gray-900 mb-4">Mode de livraison</h3>

      {/* Options radio */}
      {([
        { value: "free", label: "Livraison gratuite", detail: "7‑10 jours ouvrés", price: "Gratuit" },
        { value: "regular", label: "Livraison standard", detail: "3‑5 jours ouvrés", price: "10€" },
        { value: "express", label: "Livraison express", detail: "1‑2 jours ouvrés", price: "20€" },
      ] as const).map(({ value, label, detail, price }) => (
        <label
          key={value}
          className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
            shippingMethod === value
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="shippingMethod"
              checked={shippingMethod === value}
              onChange={() => onShippingMethodChange(value)}
              className="mr-3 text-emerald-500"
            />
            <div>
              <div className="font-medium">{label}</div>
              <div className="text-sm text-gray-500">{detail}</div>
            </div>
          </div>
          <span className="font-medium">{price}</span>
        </label>
      ))}
    </section>
  </div>
);
