import os
import httpx
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

app = FastAPI(title="ScrubScout Backend", version="2.0.0")

# 1. CORS Support
# Configure this to match your frontend URL (e.g., http://localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Data Models (Pydantic)
class Facility(BaseModel):
    id: str = Field(..., alias="provider_id")
    name: str = Field(..., alias="hospital_name")
    address: str
    city: str
    state: str
    zip_code: str = Field(..., alias="zip_code")
    phone_number: Optional[str] = None
    hospital_type: Optional[str] = None
    rating: Optional[str] = Field(None, alias="hospital_overall_rating")

    class Config:
        populate_by_name = True

class ModerateRequest(BaseModel):
    content: str
    parameters: Optional[dict] = {}

# In-memory storage for demonstration (Replace with DB for production)
verified_facilities: List[Facility] = []

# CMS API Configuration
CMS_DATASET_ID = "xubh-q36u"  # Hospital General Information ID
CMS_API_URL = f"https://data.cms.gov/provider-data/api/1/datastore/query/{CMS_DATASET_ID}/0"

# Gemini API Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# 3. Endpoints

@app.get("/api/health")
async def health_check():
    """Verifies the service is running."""
    return {"status": "ok", "service": "ScrubScout API"}

@app.get("/api/facilities", response_model=List[Facility])
async def get_facilities():
    """Serves the verified hospital data."""
    if not verified_facilities:
        return []
    return verified_facilities

@app.post("/api/admin/sync-cms")
async def sync_cms_data():
    """Connects to data.cms.gov to ingest official provider datasets."""
    global verified_facilities
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(CMS_API_URL)
            response.raise_for_status()
            raw_data = response.json()
            
            # The CMS API returns results in a 'results' key
            items = raw_data.get("results", [])
            
            # Map CMS data to our Facility model
            new_facilities = []
            for item in items:
                try:
                    # Filter/Map data to match Facility model
                    facility = Facility(
                        provider_id=item.get("provider_id", ""),
                        hospital_name=item.get("hospital_name", ""),
                        address=item.get("address", ""),
                        city=item.get("city", ""),
                        state=item.get("state", ""),
                        zip_code=item.get("zip_code", ""),
                        phone_number=item.get("phone_number"),
                        hospital_type=item.get("hospital_type"),
                        hospital_overall_rating=item.get("hospital_overall_rating")
                    )
                    new_facilities.append(facility)
                except Exception as e:
                    print(f"Skipping record due to validation error: {e}")
                    continue
            
            verified_facilities = new_facilities
            return {"message": f"Successfully synced {len(verified_facilities)} facilities from CMS."}
            
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch data from CMS: {str(e)}")

@app.post("/api/moderate")
async def moderate_content(request: ModerateRequest):
    """
    Secure proxy for Gemini API to prevent exposing keys on the client side.
    Performs content analysis/moderation on facility reviews or data.
    """
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured on server.")

    try:
        model = genai.GenerativeModel('gemini-pro')
        # Custom prompt for moderation or analysis
        prompt = f"Analyze the following medical facility feedback for professionalism and accuracy: {request.content}"
        
        response = model.generate_content(prompt)
        return {
            "analysis": response.text,
            "status": "moderated"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)