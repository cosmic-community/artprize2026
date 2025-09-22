export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface SiteSettings extends CosmicObject {
  type: 'site-settings';
  metadata: {
    countdown_date?: string;
    total_raised?: number;
    manifesto?: string;
    donation_link?: string;
    suggestion_link?: string;
    disclaimer?: string;
  };
}

export interface Update extends CosmicObject {
  type: 'updates';
  metadata: {
    title?: string;
    content?: string;
    published_date?: string;
  };
}

export interface Idea extends CosmicObject {
  type: 'ideas';
  metadata: {
    idea?: string;
    submitted_date?: string;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export interface SiteConfig {
  countdown_date: string;
  total_raised: number;
  manifesto: string;
  donation_link: string;
  suggestion_link: string;
  disclaimer: string;
}