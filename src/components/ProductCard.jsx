import { formatCurrency } from '../data/products';

export default function ProductCard({ product, isSelected, onToggleSelect }) {
    return (
        <div className={`bg-white rounded-2xl overflow-hidden shadow-sm border-2 transition-all duration-200 hover:shadow-md ${isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-transparent'
            }`}>
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                />
                <button
                    onClick={() => onToggleSelect(product.id)}
                    className={`absolute top-3 left-3 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${isSelected
                            ? 'bg-blue-600 border-blue-600'
                            : 'bg-white/80 border-gray-300 hover:border-blue-400 backdrop-blur-sm'
                        }`}
                >
                    {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-base">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-3">{formatCurrency(product.price)}</p>
            </div>
        </div>
    );
}
