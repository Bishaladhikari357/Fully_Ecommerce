"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-16">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">
            TechStore
          </h2>

          <p className="text-sm leading-7">
            Your trusted online shopping destination for laptops,
            accessories, electronics, and much more at the best prices.
          </p>

          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link href="/products" className="hover:text-white">
                Products
              </Link>
            </li>

            <li>
              <Link href="/categories" className="hover:text-white">
                Categories
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Customer Service
          </h3>

          <ul className="space-y-3">
            <li>
              <Link href="#" className="hover:text-white">
                My Account
              </Link>
            </li>

            <li>
              <Link href="#" className="hover:text-white">
                Orders
              </Link>
            </li>

            <li>
              <Link href="#" className="hover:text-white">
                Wishlist
              </Link>
            </li>

            <li>
              <Link href="#" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="#" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Contact Us
          </h3>

          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <FaMapMarkerAlt className="mt-1 text-blue-400" />
              <p>Butwal, Nepal</p>
            </div>

            <div className="flex gap-3 items-center">
              <FaPhoneAlt className="text-blue-400" />
              <p>+977-9800000000</p>
            </div>

            <div className="flex gap-3 items-center">
              <FaEnvelope className="text-blue-400" />
              <p>support@techstore.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
          <p>
            © {new Date().getFullYear()} TechStore. All rights reserved.
          </p>

          <p>
            Designed & Developed with ❤️ using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}