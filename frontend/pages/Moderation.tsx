
import React from 'react';
import { Review } from '../types';

interface ModerationProps {
  reviews: Review[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onClearReport: (id: string) => void;
}

const Moderation: React.FC<ModerationProps> = ({ reviews, onApprove, onReject, onClearReport }) => {
  const pendingOrFlagged = reviews.filter(r => r.status === 'PENDING' || r.status === 'FLAGGED');
  const reportedReviews = reviews.filter(r => r.isReported && r.status === 'APPROVED');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Scout HQ: Moderation</h1>
          <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-[0.2em]">High precision community surveillance</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-orange-600 px-4 py-2 rounded-xl text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-100">
            {pendingOrFlagged.length} AI Pending
          </div>
          <div className="bg-red-600 px-4 py-2 rounded-xl text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-100">
            {reportedReviews.length} User Reports
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Section 1: AI Flags */}
        <div>
          <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tighter flex items-center">
            <span className="w-2 h-6 bg-indigo-500 mr-3 inline-block"></span>
            AI Automated Flags
          </h2>
          {pendingOrFlagged.length > 0 ? (
            <div className="space-y-6">
              {pendingOrFlagged.map(r => (
                <ModerationCard 
                  key={r.id} 
                  review={r} 
                  onApprove={onApprove} 
                  onReject={onReject}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-3xl p-12 text-center border border-slate-200">
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">No AI flags active.</p>
            </div>
          )}
        </div>

        {/* Section 2: User Reports */}
        <div>
          <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tighter flex items-center">
            <span className="w-2 h-6 bg-red-500 mr-3 inline-block"></span>
            User Incident Reports
          </h2>
          {reportedReviews.length > 0 ? (
            <div className="space-y-6">
              {reportedReviews.map(r => (
                <ModerationCard 
                  key={r.id} 
                  review={r} 
                  onApprove={() => onClearReport(r.id)} 
                  onReject={onReject}
                  isReportedView
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-3xl p-12 text-center border border-slate-200">
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Community inbox empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ModerationCard: React.FC<{ 
  review: Review, 
  onApprove: (id: string) => void, 
  onReject: (id: string) => void,
  isReportedView?: boolean 
}> = ({ review, onApprove, onReject, isReportedView }) => {
  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
          review.status === 'FLAGGED' ? 'bg-red-600 text-white' : 'bg-yellow-500 text-white'
        }`}>
          {isReportedView ? 'Reported' : review.status}
        </span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Author: {review.userName}</span>
      </div>
      <h3 className="text-lg font-black text-slate-900 mb-2 uppercase leading-tight">{review.title}</h3>
      <p className="text-slate-500 font-medium text-xs leading-relaxed mb-6">{review.content}</p>
      
      {review.isReported && (
        <div className="bg-red-50 p-4 rounded-2xl border border-red-100 mb-4">
          <span className="block text-[9px] font-black text-red-400 uppercase tracking-widest mb-1">Incident Report</span>
          <p className="text-xs text-red-700 font-bold italic">"{review.reportReason}"</p>
        </div>
      )}

      {review.moderationReason && !isReportedView && (
        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 mb-4">
          <span className="block text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">AI Logic Snippet</span>
          <p className="text-xs text-indigo-700 font-bold italic">"{review.moderationReason}"</p>
        </div>
      )}

      <div className="flex gap-3">
        <button 
          onClick={() => onApprove(review.id)}
          className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition shadow-lg"
        >
          {isReportedView ? 'Dismiss Report' : 'Force Approve'}
        </button>
        <button 
          onClick={() => onReject(review.id)}
          className="flex-1 bg-white border-2 border-slate-200 text-slate-400 hover:border-red-500 hover:text-red-500 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition"
        >
          Permanent Ban
        </button>
      </div>
    </div>
  );
}

export default Moderation;
