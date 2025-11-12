"use client";

import { useState } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { Slide, ToastContainer, toast } from 'react-toastify';

const PayButton = ({ amount, charity }) => {
    const [processing, setProcessing] = useState(false);
    const { data: session } = useSession();
    const notifyError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }

    const handlePay = async () => {
        if (!session?.user) {
            notifyError("Please sign in to donate");
            return;
        }
        if(amount<=0){
            notifyError("Please choose a payment amount");
            return;
        }
        setProcessing(true);
        try {
            const response = await fetch("/api/create_order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            });

            if (!response.ok) {
                const text = await response.text();
                console.error(text);
                throw new Error("API returned HTML instead of JSON");
            }


            const data = await response.json();
            if (!data.orderId) throw new Error("Order creation failed");

            const options = {
                key: process.env.NEXT_PUBLIC_key_id,
                amount: amount * 100,
                currency: "INR",
                name: "OpenCause",
                description: "Donation Payment",
                order_id: data.orderId,
                handler: async function (response) {
                    console.log("Payment details:", response);
                    await fetch("/api/save_payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            amount,
                            to_charity: charity,
                            sender_name: session.user.username,
                            sender_email: session.user.email,
                            oid: data.orderId,
                        }),
                    });
                },
                prefill: {
                    name: session.user.username,
                    email: session.user.email,
                },
                theme: {
                    color: "#10B981", // emerald
                },
            };

            if (!window.Razorpay) {
                console.error("Payment SDK not loaded. Please refresh and try again.");
                setProcessing(false);
                return;
            }
            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (err) {
            console.error("Payment failed", err);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <button
                onClick={handlePay}
                disabled={processing}
                className={`flex justify-center items-center ${processing ? "px-2 bg-gray-300" : "px-12 bg-emerald-400 hover:bg-emerald-500"} py-1.5 text-gray-800 rounded-md text-sm font-medium transition-colors duration-200`}
            >
                {processing ?
                    <>
                        <svg
                            className="animate-spin h-4 w-4 text-gray-700 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                            ></path>
                        </svg>
                        Processing...
                    </>
                    :
                    "Pay"}
            </button>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default PayButton;
