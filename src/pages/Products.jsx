import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";

import customRadiator from "../assets/customrd-no-bg.png"
import { FaChevronDown } from "react-icons/fa";
import { RiResetRightFill } from "react-icons/ri";

function Products() {
    const navigate = useNavigate()
    const [filters, setFilters] = useState({
        brand: "",
        material: "",
        price: "",
    });

    const products = [
        {
            id: 1,
            title: "ALUMINUM Honda RADIATOR",
            price: 3000,
            priceDisplay: "3000 THB",
            brand: "honda",
            material: "aluminum",
            image: customRadiator,
        },
        {
            id: 2,
            title: "COOPER Toyota RADIATOR",
            price: 4000,
            priceDisplay: "4000 THB",
            brand: "toyota",
            material: "copper",
            image: customRadiator,
        },
        {
            id: 3,
            title: "CUSTOM Nissan RADIATOR",
            price: 3500,
            priceDisplay: "3500 THB",
            brand: "nissan",
            material: "aluminum",
            image: customRadiator,
        },
        {
            id: 4,
            title: "CUSTOM Mazda RADIATOR",
            price: 3200,
            priceDisplay: "3200 THB",
            brand: "mazda",
            material: "brass",
            image: customRadiator,
        },
    ];

    // Filter logic
    const filteredProducts = products.filter((product) => {
        // Brand filter
        if (filters.brand && product.brand !== filters.brand) return false;

        // Material filter
        if (filters.material && product.material !== filters.material) return false;

        // Price filter
        if (filters.price) {
            if (filters.price === "0-2000" && product.price > 2000) return false;
            if (filters.price === "2000-3000" && (product.price < 2000 || product.price > 3000)) return false;
            if (filters.price === "3000+" && product.price < 3000) return false;
        }

        return true;
    });

    const handleViewDetails = (productId) => {
        navigate(`/products/${productId}`)
    }

    return (
        <>
            <div className="min-h-screen bg-matt">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-20 pt-12">
                        PRODUCTS
                    </h1>

                    {/* Filter */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <aside className="lg:w-64 flex-shrink-0">
                            <div className="bg-light-matt border-white rounded-lg p-6 sticky top-4">
                                <h2 className="text-white text-xl font-bold mb-6">FILTER BY</h2>

                                <div className="space-y-6">
                                    {/* Brand Filter */}
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">Brand</label>
                                        <div className="relative">
                                            <select
                                                className="w-full text-white bg-matt border border-border rounded-md px-4 py-3 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                                                value={filters.brand}
                                                onChange={(e) =>
                                                    setFilters({ ...filters, brand: e.target.value })
                                                }
                                            >
                                                <option value="">All</option>
                                                <option value="honda">Honda</option>
                                                <option value="toyota">Toyota</option>
                                                <option value="nissan">Nissan</option>
                                                <option value="mazda">Mazda</option>
                                                <option value="isuzu">Isuzu</option>
                                            </select>
                                            <FaChevronDown className="absolute text-white right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Material Filter */}
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">Material</label>
                                        <div className="relative">
                                            <select
                                                className="w-full text-white bg-matt border border-border rounded-md px-4 py-3  appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                                                value={filters.material}
                                                onChange={(e) =>
                                                    setFilters({ ...filters, material: e.target.value })
                                                }
                                            >
                                                <option value="">All</option>
                                                <option value="aluminum">Aluminum</option>
                                                <option value="copper">Copper</option>
                                                <option value="brass">Brass</option>
                                            </select>
                                            <FaChevronDown className="absolute text-white right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Price Filter */}
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">Pricing</label>
                                        <div className="relative">
                                            <select
                                                className="w-full text-white bg-matt border border-border rounded-md px-4 py-3  appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                                                value={filters.price}
                                                onChange={(e) =>
                                                    setFilters({ ...filters, price: e.target.value })
                                                }
                                            >
                                                <option value="">All</option>
                                                <option value="0-2000">0 - 2000 THB</option>
                                                <option value="2000-3000">2000 - 3000 THB</option>
                                                <option value="3000+">3000+ THB</option>
                                            </select>
                                            <FaChevronDown className="absolute text-white right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        </div>
                                        <div className="text-white mt-4 text-center cursor-pointer underline"
                                            onClick={(e) => {
                                                setFilters({
                                                    carModel: "",
                                                    material: "",
                                                    size: "",
                                                    price: "",
                                                })
                                            }}
                                        >
                                            Reset
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Products Grid */}
                        <div className="flex-1">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            title={product.title}
                                            price={product.priceDisplay}
                                            image={product.image}
                                            onViewDetails={() => handleViewDetails(product.id)}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center text-white text-lg py-12">
                                        No products found with the selected filters
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Products