import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../data/products';

export default function CartDrawer() {
    const { cart, isOpen, setIsOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleCheckout = () => {
        setIsOpen(false);
        navigate('/checkout');
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/40 z-50 transition-opacity"
                onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl slide-in-right flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-gray-700" />
                        <h2 className="text-lg font-semibold text-gray-900">Carrito</h2>
                        <span className="text-sm text-gray-500">({totalItems} items)</span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <ShoppingBag className="w-16 h-16 mb-3 stroke-1" />
                            <p className="text-lg font-medium">Tu carrito está vacío</p>
                            <p className="text-sm mt-1">Agrega productos desde el catálogo</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                                    <p className="text-sm font-semibold text-blue-600 mt-0.5">
                                        {formatCurrency(item.price)}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="ml-auto p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-4 border-t border-gray-100 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total</span>
                            <span className="text-xl font-bold text-gray-900">{formatCurrency(totalPrice)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                        >
                            Ir al Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
