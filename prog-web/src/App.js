import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import AdminHome from './Components/AdminPanel';
import Hero from './Components/Hero';
import Dashboard from './Components/Dashboard';
import ElectionDetails from './Components/ElectionDetails';
import VotingPage from './Components/VotingPage';
import ProfilePage from './Components/ProfilePage';
import ConfirmationPage from './Components/ConfirmationPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin-home' element={<AdminHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/election/:id" element={<ElectionDetails />} />
        <Route path="/vote/:id" element={<VotingPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
