import React, { useState } from 'react';

// Simulation de l'API (remplacez par votre vraie API)
const mockAPI = {
  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation latence
    if (credentials.email === 'test@example.com' && credentials.password === 'password') {
      return {
        data: {
          user: { id: 1, name: 'Test User', email: 'test@example.com' },
          token: 'fake-jwt-token-12345'
        }
      };
    }
    throw new Error('Invalid credentials');
  },
  
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      data: {
        user: { id: 2, name: userData.name, email: userData.email },
        token: 'fake-jwt-token-67890'
      }
    };
  },
  
  getUser: async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('No token');
    return {
      data: { id: 1, name: 'Test User', email: 'test@example.com' }
    };
  }
};

// Contexte d'authentification
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await mockAPI.getUser();
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('auth_token');
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await mockAPI.login(credentials);
      const { user, token } = response.data;
      
      localStorage.setItem('auth_token', token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await mockAPI.register(userData);
      const { user, token } = response.data;
      
      localStorage.setItem('auth_token', token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Composant de navigation simple
const SimpleRouter = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#home');

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#home');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  return React.cloneElement(children, { currentPath, navigate });
};

// Composant de lien de navigation
const NavLink = ({ to, children, className = "" }) => {
  return (
    <a 
      href={`#${to}`} 
      className={`${className} cursor-pointer`}
      onClick={(e) => {
        e.preventDefault();
        window.location.hash = to;
      }}
    >
      {children}
    </a>
  );
};

// Composant de connexion
const Login = ({ navigate }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(formData);
    
    if (result.success) {
      navigate('dashboard');
    } else {
      setError(result.error);
    }
  };

  const handleGoogleLogin = () => {
    alert('Redirection vers Google OAuth...\nEn production, cela redirigerait vers: http://localhost:8000/api/auth/google');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Utilisez : test@example.com / password
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              type="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input
              type="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuer avec Google
            </button>
          </div>

          <div className="text-center">
            <NavLink to="register" className="text-indigo-600 hover:text-indigo-500">
              Pas encore de compte ? S'inscrire
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

// Composant d'inscription
const Register = ({ navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const { register, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.password_confirmation) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    const result = await register(formData);
    
    if (result.success) {
      navigate('dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créer un compte
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <input
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nom complet"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input
              type="email"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input
              type="password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <input
              type="password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Confirmer le mot de passe"
              value={formData.password_confirmation}
              onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Inscription...' : "S'inscrire"}
            </button>
          </div>

          <div className="text-center">
            <NavLink to="login" className="text-indigo-600 hover:text-indigo-500">
              Déjà un compte ? Se connecter
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

// Composant Dashboard
const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.hash = 'home';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Bonjour, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bienvenue sur votre Dashboard !
              </h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Informations utilisateur
                </h3>
                <div className="space-y-2">
                  <p><strong>ID:</strong> {user?.id}</p>
                  <p><strong>Nom:</strong> {user?.name}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Token:</strong> {localStorage.getItem('auth_token')?.substring(0, 20)}...</p>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Authentification</h3>
                  <p className="text-blue-600">✅ Connecté avec succès</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800">Token</h3>
                  <p className="text-green-600">✅ Token valide</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800">Session</h3>
                  <p className="text-purple-600">✅ Session active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page d'accueil
const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Application de Test
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Démonstration d'authentification avec React et Laravel
          </p>
          
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            {user ? (
              <NavLink
                to="dashboard"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Aller au Dashboard
              </NavLink>
            ) : (
              <div className="space-y-3 sm:space-y-0 sm:space-x-3 sm:flex">
                <NavLink
                  to="login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Se connecter
                </NavLink>
                <NavLink
                  to="register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  S'inscrire
                </NavLink>
              </div>
            )}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                🔐 Authentification Classique
              </h3>
              <p className="text-gray-600">
                Inscription et connexion avec email/mot de passe
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Test: test@example.com / password
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                🔗 OAuth Google
              </h3>
              <p className="text-gray-600">
                Connexion rapide avec votre compte Google
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Simulation de redirection OAuth
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Route Guard pour les pages protégées
const ProtectedRoute = ({ children, currentPath, navigate }) => {
  const { user } = useAuth();

  React.useEffect(() => {
    if (!user && currentPath === '#dashboard') {
      navigate('login');
    }
  }, [user, currentPath, navigate]);

  if (!user && currentPath === '#dashboard') {
    return null;
  }

  return children;
};

// Application principale avec routage simple
const App = () => {
  return (
    <AuthProvider>
      <SimpleRouter>
        <AppRouter />
      </SimpleRouter>
    </AuthProvider>
  );
};

// Composant de routage principal
const AppRouter = ({ currentPath, navigate }) => {
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '#login':
        return <Login navigate={navigate} />;
      case '#register':
        return <Register navigate={navigate} />;
      case '#dashboard':
        return (
          <ProtectedRoute currentPath={currentPath} navigate={navigate}>
            <Dashboard />
          </ProtectedRoute>
        );
      default:
        return <Home />;
    }
  };

  return <div className="App">{renderCurrentPage()}</div>;
};

export default App;