"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

const categories = [
  {
    title: "Electronics",
    items: ["Laptop", "Mobile", "Tablet", "Camera", "Headphone"],
  },
  {
    title: "Fashion",
    items: ["Men", "Women", "Kids", "Shoes", "Bags"],
  },
  {
    title: "Home",
    items: ["Furniture", "Kitchen", "Lighting", "Decor", "Storage"],
  },
  {
    title: "Sports",
    items: ["Cricket", "Football", "Gym", "Cycling", "Swimming"],
  },
];

export default function NavLinks() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-15 lg:top-27 z-40 bg-white shadow-sm ">
        <div className="max-w-7xl mx-auto px-4">

          <div className="h-10 flex items-center justify-between">

            {/* Mobile Button */}
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <FaBars size={24} color="orange" />
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex text-orange-400 items-center gap-8">

              <div className="group relative">

                <button className="flex items-center  gap-2 font-semibold hover:text-orange-500">
                  Categories
                  <FaChevronDown size={12} />
                </button>

                <div className="absolute top-full text-orange-400 left-0 hidden group-hover:grid grid-cols-4 gap-8 bg-white shadow-2xl rounded-xl p-8 w-[900px]">

                  {categories.map((cat) => (
                    <div key={cat.title}>
                      <h3 className="font-bold text-orange-500 mb-3">
                        {cat.title}
                      </h3>

                      <ul className="space-y-2">
                        {cat.items.map((item) => (
                          <li key={item}>
                            <Link
                              href={`/category/${item.toLowerCase()}`}
                              className="hover:text-orange-500"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                </div>

              </div>

              <Link href="/" className="hover:text-orange-500">
                Home
              </Link>

              <Link href="/products" className="hover:text-orange-500">
                Shop
              </Link>

              <Link href="/new-arrivals" className="hover:text-orange-500">
                New Arrivals
              </Link>

            

              <Link href="/blogs" className="hover:text-orange-500">
                Blog
              </Link>

              <Link href="/contact" className="hover:text-orange-500">
                Contact
              </Link>

            </div>

            {/* Mobile Title */}
           <h2 className="text-orange-500 text-xl">
  Menu
</h2>

            <div className="w-6 lg:hidden"></div>

          </div>

        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          menuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        <div className="flex items-center text-orange-400 justify-between p-5 border-b">

          <h2 className="text-xl  font-bold">
            Menu
          </h2>

          <button onClick={() => setMenuOpen(false)}>
            <FaTimes size={22} />
          </button>

        </div>

        <div className="overflow-y-auto text-gray-600 h-full pb-24">

          <Link
            href="/"
            className="block px-5 py-3 border-b hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="block px-5 py-3 border-b hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>

          <Link
            href="/new-arrivals"
            className="block px-5 py-3 border-b hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            New Arrivals
          </Link>

    

          <Link
            href="/blog"
            className="block px-5 py-3 border-b hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>

          <Link
            href="/contact"
            className="block px-5 py-3 border-b hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          <div className="p-5">

            <h3 className="font-bold mb-4">
              Categories
            </h3>

            {categories.map((cat) => (
              <div key={cat.title} className="mb-5">

                <h4 className="font-semibold text-orange-500 mb-2">
                  {cat.title}
                </h4>

                <div className="flex flex-col gap-2">

                  {cat.items.map((item) => (
                    <Link
                      key={item}
                      href={`/category/${item.toLowerCase()}`}
                      className="text-gray-600 hover:text-orange-500"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </>
  );
}