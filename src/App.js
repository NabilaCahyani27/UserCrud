import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Data from './pages';
import FormData from './pages/Form';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/data" element={<Data />} />
      <Route exact path="/edit/:id" element={<FormData />} />
    </Routes>
</BrowserRouter>
  );
}

export default App;
