"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSliders } from "../../app/redux/Slices/SliderSlice";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SliderPage() {
  const dispatch = useDispatch();

  const { sliders, loading, error } = useSelector(
    (state) => state.sliders
  );

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    dispatch(fetchSliders());
  }, [dispatch]);

  // Auto Play
  useEffect(() => {
    if (!sliders.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliders.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliders]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % sliders.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + sliders.length) % sliders.length);
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!sliders.length) return null;

  return (
    <section className="relative h-[80vh] overflow-hidden bg-black">
  {sliders.map((slide, index) => (
    <div
      key={slide.id}
      className={`absolute inset-0 transition-all duration-1000 ${
        current === index ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Image */}
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        priority
        className={`object-cover transition-transform duration-[7000ms] ${
          current === index ? "scale-110" : "scale-100"
        }`}
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto h-full flex items-center px-6">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            current === index
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
            Limited Offer
          </span>

          <h1 className="mt-6 text-white text-5xl lg:text-7xl font-black leading-tight">
            {slide.title}
          </h1>

          <p className="mt-6 text-xl text-gray-200 leading-8">
            {slide.subtitle}
          </p>

          <div className="flex gap-4 mt-10">
            <Link
              href={slide.buttonLink}
              className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg text-white font-semibold transition"
            >
              {slide.buttonText}
            </Link>

            <Link
              href="/products"
              className="border border-white/40 backdrop-blur-md text-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  ))}
</section>
  );
}