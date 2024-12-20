import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/login/loginUser';
import RegisterComponent from './components/register/registerUser';
import Home from './components/home/homeComponent';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<RegisterComponent/>} />
      <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
