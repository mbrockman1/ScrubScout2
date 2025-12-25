
import { Facility, Review } from './types';

export const MOCK_FACILITIES: Facility[] = [
  {
    id: '050444',
    name: 'CEDARS-SINAI MEDICAL CENTER',
    category: 'Hospital',
    address: '8700 BEVERLY BLVD',
    city: 'LOS ANGELES',
    state: 'CA',
    zipCode: '90048',
    county: 'LOS ANGELES',
    telephone: '(310) 423-3277',
    hospitalType: 'Acute Care Hospitals',
    ownership: 'Voluntary non-profit - Private',
    emergencyServices: true,
    description: 'Publicly listed facility. This profile is managed by the ScrubScout community. Users provide feedback on clinical culture, staffing, and traveler experience.',
    tags: ['ER', 'High Pay', 'Teaching', 'Magnet'],
    rating: 4.8,
    reviewCount: 45,
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '240010',
    name: 'MAYO CLINIC HOSPITAL ROCHESTER',
    category: 'Hospital',
    address: '1216 SECOND STREET SW',
    city: 'ROCHESTER',
    state: 'MN',
    zipCode: '55902',
    county: 'OLMSTED',
    telephone: '(507) 284-2511',
    hospitalType: 'Acute Care Hospitals',
    ownership: 'Voluntary non-profit - Private',
    emergencyServices: true,
    description: 'Publicly listed facility. Information provided below is based on collective traveler feedback and public CMS records.',
    tags: ['Magnet', 'Research', 'ICU', 'Top Rated'],
    rating: 4.9,
    reviewCount: 32,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '330101',
    name: 'NEW YORK-PRESBYTERIAN HOSPITAL',
    category: 'Hospital',
    address: '525 EAST 68TH STREET',
    city: 'NEW YORK',
    state: 'NY',
    zipCode: '10021',
    county: 'NEW YORK',
    telephone: '(212) 746-5450',
    hospitalType: 'Acute Care Hospitals',
    ownership: 'Voluntary non-profit - Private',
    emergencyServices: true,
    description: 'Community-maintained facility profile. ScrubScout acts as a passive conduit for clinician reviews of this institution.',
    tags: ['IVY', 'Busy', 'Union', 'Teaching'],
    rating: 4.6,
    reviewCount: 88,
    imageUrl: 'https://images.unsplash.com/photo-1538108197003-59698d48a903?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'sample-1',
    facilityId: '050444',
    userId: 'u1',
    userName: 'Traveler_Sarah (Sample)',
    rating: 5,
    title: 'Top Notch Experience',
    content: '[SAMPLE REVIEW] The floating policy is fair, and the tech is cutting edge. Staff is traveler-friendly. This is an example of a verified traveler review.',
    status: 'APPROVED',
    createdAt: '2023-10-15T10:00:00Z',
    helpfulVotes: 24
  },
  {
    id: 'sample-2',
    facilityId: '330101',
    userId: 'u2',
    userName: 'ICU_Jake (Sample)',
    rating: 4,
    title: 'Fast Paced NYC Life',
    content: '[SAMPLE REVIEW] Very busy, high acuity. Prepare to hustle. This is an example of a professional experience report.',
    status: 'APPROVED',
    createdAt: '2023-11-02T14:30:00Z',
    helpfulVotes: 12
  }
];

export const CATEGORIES = ['Hospital', 'Clinic', 'Agency'];
export const STATES = ['AL', 'CA', 'FL', 'MN', 'NY', 'TX', 'WA'];
export const TAGS = ['ER', 'ICU', 'Magnet', 'High Pay', 'Housing Provided', 'Teaching', 'Psych', 'Regional'];
