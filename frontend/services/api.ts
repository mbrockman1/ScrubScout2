export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number?: string;
  hospital_type?: string;
  rating?: string;
  latitude?: number;
  longitude?: number;
}

export interface Review {
  facility_id: string;
  rating: number;
  content: string;
  author?: string;
}

const API_BASE_URL = "http://localhost:8000/api";

export const api = {
  // Fetch all hospitals and normalize data names
  getHospitals: async (): Promise<Hospital[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/facilities`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      // Map Backend (Excel) keys to Frontend keys
      return data.map((h: any) => ({
        ...h,
        id: h.provider_id || h.id,
        name: h.hospital_name || h.name,
        rating: h.hospital_overall_rating || h.rating
      }));
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      return [];
    }
  },

  // Fetch reviews
  getReviews: async (facilityId?: string): Promise<Review[]> => {
    try {
      const url = facilityId 
        ? `${API_BASE_URL}/facilities/${facilityId}/reviews` 
        : `${API_BASE_URL}/reviews`;
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  },

  getFacilities: async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/facilities`);
    if (!response.ok) throw new Error("Backend not responding");
    const data = await response.json();
    
    // Transform the Backend data into exactly what your Search/Map components expect
    return data.map((f: any) => ({
      ...f,
      id: f.provider_id || f.id,
      name: f.hospital_name || f.name,
      // Ensure numbers are actually numbers
      rating: f.hospital_overall_rating ? parseFloat(f.hospital_overall_rating) : 0,
      reviewCount: f.reviewCount || 0,
      // Ensure coordinates exist even if blank in Excel (to prevent Map crash)
      latitude: f.latitude || null,
      longitude: f.longitude || null
    }));
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
},

  submitReview: async (review: any) => {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    return await response.json();
  },
  
  signup: async (email: string) => {
    return { success: true };
  },

  // Post a new review
  addReview: async (review: Review): Promise<void> => {
    await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
  }
};