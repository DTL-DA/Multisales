import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, BarChart3, LayoutGrid, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const { totalItems, setIsOpen } = useCart();
    const location = useLocation();

    return (
        <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo + Stats */}
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center">
                                <Home className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">MultiSales</span>
                        </Link>
                        <Link
                            to="/estadisticas"
                            className={`p-2 rounded-lg transition-colors ${location.pathname === '/estadisticas'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                }`}
                            title="Estadísticas"
                        >
                            <BarChart3 className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        <Link
                            to="/admin"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/admin'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                            <span className="hidden sm:inline">Admin</span>
                        </Link>

                        <button
                            onClick={() => setIsOpen(true)}
                            className="relative p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
