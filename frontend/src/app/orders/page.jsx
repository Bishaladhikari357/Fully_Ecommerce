"use client";

import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white max-w-xl w-full rounded-2xl shadow-lg p-10 text-center">

        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-4xl text-green-600">✓</span>
        </div>

        <h1 className="text-4xl font-bold text-green-600 mt-6">
          Order Placed Successfully
        </h1>

        <p className="mt-4 text-gray-500">
          Thank you for shopping with us. Your order has been placed successfully.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          Continue Shopping
        </Link>

      </div>
    </div>
  );
}