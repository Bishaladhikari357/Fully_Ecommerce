"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../app/redux/Slices/BlogsSlice";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function BlogsList() {
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector((state) => state.blogs);

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
      <div className="py-20 text-center text-red-500">{error}</div>
    );
  }

  if (!blogs?.length) return null;

  const featured = blogs[0];
  const sideBlogs = blogs.slice(1, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="mb-10">
          <p className="uppercase text-sm tracking-[4px] text-gray-500 flex items-center gap-3">
            <span className="w-10 h-[2px] bg-red-500"></span>
            Our Blogs
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Latest <span className="text-red-500">Blogs</span>
          </h2>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left Featured Blog */}
          <Link
            href={`/blogs/${featured.slug}`}
            className="relative h-[500px] overflow-hidden group rounded-sm"
          >
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover group-hover:scale-110 transition duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">

              <div className="flex gap-3 text-xs uppercase mb-4">
                <span className="text-red-400">News</span>
                <span>Blogs</span>
              </div>

              <h3 className="text-3xl font-bold leading-tight line-clamp-2 mb-5">
                {featured.title}
              </h3>

              <span className="inline-flex items-center gap-2 text-red-400 font-medium group-hover:gap-3 transition-all">
                Read more
                <FaArrowRight />
              </span>

            </div>
          </Link>

          {/* Right Side Blogs */}
          <div className="flex flex-col gap-8">

            {sideBlogs.map((blog) => (
              <Link
                href={`/blogs/${blog.slug}`}
                key={blog.id}
                className="grid grid-cols-[240px,1fr] gap-6 group"
              >
                {/* Image */}
                <div className="relative h-[180px] overflow-hidden rounded-sm">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center">

                  <span className="uppercase text-xs text-gray-500">
                    Blogs
                  </span>

                  <div className="w-10 h-[2px] bg-red-500 my-3"></div>

                  <h3 className="text-2xl font-bold leading-snug text-gray-900 group-hover:text-red-500 transition line-clamp-3">
                    {blog.title}
                  </h3>

                  <span className="mt-6 inline-flex items-center gap-2 text-red-500 font-medium group-hover:gap-3 transition-all">
                    Read more
                    <FaArrowRight size={13} />
                  </span>

                </div>
              </Link>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}