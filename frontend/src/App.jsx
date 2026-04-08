import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from './screens/RegisterScreen.jsx';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}