import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function Checkout() {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Redirect to products if cart is empty
    useEffect(() => {
        if (cartItems.length === 0 && !loading) {
            navigate("/products");
        }
    }, [cartItems, navigate, loading]);

    const subtotal = cartItems.reduce(
        (s, it) => s + (Number(String(it.price).replace(/[^0-9.-]+/g, "")) || 0) * it.quantity,
        0
    );

    const tax = subtotal * 0.07; // 7% tax
    const total = subtotal + tax;

    const handleCheckout = async () => {
        setLoading(true);
        setError("");

        try {
            // Call backend to create a Stripe checkout session
            const response = await fetch(
                `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/checkout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        items: cartItems.map((item) => ({
                            // Fields matching your products table
                            id: item.id,
                            name: item.name || item.title || item.label || item.productName || '',
                            price: Number(String(item.price).replace(/[^0-9.-]+/g, "")) || 0,
                            description: item.description || '',
                            brand: item.brand || '',
                            material: item.material || '',
                            quantity: item.quantity || (item.qty || 1),
                            image: item.image || null,
                            specifications: item.specifications || item.specs || [],
                        })),
                        success_url: `${window.location.origin}/success`,
                        cancel_url: `${window.location.origin}/cancel`,
                    })
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create checkout session");
            }

            const data = await response.json();

            // Redirect to Stripe Checkout hosted page
            if (data.url) {
                window.location.href = data.url;
            } else if (data.sessionId) {
                // Fallback: Use Stripe client-side redirect if sessionId is provided
                window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
            } else {
                throw new Error("No checkout URL returned from server");
            }
        } catch (err) {
            console.error("Checkout error:", err);
            setError(err.message || "Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-matt pt-20">
            <div className="container mx-auto px-4 py-12 text-white">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center hover:bg-red-500 rounded-md p-2 duration-300 cursor-pointer"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Cart
                </button>

                <div className="grid md:grid-cols-3 gap-12">
                    {/* Cart Summary */}
                    <div className="md:col-span-2">
                        <h1 className="text-4xl font-bold mb-8">Order Summary</h1>

                        <div className="space-y-4 bg-light-matt rounded-lg p-6 mb-8">
                            {cartItems.map((item) => {
                                const price = Number(String(item.price).replace(/[^0-9.-]+/g, "")) || 0;
                                return (
                                    <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-700 last:border-b-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-24 h-24 object-contain rounded-md bg-white/5 p-2"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold text-lg">{item.title}</div>
                                            <div className="text-sm text-gray-400">
                                                Quantity: {item.quantity}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                Unit Price: {price} THB
                                            </div>
                                        </div>
                                        <div className="text-lg font-bold text-red-400">
                                            {(price * item.quantity).toFixed(2)} THB
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Order Total & Payment */}
                    <div className="bg-light-matt rounded-lg p-6 h-fit sticky top-24">
                        <h2 className="text-2xl font-bold mb-6">Order Total</h2>

                        <div className="space-y-3 mb-6 pb-6 border-b border-gray-700">
                            <div className="flex justify-between text-gray-300">
                                <span>Subtotal</span>
                                <span>{subtotal.toFixed(2)} THB</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                                <span>Tax (7%)</span>
                                <span>{tax.toFixed(2)} THB</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-red-400">
                                <span>Total</span>
                                <span>{total.toFixed(2)} THB</span>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleCheckout}
                            disabled={loading || cartItems.length === 0}
                            className={`w-full py-3 rounded-md font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${loading || cartItems.length === 0
                                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                                : "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                                }`}
                        >
                            {loading && <Loader className="h-5 w-5 animate-spin" />}
                            {loading ? "Processing..." : "Pay with Stripe"}
                        </button>

                        <div className="mt-4 text-xs text-gray-400 text-center">
                            <p>🔒 Secured by Stripe</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
