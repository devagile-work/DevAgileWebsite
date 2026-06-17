"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RazorpayButton({ amount, itemName, itemId, itemType, isBundle, compact, hasPurchased }) {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'failure' | null
  const [isLoading, setIsLoading] = useState(false);
  const [localPurchased, setLocalPurchased] = useState(false);
  const router = useRouter();

  const effectivelyPurchased = hasPurchased || localPurchased;

  // If already purchased, render a Link to the course instead of the payment button
  if (effectivelyPurchased) {
    return (
      <Link 
        href={`/course/${itemId}`}
        className={`w-full font-bold transition-all shadow-sm flex justify-center items-center gap-2 font-shareTech uppercase tracking-wide ${
          compact ? 'py-2.5 px-3 text-xs rounded-lg' : 'py-3 lg:py-4 text-sm lg:text-base rounded-xl'
        } bg-brand-navy text-brand-white hover:bg-brand-navy/90 hover:shadow-brand-navy/30`}
      >
        <span>Start your course</span>
      </Link>
    );
  }

  const handleSimulate = async (result) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          itemType,
          status: result,
          amount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(result);
        setTimeout(() => {
          setShowModal(false);
          setStatus(null);
          if (result === 'success') {
            setLocalPurchased(true); // Update UI immediately
            router.refresh(); // Refresh the page to get updated user data
          }
        }, 1500);
      } else {
        setStatus('failure');
        console.error("Payment verification failed:", data.message);
      }
    } catch (error) {
      console.error("Error making payment:", error);
      setStatus('failure');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className={`w-full font-bold transition-all shadow-sm flex justify-center items-center gap-2 font-shareTech uppercase tracking-wide ${
          compact ? 'py-2.5 px-3 text-xs rounded-lg' : 'py-3 lg:py-4 text-sm lg:text-base rounded-xl'
        } ${
          isBundle 
            ? "bg-brand-green text-brand-navy hover:bg-brand-green/90 hover:shadow-brand-green/30" 
            : "bg-brand-navy text-brand-white hover:bg-brand-navy/90 hover:shadow-brand-navy/30"
        }`}
      >
        <span>Enroll Now - ₹{amount}</span>
      </button>

      {/* Simulated Razorpay Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden font-roboto flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#02042b] p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-[#02042b] font-bold text-xs">PAY</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">DevAgile Secure Checkout</h3>
                  <p className="text-xs opacity-70">Test Mode</p>
                </div>
              </div>
              <button onClick={() => !isLoading && setShowModal(false)} className="text-white/50 hover:text-white">&times;</button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col items-center min-h-[250px] justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center animate-in fade-in">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-green rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500 font-bold animate-pulse">Processing Payment...</p>
                </div>
              ) : status === 'success' ? (
                <div className="flex flex-col items-center text-green-500 animate-in slide-in-from-bottom-2">
                  <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="font-bold">Payment Successful!</p>
                </div>
              ) : status === 'failure' ? (
                <div className="flex flex-col items-center text-red-500 animate-in slide-in-from-bottom-2">
                  <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="font-bold">Payment Failed</p>
                  <button 
                    onClick={() => setStatus(null)}
                    className="mt-4 text-sm text-gray-500 underline"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-500 mb-1 text-sm">You are paying for</p>
                  <h2 className="text-xl font-bold text-gray-800 text-center mb-4">{itemName}</h2>
                  <div className="text-3xl font-black text-[#02042b] mb-8">₹{amount}</div>
                  
                  <div className="flex gap-4 w-full">
                    <button 
                      onClick={() => handleSimulate('success')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded font-bold shadow-sm transition-colors"
                    >
                      Simulate Success
                    </button>
                    <button 
                      onClick={() => handleSimulate('failure')}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded font-bold shadow-sm transition-colors"
                    >
                      Simulate Failure
                    </button>
                  </div>
                </>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="bg-gray-50 p-3 text-center text-xs text-gray-400 border-t flex justify-center items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              Secured by Razorpay
            </div>
          </div>
        </div>
      )}
    </>
  );
}
