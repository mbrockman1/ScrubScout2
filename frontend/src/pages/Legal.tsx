
import React from 'react';

type LegalSection = 'tos' | 'hipaa' | 'rights';

interface LegalProps {
  section: LegalSection;
}

const Legal: React.FC<LegalProps> = ({ section }) => {
  const renderContent = () => {
    switch (section) {
      case 'tos':
        return (
          <div className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8">Terms of Service</h1>
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase">1. Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing ScrubScout, you agree to be bound by these Terms of Service. This platform is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind.
              </p>
            </section>
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase text-red-600">2. Limitation of Liability & Indemnification</h2>
              <p className="text-slate-600 leading-relaxed font-semibold bg-red-50 p-6 rounded-2xl border border-red-100">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SCRUBSCOUT AND ITS OWNERS, OFFICERS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH USER-GENERATED CONTENT. YOU AGREE TO INDEMNIFY AND HOLD HARMLESS SCRUBSCOUT FROM ANY CLAIMS RESULTING FROM YOUR CONTRIBUTIONS TO THE PLATFORM.
              </p>
            </section>
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase">3. User Responsibility</h2>
              <p className="text-slate-600 leading-relaxed">
                Users are solely responsible for the accuracy of their reviews. ScrubScout acts as a passive conduit for community feedback and does not verify the clinical accuracy of individual experiences. Site owners are NOT responsible for the actions, employment decisions, or professional repercussions resulting from the use of this data.
              </p>
            </section>
          </div>
        );
      case 'hipaa':
        return (
          <div className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8">HIPAA & Privacy Compliance</h1>
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase">1. Non-Covered Entity Status</h2>
              <p className="text-slate-600 leading-relaxed">
                ScrubScout is a professional review forum and is NOT a "covered entity" as defined by the Health Insurance Portability and Accountability Act (HIPAA). We do not provide healthcare services or maintain medical records.
              </p>
            </section>
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase text-red-600">2. Strict Prohibition of PHI</h2>
              <p className="text-slate-600 leading-relaxed font-bold bg-amber-50 p-6 rounded-2xl border border-amber-100">
                USERS ARE STRICTLY FORBIDDEN FROM POSTING PROTECTED HEALTH INFORMATION (PHI). This includes patient names, initials, specific room numbers, dates of birth, or any data that could identify a specific patient. Any review found containing PHI will be permanently deleted, and the user's account may be terminated.
              </p>
            </section>
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase">3. Reporting Violations</h2>
              <p className="text-slate-600 leading-relaxed">
                If you encounter a post that potentially violates patient privacy or clinical confidentiality, please use the "Report Review" feature immediately.
              </p>
            </section>
          </div>
        );
      case 'rights':
        return (
          <div className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8">Traveler Rights & Standards</h1>
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase">1. Professional Transparency</h2>
              <p className="text-slate-600 leading-relaxed">
                Healthcare travelers have the right to accurate information regarding staffing ratios, facility safety, and pay transparency. ScrubScout exists to facilitate this exchange of information.
              </p>
            </section>
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase">2. Freedom of Speech</h2>
              <p className="text-slate-600 leading-relaxed">
                Clinicians are encouraged to share their honest professional experiences. However, this right does not extend to defamatory statements, personal harassment of specific staff members, or the sharing of patient identifiers.
              </p>
            </section>
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase">3. Safe Harbor Reporting</h2>
              <p className="text-slate-600 leading-relaxed">
                We advocate for "Safe Harbor" and clinical advocacy. Users are encouraged to report systemic issues (e.g., equipment failures, dangerous ratios) to help peers make informed career choices.
              </p>
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="bg-white rounded-[40px] p-12 shadow-2xl border border-slate-200">
        {renderContent()}
      </div>
    </div>
  );
};

export default Legal;
