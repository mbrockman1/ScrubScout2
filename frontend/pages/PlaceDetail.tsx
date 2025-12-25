
import React, { useState } from 'react';
import { Facility, Review, User } from '../types';
import StarRating from '../components/StarRating';

interface PlaceDetailProps {
  facility: Facility;
  reviews: Review[];
  user: User | null;
  onAddReview: (review: Partial<Review>) => void;
  onReportReview: (id: string, reason: string) => void;
  onVoteReview: (id: string) => void;
  onNavigate: (page: string) => void;
}

const PlaceDetail: React.FC<PlaceDetailProps> = ({ 
  facility, 
  reviews, 
  user, 
  onAddReview, 
  onReportReview, 
  onVoteReview,
  onNavigate 
}) => {
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportingId, setReportingId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.isVerified) return;
    setIsSubmitting(true);
    
    onAddReview({
      facilityId: facility.id,
      userId: user.id,
      userName: user.displayName,
      rating: newRating,
      title: newTitle,
      content: newContent,
      status: 'APPROVED',
      createdAt: new Date().toISOString(),
      helpfulVotes: 0
    });

    setIsSubmitting(false);
    setShowForm(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleReport = (id: string) => {
    if (!user) {
      onNavigate('auth');
      return;
    }
    setReportingId(id);
  };

  const submitReport = () => {
    if (reportingId && reportReason) {
      onReportReview(reportingId, reportReason);
      setReportingId(null);
      setReportReason('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6 flex items-center text-xs text-indigo-600 font-black uppercase tracking-widest cursor-pointer" onClick={() => onNavigate('search')}>
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Back to search
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 mb-8">
            <div className="h-64 w-full overflow-hidden relative">
              <img src={facility.imageUrl} alt={facility.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <h1 className="text-4xl font-black text-white tracking-tighter">{facility.name}</h1>
                <p className="text-white/80 font-bold text-sm">{facility.address}, {facility.city}, {facility.state}</p>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Type</label>
                  <span className="font-bold text-slate-700 text-sm">{facility.hospitalType || 'N/A'}</span>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ownership</label>
                  <span className="font-bold text-slate-700 text-sm">{facility.ownership || 'N/A'}</span>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ER Services</label>
                  <span className="font-bold text-slate-700 text-sm">{facility.emergencyServices ? 'Yes' : 'No'}</span>
                </div>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 mb-8">
                <h3 className="text-slate-900 font-black uppercase tracking-tight text-lg mb-2">Facility Overview</h3>
                <p className="font-medium text-slate-500 leading-relaxed">{facility.description}</p>
              </div>
            </div>
          </div>

          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Community Updates</h2>
            <button 
              onClick={() => user ? setShowForm(!showForm) : onNavigate('auth')}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg"
            >
              {showForm ? 'Cancel' : 'Add Review'}
            </button>
          </div>

          {showForm && (
            <div className="bg-white border-2 border-indigo-500 rounded-3xl p-8 mb-8 shadow-2xl">
              <h3 className="text-xl font-black mb-6 uppercase tracking-tighter">Submit Your Report</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Rating</label>
                  <StarRating rating={newRating} interactive onChange={setNewRating} size="lg" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Headline</label>
                  <input 
                    type="text" required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Experience Details</label>
                  <textarea 
                    required rows={5}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200"
                  />
                  <p className="text-[10px] text-red-500 mt-3 font-bold uppercase tracking-widest italic">
                    DO NOT INCLUDE PATIENT PROTECTED HEALTH INFORMATION (PHI).
                  </p>
                </div>
                <button 
                  type="submit" disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl"
                >
                  Publish Report
                </button>
              </form>
            </div>
          )}

          <div className="space-y-6">
            {reviews.map(r => (
              <div key={r.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center font-black text-indigo-600 mr-3">
                      {r.userName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 uppercase text-sm tracking-tight">{r.userName}</h4>
                      <span className="text-[9px] text-slate-400 uppercase font-black">{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <StarRating rating={r.rating} size="sm" />
                </div>
                <h5 className="font-black text-slate-900 mb-2 uppercase text-base">{r.title}</h5>
                <p className="text-slate-500 leading-relaxed text-sm mb-6">{r.content}</p>
                <div className="flex space-x-4 border-t border-slate-50 pt-4">
                  <button onClick={() => onVoteReview(r.id)} className="text-[10px] font-black uppercase text-indigo-600">Helpful ({r.helpfulVotes})</button>
                  <button onClick={() => handleReport(r.id)} className="text-[10px] font-black uppercase text-slate-300 hover:text-red-500 transition">Report</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 sticky top-24">
            <h3 className="font-black text-slate-900 mb-6 uppercase tracking-tighter">Facility Disclaimers</h3>
            <div className="space-y-6">
              <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-red-700 text-[10px] font-bold leading-relaxed uppercase tracking-widest">
                ScrubScout is not responsible for review accuracy. Use community feedback as one of many career research tools.
              </div>
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Provider ID</span>
                <span className="font-bold text-slate-700">{facility.id}</span>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <button 
                  onClick={() => onNavigate('tos')}
                  className="text-[10px] font-black text-indigo-600 uppercase underline"
                >
                  View Full Liability Terms
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {reportingId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200">
            <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">Report Content</h3>
            <textarea
              className="w-full p-4 rounded-2xl bg-slate-50 mb-6 text-sm"
              rows={4}
              placeholder="Reason for report (e.g. PHI violation, defamation)..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            />
            <div className="flex space-x-3">
              <button onClick={() => setReportingId(null)} className="flex-1 bg-slate-100 py-3 rounded-xl font-black text-[10px] uppercase">Cancel</button>
              <button onClick={submitReport} className="flex-1 bg-red-600 text-white py-3 rounded-xl font-black text-[10px] uppercase">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceDetail;
