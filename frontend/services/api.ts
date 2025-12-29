const API_BASE_URL = "http://localhost:8000/api";

export const api = {
  getFacilities: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/facilities`);
      const data = await response.json();
      
      return data.map((f: any) => {
        // 1. Clean the ALL CAPS names to "Title Case"
        const rawName = f.hospital_name || f.facility_name || f.name || "Unknown Hospital";
        const cleanName = rawName.toLowerCase().replace(/\b\w/g, (l: any) => l.toUpperCase());

        return {
          id: String(f.provider_id || f.id || Math.random()),
          name: cleanName,
          address: String(f.address || "No Address"),
          city: String(f.city || "Unknown City"),
          state: String(f.state || ""),
          zip_code: String(f.zip_code || ""),
          phone_number: String(f.phone_number || f.telephone_number || ""),
          // CRITICAL: Force these to match Search.tsx expectations
          category: f.hospital_type || "General Hospital",
          tags: [], // Prevents line 30 crash in Search.tsx
          rating: f.hospital_overall_rating ? parseFloat(f.hospital_overall_rating) : 0,
          reviewCount: 0
        };
      });
    } catch (error) {
      console.error("API Error:", error);
      return [];
    }
  },

  getReviews: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`);
      return await response.json();
    } catch (error) { return []; }
  },

  submitReview: async (review: any) => {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    return await response.json();
  },

  signup: async (email: string) => ({ success: true })
};