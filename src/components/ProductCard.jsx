import React from "react";
import { useCart } from "../contexts/CartContext";

// interface ProductCardProps {
//     title: string;
//     price: string;
//     image: string;
//     onViewDetails: () => void;
// }

const ProductCard = ({ title, price, image, onViewDetails, id }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        // prevent card click (view details)
        e.stopPropagation();
        addToCart({ id: id || Date.now(), title, price, image });
    };

    return (
        <div className="cursor-pointer rounded-md bg-light-matt border-2 border-white hover:border-red-600 overflow-hidden group transition-all duration-300"
            onClick={onViewDetails}>
            <div className="aspect-square bg-matt flex items-center justify-center p-8 overflow-hidden">

                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl drop-shadow-black"
                />
            </div>
            <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2 h-18 text-white">{title}</h3>
                <p className="text-3xl font-bold mb-4 text-red-500">{price}</p>
                <div className="flex gap-3">
                    <div
                        // variant="outline"
                        // size="lg"
                        onClick={onViewDetails}
                        className="flex-1 text-center hover:scale-105 text-white rounded-md duration-200 bg-red-500 p-2 cursor-pointer"
                    >
                        VIEW DETAILS
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-black/60 hover:scale-105 text-white rounded-md px-4 py-2 border border-red-500"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;