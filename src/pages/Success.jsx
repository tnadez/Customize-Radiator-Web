import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function Success() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { clearCart } = useCart();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        // Clear cart on successful payment
        clearCart();
    }, []);

    return (
        <div className="min-h-screen bg-matt flex items-center justify-center pt-20">
            <div className="container mx-auto px-4 py-12 text-center text-white">
                <div className="inline-block mb-6">
                    <CheckCircle className="w-24 h-24 text-green-500" />
                </div>

                <h1 className="text-5xl font-bold mb-4">Payment Successful!</h1>
                <p className="text-xl text-gray-300 mb-2">Thank you for your order.</p>

                {sessionId && (
                    <p className="text-sm text-gray-400 mb-8">
                        Session ID: <span className="font-mono text-xs">{sessionId}</span>
                    </p>
                )}

                <p className="text-gray-300 mb-12">
                    A confirmation email has been sent to your registered email address.
                </p>

                <div className="space-y-4">
                    <Link to="/products">
                        <div
                            className="inline-block bg-red-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-600 hover:scale-105 duration-300 cursor-pointer transition-colors"
                        >
                            Continue Shopping
                        </div>
                    </Link>

                    <br />

                    <Link to="/">
                        <div
                            className="inline-block text-red-500 border border-red-500 px-8 py-3 rounded-md font-semibold hover:bg-red-500/10 hover:scale-105 duration-300 cursor-pointer transition-colors mt-6"
                        >
                            Back to Home
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}
