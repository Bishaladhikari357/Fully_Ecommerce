"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/Slices/BlogsSlice";
import Image from "next/image";
import Link from "next/link";
import {
  FaUser,
  FaEye,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";

export default function BlogsList() {
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector(
    (state) => state.blogs
  );

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

 // ==========================
// Skeleton Loading
// ==========================
if (loading) {
  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading Skeleton */}
        <div className="text-center mb-12">
          <div className="h-4 w-36 bg-gray-200 rounded mx-auto animate-pulse"></div>

          <div className="h-10 w-72 bg-gray-200 rounded mx-auto mt-4 animate-pulse"></div>

          <div className="h-4 w-96 max-w-full bg-gray-200 rounded mx-auto mt-4 animate-pulse"></div>
          <div className="h-4 w-80 max-w-full bg-gray-200 rounded mx-auto mt-2 animate-pulse"></div>
        </div>

        {/* Blog Cards Skeleton */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md"
            >
              {/* Image */}
              <div className="h-64 bg-gray-200 animate-pulse"></div>

              <div className="p-6">

                {/* Meta */}
                <div className="flex gap-4 mb-5">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Title */}
                <div className="h-7 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-7 w-3/4 bg-gray-200 rounded mt-3 animate-pulse"></div>

                {/* Description */}
                <div className="h-4 w-full bg-gray-200 rounded mt-5 animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded mt-3 animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded mt-3 animate-pulse"></div>

                {/* Tags */}
                <div className="flex gap-2 mt-6">
                  <div className="h-7 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-7 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-7 w-14 bg-gray-200 rounded-full animate-pulse"></div>
                </div>

                {/* Button */}
                <div className="h-11 w-36 bg-gray-200 rounded-lg mt-6 animate-pulse"></div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
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
    <section className="bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-blue-600 uppercase tracking-widest font-semibold">
            News & Articles
          </span>

          <h2 className="text-4xl font-bold mt-3">
            Latest Blog Posts
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Stay updated with the latest technology, programming,
            ecommerce, React, Node.js, and development tutorials.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />

                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">

                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">

                  <div className="flex items-center gap-1">
                    <FaUser />
                    {blog.author}
                  </div>

                  <div className="flex items-center gap-1">
                    <FaCalendarAlt />
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-1">
                    <FaEye />
                    {blog.views}
                  </div>

                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 line-clamp-3 mb-6">
                  {blog.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags
                    ?.split(",")
                    .slice(0, 3)
                    .map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                </div>

                {/* Button */}
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
                >
                  Read Article
                  <FaArrowRight />
                </Link>

              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}