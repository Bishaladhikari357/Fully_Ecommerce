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

  if (loading) {
    return (
      <div className="py-20 text-center text-xl font-semibold">
        Loading Blogs...
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