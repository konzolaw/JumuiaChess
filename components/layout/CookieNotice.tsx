'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Settings2, X, Check } from 'lucide-react';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function CookieNotice() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('jumuiya_cookie_consent');
      if (!stored) {
        const timer = setTimeout(() => setShowBanner(true), 500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Fallback if localStorage is restricted
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('jumuiya_cookie_consent', JSON.stringify(prefs));
    setShowBanner(false);
    setShowModal(false);
    // Here you would dispatch an event or update a context to let other components know consent changed
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: prefs }));
  };

  const handleAcceptAll = () => {
    savePreferences({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    savePreferences({ necessary: true, analytics: false, marketing: false });
  };

  const handleSaveSelected = () => {
    savePreferences(preferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* 1. Floating Cookie Banner */}
      {showBanner && !showModal && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none print:hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="max-w-5xl mx-auto bg-white border border-[#6B4A34]/20 rounded-2xl shadow-2xl p-6 pointer-events-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1 space-y-2">
              <h3 className="font-serif text-xl font-bold text-[#232320]">We value your privacy</h3>
              <p className="font-sans text-sm text-[#232320]/70 leading-relaxed max-w-3xl">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies. Read our <Link href="/cookies" className="text-[#6B4A34] hover:underline font-bold">Cookies Policy</Link> for more details.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <button 
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-[#6B4A34]/20 text-[#232320] font-sans text-sm font-bold hover:bg-[#FAF7F2] transition-colors whitespace-nowrap"
              >
                Reject
              </button>
              <button 
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#6B4A34] text-white font-sans text-sm font-bold hover:bg-[#2A170F] transition-colors whitespace-nowrap shadow-md shadow-[#6B4A34]/20"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Granular Preferences Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#232320]/60 backdrop-blur-sm print:hidden animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#6B4A34]/10 flex items-center justify-between bg-[#FAF7F2]">
              <h2 className="font-serif text-2xl font-bold text-[#232320]">Cookie Preferences</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 text-[#232320]/60 hover:text-[#232320] hover:bg-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <p className="font-sans text-sm text-[#232320]/80 leading-relaxed">
                When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to. You can choose not to allow some types of cookies. Click on the different category headings to find out more and change our default settings.
              </p>

              <div className="space-y-4">
                {/* Strictly Necessary */}
                <div className="border border-[#6B4A34]/10 rounded-2xl p-5 bg-white">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-[#232320]">Strictly Necessary Cookies</h4>
                      <p className="font-sans text-xs text-[#232320]/60">Required for the website to function.</p>
                    </div>
                    <div className="flex items-center space-x-2 text-[#6B4A34] text-sm font-bold uppercase tracking-wider">
                      <span>Always Active</span>
                    </div>
                  </div>
                  <p className="mt-4 font-sans text-xs text-[#232320]/70">
                    These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.
                  </p>
                </div>

                {/* Analytics */}
                <div className="border border-[#6B4A34]/10 rounded-2xl p-5 bg-white transition-colors hover:border-[#6B4A34]/30">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-[#232320]">Analytics & Performance</h4>
                      <p className="font-sans text-xs text-[#232320]/60">Help us improve our website.</p>
                    </div>
                    <button 
                      onClick={() => togglePreference('analytics')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6B4A34] focus:ring-offset-2 ${preferences.analytics ? 'bg-[#6B4A34]' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.analytics ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <p className="mt-4 font-sans text-xs text-[#232320]/70">
                    These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
                  </p>
                </div>

                {/* Marketing */}
                <div className="border border-[#6B4A34]/10 rounded-2xl p-5 bg-white transition-colors hover:border-[#6B4A34]/30">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-[#232320]">Marketing & Advertising</h4>
                      <p className="font-sans text-xs text-[#232320]/60">Used to deliver personalized advertisements.</p>
                    </div>
                    <button 
                      onClick={() => togglePreference('marketing')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6B4A34] focus:ring-offset-2 ${preferences.marketing ? 'bg-[#6B4A34]' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.marketing ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <p className="mt-4 font-sans text-xs text-[#232320]/70">
                    These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-[#6B4A34]/10 bg-[#FAF7F2] flex flex-col sm:flex-row justify-end items-center gap-3">
              <button 
                onClick={handleSaveSelected}
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-[#6B4A34]/20 text-[#232320] font-sans text-sm font-bold hover:bg-white transition-colors"
              >
                Save My Preferences
              </button>
              <button 
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#6B4A34] text-white font-sans text-sm font-bold hover:bg-[#2A170F] transition-colors shadow-md shadow-[#6B4A34]/20 flex items-center justify-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Accept All</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
