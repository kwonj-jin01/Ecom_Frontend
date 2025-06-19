import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
// import Register from './pages/Register';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import { FavoriteProvider } from './context/FavoriteContext';

// import { useEffect } from 'react';

// export default function App() {
//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/api/test')
//       .then(res => res.json())
//       .then(data => console.log('✅ Réponse API :', data))
//       .catch(err => console.error('❌ Erreur CORS/API :', err));
//   }, []);


//   return <h1>Test API Laravel depuis React</h1>;
// }



/*--- Wrapper pour accéder à useLocation() ---*/
function AppLayout() {
  const { pathname } = useLocation();

  // routes sans Header/Footer
  const noLayoutRoutes = ['/login', '/register'];
  const hideLayout = noLayoutRoutes.includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Header />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/register" element={<Register />} /> */}
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
