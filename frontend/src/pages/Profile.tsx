
import React, { useState } from 'react';
import { User, VerificationStatus } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (updates: Partial<User>) => void;
  onNavigate: (page: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onNavigate }) => {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar || '');
  const [licenseNumber, setLicenseNumber] = useState(user.licenseNumber || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onUpdate({ displayName, avatar: avatarUrl, licenseNumber });
      setIsSaving(false);
      alert("Profile updated successfully!");
    }, 800);
  };

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      onUpdate({ verificationStatus: 'PENDING' });
      setIsUploading(false);
    }, 2000);
  };

  const AVATAR_PRESETS = [
    'https://images.unsplash.com/photo-1559839734-2b71ef197ec2?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-[40px] shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 h-32 md:h-48 relative">
          <div className="absolute -bottom-12 left-8 md:left-12">
            <div className="relative group">
              {avatarUrl ? (
                <img src={avatarUrl} className="w-24 h-24 md:w-32 md:h-32 rounded-[24px] md:rounded-[32px] border-4 border-white shadow-xl object-cover" alt="Profile" />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[24px] md:rounded-[32px] bg-indigo-600 border-4 border-white shadow-xl flex items-center justify-center text-white text-4xl font-black">
                  {user.displayName.charAt(0)}
                </div>
              )}
            </div>
          </div>
          <div className="absolute bottom-4 right-8">
             <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border ${
               user.verificationStatus === 'VERIFIED' ? 'bg-emerald-500 text-white border-emerald-400' : 
               user.verificationStatus === 'PENDING' ? 'bg-amber-500 text-white border-amber-400' : 
               'bg-slate-800 text-slate-400 border-slate-700'
             }`}>
               {user.verificationStatus}
             </span>
          </div>
        </div>

        <div className="pt-16 px-8 md:px-12 pb-12">
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Scout Profile</h1>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Manage your professional identity</p>
            </div>
            
            {user.verificationStatus === 'UNVERIFIED' && (
               <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-3xl md:max-w-sm">
                  <h4 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-1">Verify Professional Status</h4>
                  <p className="text-[10px] text-indigo-600 font-bold leading-relaxed mb-4">Upload a photo of your badge or nursing license to unlock "Verified Traveler" badges on your reviews.</p>
                  <button 
                    onClick={handleSimulateUpload}
                    disabled={isUploading}
                    className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isUploading ? 'Uploading Document...' : 'Upload Credentials'}
                  </button>
               </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Professional Nickname</label>
                <input 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-black text-slate-700"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">NPI or License # (Optional)</label>
                <input 
                  type="text" 
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="E.g. RN-12345678"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-black text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Choose Clinical Avatar</label>
              <div className="flex flex-wrap gap-4">
                {AVATAR_PRESETS.map((p, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setAvatarUrl(p)}
                    className={`w-16 h-16 rounded-xl overflow-hidden cursor-pointer border-4 transition-all ${avatarUrl === p ? 'border-indigo-600 scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={p} className="w-full h-full object-cover" alt={`Preset ${idx}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-slate-100">
               <button 
                type="button"
                onClick={() => onNavigate('home')}
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition"
              >
                Discard Changes
              </button>
              <button 
                type="submit"
                disabled={isSaving}
                className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition shadow-2xl disabled:opacity-50 flex items-center"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : 'Save Professional Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
