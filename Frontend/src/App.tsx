import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Survey from './pages/user/Survey';
import SurveyForm from './pages/user/SurveyForm';
import SurveySubmissions from './pages/user/SurveySubmissions';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import { Toaster } from 'react-hot-toast';
import { AdminProtectedRoute, ProtectedRoute } from './routes/ProductedRoutes';
import { AdminPublicRoute, PublicRoute } from './routes/PublicRoutes';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path={ROUTES.USER.HOME} element={<Survey />} />
        <Route path={ROUTES.USER.REGISTER} element={<PublicRoute><Register /></PublicRoute>} />
        <Route path={ROUTES.USER.LOGIN} element={<PublicRoute><Login /></PublicRoute>} />
        <Route path={ROUTES.ADMIN.LOGIN} element={<AdminPublicRoute><AdminLogin /></AdminPublicRoute>} />
        <Route path={ROUTES.USER.SURVEY_FORM} element={<ProtectedRoute><SurveyForm /></ProtectedRoute>} />
        <Route path={ROUTES.USER.SURVEY_SUBMISSIONS} element={<ProtectedRoute><SurveySubmissions /></ProtectedRoute>} />
        <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App;