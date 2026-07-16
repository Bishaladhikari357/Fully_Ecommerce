"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "@/app/redux/Slices/CartSlice";

export default function MainHeader() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { cartCount } = useSelector((state) => state.cart);

  const wishlistCount = 5;

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <header className="sticky top-0 lg:top-10 z-40 bg-white shadow-sm ">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex h-18 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-3xl font-extrabold text-orange-500">
              ShopHub
            </h1>
          </Link>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-3xl">
            <div className="flex w-full overflow-hidden rounded-xl border-2 border-orange-500">

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-5 py-3 outline-none text-orange-600"
              />

              <button className="bg-orange-500 px-6 text-white hover:bg-orange-600">
                <FaSearch />
              </button>

            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">

            {/* Wishlist */}
            <Link href="/wishlist" className="relative">
              <FaHeart className="text-2xl text-gray-700 hover:text-orange-500" />

              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {wishlistCount}
              </span>
            </Link>

            {/* User */}
            <Link href="/login">
              <FaUser className="text-2xl text-gray-700 hover:text-orange-500" />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-gray-700 hover:text-orange-500" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>

        </div>

      </div>
    </header>
  );
}