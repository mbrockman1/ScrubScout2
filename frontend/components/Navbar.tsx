
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="bg-indigo-600 p-2 rounded-lg shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="ml-3 text-xl font-black text-slate-900 tracking-tighter uppercase">ScrubScout</span>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <button 
              onClick={() => onNavigate('search')}
              className="hidden sm:block text-slate-600 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition"
            >
              Browse
            </button>
            
            {user ? (
              <div className="flex items-center space-x-2 md:space-x-4">
                {user.role === 'ADMIN' && (
                  <button 
                    onClick={() => onNavigate('moderation')}
                    className="text-orange-600 hover:text-orange-700 font-black text-[10px] uppercase tracking-widest transition"
                  >
                    Admin
                  </button>
                )}
                <div 
                  onClick={() => onNavigate('profile')}
                  className="flex items-center space-x-2 bg-slate-50 py-1 pl-1 pr-3 rounded-full border border-slate-200 cursor-pointer hover:border-indigo-300 transition-colors"
                >
                  {user.avatar ? (
                    <img src={user.avatar} className="w-8 h-8 rounded-full object-cover border border-white" alt="Avatar" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-black">
                      {user.displayName.charAt(0)}
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-bold text-slate-700">{user.displayName}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-slate-400 hover:text-red-500 transition"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('auth')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest transition shadow-md shadow-indigo-200"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
