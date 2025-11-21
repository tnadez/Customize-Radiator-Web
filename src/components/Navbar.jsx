import React from "react"
import { IoCarSportSharp } from "react-icons/io5";
import { useCart } from "../contexts/CartContext";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import CartDrawer from './CartDrawer';
import { Link } from "react-router-dom";
// import CartSheet from "./CartSheet";

function Navbar() {
    const [isVisible, setIsVisible] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const navRef = useRef(null)

    useEffect(() => {
        let lastScrollY = window.scrollY;
        // thresholds (px)
        const DOWN_THRESHOLD = 20; // scroll down at least this much to hide
        const UP_THRESHOLD = -20; // scroll up at least this much to show
        const MIN_Y_TO_HIDE = 100; // don't hide when near top

        const controlNavbar = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;

            // If scrolled down fast enough and past the minimum Y, hide navbar
            if (delta > DOWN_THRESHOLD && currentScrollY > MIN_Y_TO_HIDE) {
                setIsVisible(false);
            }

            // If scrolled up enough, show navbar
            else if (delta < UP_THRESHOLD) {
                setIsVisible(true);
            }

            // update lastScrollY for next event
            lastScrollY = currentScrollY;
        };

        // use passive listener for better scrolling performance
        window.addEventListener("scroll", controlNavbar, { passive: true });

        return () => window.removeEventListener("scroll", controlNavbar, { passive: true });
    }, [])

    return (
        <>
            <nav ref={navRef} className={`bg-black p-4 md:p-6 border-b-2 border-red-500 sticky top-0 w-full transition-transform duration-300 z-50 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
                <div className="flex items-center justify-between px-4 md:px-0">
                    <div className="flex items-center gap-4">
                        <div className="text-white text-3xl md:text-4xl font-bold tracking-wide cursor-pointer font-logo">
                            <Link to="">VT radiator</Link>
                        </div>
                    </div>

                    {/* Desktop links */}
                    <ul className="hidden md:flex items-center space-x-12 text-white font-bold text-xl">
                        <li><Link to="" className=" hover:text-red-500  cursor-pointer">Home</Link></li>
                        <li><Link to="/products" className=" hover:text-red-500  cursor-pointer">Product</Link></li>
                        <li><a href="/custom-design" className=" hover:text-red-500 cursor-pointer">Custom Design</a></li>
                        <li><a href="/contact" className=" hover:text-red-500  cursor-pointer">Contact</a></li>
                        <li>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 rounded-full hover:text-red-500 cursor-pointer"
                                aria-label="Open cart"
                            >
                                <IoCarSportSharp className="text-3xl ml-5 mr-2" />
                                <CartCountBadge />
                            </button>
                        </li>
                    </ul>

                    {/* Mobile controls */}
                    <div className="md:hidden flex items-center gap-2">
                        <button onClick={() => setIsCartOpen(true)} className="text-white relative p-2 rounded-full hover:text-red-400 cursor-pointer">
                            <IoCarSportSharp className="text-2xl" />
                            <CartCountBadge />
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                            className="p-2 rounded-md bg-black/10 text-white"
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu panel */}
                <div className={`md:hidden mt-2 transition-max-height duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-60' : 'max-h-0'}`}>
                    <div className="flex flex-col bg-black/95 rounded-b-md p-4 space-y-3">
                        <Link to="" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-semibold py-2">Home</Link>
                        <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-semibold py-2">Products</Link>
                        <Link to="/custom-design" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-semibold py-2">Custom Design</Link>
                        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-semibold py-2">Contact</Link>

                    </div>
                </div>
            </nav>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} anchorRef={navRef} />
        </>
    )
}


export default Navbar

function CartCountBadge() {
    try {
        const { cartCount } = useCart();
        return cartCount > 0 ? (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center font-bold">
                {cartCount}
            </span>
        ) : null;
    } catch (err) {
        // If CartProvider is not mounted yet, silently return null
        return null;
    }
}