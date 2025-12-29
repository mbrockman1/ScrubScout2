import React, { useState, useMemo, useCallback } from 'react';
import { Facility, FacilityCategory } from '../types';
import { CATEGORIES, TAGS, STATES } from '../constants';
import PlaceCard from '../components/PlaceCard';

interface SearchProps {
  facilities: Facility[];
  initialQuery?: string;
  onFacilityClick: (id: string) => void;
}

const Search: React.FC<SearchProps> = ({ facilities, initialQuery = '', onFacilityClick }) => {
  // --- "Draft" UI state (what user is typing/selecting right now)
  const [queryInput, setQueryInput] = useState(initialQuery);
  const [draftCategories, setDraftCategories] = useState<FacilityCategory[]>([]);
  const [draftTags, setDraftTags] = useState<string[]>([]);
  const [draftStates, setDraftStates] = useState<string[]>([]);
  const [draftSortBy, setDraftSortBy] = useState<'rating' | 'reviews'>('rating');

  // --- "Applied" state (what actually filters results)
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<FacilityCategory[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews'>('rating');

  const applyFilters = useCallback(() => {
    setSelectedCategories(draftCategories);
    setSelectedTags(draftTags);
    setSelectedStates(draftStates);
    setSortBy(draftSortBy);
  }, [draftCategories, draftTags, draftStates, draftSortBy]);

  const resetFilters = useCallback(() => {
    setDraftCategories([]);
    setDraftTags([]);
    setDraftStates([]);
    setDraftSortBy('rating');

    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedStates([]);
    setSortBy('rating');
  }, []);

  const runSearch = useCallback(() => {
    setQuery(queryInput);
  }, [queryInput]);

  const filteredFacilities = useMemo(() => {
    return facilities
      .filter(f => {
        const q = query.trim().toLowerCase();

        const matchesQuery =
          q.length === 0 ||
          f.name.toLowerCase().includes(q) ||
          f.address.toLowerCase().includes(q) ||
          f.city.toLowerCase().includes(q) ||
          f.state.toLowerCase().includes(q) ||
          f.tags?.some(t => t.toLowerCase().includes(q));

        const matchesCategory =
          selectedCategories.length === 0 || selectedCategories.includes(f.category);

        const matchesTags =
          selectedTags.length === 0 || selectedTags.every(t => f.tags.includes(t));

        const matchesStates =
          selectedStates.length === 0 || selectedStates.includes(f.state);

        return matchesQuery && matchesCategory && matchesTags && matchesStates;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      });
  }, [facilities, query, selectedCategories, selectedTags, selectedStates, sortBy]);

  const toggleCategory = (cat: string) => {
    setDraftCategories(prev =>
      prev.includes(cat as FacilityCategory)
        ? prev.filter(c => c !== (cat as FacilityCategory))
        : [...prev, cat as FacilityCategory]
    );
  };

  const toggleTag = (tag: string) => {
    setDraftTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  const toggleState = (state: string) => {
    setDraftStates(prev => (prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]));
  };

  const hasDraftChanges =
    draftSortBy !== sortBy ||
    draftCategories.length !== selectedCategories.length ||
    draftTags.length !== selectedTags.length ||
    draftStates.length !== selectedStates.length ||
    draftCategories.some(c => !selectedCategories.includes(c)) ||
    draftTags.some(t => !selectedTags.includes(t)) ||
    draftStates.some(s => !selectedStates.includes(s));

  const hasAppliedFilters =
    selectedCategories.length > 0 || selectedTags.length > 0 || selectedStates.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-900">Filters</h2>
              {hasAppliedFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-tight"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Apply Filters Button */}
            <button
              onClick={applyFilters}
              disabled={!hasDraftChanges}
              className={`w-full mb-6 py-2 rounded-xl text-sm font-bold transition-colors ${
                hasDraftChanges
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Apply Filters
            </button>

            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Categories
              </label>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                      checked={draftCategories.includes(cat as FacilityCategory)}
                      onChange={() => toggleCategory(cat)}
                    />
                    <span className="ml-3 text-sm text-slate-600 group-hover:text-indigo-600 transition-colors">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                States
              </label>
              <div className="grid grid-cols-3 gap-1">
                {STATES.map(st => (
                  <button
                    key={st}
                    onClick={() => toggleState(st)}
                    className={`text-[10px] font-bold p-1 rounded border transition-colors ${
                      draftStates.includes(st)
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Popular Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                      draftTags.includes(tag)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Sort By
              </label>
              <select
                value={draftSortBy}
                onChange={(e) => setDraftSortBy(e.target.value as 'rating' | 'reviews')}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1">
          <div className="mb-8 relative">
            <input
              type="text"
              placeholder="Search by Hospital Name, City, State or Provider ID..."
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') runSearch();
              }}
              className="w-full pl-12 pr-32 py-4 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Search Button */}
            <button
              onClick={runSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Search
            </button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-slate-900">
              {filteredFacilities.length} {filteredFacilities.length === 1 ? 'result' : 'results'} found
            </h1>
          </div>

          {filteredFacilities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFacilities.map(f => (
                <PlaceCard key={f.id} facility={f} onClick={onFacilityClick} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">No facilities matching your filters</h2>
              <p className="text-slate-500">Try broadening your search or resetting filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;