
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import PlaceDetail from './pages/PlaceDetail';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Moderation from './pages/Moderation';
import Legal from './pages/Legal';
import { User, Facility, Review, UserRole } from './types';
import { MOCK_FACILITIES, MOCK_REVIEWS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>(MOCK_FACILITIES);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);

  // Persistence simulation for the User Registry
  const [userRegistry, setUserRegistry] = useState<User[]>([]);

  useEffect(() => {
    const savedRegistry = localStorage.getItem('scrubscout_registry');
    if (savedRegistry) {
      setUserRegistry(JSON.parse(savedRegistry));
    } else {
      const seedAdmin: User = { 
        id: 'admin-1', 
        email: 'admin@scout.com', 
        displayName: 'Admin Scout', 
        role: 'ADMIN', 
        isVerified: true, 
        verificationStatus: 'VERIFIED' 
      };
      setUserRegistry([seedAdmin]);
      localStorage.setItem('scrubscout_registry', JSON.stringify([seedAdmin]));
    }

    const savedUser = localStorage.getItem('scrubscout_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const handleSignup = (email: string) => {
    if (userRegistry.find(u => u.email === email)) {
      alert("This email is already registered.");
      setCurrentPage('auth');
      return;
    }
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      displayName: email.split('@')[0],
      role: 'USER',
      isVerified: false,
      verificationStatus: 'UNVERIFIED'
    };
    const newRegistry = [...userRegistry, newUser];
    setUserRegistry(newRegistry);
    localStorage.setItem('scrubscout_registry', JSON.stringify(newRegistry));
    setPendingVerificationEmail(email);
    setCurrentPage('auth');
  };

  const handleVerify = (email: string) => {
    const updatedRegistry = userRegistry.map(u => 
      u.email === email ? { ...u, isVerified: true } : u
    );
    setUserRegistry(updatedRegistry);
    localStorage.setItem('scrubscout_registry', JSON.stringify(updatedRegistry));
    const user = updatedRegistry.find(u => u.email === email)!;
    setCurrentUser(user);
    localStorage.setItem('scrubscout_user', JSON.stringify(user));
    setPendingVerificationEmail(null);
    setCurrentPage('home');
  };

  const handleLogin = (email: string, role: UserRole): User | null => {
    const user = userRegistry.find(u => u.email === email);
    if (user) {
      if (!user.isVerified) {
        setPendingVerificationEmail(email);
        setCurrentPage('auth');
        return null;
      }
      setCurrentUser(user);
      localStorage.setItem('scrubscout_user', JSON.stringify(user));
      setCurrentPage('home');
      return user;
    }
    return null;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('scrubscout_user');
    setCurrentPage('home');
  };

  const handleUpdateProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    localStorage.setItem('scrubscout_user', JSON.stringify(updatedUser));
    const updatedRegistry = userRegistry.map(u => u.id === currentUser.id ? updatedUser : u);
    setUserRegistry(updatedRegistry);
    localStorage.setItem('scrubscout_registry', JSON.stringify(updatedRegistry));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('search');
  };

  const handleFacilityClick = (id: string) => {
    setSelectedFacilityId(id);
    setCurrentPage('detail');
  };

  const handleAddReview = (newReview: Partial<Review>) => {
    const review: Review = {
      id: Math.random().toString(36).substr(2, 9),
      facilityId: newReview.facilityId!,
      userId: newReview.userId!,
      userName: newReview.userName!,
      rating: newReview.rating!,
      title: newReview.title!,
      content: newReview.content!,
      status: 'APPROVED', // Defaulting to approved for MVP
      createdAt: new Date().toISOString(),
      helpfulVotes: 0
    };
    setReviews(prev => [review, ...prev]);
    updateFacilityRating(review.facilityId, review.rating);
  };

  const updateFacilityRating = (facilityId: string, rating: number) => {
    setFacilities(prev => prev.map(f => {
      if (f.id === facilityId) {
        const totalRating = f.rating * f.reviewCount + rating;
        const newCount = f.reviewCount + 1;
        return { ...f, reviewCount: newCount, rating: Number((totalRating / newCount).toFixed(1)) };
      }
      return f;
    }));
  };

  const handleVoteReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, helpfulVotes: r.helpfulVotes + 1 } : r));
  };

  const handleReportReview = (id: string, reason: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isReported: true, reportReason: reason } : r));
    alert("This review has been flagged for investigation.");
  };

  const handleClearReport = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isReported: false, reportReason: undefined } : r));
  };

  const handleApproveReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'APPROVED' } : r));
  };

  const handleRejectReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'REJECTED', isReported: false } : r));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={currentUser} 
        onLogout={handleLogout} 
        onNavigate={(page) => {
          setCurrentPage(page);
          setPendingVerificationEmail(null); 
        }} 
      />
      
      <main className="flex-1">
        {currentPage === 'home' && (
          <Home 
            onSearch={handleSearch} 
            onNavigate={setCurrentPage} 
            recentReviews={reviews.filter(r => r.status === 'APPROVED')}
          />
        )}
        {currentPage === 'search' && (
          <Search 
            facilities={facilities} 
            initialQuery={searchQuery} 
            onFacilityClick={handleFacilityClick} 
          />
        )}
        {currentPage === 'detail' && selectedFacilityId && (
          <PlaceDetail 
            facility={facilities.find(f => f.id === selectedFacilityId)!}
            reviews={reviews.filter(r => r.facilityId === selectedFacilityId)}
            user={currentUser}
            onAddReview={handleAddReview}
            onReportReview={handleReportReview}
            onVoteReview={handleVoteReview}
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'profile' && currentUser && (
          <Profile 
            user={currentUser}
            onUpdate={handleUpdateProfile}
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'auth' && (
          <Auth 
            onLogin={handleLogin} 
            onSignup={handleSignup}
            onVerify={handleVerify}
            pendingVerificationEmail={pendingVerificationEmail}
            onClearPending={() => setPendingVerificationEmail(null)}
          />
        )}
        {currentPage === 'moderation' && currentUser?.role === 'ADMIN' && (
          <Moderation 
            reviews={reviews} 
            onApprove={handleApproveReview} 
            onReject={handleRejectReview} 
            onClearReport={handleClearReport}
          />
        )}
        {(currentPage === 'tos' || currentPage === 'hipaa' || currentPage === 'rights') && (
          <Legal section={currentPage as any} />
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-600 p-1.5 rounded-lg mr-3 shadow-lg shadow-indigo-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <span className="text-white font-black text-2xl tracking-tighter uppercase">ScrubScout</span>
              </div>
              <p className="max-w-md text-sm leading-relaxed font-medium">
                The global community platform for healthcare travelers. Built by professionals, for professionals. Site owners are not responsible for user-generated content or clinical accuracy.
              </p>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-6">Platform</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                <li><button onClick={() => setCurrentPage('search')} className="hover:text-indigo-400 transition">Search Map</button></li>
                <li><button className="hover:text-indigo-400 transition">Verification</button></li>
                <li><button className="hover:text-indigo-400 transition">CMS Directory</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-6">Legal</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                <li><button onClick={() => setCurrentPage('hipaa')} className="hover:text-indigo-400 transition">HIPAA Policy</button></li>
                <li><button onClick={() => setCurrentPage('tos')} className="hover:text-indigo-400 transition">Terms of Service</button></li>
                <li><button onClick={() => setCurrentPage('rights')} className="hover:text-indigo-400 transition">Traveler Rights</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">&copy; 2025 Scout Systems. Use subject to legal disclaimers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
