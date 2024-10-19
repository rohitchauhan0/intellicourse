
import * as crypto from "crypto";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { connectWithDb } from "@/config/database";
import { User } from "@/model/user";

connectWithDb();

export const POST = async (req) => {
  try {

    const requestData = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      coins,
      price,
      email
    } = requestData;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({
        success: false,
        message: "Payment Failed: Incomplete data",
      });
    }

    const expectedSignature = generateExpectedSignature(
      razorpay_order_id,
      razorpay_payment_id
    );

    if (expectedSignature === razorpay_signature) {
      await enrolledUser(
      email,
      coins, price, 
      );

      return NextResponse.json({
        success: true,
        message: "Payment verified",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Payment Failed: Invalid signature",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Payment Failed: Internal Server Error",
    });
  }
};

const generateExpectedSignature = (order_id, payment_id) => {
  const body = `${order_id}|${payment_id}`;
  return crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");
};

const enrolledUser = async (
      email,
      coins, price
) => {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      user.coins = user.coins + coins;
      await user.save();
    }
        return NextResponse.json({
            success: true,
            message: "Plan buyed successfully"
        })

   
  } catch (error) {
    console.log(error);
  return NextResponse.json({
      success: false,
      message: "Plan buyed failed",
  })
  }
};


