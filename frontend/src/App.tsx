import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Login from './components/Auth/Login';
import NotFound from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import { FavoriteProvider } from './context/FavoriteContext';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';

/*--- Wrapper pour accéder à useLocation() ---*/
function AppLayout() {
  const { pathname } = useLocation();

  // routes sans Header/Footer
  const noLayoutRoutes = ['/login', '/register'];
  const hideLayout = noLayoutRoutes.includes(pathname);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Header />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />


          <Route path="/orders" element={<Orders />} />         {/* Liste des commandes */}
          <Route path="/favorites" element={<Favorites />} />         {/* Produits favoris */}
          <Route path="/settings" element={<Settings />} />         {/* Paramètres du compte */}

          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail onBack={() => navigate(-1)} />} />
          
          {/* Validation du panier / paiement */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Authentification */}
          <Route path="/login" element={<Login />} />

          {/* 404 – doit toujours être en dernier */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoriteProvider>
          <Router>
            <AppLayout />
          </Router>
        </FavoriteProvider>
      </CartProvider>
    </AuthProvider>
  );
}
