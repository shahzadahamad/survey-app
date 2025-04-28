import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Survey from './pages/user/Survey';
import SurveyForm from './pages/user/SurveyForm';
import SurveySubmissions from './pages/user/SurveySubmissions';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import { Toaster } from 'react-hot-toast';
import { AdminProtectedRoute, ProtectedRoute } from './components/productedRoutes.ts/ProductedRoutes';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Survey />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/survey-form" element={<ProtectedRoute><SurveyForm /></ProtectedRoute>} />
        <Route path="/survey-submissions" element={<ProtectedRoute><SurveySubmissions /></ProtectedRoute>} />

        <Route path="/admin/dashboard" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App;