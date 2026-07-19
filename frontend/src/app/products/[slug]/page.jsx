"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaBolt,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";

import { fetchProductDetail } from "@/app/redux/Slices/ProductDetailSlice";
import { addToCart } from "@/app/redux/Slices/CartSlice";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );

 const { updating: cartLoading } = useSelector(
  (state) => state.cart
);

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductDetail(slug));
    }
  }, [dispatch, slug]);

  const handleAddToCart = async () => {
  const result = await dispatch(
    addToCart({
      productId: product.id,
      quantity: 1,
    })
  );

  console.log(result);

  if (addToCart.fulfilled.match(result)) {
    toast.success("Added to Cart 🛒");
  } else {
    toast.error(result.payload || "Something went wrong!");
  }
};

  if (loading)
    return (
      <div className="flex justify-center items-center h-96 text-xl font-bold">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        {error}
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-96">
        Product not found.
      </div>
    );

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Image */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="relative overflow-hidden rounded-xl group">

              <Image
                src={product.image}
                alt={product.name}
                width={700}
                height={700}
                className="w-full object-cover transition duration-500 group-hover:scale-110"
              />

              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full">
                  {product.discount}% OFF
                </span>
              )}

              <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow hover:bg-red-500 hover:text-white transition">
                <FaHeart />
              </button>

            </div>

          </div>

          {/* Details */}
          <div>

            <p className="text-blue-600 font-semibold">
              {product.category}
            </p>

            <h1 className="text-4xl font-bold text-orange-400 mt-2">
              {product.name}
            </h1>

            <p className="text-gray-500 mt-2">
              Brand: {product.brand}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <span className="text-gray-600">
                4.8 (256 Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mt-6">

              <span className="text-5xl font-bold text-orange-600">
                ${product.price}
              </span>

              {product.discount > 0 && (
                <span className="text-gray-400 line-through text-xl">
                  $
                  {(
                    product.price /
                    (1 - product.discount / 100)
                  ).toFixed(2)}
                </span>
              )}

            </div>

            <p className="mt-6 text-gray-700 leading-8">
              {product.description}
            </p>

            {/* Stock */}
            <div className="mt-8 space-y-3">

              <p>
                <strong>Stock:</strong> {product.stock}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {product.isAvailable ? (
                  <span className="text-green-600 font-bold">
                    In Stock
                  </span>
                ) : (
                  <span className="text-red-600 font-bold">
                    Out of Stock
                  </span>
                )}
              </p>

            </div>

            {/* Shipping */}
            <div className="bg-white rounded-xl shadow mt-8 p-5 space-y-4">

              <div className="flex items-center gap-3">
                <FaTruck className="text-blue-600" />
                Free Delivery Available
              </div>

              <div className="flex items-center gap-3">
                <FaUndo className="text-green-600" />
                7 Days Easy Return
              </div>

              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-orange-500" />
                100% Secure Payment
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mt-8">

              <button
                onClick={handleAddToCart}
                disabled={!product.isAvailable || cartLoading}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl flex justify-center items-center gap-3"
              >
                <FaShoppingCart />
                {cartLoading ? "Adding..." : "Add to Cart"}
              </button>

              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl flex justify-center items-center gap-3">
                <FaBolt />
                Buy Now
              </button>

            </div>

          </div>

        </div>

        {/* Specifications */}
        <div className="bg-white rounded-2xl shadow mt-12 p-8">

          <h2 className="text-3xl font-bold mb-6">
            Product Specifications
          </h2>

          <table className="w-full border">

            <tbody>

              <tr className="border-b">
                <td className="p-4 font-semibold w-52">
                  Brand
                </td>
                <td className="p-4">
                  {product.brand}
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-4 font-semibold">
                  Category
                </td>
                <td className="p-4">
                  {product.category}
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-4 font-semibold">
                  Stock
                </td>
                <td className="p-4">
                  {product.stock}
                </td>
              </tr>

              <tr>
                <td className="p-4 font-semibold">
                  Availability
                </td>
                <td className="p-4">
                  {product.isAvailable
                    ? "In Stock"
                    : "Out of Stock"}
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>
    </section>
  );
}