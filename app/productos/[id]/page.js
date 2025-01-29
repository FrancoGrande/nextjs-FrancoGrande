"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProducts } from "../../context/listaProductos";

const ProductPage = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const allProducts = await fetchProducts();
                const selectedProduct = allProducts.find((p) => p.id === id);
                setProduct(selectedProduct);
            } catch (error) {
                console.error("Error cargando producto:", error);
            }
        };

        if (id) getProduct();
    }, [id]);

    if (!product) {
        return <p className="text-center">Cargando producto...</p>;
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-4">
            <div className="md:w-1/2 p-4">
                <img
                    src={product.img}
                    alt={product.title}
                    className="size-fit object-cover rounded-xl"
                />
            </div>
            <div className="md:w-1/2 p-4">
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="text-black">{product.description}</p>
                    <p className="text-xl font-bold">${product.price}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;