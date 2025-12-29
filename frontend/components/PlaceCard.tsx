import React from 'react';
import { Facility } from '../types';
import StarRating from './StarRating';

interface PlaceCardProps {
  facility: Facility;
  onClick: (id: string) => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ facility, onClick }) => {
  return (
    <div 
      onClick={() => onClick(facility.id)}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-100 transition-all cursor-pointer group flex flex-col h-full"
    >
      {/* Header: Name and ID */}
      <div className="mb-3">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-2 uppercase tracking-tight">
            {facility.name}
          </h3>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
          ID: {facility.id}
        </p>
      </div>

      {/* Location */}
      <div className="flex items-center text-slate-500 text-sm mb-4 font-medium">
        <svg className="w-4 h-4 mr-1.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        {facility.city}, {facility.state}
      </div>
      
      {/* Stats Section */}
      <div className="bg-slate-50 rounded-xl p-3 flex items-center mb-4">
        <StarRating rating={facility.rating} size="sm" />
        <span className="ml-3 text-sm font-black text-slate-800">{facility.rating}</span>
        <div className="mx-3 w-1 h-1 bg-slate-300 rounded-full"></div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
          {facility.reviewCount} Reviews
        </span>
      </div>

      {/* Tags Section */}
      <div className="flex flex-wrap gap-2 mb-6">
        {facility.tags && facility.tags.length > 0 ? (
          facility.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[9px] uppercase tracking-widest font-black bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))
        ) : (
          <span className="text-[9px] uppercase tracking-widest font-black bg-slate-100 text-slate-400 px-2 py-1 rounded-md">
            General Facility
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Community Profile</span>
        <div className="flex items-center text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <span className="text-[10px] font-black uppercase tracking-widest mr-1">View</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;