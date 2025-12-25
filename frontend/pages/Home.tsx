
import React from 'react';
import { MOCK_FACILITIES } from '../constants';
import PlaceCard from '../components/PlaceCard';
import { Review } from '../types';

interface HomeProps {
  onSearch: (query: string) => void;
  onNavigate: (page: string) => void;
  recentReviews: Review[];
}

const Home: React.FC<HomeProps> = ({ onSearch, onNavigate, recentReviews }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const trending = MOCK_FACILITIES.sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="relative">
      <div className="relative bg-slate-900 overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920" 
            alt="Healthcare Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-950"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block bg-indigo-600 text-[10px] font-black text-white px-3 py-1 rounded-full uppercase tracking-widest mb-6">
            Trusted Community Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            Scout Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Winning Contract</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium">
            Join 10,000+ verified healthcare travelers. Access community feedback for over 5,000 facilities nationwide.
          </p>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search Facility, City, or State..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-14 pr-40 py-6 rounded-2xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-8 focus:ring-indigo-500/10 shadow-2xl text-xl"
            />
            <button 
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-xl font-black transition-all shadow-lg shadow-indigo-500/40"
            >
              Scout Now
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-10 text-center">Why ScrubScout?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center">
            <div className="bg-indigo-600 w-16 h-16 rounded-3xl flex items-center justify-center mb-6 text-white mx-auto shadow-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 className="text-xl font-black mb-3 uppercase tracking-tighter">Verified Clinicians</h3>
            <p className="text-slate-500 text-sm">Every review is posted by a verified healthcare professional to ensure authentic feedback.</p>
          </div>
          <div className="text-center">
            <div className="bg-cyan-500 w-16 h-16 rounded-3xl flex items-center justify-center mb-6 text-white mx-auto shadow-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 className="text-xl font-black mb-3 uppercase tracking-tighter">Real-Time Updates</h3>
            <p className="text-slate-500 text-sm">Get the latest info on staffing ratios, unit culture, and parking from travelers currently on assignment.</p>
          </div>
          <div className="text-center">
            <div className="bg-slate-900 w-16 h-16 rounded-3xl flex items-center justify-center mb-6 text-white mx-auto shadow-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 className="text-xl font-black mb-3 uppercase tracking-tighter">Pay Transparency</h3>
            <p className="text-slate-500 text-sm">Compare stipends and bill rates across different agencies for the same facility.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
