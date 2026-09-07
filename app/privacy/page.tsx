import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center space-x-2 text-[#6B4A34] hover:underline font-bold font-sans text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-[#6B4A34]/10">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#232320] mb-8">Privacy Policy</h1>
          
          <div className="prose prose-stone max-w-none font-sans text-[#232320]/80">
            <p className="lead text-lg">Your privacy is critically important to us. This Privacy Policy explains what information we collect, why we collect it, and how we protect your personal data at the Jumuiya Chess Initiative.</p>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">1. Information We Collect</h2>
            <p>We only collect information about you if we have a reason to do so. This typically includes:</p>
            <ul>
              <li><strong>Personal details:</strong> Such as your name, email address, and phone number when you register for a tournament or purchase a product from our store.</li>
              <li><strong>Transaction information:</strong> Payment details processed securely via M-Pesa. We do not store your full financial data or PINs on our servers.</li>
              <li><strong>Tournament data:</strong> FIDE IDs, ratings, and performance metrics necessary for organizing and reporting chess events.</li>
            </ul>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">2. How We Use Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process transactions and deliver store purchases.</li>
              <li>Organize and communicate details about upcoming chess tournaments.</li>
              <li>Improve our website, events, and community offerings.</li>
              <li>Send you administrative messages or important updates.</li>
            </ul>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">3. Sharing Information</h2>
            <p>We do not sell our users' private personal information. We may share information with limited third parties only under these circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> Payment processors like Safaricom (M-Pesa) necessary to facilitate transactions.</li>
              <li><strong>Legal Compliance:</strong> If required by law or to protect the rights and safety of Jumuiya Chess and its members.</li>
              <li><strong>FIDE / Chess Federations:</strong> Tournament results and names may be reported for official rating purposes.</li>
            </ul>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">4. Media Release</h2>
            <p>By attending a Jumuiya Chess event, you grant us the right to take photographs and video recordings. You agree that we may use such media for promotional and documentation purposes on our website and social media channels.</p>
            
            <h2 className="font-serif text-2xl font-bold text-[#6B4A34] mt-8 mb-4">5. Your Rights</h2>
            <p>You have the right to request access to the personal data we hold about you, or request its deletion. If you have any questions about this Privacy Policy, please contact us.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
