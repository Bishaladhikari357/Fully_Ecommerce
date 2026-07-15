"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchBlogDetail } from "@/app/redux/Slices/BlogsDetailSlice";
import Image from "next/image";
import Link from "next/link";
import {
  FaUser,
  FaCalendarAlt,
  FaEye,
  FaTag,
  FaArrowLeft,
} from "react-icons/fa";

export default function BlogsDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { blog, loading, error } = useSelector(
    (state) => state.blogDetail
  );

  useEffect(() => {
    if (slug) {
      dispatch(fetchBlogDetail(slug));
    }
  }, [dispatch, slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20">
        Blog not found.
      </div>
    );
  }

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <FaArrowLeft />
            Back to Blogs
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">

            {/* Hero Image */}
            <div className="relative h-[450px]">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />

              <div className="absolute top-6 left-6">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
                  {blog.category}
                </span>
              </div>
            </div>

            <div className="p-8">

              <h1 className="text-4xl font-bold leading-tight">
                {blog.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap gap-6 mt-6 text-gray-500">

                <div className="flex items-center gap-2">
                  <FaUser />
                  {blog.author}
                </div>

                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">
                  <FaEye />
                  {blog.views} Views
                </div>

              </div>

              {/* Description */}
              <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-5 rounded-lg">
                <p className="text-lg text-gray-700 italic">
                  {blog.shortDescription}
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none mt-10 whitespace-pre-line">
                {blog.content}
              </div>

              {/* Tags */}
              <div className="mt-10">

                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <FaTag />
                  Tags
                </h3>

                <div className="flex flex-wrap gap-3">
                  {blog.tags?.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">

            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

              <h3 className="text-2xl font-bold mb-6">
                Article Information
              </h3>

              <div className="space-y-5">

                <div>
                  <p className="text-gray-500">Author</p>
                  <p className="font-semibold">{blog.author}</p>
                </div>

                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-semibold">{blog.category}</p>
                </div>

                <div>
                  <p className="text-gray-500">Published</p>
                  <p className="font-semibold">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Views</p>
                  <p className="font-semibold">
                    {blog.views}
                  </p>
                </div>

              </div>

              <Link
                href="/blogs"
                className="mt-8 block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
              >
                More Articles
              </Link>

            </div>

          </aside>

        </div>
      </div>
    </section>
  );
}