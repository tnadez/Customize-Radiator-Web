import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function CartDrawer({ isOpen, onClose, anchorRef }) {
    const navigate = useNavigate();
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const panelRef = useRef(null);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    // compute top offset from anchor (navbar) so drawer expands under navbar
    const topOffset = anchorRef && anchorRef.current
        ? Math.ceil(anchorRef.current.getBoundingClientRect().bottom)
        : 64;

    const subtotal = cartItems.reduce((s, it) => s + (Number(String(it.price).replace(/[^0-9.-]+/g, "")) || 0) * it.quantity, 0);

    return (
        <>
            {/* overlay */}
            <div
                aria-hidden={!isOpen}
                className={`fixed inset-0 z-40 transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                {/* drawer panel positioned under navbar */}
                <div
                    ref={panelRef}
                    style={{ top: topOffset }}
                    className={`origin-top fixed left-0 right-0 z-50 bg-black/95 text-white transform transition-transform duration-300 ${isOpen ? 'scale-y-100' : 'scale-y-0'}`}
                >
                    <div className="max-w-4xl mx-auto p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">Your Cart</h3>
                            <button onClick={onClose} aria-label="Close" className="cursor-pointer text-sm text-gray-300">Close</button>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="py-12 text-center text-gray-300">Your cart is empty</div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <img src={item.image} alt={item.title} className="w-20 h-20 object-contain rounded-md bg-white/5 p-2" />
                                        <div className="flex-1">
                                            <div className="font-semibold">{item.title}</div>
                                            <div className="text-sm text-gray-400">{item.price} · Qty: {item.quantity}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 bg-gray-800 rounded cursor-pointer">-</button>
                                            <div className="px-2">{item.quantity}</div>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 bg-gray-800 rounded cursor-pointer">+</button>
                                            <button onClick={() => removeFromCart(item.id)} className="ml-3 text-sm text-red-400 cursor-pointer">Remove</button>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                                    <div className="text-gray-300">Subtotal</div>
                                    <div className="font-bold">{subtotal} THB</div>
                                </div>

                                <div className="pt-4">
                                    <button onClick={() => { onClose(); navigate('/checkout'); }} className="w-full bg-red-500 text-white py-3 rounded-md font-semibold cursor-pointer hover:scale-105 duration-300">Checkout</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
