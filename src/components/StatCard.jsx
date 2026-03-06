import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../data/products';

export default function StatCard({ title, value, previousValue, icon: Icon }) {
    const isPositive = value >= previousValue;
    const diff = previousValue > 0
        ? (((value - previousValue) / previousValue) * 100).toFixed(1)
        : 0;

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 fade-in">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">{title}</span>
                {Icon && <Icon className="w-5 h-5 text-gray-400" />}
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(value)}</p>
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'
                }`}>
                {isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                ) : (
                    <TrendingDown className="w-4 h-4" />
                )}
                <span>{isPositive ? '+' : ''}{diff}%</span>
                <span className="text-gray-400 font-normal ml-1">vs período anterior</span>
            </div>
        </div>
    );
}
