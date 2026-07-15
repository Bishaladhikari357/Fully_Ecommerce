"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCart,
  updateCart,
  removeCartItem,
  clearCart,
} from "../redux/Slices/CartSlice";

import { toast } from "react-hot-toast";

import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaArrowLeft,
  FaShoppingBag,
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
  FaTag,
} from "react-icons/fa";


export default function CartPage() {

  const dispatch = useDispatch();


  const {
    items = [],
    total = 0,
    loading,
    error,
  } = useSelector(
    (state) => state.cart
  );



  useEffect(() => {

    dispatch(fetchCart());

  }, [dispatch]);





  // Increase Quantity

  const handleIncrease = async (item) => {

    try {

      await dispatch(
        updateCart({
          itemId: item.id,
          quantity: item.quantity + 1,
        })
      ).unwrap();


      toast.success("Quantity increased");


    } catch (error) {

      toast.error(error || "Update failed");

    }

  };





  // Decrease Quantity

  const handleDecrease = async (item) => {


    if(item.quantity <= 1) return;



    try {

      await dispatch(
        updateCart({
          itemId: item.id,
          quantity: item.quantity - 1,
        })
      ).unwrap();



      toast.success("Quantity decreased");



    } catch(error){

      toast.error(error || "Update failed");

    }

  };





  // Remove Item

  const handleRemove = async(id)=>{


    const confirmDelete = window.confirm(
      "Remove this product?"
    );


    if(!confirmDelete) return;



    try {


      await dispatch(
        removeCartItem(id)
      ).unwrap();



      toast.success(
        "Product removed"
      );


    }catch(error){


      toast.error(
        error || "Remove failed"
      );

    }


  };






  // Clear Cart

  const handleClearCart = async()=>{


    const confirmClear = window.confirm(
      "Clear entire cart?"
    );


    if(!confirmClear) return;



    try{


      await dispatch(
        clearCart()
      ).unwrap();



      toast.success(
        "Cart cleared"
      );


    }catch(error){


      toast.error(
        error || "Clear failed"
      );


    }


  };







  // Loading

  if(loading){


    return(

      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto">
          </div>


          <h2 className="mt-5 text-xl font-semibold">
            Loading Cart...
          </h2>


        </div>


      </div>

    );

  }






  // Error

  if(error){


    return(

      <div className="min-h-screen flex items-center justify-center">

        <p className="text-red-500 text-xl">
          {error}
        </p>

      </div>

    );


  }







  // Empty Cart

  if(items.length === 0){


    return(

      <div className="min-h-screen bg-gray-50 flex items-center justify-center">


        <div className="bg-white shadow-xl rounded-3xl p-10 text-center">


          <FaShoppingBag
            size={90}
            className="mx-auto text-orange-500"
          />


          <h1 className="text-4xl font-bold mt-6">
            Your Cart is Empty
          </h1>



          <p className="text-gray-500 mt-3">
            Add products and continue shopping
          </p>




          <Link
            href="/products"
            className="inline-flex items-center gap-2 mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl"
          >

            <FaArrowLeft />

            Continue Shopping

          </Link>


        </div>


      </div>

    );


  }







  return (

    <section className="bg-gray-100 min-h-screen py-10">


      <div className="max-w-7xl mx-auto px-4">



        {/* Header */}


        <div className="flex justify-between items-center mb-10">


          <div>

            <h1 className="text-4xl font-bold">
              Shopping Cart
            </h1>


            <p className="text-gray-500 mt-2">
              {items.length} products in your cart
            </p>


          </div>




          <button

            onClick={handleClearCart}

            className="text-red-500 hover:text-red-700 font-semibold"

          >

            Clear Cart

          </button>



        </div>






        <div className="grid lg:grid-cols-3 gap-8">


          {/* Product Section */}

          <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg border p-6 hover:shadow-xl transition"
            >

              <div className="flex flex-col md:flex-row gap-6">


                {/* Product Image */}

                <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden bg-gray-100">

                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover hover:scale-110 transition duration-500"
                  />

                </div>





                {/* Product Details */}

                <div className="flex-1">


                  <Link
                    href={`/products/${item.product.slug}`}
                  >

                    <h2 className="text-2xl font-bold hover:text-orange-500 transition">
                      {item.product.name}
                    </h2>

                  </Link>



                  <p className="text-gray-500 mt-2">
                    Brand: {item.product.brand}
                  </p>



                  <p className="text-orange-600 text-2xl font-bold mt-4">
                    ${item.product.price}
                  </p>





                  {/* Quantity */}

                  <div className="flex items-center mt-6">

                    <div className="flex items-center border rounded-xl overflow-hidden">


                      <button
                        disabled={loading}
                        onClick={() => handleDecrease(item)}
                        className="w-11 h-11 hover:bg-orange-500 hover:text-white transition"
                      >

                        <FaMinus className="mx-auto"/>

                      </button>




                      <span className="w-14 text-center font-bold text-lg">

                        {item.quantity}

                      </span>





                      <button
                        disabled={loading}
                        onClick={() => handleIncrease(item)}
                        className="w-11 h-11 hover:bg-orange-500 hover:text-white transition"
                      >

                        <FaPlus className="mx-auto"/>

                      </button>



                    </div>


                  </div>





                  {/* Extra Info */}


                  <div className="mt-5 flex flex-wrap gap-4 text-sm">


                    <span className="flex items-center gap-2 text-green-600">

                      <FaTruck/>

                      Free Delivery

                    </span>




                    <span className="flex items-center gap-2 text-blue-600">

                      <FaShieldAlt/>

                      Secure

                    </span>



                  </div>



                </div>







                {/* Subtotal + Remove */}


                <div className="flex md:flex-col justify-between items-end">


                  <button

                    onClick={() => handleRemove(item.id)}

                    className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"

                  >

                    <FaTrash/>

                    Remove

                  </button>




                  <div className="text-right">


                    <p className="text-sm text-gray-500">
                      Subtotal
                    </p>


                    <h3 className="text-2xl font-bold text-green-600">

                      ${item.subtotal}

                    </h3>


                  </div>


                </div>



              </div>


            </div>


          ))}



        </div>





        {/* Order Summary */}


        <div>


          <div className="bg-white rounded-2xl shadow-xl border p-6 sticky top-24">


            <h2 className="text-2xl font-bold mb-6">

              Order Summary

            </h2>





            <div className="space-y-5">



              <div className="flex justify-between">

                <span>
                  Products
                </span>

                <span>
                  {items.length}
                </span>

              </div>





              <div className="flex justify-between">


                <span>
                  Shipping
                </span>


                <span className="text-green-600 font-semibold">

                  FREE

                </span>


              </div>





              <div className="flex justify-between">


                <span>
                  Tax
                </span>


                <span>
                  $0
                </span>


              </div>





              <hr />





              <div className="flex justify-between text-2xl font-bold">


                <span>
                  Total
                </span>



                <span className="text-orange-500">

                  ${total}

                </span>


              </div>




            </div>
                        {/* Coupon */}

            <div className="mt-8">

              <h3 className="font-bold mb-3 flex items-center gap-2">

                <FaTag />

                Apply Coupon

              </h3>


              <div className="flex">


                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 border rounded-l-xl px-4 py-3 outline-none"
                />


                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 rounded-r-xl"
                >

                  Apply

                </button>


              </div>


            </div>





            {/* Checkout Button */}


            <Link
              href="/checkout"
              className="block text-center mt-8 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition"
            >

              Proceed To Checkout

            </Link>





            {/* Continue Shopping */}


            <Link

              href="/products"

              className="block text-center mt-5 text-orange-500 hover:text-orange-600 font-semibold"

            >

              Continue Shopping

            </Link>






            {/* Payment & Security */}


            <div className="border-t mt-8 pt-6 space-y-4">


              <div className="flex items-center gap-3 text-gray-600">

                <FaCreditCard className="text-orange-500"/>

                <span>
                  Secure Payment
                </span>

              </div>





              <div className="flex items-center gap-3 text-gray-600">

                <FaShieldAlt className="text-green-600"/>

                <span>
                  100% Buyer Protection
                </span>

              </div>





              <div className="flex items-center gap-3 text-gray-600">

                <FaTruck className="text-blue-600"/>

                <span>
                  Fast Delivery Available
                </span>

              </div>



            </div>




          </div>


        </div>


      </div>


    </div>


  </section>


);

}