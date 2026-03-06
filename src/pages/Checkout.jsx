import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../data/products';
import { CheckCircle, ArrowLeft, Package } from 'lucide-react';

export default function Checkout() {
    const { cart, totalPrice, clearCart } = useCart();
    const { addSale } = useProducts();
    const navigate = useNavigate();
    const [confirmed, setConfirmed] = useState(false);

    const handleConfirm = () => {
        addSale(totalPrice, cart.length);
        setConfirmed(true);
        setTimeout(() => {
            clearCart();
        }, 500);
    };

    if (confirmed) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center fade-in">
                <div className="text-center p-8">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">¡Compra Confirmada!</h1>
                    <p className="text-gray-500 text-lg mb-8">
                        Tu pedido ha sido procesado exitosamente
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Volver al catálogo
                    </button>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center fade-in">
                <div className="text-center p-8">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Tu carrito está vacío</h2>
                    <p className="text-gray-400 mb-6">Agrega productos antes de hacer checkout</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Ver productos
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 fade-in">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Volver al catálogo</span>
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-6">Resumen del Pedido</h1>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-50">
                    {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-xl"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                                <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-gray-900 whitespace-nowrap">
                                {formatCurrency(item.price * item.quantity)}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 p-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Subtotal</span>
                        <span>{formatCurrency(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Envío</span>
                        <span className="text-emerald-600">Gratis</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-lg font-bold text-blue-600">{formatCurrency(totalPrice)}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={handleConfirm}
                className="w-full mt-6 py-4 bg-blue-600 text-white font-semibold text-lg rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
                Confirmar Compra
            </button>
        </div>
    );
}
