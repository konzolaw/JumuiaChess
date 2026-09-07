'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem('jumuiya_cookie_consent');
    if (!consent) {
      // Small delay for better UX (don't flash immediately)
      const timer = setTimeout(() => setShow(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type: 'all' | 'necessary') => {
    localStorage.setItem('jumuiya_cookie_consent', type);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none print:hidden">
      <div className="max-w-4xl mx-auto bg-white border border-[#6B4A34]/20 rounded-2xl shadow-2xl p-6 pointer-events-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1 space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#232320]">We Value Your Privacy</h3>
          <p className="font-sans text-sm text-[#232320]/70 leading-relaxed">
            We use cookies to ensure you get the best experience on our website, manage your cart, and maintain your session. You can choose to accept all cookies or only strictly necessary ones. 
            Read our <Link href="/cookies" className="text-[#6B4A34] hover:underline font-bold">Cookies Policy</Link> and <Link href="/privacy" className="text-[#6B4A34] hover:underline font-bold">Privacy Policy</Link> for more details.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => handleConsent('necessary')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-[#6B4A34]/20 text-[#232320] font-sans text-sm font-bold hover:bg-[#FAF7F2] transition-colors whitespace-nowrap"
          >
            Necessary Only
          </button>
          <button 
            onClick={() => handleConsent('all')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#6B4A34] text-white font-sans text-sm font-bold hover:bg-[#2A170F] transition-colors whitespace-nowrap shadow-md shadow-[#6B4A34]/20"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
