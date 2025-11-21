import React from "react";
import { Link } from "react-router-dom";
import { Flame, Settings, CheckCircle2 } from "lucide-react";

import heroRadiator from "../assets/removebg.png"
import customRadiator from "../assets/removebg.png"

function Home() {

    return (
        <>
            {/* Hero */}
            <section className="px-8 md:px-20 py-28 pt-16 flex flex-col md:flex-row items-center gap-10 bg-matt">
                <div className="md:w-1/2" >
                    <h1 className="text-4xl md:text-8xl font-extrabold leading-tight text-white">
                        CAR RADIATOR
                        <div className="text-gray-400 text-4xl mt-2">DESIGN SYSTEM</div>
                    </h1>
                    <p className="mt-6 text-gray-300 max-w-4xl">
                        Custom your car radiator for best car performance
                    </p>
                    <div className="mt-6 flex gap-4">
                        <Link to="/products" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold text-white">
                            View Products
                        </Link>
                        <Link to="/custom-design" className="border border-gray-700 px-6 py-3 rounded-lg hover:border-red-500 text-white">
                            Custom Design
                        </Link>
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <img src={heroRadiator} alt="radiator" className="w-4/5 rounded-lg shadow-lg" />
                </div>

            </section>

            {/* Product Highlight         */}
            <section className="py-16 md:py-24 bg-light-matt">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                        PRODUCT HIGHLIGHT
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-secondary/50 aspect-square rounded-lg mb-4 p-8 flex items-center justify-center">
                                <img
                                    src={customRadiator}
                                    alt="Aluminum Radiator"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-white">ALUMINUM RADIATOR</h3>
                        </div>
                        <div className="text-center">
                            <div className="bg-secondary/50 aspect-square rounded-lg mb-4 p-8 flex items-center justify-center">
                                <img
                                    src={customRadiator}
                                    alt="Cooper Radiator"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-white">COOPER RADIATOR</h3>
                        </div>
                        <div className="text-center">
                            <div className="bg-secondary/50 aspect-square rounded-lg mb-4 p-8 flex items-center justify-center">
                                <img
                                    src={customRadiator}
                                    alt="High Performance Radiator"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-white">
                                HIGH PERFORMANCE
                                <br />
                                RADIATOR
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-secondary/30 bg-matt">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 bg-red-500">
                                <Flame className="w-8 h-8 text-primary-foreground text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-white">30% BETTER</h3>
                            <p className="text-lg font-bold text-white">HEAT DISSIPATION</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 bg-red-500">
                                <Settings className="w-8 h-8 text-primary-foreground text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-white">CUSTOM DESIGNS</h3>
                            <p className="text-lg font-bold text-white">AVAILABLE</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 bg-red-500">
                                <CheckCircle2 className="w-8 h-8 text-primary-foreground text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-white">QUALITY</h3>
                            <p className="text-lg font-bold text-white">GUARANTEED</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Design CTA */}
            <section className="py-16 md:py-24 bg-light-matt">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl md:text-6xl font-bold mb-12 text-white">
                                CUSTOM DESIGN
                            </h2>
                            <div className="mt-6 flex gap-4">
                                <Link to="/custom-design" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold text-white">
                                    START NOW
                                </Link>
                            </div>
                            {/* <div className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold text-white">START NOW</div> */}
                        </div>
                        <div className="flex justify-center">
                            <img
                                src={customRadiator}
                                alt="Custom Radiator Design"
                                className="w-full max-w-md"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home