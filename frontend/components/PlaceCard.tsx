
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
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img 
          src={facility.imageUrl} 
          alt={facility.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-black text-slate-800 shadow-sm border border-slate-200 uppercase tracking-widest">
            {facility.category}
          </div>
          {facility.emergencyServices && (
            <div className="bg-red-600 text-white px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></span>
              ER
            </div>
          )}
        </div>
        {facility.hospitalType && (
           <div className="absolute bottom-3 left-3 bg-indigo-600/90 backdrop-blur px-2 py-0.5 rounded text-[9px] font-bold text-white shadow-sm uppercase tracking-tighter">
            {facility.hospitalType}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-1 uppercase tracking-tight">{facility.name}</h3>
        </div>
        <p className="text-slate-500 text-xs mb-1 flex items-center font-medium">
          <svg className="w-3.5 h-3.5 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          {facility.city}, {facility.state}
        </p>
        
        <div className="flex items-center mb-4">
          <StarRating rating={facility.rating} size="sm" />
          <span className="ml-2 text-xs font-bold text-slate-700">{facility.rating}</span>
          <span className="ml-1 text-[10px] text-slate-400">({facility.reviewCount} reviews)</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {facility.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[9px] uppercase tracking-wider font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
          <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Community Profile</span>
          <div className="flex items-center text-indigo-500">
            <span className="text-[9px] font-bold uppercase tracking-widest mr-1">View</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
