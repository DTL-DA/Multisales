import { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, generateSalesData } from '../data/products';

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('multisales_products');
        return saved ? JSON.parse(saved) : initialProducts;
    });

    const [salesData, setSalesData] = useState(() => {
        const saved = localStorage.getItem('multisales_sales');
        return saved ? JSON.parse(saved) : generateSalesData();
    });

    useEffect(() => {
        localStorage.setItem('multisales_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('multisales_sales', JSON.stringify(salesData));
    }, [salesData]);

    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: Date.now()
        };
        setProducts(prev => [...prev, newProduct]);
    };

    const updateProduct = (id, updatedProduct) => {
        setProducts(prev =>
            prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
        );
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const deleteMultipleProducts = (ids) => {
        setProducts(prev => prev.filter(p => !ids.includes(p.id)));
    };

    const addSale = (amount, orders = 1) => {
        const today = new Date().toISOString().split('T')[0];
        setSalesData(prev => {
            const existing = prev.find(s => s.date === today);
            if (existing) {
                return prev.map(s =>
                    s.date === today
                        ? { ...s, amount: s.amount + amount, orders: s.orders + orders }
                        : s
                );
            }
            return [...prev, { date: today, amount, orders }];
        });
    };

    return (
        <ProductContext.Provider value={{
            products, salesData,
            addProduct, updateProduct, deleteProduct, deleteMultipleProducts,
            addSale
        }}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProducts = () => useContext(ProductContext);
