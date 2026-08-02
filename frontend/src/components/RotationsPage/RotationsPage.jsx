"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Marquee from "react-fast-marquee";

import { fetchRotations } from "../../app/redux/Slices/RotationsSlice";

export default function RotationsPage() {
  const dispatch = useDispatch();

  const { rotations, loading, error } = useSelector(
    (state) => state.rotations
  );

  useEffect(() => {
    dispatch(fetchRotations());
  }, [dispatch]);

  // ==========================
  // Skeleton Loader
  // ==========================
  if (loading) {
    return (
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4">

          {/* Heading Skeleton */}
          <div className="text-center mb-10">
            <div className="h-10 w-72 bg-gray-200 rounded mx-auto animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded mx-auto mt-4 animate-pulse"></div>
          </div>

          {/* Brand Cards Skeleton */}
          <div className="flex gap-6 overflow-hidden">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-64 flex-shrink-0 bg-white rounded-2xl shadow overflow-hidden"
              >
                {/* Image Skeleton */}
                <div className="h-48 bg-gray-200 animate-pulse"></div>

                {/* Content Skeleton */}
                <div className="p-4">
                  <div className="h-5 w-32 bg-gray-200 rounded mx-auto animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded mx-auto mt-3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // ==========================
  // Error
  // ==========================
  if (error) {
    return (
      <div className="py-20 text-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-orange-500">
            Featured Brands
          </h2>

          <p className="text-gray-500 mt-2">
            Shop from the world's most trusted brands
          </p>
        </div>

        {/* Infinite Marquee */}
        <Marquee
          speed={50}
          gradient={false}
          pauseOnHover
          pauseOnClick
        >
          {rotations.map((rotation) => (
            <div
              key={rotation.id}
              className="mx-4"
            >
              <div className="w-64 bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 overflow-hidden">

                <div className="relative h-48">
                  <Image
                    src={rotation.image}
                    alt={rotation.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold">
                    {rotation.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Premium Collection
                  </p>
                </div>

              </div>
            </div>
          ))}
        </Marquee>

      </div>
    </section>
  );
}