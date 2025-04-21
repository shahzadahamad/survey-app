import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Survey from '../pages/User/Survey';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/sign-up' element={<Survey />} />
      </Routes>
    </Router>
  )
}

export default App
