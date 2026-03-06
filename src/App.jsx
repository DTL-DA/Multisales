import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Layout from './components/Layout';
import Catalog from './pages/Catalog';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Statistics from './pages/Statistics';

export default function App() {
    return (
        <BrowserRouter>
            <ProductProvider>
                <CartProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Catalog />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/estadisticas" element={<Statistics />} />
                        </Route>
                    </Routes>
                </CartProvider>
            </ProductProvider>
        </BrowserRouter>
    );
}
