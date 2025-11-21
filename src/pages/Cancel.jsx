import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function Cancel() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-matt flex items-center justify-center pt-20">
            <div className="container mx-auto px-4 py-12 text-center text-white">
                <div className="inline-block mb-6">
                    <XCircle className="w-24 h-24 text-red-500" />
                </div>

                <h1 className="text-5xl font-bold mb-4">Payment Cancelled</h1>
                <p className="text-xl text-gray-300 mb-8">
                    Your payment has been cancelled. Your items remain in your cart.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate("/checkout")}
                        className="inline-block bg-red-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-600 cursor-pointer transition-colors"
                    >
                        Back to Checkout
                    </button>
                    <br />
                    <button
                        onClick={() => navigate("/")}
                        className="inline-block text-red-500 border border-red-500 px-8 py-3 rounded-md font-semibold hover:bg-red-500/10 cursor-pointer transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
