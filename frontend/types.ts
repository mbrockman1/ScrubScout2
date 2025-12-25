
export type UserRole = 'USER' | 'ADMIN';
export type VerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  isVerified: boolean; // Email verification
  verificationStatus: VerificationStatus; // Professional license verification
  licenseNumber?: string;
  avatar?: string;
}

export type FacilityCategory = 'Hospital' | 'Clinic' | 'Agency';

export interface Facility {
  id: string; // Facility ID (CMS Provider ID)
  name: string; // Facility Name
  category: FacilityCategory;
  address: string;
  city: string; // City/Town
  state: string;
  zipCode: string; // ZIP Code
  county?: string; // County/Parish
  telephone?: string; // Telephone Number
  hospitalType?: string; // Hospital Type
  ownership?: string; // Hospital Ownership
  emergencyServices?: boolean; // Emergency Services (Yes/No)
  description: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  imageUrl: string;
}

export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED';

export interface Review {
  id: string;
  facilityId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  status: ReviewStatus;
  moderationReason?: string;
  createdAt: string;
  isReported?: boolean;
  reportReason?: string;
  helpfulVotes: number;
}

export interface ModerationResult {
  status: ReviewStatus;
  reason: string;
}
