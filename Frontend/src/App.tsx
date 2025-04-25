import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Survey from './pages/user/Survey';
import SurveyForm from './pages/user/SurveyForm';
import SurveySubmissions from './pages/user/SurveySubmissions';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Survey />} />
        <Route path='/survey-form' element={<SurveyForm />} />
        <Route path='/survey-submissions' element={<SurveySubmissions />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App;