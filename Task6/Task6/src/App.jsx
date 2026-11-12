import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./AuthContext.jsx";
import Login from "./Login";
import Profile from "./Profile";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const NavBar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="nav">
      {user ? (
        <>
          <Link to="/profile">Профиль</Link>
          <button onClick={logout} style={{ width: 'auto', padding: '0.5rem 1rem' }}>Выйти</button>
        </>
      ) : (
        <Link to="/login">Войти</Link>
      )}
    </nav>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="container">
            <NavBar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}