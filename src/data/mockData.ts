import { Artwork, Category, Exhibition, Event, MagazineArticle, GuidedTour, ScanPoint } from '../types';

export const categories: Category[] = [
  {
    id: 'sculpture',
    name: {
      fr: 'Sculpture',
      en: 'Sculpture',
      wo: 'Jaarul'
    },
    description: {
      fr: 'Sculptures en bois, bronze, pierre et métal, masques rituels, figurines traditionnelles',
      en: 'Wood, bronze, stone and metal sculptures, ritual masks, traditional figurines',
      wo: 'Jaarul garab, bronze, benn ak iron'
    },
    icon: '🗿'
  },
  {
    id: 'painting',
    name: {
      fr: 'Peinture',
      en: 'Painting',
      wo: 'Nat'
    },
    description: {
      fr: 'Peintures contemporaines et traditionnelles, fresques, art mural africain',
      en: 'Contemporary and traditional paintings, frescoes, African mural art',
      wo: 'Nat yu réew ak yu gàddi'
    },
    icon: '🎨'
  },
  {
    id: 'photography',
    name: {
      fr: 'Photographie',
      en: 'Photography',
      wo: 'Nataal'
    },
    description: {
      fr: 'Photographies historiques et contemporaines, archives visuelles de l\'Afrique',
      en: 'Historical and contemporary photography, visual archives of Africa',
      wo: 'Nataal yu tàriix ak yu réew'
    },
    icon: '📷'
  },
  {
    id: 'tapestry',
    name: {
      fr: 'Tapisserie',
      en: 'Tapestry',
      wo: 'Ndongo'
    },
    description: {
      fr: 'Textiles traditionnels, tissages, tapisseries narratives africaines',
      en: 'Traditional textiles, weavings, African narrative tapestries',
      wo: 'Ndongo yu gàddi, sereer'
    },
    icon: '🧵'
  },
  {
    id: 'videoart',
    name: {
      fr: 'Vidéo Art',
      en: 'Video Art',
      wo: 'Video Art'
    },
    description: {
      fr: 'Art vidéo contemporain, performances filmées, installations vidéo',
      en: 'Contemporary video art, filmed performances, video installations',
      wo: 'Video art yu réew'
    },
