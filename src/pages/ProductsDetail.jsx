import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react"
import customRadiator from "../assets/removebg.png"
import { useCart } from "../contexts/CartContext"


function ProductsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart()


    const products = [
        {
            id: 1,
            title: "ALUMINUM RADIATOR",
            price: "$199",
            image: customRadiator,
            description: "High-performance aluminum radiator with superior cooling efficiency. Perfect for daily driving and moderate performance applications.",
            specifications: [
                "Material: Aluminum",
                "Core Thickness: 40mm",
                "Rows: 2",
                "Weight: 5kg",
                "Compatibility: Universal fit with modifications"
            ]
        },
        {
            id: 2,
            title: "COOPER RADIATOR",
            price: "$249",
            image: customRadiator,
            description: "Premium copper radiator offering excellent heat dissipation. Ideal for classic cars and restoration projects.",
            specifications: [
                "Material: Copper/Brass",
                "Core Thickness: 52mm",
                "Rows: 3",
                "Weight: 8kg",
                "Compatibility: Classic vehicles"
            ]
        },
        {
            id: 3,
            title: "PERFORMANCE RADIATOR",
            price: "$299",
            image: customRadiator,
            description: "Race-spec performance radiator designed for high-powered engines. Maximum cooling capacity for track and competition use.",
            specifications: [
                "Material: Aluminum alloy",
                "Core Thickness: 56mm",
                "Rows: 3",
                "Weight: 6kg",
                "Compatibility: Performance vehicles"
            ]
        },
        {
            id: 4,
            title: "CUSTOM RADIATOR",
            price: "$349",
            image: customRadiator,
            description: "Fully customizable radiator built to your exact specifications. Perfect for unique builds and special applications.",
            specifications: [
                "Material: Your choice",
                "Core Thickness: Custom",
                "Rows: Custom",
                "Weight: Varies",
                "Compatibility: Built to order"
            ]
        },
    ];

    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <div className="min-h-screen">
                <div className="container mx-auto px-4 py-12 text-center">
                    <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                    <div onClick={() => navigate("/products")}>
                        Back to Products
                    </div>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!addToCart) return;

        // Convert price string like "$199" to number 199
        const rawPrice = String(product.price || "0");
        const numericPrice = Number(rawPrice.replace(/[^0-9.-]+/g, "")) || 0;

        addToCart({
            id: product.id,
            title: product.title,
            price: numericPrice,
            image: product.image,
        });
    };

    return (
        <>
            <div className="min-h-screen bg-matt">

                <div className="container mx-auto px-4 py-12 text-white ">
                    <button
                        variant="ghost"
                        onClick={() => navigate("/products")}
                        className="mb-8 flex hover:bg-red-500 rounded-md p-2 duration-300 cursor-pointer"
                    >
                        <ArrowLeft className="mr-2 mt-1 h-4 w-4 " />
                        Back to Products
                    </button>

                    <div className="grid md:grid-cols-2 gap-12 mt-20">
                        {/* Product Image */}
                        <div className="bg-light-matt rounded-lg p-20 flex items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-auto object-contain max-h-[500px] drop-shadow-2xl drop-shadow-black"
                            />
                        </div>

                        {/* Product Details */}
                        <div>
                            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                            <p className="text-5xl font-bold text-primary mb-6">
                                {product.price}
                            </p>
                            <p className="text-lg mb-8 text-gray-500">
                                {product.description}
                            </p>

                            <div
                                size="lg"
                                onClick={handleAddToCart}
                                className="w-fit  mb-12 flex text-white bg-red-500 p-2 rounded-md cursor-pointer"
                            >
                                <ShoppingCart className="mr-2 h-5 w-5 " />
                                ADD TO CART
                            </div>

                            {/* Specifications */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">SPECIFICATIONS</h2>
                                <ul className="space-y-2">
                                    {product.specifications.map((spec, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-gray-500"
                                        >
                                            <span className="mr-2 text-red-500">•</span>
                                            {spec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductsDetail