"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { useEffect, useState } from "react";

export default function TopBar() {
  const [isSticky, setIsSticky] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsSticky(window.scrollY > 20);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  return (
    <div className="bg-slate-900 text-white text-sm lg:sticky lg:top-0 lg:z-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Mobile */}
        <div className="flex md:hidden items-center justify-between py-2">
          <div className="flex items-center gap-2 text-orange-400">
            <MdLocalShipping size={16} />
            <span className="text-xs">
              Free Shipping
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaPhoneAlt size={12} />
            <span className="text-xs">
              +977 9800000000
            </span>
          </div>
        </div>

        {/* Tablet */}
        <div className="hidden md:flex lg:hidden items-center justify-between h-10">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-orange-400">
              <MdLocalShipping size={16} />
              <span>Free Shipping on orders over $50</span>
            </div>

            <div className="flex items-center gap-2">
              <FaPhoneAlt size={12} />
              <span>+977 9800000000</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="#">
              <FaFacebookF />
            </Link>

            <Link href="#">
              <FaInstagram />
            </Link>

            <Link href="#">
              <FaTwitter />
            </Link>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-between h-10">

          <div className="flex items-center gap-6">

            <div className="flex items-center gap-2 text-orange-400">
              <MdLocalShipping size={18} />
              <span>Free Shipping on orders over $50</span>
            </div>

            <div className="flex items-center gap-2">
              <FaPhoneAlt size={12} />
              <span>+977 9800000000</span>
            </div>

          </div>

          <div className="flex items-center gap-6">

            <Link
              href="/track-order"
              className="hover:text-orange-400 transition"
            >
              Track Order
            </Link>

            <Link
              href="/help"
              className="hover:text-orange-400 transition"
            >
              Help Center
            </Link>

            <Link
              href="/become-seller"
              className="hover:text-orange-400 transition"
            >
              Become Seller
            </Link>

            <div className="h-5 w-px bg-gray-600" />

            <Link
              href="/login"
              className="hover:text-orange-400 transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="hover:text-orange-400 transition"
            >
              Register
            </Link>

            <div className="h-5 w-px bg-gray-600" />

            <div className="flex items-center gap-3">

              <Link href="#">
                <FaFacebookF className="hover:text-orange-400 transition" />
              </Link>

              <Link href="#">
                <FaInstagram className="hover:text-orange-400 transition" />
              </Link>

              <Link href="#">
                <FaTwitter className="hover:text-orange-400 transition" />
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}