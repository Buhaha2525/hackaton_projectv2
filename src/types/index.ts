export type Language = 'fr' | 'en' | 'wo';

export interface Translation {
  fr: string;
  en: string;
  wo: string;
}

export interface Artwork {
  id: string;
  title: Translation;
  description: Translation;
  culturalInfo?: Translation;
  audioUrl?: string;
  videoUrl?: string;
  imageUrl: string;
  category: CategoryType;
  artist?: Translation;
  period?: Translation;
  materials?: Translation;
  dimensions?: Translation;
  year?: number;
  qrCodeData?: string;
}

export type CategoryType = 
  | 'sculpture'
  | 'peinture'
  | 'photographie'
  | 'tapisserie'
  | 'video-art'
  | 'installation';

export interface Category {
  id: CategoryType;
  name: Translation;
  description: Translation;
  icon: string;
}

export interface Exhibition {
  id: string;
  title: Translation;
  description: Translation;
  startDate: string;
  endDate: string;
  imageUrl: string;
  location: Translation;
}

export interface Event {
  id: string;
  title: Translation;
  description: Translation;
  date: string;
  time: string;
  imageUrl: string;
  category: string;
}

export interface MagazineArticle {
  id: string;
  title: Translation;
  excerpt: Translation;
  content: Translation;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
}

export type TourType = 
  | 'history'
  | 'contemporary'
  | 'textiles'
  | 'music'
  | 'general';

export interface GuidedTour {
  id: TourType;
  name: Translation;
  description: Translation;
  duration: string;
  artworkIds: string[];
  icon: string;
}

export interface ScanPoint {
  id: string;
  artworkId: string;
  points: number;
  unlockContent?: {
    type: 'video' | 'audio' | 'text' | 'image';
    url?: string;
    content?: Translation;
  };
}