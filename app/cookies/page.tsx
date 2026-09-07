import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CookiesPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center space-x-2 text-[#6B4A34] hover:underline font-bold font-sans text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-[#6B4A34]/10">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#232320] mb-8">Cookies Policy</h1>
          
          <div className="prose prose-stone max-w-none font-sans text-[#232320]/80">
            <p className="lead text-lg">This Cookies Policy explains how Jumuiya Chess uses cookies and similar technologies to recognize you when you visit our website.</p>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">1. What are Cookies?</h2>
            <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information.</p>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">2. Why Do We Use Cookies?</h2>
            <p>We use first-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to enhance the experience on our website.</p>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">3. Types of Cookies We Use</h2>
            <ul>
              <li><strong>Strictly Necessary Cookies:</strong> These cookies are essential to provide you with services available through our website. For example, they allow you to log in to secure areas of our website (e.g., HQ Dashboard) and use shopping carts.</li>
              <li><strong>Functionality Cookies:</strong> These cookies allow our website to remember choices you make, such as your cookie consent preferences (`jumuiya_cookie_consent`).</li>
              <li><strong>Analytics Cookies:</strong> We may use these to collect information about how you use the website, helping us to improve its functionality.</li>
            </ul>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">4. How Can I Control Cookies?</h2>
            <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie consent banner when you first visit the site.</p>
            <p>You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.</p>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">5. Updates to this Policy</h2>
            <p>We may update this Cookies Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
