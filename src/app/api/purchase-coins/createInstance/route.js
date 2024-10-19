

import { instance } from "@/config/Razorpay";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { price } = await req.json();
    const currency = "INR";
    const options = {
      amount: price * 100,
      currency,
      receipt: generateReceipt(), 
    };

    const paymentResponse = await instance.orders.create(options);
    return NextResponse.json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Could not Initiate Order",
    });
  }
};

const generateReceipt = () => {
  return Date.now().toString(); // Example: Using timestamp as receipt ID
};
