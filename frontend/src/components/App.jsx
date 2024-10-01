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
  return userEmail ? element : <Navigate to="/404" />;
};

function App() {
  return (
    <div style={{ marginTop: '-3.5rem' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/old-dashboard" element={<OldDashboard />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="404" element={<NotFound />} /> {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for undefined paths */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
