import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './AuthContext';
import RootLayout from './components/RootLayout';
import PwaStatus from './components/PwaStatus';
const Offline = lazy(() => import('./pages/Offline'));

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const ItemsList = lazy(() => import('./pages/ItemsList'));
const ItemDetails = lazy(() => import('./pages/ItemDetails'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst',
      retry: 1,
    },
  },
});


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <PwaStatus />
            <Suspense fallback={<div className="container">Загрузка...</div>}>
              <Routes>
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <RootLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="items" element={<ItemsList />} />
                  <Route path="items/:k" element={<ItemDetails />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/offline" element={<Offline />} />
                </Route>
              </Routes>
            </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}