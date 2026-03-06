import Navbar from './Navbar';
import CartDrawer from './CartDrawer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <CartDrawer />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
