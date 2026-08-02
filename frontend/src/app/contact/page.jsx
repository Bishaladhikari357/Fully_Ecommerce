"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { sendMessage } from "../redux/Slices/ContactEmailSlice";

export default function ContactEmail() {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.contact);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await dispatch(sendMessage(form));

  if (sendMessage.fulfilled.match(result)) {

    console.log(result.payload);

    /*
    {
      message:"Message sent successfully",
      contact:{...}
    }
    */

    Swal.fire({
      icon: "success",
      title: result.payload.message,
      html: `
        <b>Thank you ${result.payload.contact.name}</b><br><br>
        Your message has been sent successfully.<br>
        We will reply to <b>${result.payload.contact.email}</b> soon.
      `,
      confirmButtonColor: "#f97316",
    });

    toast.success(result.payload.message);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  } else {

    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: result.payload,
    });

  }
};

  return (
    <section className="bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-5 text-center">

          <h1 className="text-5xl font-bold mb-4">
            Contact Us
          </h1>

          <p className="max-w-2xl mx-auto text-lg opacity-90">
            We'd love to hear from you.
            Whether you have a question about products,
            orders, shipping or anything else,
            our team is ready to answer all your questions.
          </p>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-16">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Contact Info */}
          <div className="space-y-6">

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold text-gray-600 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-5">

                <div className="flex gap-4">
                  <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center">
                    <FaPhoneAlt className="text-orange-500 text-xl" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-600">Phone</h4>
                    <p className="text-gray-600">
                      +977-9867330928
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-orange-500 text-xl" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-600">
                      Email
                    </h4>

                    <p className="text-gray-600">
                      support@example.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-orange-500 text-xl" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-600">
                      Address
                    </h4>

                    <p className="text-gray-600">
                      Butwal, Nepal
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center">
                    <FaClock className="text-orange-500 text-xl" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-600">
                      Business Hours
                    </h4>

                    <p className="text-gray-600">
                      Mon - Sat
                    </p>

                    <p className="text-gray-600">
                      9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

              </div>

              <div className="flex gap-4 mt-8">

                <a
                  href="#"
                  className="w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
                >
                  <FaFacebook />
                </a>

                <a
                  href="#"
                  className="w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
                >
                  <FaTwitter />
                </a>

                <a
                  href="#"
                  className="w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
                >
                  <FaLinkedin />
                </a>

              </div>

            </div>

          </div>
                    {/* Contact Form */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl shadow-xl p-8">

              <h2 className="text-3xl font-bold text-orange-500 mb-2">
                Send us a Message
              </h2>

              <p className="text-gray-500 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                <div className="grid md:grid-cols-2 gap-6">

                  <div>
                    <label className="block mb-2 text-gray-600 font-medium">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full border  border-gray-400 text-orange-400 rounded-xl px-4 py-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-600 font-medium">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-400 text-orange-400 rounded-xl px-4 py-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    />
                  </div>

                </div>

                <div>
                  <label className="block mb-2 text-gray-600 font-medium">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter Subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-400 text-orange-400 rounded-xl px-4 py-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-600 font-medium">
                    Message
                  </label>

                  <textarea
                    rows={7}
                    name="message"
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-400 text-orange-400 rounded-xl px-4 py-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 disabled:opacity-70"
                >
                  <FaPaperPlane />

                  {loading
                    ? "Sending..."
                    : "Send Message"}
                </button>

              </form>

            </div>

          </div>

        </div>
                {/* Google Map */}
        <div className="mt-20">

          <h2 className="text-3xl font-bold text-center mb-10">
            Find Us on the Map
          </h2>

          <div className="overflow-hidden rounded-3xl shadow-2xl">

            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Butwal,Nepal&output=embed"
              width="100%"
              height="450"
              loading="lazy"
              className="w-full border-0"
            />

          </div>

        </div>

        {/* FAQ Section */}

        <div className="mt-20">

          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-3">
                How long does delivery take?
              </h3>

              <p className="text-gray-600">
                Most orders are delivered within
                2–5 business days depending on your location.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-3">
                Can I return my order?
              </h3>

              <p className="text-gray-600">
                Yes, we offer a 7-day easy return policy
                on eligible products.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-3">
                How can I track my order?
              </h3>

              <p className="text-gray-600">
                You can track your order from your
                account dashboard after placing it.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-3">
                Do you provide customer support?
              </h3>

              <p className="text-gray-600">
                Absolutely! Our support team is available
                Monday to Saturday from 9 AM to 6 PM.
              </p>
            </div>

          </div>

        </div>

       

      </div>

    </section>
  );
}