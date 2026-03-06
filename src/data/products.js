export const initialProducts = [
    {
        id: 1,
        name: "Mochila Urbana Premium",
        description: "Mochila resistente al agua con compartimiento para laptop de hasta 15.6 pulgadas. Diseño ergonómico con múltiples bolsillos.",
        price: 189900,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"
    },
    {
        id: 2,
        name: "Reloj Inteligente Sport",
        description: "Smartwatch con monitor cardíaco, GPS integrado, resistente al agua 50m. Batería de larga duración hasta 7 días.",
        price: 459900,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    },
    {
        id: 3,
        name: "Botella Térmica Eco",
        description: "Botella de acero inoxidable de 750ml. Mantiene bebidas frías 24h y calientes 12h. Libre de BPA.",
        price: 79900,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop"
    },
    {
        id: 4,
        name: "Auriculares Bluetooth Pro",
        description: "Auriculares inalámbricos con cancelación de ruido activa, 30h de batería, conexión multipunto y micrófono HD.",
        price: 349900,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
    },
    {
        id: 5,
        name: "Cargador Solar Portátil",
        description: "Panel solar plegable de 20W con doble puerto USB. Ideal para camping y viajes. Compatible con todos los dispositivos.",
        price: 129900,
        image: "https://images.unsplash.com/photo-1594549181132-9045fed330ce?w=400&h=400&fit=crop"
    },
    {
        id: 6,
        name: "Teclado Mecánico RGB",
        description: "Teclado mecánico con switches cherry, retroiluminación RGB personalizable, marco de aluminio y reposamuñecas.",
        price: 279900,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop"
    },
    {
        id: 7,
        name: "Lámpara LED Escritorio",
        description: "Lámpara de escritorio con 5 modos de iluminación, carga inalámbrica integrada y temporizador automático.",
        price: 159900,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop"
    },
    {
        id: 8,
        name: "Cámara Instantánea Mini",
        description: "Cámara compacta con impresión instantánea, flash automático, modo selfie y 10 filtros creativos integrados.",
        price: 239900,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop"
    }
];

// Generate sample sales data
export function generateSalesData() {
    const sales = [];
    const today = new Date();

    // Generate 365 days of sales data
    for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        const dayOfWeek = date.getDay();
        const baseAmount = dayOfWeek === 0 || dayOfWeek === 6 ? 800000 : 500000;
        const variation = Math.random() * 600000;
        const seasonalBonus = (date.getMonth() === 11 || date.getMonth() === 0) ? 400000 : 0;

        sales.push({
            date: date.toISOString().split('T')[0],
            amount: Math.round(baseAmount + variation + seasonalBonus),
            orders: Math.floor(3 + Math.random() * 15)
        });
    }

    return sales;
}

export function formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}
