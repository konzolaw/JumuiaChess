import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center space-x-2 text-[#6B4A34] hover:underline font-bold font-sans text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-[#6B4A34]/10">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#232320] mb-8">Terms of Service</h1>
          
          <div className="prose prose-stone max-w-none font-sans text-[#232320]/80">
            <p className="lead text-lg">Welcome to the Jumuiya Chess Initiative. By accessing our platform and registering for events, you agree to these terms.</p>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By registering for a tournament, purchasing items from our shop, or using our services, you confirm that you have read, understood, and agreed to be bound by these Terms of Service.</p>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">2. Event Registration & Payments</h2>
            <p>All payments made via M-Pesa are final. Registration fees for tournaments are non-refundable unless the event is cancelled by the organizers. Paid entries guarantee a spot in the event only if completed before the registration deadline or before capacity is reached.</p>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">3. Code of Conduct</h2>
            <p>Players and attendees are expected to conduct themselves with the highest degree of sportsmanship. We strictly enforce FIDE regulations during ranked events. Cheating, harassment, or disruptive behavior will result in immediate disqualification and removal from the venue without a refund.</p>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">4. Limitation of Liability</h2>
            <p>Jumuiya Chess Initiative shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or products.</p>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">5. Governing Law</h2>
            <p>These Terms of Service are governed by the laws of Kenya. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Kenya.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
