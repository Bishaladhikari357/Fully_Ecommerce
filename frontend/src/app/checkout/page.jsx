"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkout } from "../redux/Slices/CheckoutSlice";
import { clearCart } from "../redux/Slices/CartSlice";
import { useRouter } from "next/navigation";

export default function page() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, success, error } = useSelector(
    (state) => state.checkout
  );

  const { items, total } = useSelector(
    (state) => state.cart
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkout(form));
  };

  useEffect(() => {
    if (success) {
      dispatch(clearCart());
      router.push("/orders");
    }
  }, [success, dispatch, router]);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl text-orange-400 font-bold mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2">

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-lg p-8"
            >

              <h2 className="text-2xl text-red-400 font-bold mb-6">
                Shipping Information
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label className="font-medium text-gray-600">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your Name...."
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 text-orange-500 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="font-medium text-gray-600">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email...."
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 border text-orange-500  rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="font-medium text-gray-600">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number...."
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 text-orange-500 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="font-medium text-gray-600">
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your Address..."
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 text-orange-500 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

              </div>

              {error && (
                <div className="mt-6 bg-red-100 text-red-600 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                disabled={loading}
                className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-semibold transition"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

            </form>

          </div>

          {/* RIGHT */}
          <div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">

              <h2 className="text-2xl text-orange-500 font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-5">

                {items.map((item) => (

                  <div
                    key={item.id}
                    className="flex gap-4"
                  >

                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover border"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold text-red-400">
                        {item.product.name}
                      </h3>

                      <p className="text-gray-500 text-sm ">
                        Qty : {item.quantity}
                      </p>

                    </div>

                    <div className="font-bold text-orange-500">
                      ${item.subtotal}
                    </div>

                  </div>

                ))}

              </div>

              <hr className="my-6" />

              <div className="space-y-3">

                <div className="flex justify-between text-gray-600">
                  <span>Items</span>
                  <span>{items.length}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>$0</span>
                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold text-gray-600">

                  <span>Total</span>

                  <span className="text-orange-500">
                    ${total}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}