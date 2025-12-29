
import { Facility, Review, User, UserRole } from '../types';
import { MOCK_FACILITIES, MOCK_REVIEWS } from '../constants';

// TOGGLE THIS TO TRUE TO USE THE REAL PYTHON BACKEND
const USE_REAL_API = true; 
// const API_BASE_URL = "http://localhost:8000";
const API_BASE_URL = "http://localhost:8000/api";

// Simulated async delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // --- Facilities ---
  async getFacilities(): Promise<Facility[]> {
    if (USE_REAL_API) {
      const res = await fetch('/api/facilities');
      return res.json();
    }
    await delay(600); // Simulate network latency
    return [...MOCK_FACILITIES];
  },

  // --- Reviews ---
  async getReviews(facilityId?: string): Promise<Review[]> {
    if (USE_REAL_API) {
      const url = facilityId 
        ? `/api/facilities/${facilityId}/reviews`
        : '/api/reviews';
      const res = await fetch(url);
      return res.json();
    }
    await delay(400);
    // Return all or filter by ID
    if (facilityId) {
      return MOCK_REVIEWS.filter(r => r.facilityId === facilityId);
    }
    return [...MOCK_REVIEWS];
  },

  async submitReview(review: Review): Promise<Review> {
    if (USE_REAL_API) {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      return res.json();
    }
    await delay(800);
    return review;
  },

  // --- Auth (Simulated for MVP) ---
  async login(email: string, role: UserRole): Promise<User | null> {
    // Ideally this hits POST /api/auth/login
    await delay(500);
    
    // We keep the localStorage logic from App.tsx here for the "Mock" version
    // to ensure the preview environment works as expected.
    const savedRegistry = localStorage.getItem('scrubscout_registry');
    let registry: User[] = savedRegistry ? JSON.parse(savedRegistry) : [];
    
    const user = registry.find(u => u.email === email);
    return user || null;
  },
  
  async signup(email: string): Promise<void> {
    await delay(500);
    // Logic remains handled by App.tsx state for the Mock version
    // In real version: await fetch('/api/auth/signup', ...)
  }
};
