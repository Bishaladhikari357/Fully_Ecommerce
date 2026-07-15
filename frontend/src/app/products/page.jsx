"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../app/redux/Slices/ProductSlice";
import Image from "next/image";
import Link from "next/link";
import {
  FaHeart,
  FaShoppingCart,
  FaEye,
  FaStar,
} from "react-icons/fa";

export default function page() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="py-20 text-center text-xl font-semibold">
        Loading Products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-orange-400">
            Featured Products
          </h2>
          <p className="text-gray-500 mt-2">
            Discover our latest collection.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">

                <Link href={`/products/${product.slug}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  />
                </Link>

                {/* Sale Badge */}
                <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs">
                  SALE
                </span>

                {/* Wishlist */}
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition">
                  <FaHeart />
                </button>

                {/* Quick View */}
                <Link
                  href={`/products/${product.slug}`}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-5 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
                >
                  <div className="flex items-center gap-2">
                    <FaEye />
                    Quick View
                  </div>
                </Link>

              </div>

              {/* Content */}
              <div className="p-5">

                <p className="text-sm text-blue-600 font-medium">
                  {product.category}
                </p>

                <h3 className="text-xl text-orange-400 font-bold mt-2 line-clamp-2  transition">
                  <Link href={`/products/${product.slug}`}>
                    {product.name}
                  </Link>
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {product.brand}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-3 text-yellow-500">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar className="text-gray-300" />

                  <span className="text-gray-500 ml-2 text-sm">
                    (4.8)
                  </span>
                </div>

                <p className="text-gray-600 mt-3 text-sm line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mt-5 flex items-center gap-3">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>

                  <span className="text-gray-400 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>

                

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}