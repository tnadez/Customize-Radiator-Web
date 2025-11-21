
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import './App.css'
import Navbar from "./components/Navbar"
import { CartProvider } from './contexts/CartContext'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import CustomDesign from './pages/CustomDesign.jsx'
import ProductsDetail from './pages/ProductsDetail.jsx'
import Contact from './pages/Contact.jsx'
import Checkout from './pages/Checkout.jsx'
import Success from './pages/Success.jsx'
import Cancel from './pages/Cancel.jsx'
// import { Hero } from './components/Hero'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductsDetail />} />
          <Route path="/custom-design" element={<CustomDesign />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </CartProvider>
    </Router>
  )
}

export default App
