import { useState } from "react";
import OrdersPage from "../components/Profil/OrdersPage";
import { Order } from "../types";
import OrderDetailPage from "../components/Profil/OrderDetailPage";

export default function Orders() {
  const [activePage, setActivePage] = useState<"orders" | "order-detail">("orders");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const [orders] = useState<Order[]>([
    {
      id: '#83514',
      date: '01-10-2020 08:22 PM',
      status: 'Paid',
      statusColor: 'bg-green-100 text-green-800',
      customer: {
        name: 'Alisa Janin',
        email: 'alisajanin@gmail.com',
        phone: '+33 5 94 84 56 78',
        orderCount: 10,
        shippingAddress: 'Malaysinya Road, Bla bla Sawisyan Oval, 603 Malaysinya...',
        billingAddress: 'Same as shipping address'
      },
      items: [
        {
          id: '#204770',
          name: 'Nike Air Force 1 LV8 3...',
          color: 'Black-Pink',
          size: 'US 10',
          quantity: 1,
          price: 580.00,
          total: 580.00,
          image: '👟'
        },
        {
          id: '#204770',
          name: 'Nike Air Force 1 LV8 3...',
          color: 'Black-Pink',
          size: 'US 10',
          quantity: 1,
          price: 580.00,
          total: 580.00,
          image: '👟'
        },
        {
          id: '#204770',
          name: 'Nike Air Force 1 LV8 3...',
          color: 'Black-Pink',
          size: 'US 10',
          quantity: 2,
          price: 580.00,
          total: 1160.00,
          image: '👟'
        }
      ],
      summary: {
        subtotal: 2320.00,
        delivery: 20.00,
        tax: 20.00,
        total: 2360.00,
        itemCount: 4
      },
      courier: 'Express Delivery'
    },
    {
      id: '#83515',
      date: '05-10-2020 02:15 PM',
      status: 'Delivered',
      statusColor: 'bg-blue-100 text-blue-800',
      customer: {
        name: 'Alisa Janin',
        email: 'alisajanin@gmail.com',
        phone: '+33 5 94 84 56 78',
        orderCount: 10,
        shippingAddress: 'Malaysinya Road, Bla bla Sawisyan Oval, 603 Malaysinya...',
        billingAddress: 'Same as shipping address'
      },
      items: [
        {
          id: '#204771',
          name: 'Adidas Ultraboost 22',
          color: 'White-Blue',
          size: 'US 9',
          quantity: 1,
          price: 190.00,
          total: 190.00,
          image: '👟'
        }
      ],
      summary: {
        subtotal: 190.00,
        delivery: 15.00,
        tax: 15.00,
        total: 220.00,
        itemCount: 1
      },
      courier: 'Standard Delivery'
    }
  ]);

  const handleOrderClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setActivePage("order-detail");
  };

  const handleBackToOrders = () => {
    setSelectedOrderId(null);
    setActivePage("orders");
  };

  const renderContent = () => {
    switch (activePage) {
      case "orders":
        return <OrdersPage orders={orders} onOrderClick={handleOrderClick} />;
      case "order-detail":
        return (
          <OrderDetailPage
            order={orders.find((o) => o.id === selectedOrderId) as Order}
            onBack={handleBackToOrders}
          />
        );
      default:
        return null;
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderContent()}</div>;
}