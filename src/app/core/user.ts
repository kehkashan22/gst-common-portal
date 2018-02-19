import { Moment } from 'moment';

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  dob?: Moment;
  mob?: string;
  qualification?: string;
  designation?: string;
  member_since?: string;
  company?: string;

  stripeCustomerId?: string;
  subscriptions?: {
    [key: string]: 'active' | 'pastDue' | 'cancelled';
  }

  // for Stripe Connect
  accountId?: string;
  refreshToken?: string;
}
