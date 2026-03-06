import { useState, useMemo } from 'react';
import { Search, ShoppingCart, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

export default function Catalog() {
    const { products } = useProducts();
    const { addMultipleToCart, setIsOpen } = useCart();
    const [search, setSearch] = useState('');
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [showAdded, setShowAdded] = useState(false);

    const filtered = useMemo(() => {
        if (!search.trim()) return products;
        const q = search.toLowerCase();
        return products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
    }, [products, search]);

    const toggleSelect = (id) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleAddSelected = () => {
        const selectedProducts = products.filter(p => selectedIds.has(p.id));
        if (selectedProducts.length === 0) return;
        addMultipleToCart(selectedProducts);
        setSelectedIds(new Set());
        setShowAdded(true);
        setTimeout(() => setShowAdded(false), 2000);
    };

    return (
        <div className="fade-in">
            {/* Hero */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Nuestros Productos
                    </h1>
                    <p className="text-gray-500 text-lg mb-8">
                        Descubre nuestra selección curada de productos de alta calidad
                    </p>

                    {/* Search */}
                    <div className="relative max-w-lg mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {filtered.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-xl font-medium">No se encontraron productos</p>
                        <p className="text-sm mt-2">Intenta con otra búsqueda</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isSelected={selectedIds.has(product.id)}
                                onToggleSelect={toggleSelect}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Floating Add to Cart Button */}
            {selectedIds.size > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 fade-in">
                    <button
                        onClick={handleAddSelected}
                        className="flex items-center gap-3 px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-2xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-105"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Agregar {selectedIds.size} producto{selectedIds.size > 1 ? 's' : ''} al carrito
                    </button>
                </div>
            )}

            {/* Toast */}
            {showAdded && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-lg fade-in">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">¡Productos agregados!</span>
                    <button onClick={() => setIsOpen(true)} className="ml-2 underline text-sm">
                        Ver carrito
                    </button>
                </div>
            )}
        </div>
    );
}
