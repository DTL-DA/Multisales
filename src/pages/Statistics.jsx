import { useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import StatCard from '../components/StatCard';
import { Calendar, TrendingUp, DollarSign } from 'lucide-react';
import {
    AreaChart, Area, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '../data/products';

export default function Statistics() {
    const { salesData } = useProducts();

    const stats = useMemo(() => {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];

        // Yesterday
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        // Current month / previous month
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        const todaySales = salesData.find(s => s.date === todayStr)?.amount || 0;
        const yesterdaySales = salesData.find(s => s.date === yesterdayStr)?.amount || 0;

        const currentMonthSales = salesData
            .filter(s => {
                const d = new Date(s.date);
                return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
            })
            .reduce((sum, s) => sum + s.amount, 0);

        const prevMonthSales = salesData
            .filter(s => {
                const d = new Date(s.date);
                const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
                return d.getMonth() === prevMonth && d.getFullYear() === prevYear;
            })
            .reduce((sum, s) => sum + s.amount, 0);

        const currentYearSales = salesData
            .filter(s => new Date(s.date).getFullYear() === currentYear)
            .reduce((sum, s) => sum + s.amount, 0);

        const prevYearSales = salesData
            .filter(s => new Date(s.date).getFullYear() === currentYear - 1)
            .reduce((sum, s) => sum + s.amount, 0);

        return {
            todaySales, yesterdaySales,
            currentMonthSales, prevMonthSales,
            currentYearSales, prevYearSales
        };
    }, [salesData]);

    // Chart data: last 30 days
    const dailyChartData = useMemo(() => {
        const last30 = salesData.slice(-30);
        return last30.map(s => ({
            date: new Date(s.date).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }),
            ventas: s.amount,
            pedidos: s.orders
        }));
    }, [salesData]);

    // Chart data: monthly aggregation
    const monthlyChartData = useMemo(() => {
        const monthly = {};
        salesData.forEach(s => {
            const d = new Date(s.date);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            if (!monthly[key]) monthly[key] = { amount: 0, orders: 0 };
            monthly[key].amount += s.amount;
            monthly[key].orders += s.orders;
        });

        return Object.entries(monthly)
            .sort(([a], [b]) => a.localeCompare(b))
            .slice(-12)
            .map(([key, val]) => {
                const [y, m] = key.split('-');
                const monthName = new Date(Number(y), Number(m) - 1).toLocaleDateString('es-CO', { month: 'short', year: '2-digit' });
                return {
                    date: monthName,
                    ventas: val.amount,
                    pedidos: val.orders
                };
            });
    }, [salesData]);

    const customTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return (
            <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
                {payload.map((entry, i) => (
                    <p key={i} className="text-sm" style={{ color: entry.color }}>
                        {entry.name === 'ventas' ? formatCurrency(entry.value) : `${entry.value} pedidos`}
                    </p>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Estadísticas de Ventas</h1>
                <p className="text-gray-500 text-sm mt-1">Análisis del volumen de ventas</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard
                    title="Ventas Hoy"
                    value={stats.todaySales}
                    previousValue={stats.yesterdaySales}
                    icon={DollarSign}
                />
                <StatCard
                    title="Ventas del Mes"
                    value={stats.currentMonthSales}
                    previousValue={stats.prevMonthSales}
                    icon={Calendar}
                />
                <StatCard
                    title="Ventas del Año"
                    value={stats.currentYearSales}
                    previousValue={stats.prevYearSales}
                    icon={TrendingUp}
                />
            </div>

            {/* Area Chart - Daily Sales */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Ventas Diarias</h2>
                <p className="text-sm text-gray-400 mb-6">Últimos 30 días</p>
                <div className="h-72 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dailyChartData}>
                            <defs>
                                <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                            />
                            <Tooltip content={customTooltip} />
                            <Area
                                type="monotone"
                                dataKey="ventas"
                                stroke="#3B82F6"
                                strokeWidth={2.5}
                                fill="url(#colorVentas)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Line Chart - Monthly Sales */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Ventas Mensuales</h2>
                <p className="text-sm text-gray-400 mb-6">Últimos 12 meses</p>
                <div className="h-72 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyChartData}>
                            <defs>
                                <linearGradient id="colorLinea" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                            />
                            <Tooltip content={customTooltip} />
                            <Line
                                type="monotone"
                                dataKey="ventas"
                                stroke="#8B5CF6"
                                strokeWidth={2.5}
                                dot={{ fill: '#8B5CF6', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
