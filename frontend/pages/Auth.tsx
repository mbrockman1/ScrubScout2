
import React, { useState } from 'react';
import { UserRole, User } from '../types';

interface AuthProps {
  onLogin: (email: string, role: UserRole) => User | null;
  onSignup: (email: string) => void;
  onVerify: (email: string) => void;
  pendingVerificationEmail: string | null;
  onClearPending: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onSignup, onVerify, pendingVerificationEmail, onClearPending }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      const role: UserRole = email.includes('admin') ? 'ADMIN' : 'USER';
      const user = onLogin(email, role);
      if (!user) {
        // If the user isn't found or not verified, App.tsx handles the state
        // but we can show a general error here if it wasn't a verification redirect
      }
    } else {
      onSignup(email);
    }
  };

  const handleSimulateVerify = () => {
    setIsVerifying(true);
    // Simulate a short network delay
    setTimeout(() => {
      setVerificationSuccess(true);
      setTimeout(() => {
        onVerify(pendingVerificationEmail!);
      }, 1500);
    }, 1200);
  };

  if (pendingVerificationEmail) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl border border-slate-200 text-center">
          {verificationSuccess ? (
            <div className="animate-in fade-in duration-500">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Verified!</h2>
              <p className="text-slate-500 mb-8 font-medium">
                Your account is now active. Redirecting you to your dashboard...
              </p>
            </div>
          ) : (
            <>
              <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Verify Your Email</h2>
              <p className="text-slate-500 mb-8 font-medium text-sm leading-relaxed">
                We've sent a secure verification link to:<br/>
                <span className="text-indigo-600 font-bold text-base">{pendingVerificationEmail}</span><br/>
                Please click the link in your inbox to activate your account.
              </p>
              <div className="space-y-4">
                <button 
                  onClick={handleSimulateVerify}
                  disabled={isVerifying}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-500/30 transition-all flex items-center justify-center disabled:opacity-70"
                >
                  {isVerifying ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying Link...
                    </>
                  ) : 'Simulate Email Link Click'}
                </button>
                <button 
                  onClick={onClearPending}
                  className="text-sm font-bold text-slate-400 hover:text-slate-600 transition"
                >
                  Entered the wrong email? <span className="text-indigo-600">Go back</span>
                </button>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400">
                    Didn't receive the email? <button className="text-indigo-600 font-bold hover:underline">Resend code</button>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl border border-slate-200">
        <div className="text-center mb-10">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-4.514A9.01 9.01 0 0012 2c4.97 0 9 4.03 9 9 0 4.168-2.827 7.678-6.686 8.636" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Join ScrubScout'}
          </h2>
          <p className="text-slate-500 font-medium">
            {isLogin ? 'Enter your credentials to continue' : 'Verified reviews for verified pros'}
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-bold flex items-start animate-in slide-in-from-top-2 duration-300">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="nurse.jackie@healthcare.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
              {isLogin && (
                <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot?</a>
              )}
            </div>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
