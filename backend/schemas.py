from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime

class ReviewBase(BaseModel):
    # This allows the frontend to send 'comment' OR 'content'
    content: str = Field(..., alias="comment", validation_alias="content") 
    
    # This allows the frontend to send 'rating'
    rating: int 
    
    # This allows the frontend to send 'facilityId' OR 'facility_id'
    facility_id: int = Field(..., alias="facilityId", validation_alias="facility_id")
    
    staffing_ratio: Optional[str] = None

    model_config = ConfigDict(
        populate_by_name=True, # Allows us to use content/facility_id in Python code
        from_attributes=True
    )

class ReviewCreate(ReviewBase):
    pass

class Review(ReviewBase):
    id: int
    is_approved: bool
    created_at: datetime
    class Config:
        from_attributes = True

class FacilityBase(BaseModel):
    name: str
    state: str
    city: Optional[str] = None
    address: Optional[str] = None
    zip_code: Optional[str] = None
    # This maps the DB 'facility_type' to the JSON 'category'
    category: Optional[str] = Field(None, alias="facility_type")
    ownership: Optional[str] = None
    facility_id_external: Optional[str] = None

class Facility(FacilityBase):
    id: int
    rating: float
    
    class Config:
        from_attributes = True
        populate_by_name = True # Allows using 'category' or 'facility_type'