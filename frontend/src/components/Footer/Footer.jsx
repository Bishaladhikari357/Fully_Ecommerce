"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-slate-950 text-gray-300 mt-5">

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">

          <div>
            <h2 className="text-3xl font-bold text-white">
              Subscribe to our Newsletter
            </h2>

            <p className="text-orange-100 mt-2">
              Get updates on new arrivals, discounts and exclusive offers.
            </p>
          </div>

          <div className="flex w-full lg:w-auto">

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full lg:w-80 px-5 py-4 rounded-l-xl outline-none text-gray-800"
            />

            <button className="bg-slate-900 hover:bg-black text-white px-8 rounded-r-xl">
              Subscribe
            </button>

          </div>

        </div>
      </div>

      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* About */}

        <div>

          <h2 className="text-3xl font-bold text-white">
            TechStore
          </h2>

          <p className="mt-5 leading-7 text-gray-400">
            Shop the latest laptops,
            smartphones, accessories,
            gaming gear and electronics
            at unbeatable prices.
          </p>

          <div className="flex gap-4 mt-8">

            <a className="w-11 h-11 rounded-full bg-slate-800 hover:bg-blue-600 flex justify-center items-center transition">
              <FaFacebookF />
            </a>

            <a className="w-11 h-11 rounded-full bg-slate-800 hover:bg-pink-600 flex justify-center items-center transition">
              <FaInstagram />
            </a>

            <a className="w-11 h-11 rounded-full bg-slate-800 hover:bg-sky-500 flex justify-center items-center transition">
              <FaTwitter />
            </a>

            <a className="w-11 h-11 rounded-full bg-slate-800 hover:bg-red-600 flex justify-center items-center transition">
              <FaYoutube />
            </a>

          </div>

        </div>

        {/* Shop */}

        <div>

          <h3 className="text-xl font-bold text-white mb-5">
            Shop
          </h3>

          <ul className="space-y-3">

            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/categories">Categories</Link></li>
            <li><Link href="/offers">Offers</Link></li>
            <li><Link href="/blogs">Blogs</Link></li>

          </ul>

        </div>

        {/* Company */}

        <div>

          <h3 className="text-xl font-bold text-white mb-5">
            Company
          </h3>

          <ul className="space-y-3">

            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>

          </ul>

        </div>

        {/* Customer */}

        <div>

          <h3 className="text-xl font-bold text-white mb-5">
            Customer
          </h3>

          <ul className="space-y-3">

            <li><Link href="/orders">Track Order</Link></li>
            <li><Link href="/wishlist">Wishlist</Link></li>
            <li><Link href="/returns">Returns</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
            <li><Link href="/support">Support</Link></li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-xl font-bold text-white mb-5">
            Contact
          </h3>

          <div className="space-y-4">

            <div className="flex gap-3">
              <FaMapMarkerAlt className="text-orange-500 mt-1" />
              <p>Butwal, Nepal</p>
            </div>

            <div className="flex gap-3">
              <FaPhoneAlt className="text-orange-500 mt-1" />
              <p>+977-9867330928</p>
            </div>

            <div className="flex gap-3">
              <FaEnvelope className="text-orange-500 mt-1" />
              <p>support@techstore.com</p>
            </div>

          </div>

          {/* Payment */}

          <h4 className="text-white font-semibold mt-8 mb-3">
            Secure Payments
          </h4>

          <div className="flex gap-3">

            <Image
              src="https://img.icons8.com/color/48/visa.png"
              width={45}
              height={30}
              alt="Visa"
            />

            <Image
              src="https://img.icons8.com/color/48/mastercard.png"
              width={45}
              height={30}
              alt="Mastercard"
            />

            <Image
              src="https://img.icons8.com/color/48/paypal.png"
              width={45}
              height={30}
              alt="Paypal"
            />

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row justify-between items-center gap-5">

          <p>
            © {new Date().getFullYear()} TechStore.
            All Rights Reserved.
          </p>

          <p>
            Designed & Developed with ❤️ using
            Next.js + Tailwind CSS
          </p>

          <button
            onClick={scrollTop}
            className="bg-orange-500 hover:bg-orange-600 w-12 h-12 rounded-full flex justify-center items-center"
          >
            <FaArrowUp />
          </button>

        </div>

      </div>

    </footer>
  );
}