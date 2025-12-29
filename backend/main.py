import os
import pandas as pd
from contextlib import asynccontextmanager
from typing import List, Optional
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ConfigDict

# 1. STORAGE
verified_facilities: List["Facility"] = []
reviews_db: List["Review"] = []

# 2. LIFESPAN
@asynccontextmanager
async def lifespan(app: FastAPI):
    global verified_facilities
    print("\n--- SCRUBSCOUT STARTUP ---")
    file_path = "hospital.xlsx"
    
    if os.path.exists(file_path):
        try:
            df = pd.read_excel(file_path)
            
            # Clean names: lowercase, strip whitespace, replace spaces with underscores
            df.columns = [c.lower().strip().replace(' ', '_').replace('/', '_') for c in df.columns]
            
            # DEBUG: This will show us exactly what columns Python sees
            print(f"DEBUG: Found columns: {df.columns.tolist()}")
            
            # --- UPDATED SMART MAPPING ---
            # We look for common variations and rename them to match the model
            mapping = {
                'facility_id': 'provider_id',
                'facility_name': 'hospital_name',
                'city_town': 'city',
                'telephone_number': 'phone_number' # ADD THIS LINE
            }
            
            # Find ID column
            for col in ['facility_id', 'provider_id', 'hospital_id']:
                if col in df.columns: mapping[col] = 'provider_id'
            
            # Find Name column
            for col in ['facility_name', 'hospital_name', 'name']:
                if col in df.columns: mapping[col] = 'hospital_name'
                
            # Find City column (Handles 'city', 'city_town', 'town', etc)
            for col in ['city', 'city_town', 'town', 'city_state']:
                if col in df.columns: mapping[col] = 'city'

            df = df.rename(columns=mapping)
            
            # Force types to prevent Pydantic crashes
            if 'zip_code' in df.columns:
                df['zip_code'] = df['zip_code'].astype(str)
            if 'provider_id' in df.columns:
                df['provider_id'] = df['provider_id'].astype(str)
                
            # Handle empty cells
            df = df.where(pd.notnull(df), None)
            
            data = df.to_dict(orient="records")
            verified_facilities = [Facility(**item) for item in data]
            print(f"✅ SUCCESS: Loaded {len(verified_facilities)} hospitals.")
            
        except Exception as e:
            print(f"❌ DATA ERROR: {e}")
            # Optional: print the first row of data to see what it looks like
            if 'df' in locals():
                print(f"SAMPLE ROW: {df.iloc[0].to_dict() if not df.empty else 'Empty'}")
    else:
        print(f"⚠️ FILE NOT FOUND: {file_path}")
    
    yield
    print("--- SCRUBSCOUT SHUTDOWN ---")

# 3. INITIALIZATION
app = FastAPI(title="ScrubScout Backend", version="3.2.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. MODELS (Added Optional to City just in case)
class Facility(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    
    id: str = Field(..., alias="provider_id")
    name: str = Field(..., alias="hospital_name")
    address: str
    city: str = "Unknown"
    state: str
    zip_code: str = Field(..., alias="zip_code")
    phone_number: Optional[str] = None
    hospital_type: Optional[str] = None
    rating: Optional[str] = Field(None, alias="hospital_overall_rating")
    # ADD THESE TWO LINES:
    latitude: Optional[float] = None
    longitude: Optional[float] = None

  

class Review(BaseModel):
    facility_id: str
    rating: int
    content: str
    author: Optional[str] = "Anonymous"

# 5. ENDPOINTS
@app.get("/")
async def root():
    return {"message": "ScrubScout API v3.2.0"}

@app.get("/api/health")
async def health():
    return {"hospitals": len(verified_facilities), "reviews": len(reviews_db)}

@app.get("/api/facilities", response_model=List[Facility])
async def get_facilities():
    return verified_facilities

@app.get("/api/hospitals", response_model=List[Facility])
async def get_hospitals_alias():
    return verified_facilities

@app.get("/api/reviews")
async def get_reviews():
    return reviews_db

@app.post("/api/reviews")
async def add_review(review: Review):
    reviews_db.append(review)
    return review

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)