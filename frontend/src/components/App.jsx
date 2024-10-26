import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import OldDashboard from './OldDashboard';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import ForgotPassword from './ForgetPassword';
import NotFound from './PageNotFound';

const PrivateRoute = ({ element }) => {
  const userEmail = localStorage.getItem("userEmail");
  return userEmail ? element : <Navigate to="/login" />;
};

const App = () => {
  const userEmail = localStorage.getItem("userEmail");

  return (
    <div style={{ marginTop: '-3.5rem' }}>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={userEmail ? <Navigate to="/dashboard" /> : <LandingPage />} 
          />
          <Route 
            path="/register" 
            element={userEmail ? <Navigate to="/dashboard" /> : <Register />} 
          />
          <Route 
            path="/login" 
            element={userEmail ? <Navigate to="/dashboard" /> : <Login />} 
          />
          <Route 
            path="/old-dashboard" 
            element={userEmail ? <Navigate to="/dashboard" /> : <OldDashboard />} 
          />
          <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} />
          <Route 
            path="/forgot-password" 
            element={userEmail ? <Navigate to="/dashboard" /> : <ForgotPassword />} 
          />
          <Route path="404" element={<NotFound />} /> 
          <Route path="*" element={<Navigate to={userEmail ? "/dashboard" : "/404"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;