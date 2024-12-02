import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/login/loginUser';
import RegisterComponent from './components/register/registerUser';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<RegisterComponent/>} />
      </Routes>
    </Router>
  );
}

export default App;
