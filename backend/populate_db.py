import pandas as pd
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
import os

# EXACT mapping of your Excel headers to Database fields
COLUMN_MAPPING = {
    "Facility ID": "facility_id_external",
    "Facility Name": "name",
    "Address": "address",
    "City/Town": "city",
    "State": "state",
    "ZIP Code": "zip_code",
    "Hospital Type": "facility_type",
    "Hospital Ownership": "ownership"
}

def populate_hospitals(file_path: str):
    if not os.path.exists(file_path):
        print(f"Error: File '{file_path}' not found in current directory.")
        return

    db: Session = SessionLocal()
    try:
        # Load excel
        df = pd.read_excel(file_path)
        
        # Strip any hidden whitespace from column headers
        df.columns = df.columns.str.strip()
        
        # Rename based on the mapping above
        df = df.rename(columns=COLUMN_MAPPING)

        count_added = 0
        count_skipped = 0

        for _, row in df.iterrows():
            # Check for duplicate using the unique Facility ID
            exists = db.query(models.Facility).filter(
                models.Facility.facility_id_external == str(row['facility_id_external'])
            ).first()

            if not exists:
                # Filter out columns that aren't in our DB model
                data = {k: v for k, v in row.to_dict().items() if k in COLUMN_MAPPING.values()}
                
                # Convert everything to string for safety (except ID)
                for key in data:
                    if pd.isna(data[key]): data[key] = None
                    else: data[key] = str(data[key])

                new_facility = models.Facility(**data)
                db.add(new_facility)
                count_added += 1
            else:
                count_skipped += 1
        
        db.commit()
        print(f"Success! Added: {count_added} facilities. Skipped: {count_skipped} (already exist).")

    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # This creates the tables based on the updated models.py
    models.Base.metadata.drop_all(bind=engine) # Optional: clears DB to start fresh with new columns
    models.Base.metadata.create_all(bind=engine)
    populate_hospitals("hospital.xlsx")