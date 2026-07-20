"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../app/redux/Slices/BlogsSlice";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaUser,
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

  if (!blogs?.length) return null;

  const featured = blogs[0];
  const sideBlogs = blogs.slice(1, 3);

  return (
    <section className="bg-gray-50 py-20">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="flex items-center justify-between mb-12">

          <div>

            <span className="text-orange-500 font-semibold uppercase tracking-widest">
              News & Articles
            </span>

            <h2 className="text-4xl font-bold mt-2">
              Latest Blogs
            </h2>

            <p className="text-gray-500 mt-2">
              Read the latest technology and shopping news.
            </p>

          </div>

          <Link
            href="/blogs"
            className="hidden md:inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition"
          >
            View All
            <FaArrowRight />
          </Link>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Featured Blog */}
          <Link
            href={`/blogs/${featured.slug}`}
            className="relative rounded-3xl overflow-hidden group h-[500px]"
          >

            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 p-8 text-white">

              <span className="bg-orange-500 px-4 py-2 rounded-full text-sm">
                Featured
              </span>

              <h3 className="text-4xl font-bold mt-6 line-clamp-2">
                {featured.title}
              </h3>

              <p className="line-clamp-2 mt-4 text-gray-200">
                {featured.description}
              </p>

              <div className="flex items-center gap-6 mt-6 text-sm">

                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  {new Date(featured.createdAt).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">
                  <FaUser />
                  Admin
                </div>

              </div>

            </div>

          </Link>

          {/* Side Blogs */}
          <div className="space-y-8">

            {sideBlogs.map((blog) => (
              <Link
                href={`/blogs/${blog.slug}`}
                key={blog.id}
                className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden flex flex-col md:flex-row"
              >

                <div className="relative w-full md:w-72 h-64 md:h-auto">

                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover hover:scale-110 transition duration-700"
                  />

                </div>

                <div className="p-6 flex flex-col justify-center">

                  <span className="text-orange-500 text-sm font-semibold uppercase">
                    Technology
                  </span>

                  <h3 className="text-2xl font-bold mt-3 line-clamp-2 hover:text-orange-500 transition">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mt-3 line-clamp-2">
                    {blog.description}
                  </p>

                  <div className="flex items-center gap-5 mt-5 text-sm text-gray-500">

                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-2">
                      <FaUser />
                      Admin
                    </div>

                  </div>

                  <span className="inline-flex items-center gap-2 mt-6 text-orange-500 font-semibold">
                    Read More
                    <FaArrowRight />
                  </span>

                </div>

              </Link>
            ))}

          </div>

        </div>

        {/* Mobile Button */}
        <div className="text-center mt-10 md:hidden">

          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full transition"
          >
            View All Blogs
            <FaArrowRight />
          </Link>

        </div>

      </div>

    </section>
  );
}