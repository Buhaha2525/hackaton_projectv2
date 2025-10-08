import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { CategoryPage } from './components/CategoryPage';
import { ArtworkDetail } from './components/ArtworkDetail';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { EventsPage } from './components/EventsPage';
import { MagazinePage } from './components/MagazinePage';
import { VisitInfoPage } from './components/VisitInfoPage';
import { QRScanPage } from './components/QRScanPage';
import { VirtualTourPage } from './components/VirtualTourPage';
import { CollectionsPage } from './components/CollectionsPage';
import { UserProfile } from './components/UserProfile';
import { HistoryPage } from './components/HistoryPage';
import { Chatbot } from './components/Chatbot';
import { Footer } from './components/Footer';
import { Artwork, CategoryType } from './types';
import { artworks } from './data/mockData';

type View = 'home' | 'category' | 'artwork' | 'about' | 'contact' | 'events' | 'magazine' | 'scan' | 'visit' | 'tours' | 'profile' | 'collections' | 'history';

interface AppState {
  view: View;
  selectedCategory?: CategoryType;
  selectedArtwork?: Artwork;
  artworkIndex?: number;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    view: 'home'
  });

  const handleNavigate = (view: 'home' | 'category' | 'about' | 'contact' | 'events' | 'magazine' | 'scan' | 'visit' | 'tours' | 'profile' | 'collections' | 'history') => {
    setAppState({ view, selectedCategory: undefined, selectedArtwork: undefined });
  };

  const handleCategoryClick = (categoryId: CategoryType) => {
    setAppState({
      view: 'category',
      selectedCategory: categoryId
    });
  };

  const handleArtworkClick = (artwork: Artwork) => {
    const categoryArtworks = artworks.filter(a => a.category === artwork.category);
    const artworkIndex = categoryArtworks.findIndex(a => a.id === artwork.id);
    
    setAppState({
      view: 'artwork',
      selectedArtwork: artwork,
      selectedCategory: artwork.category,
      artworkIndex
    });
  };

  const handleArtworkNavigation = (direction: 'previous' | 'next') => {
    if (!appState.selectedCategory || appState.artworkIndex === undefined) return;
    
    const categoryArtworks = artworks.filter(a => a.category === appState.selectedCategory);
    const currentIndex = appState.artworkIndex;
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex >= 0 && newIndex < categoryArtworks.length) {
      const newArtwork = categoryArtworks[newIndex];
      setAppState({
        ...appState,
        selectedArtwork: newArtwork,
        artworkIndex: newIndex
      });
    }
  };

  const handleBack = () => {
    if (appState.view === 'artwork' && appState.selectedCategory) {
      setAppState({
        view: 'category',
        selectedCategory: appState.selectedCategory
      });
    } else {
      setAppState({ view: 'home' });
    }
  };

  const getCategoryArtworks = () => {
    if (!appState.selectedCategory) return [];
    return artworks.filter(a => a.category === appState.selectedCategory);
  };

  const hasNavigationOptions = () => {
    const categoryArtworks = getCategoryArtworks();
    const currentIndex = appState.artworkIndex ?? 0;
    return {
      hasPrevious: currentIndex > 0,
      hasNext: currentIndex < categoryArtworks.length - 1
    };
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header onNavigate={handleNavigate} currentView={appState.view} />
        
        {appState.view === 'home' && (
          <HomePage
            onArtworkClick={handleArtworkClick}
            onCategoryClick={handleCategoryClick}
            onNavigate={handleNavigate}
          />
        )}
        
        {appState.view === 'category' && appState.selectedCategory && (
          <CategoryPage
            categoryId={appState.selectedCategory}
            onArtworkClick={handleArtworkClick}
            onBack={handleBack}
          />
        )}
        
        {appState.view === 'artwork' && appState.selectedArtwork && (
          <ArtworkDetail
            artwork={appState.selectedArtwork}
            onBack={handleBack}
            onPrevious={() => handleArtworkNavigation('previous')}
            onNext={() => handleArtworkNavigation('next')}
            {...hasNavigationOptions()}
          />
        )}
        
        {appState.view === 'about' && (
          <AboutPage onBack={handleBack} />
        )}
        
        {appState.view === 'contact' && (
          <ContactPage onBack={handleBack} />
        )}
        
        {appState.view === 'events' && (
          <EventsPage onBack={handleBack} />
        )}
        
        {appState.view === 'magazine' && (
          <MagazinePage onBack={handleBack} />
        )}
        
        {appState.view === 'scan' && (
          <QRScanPage 
            onBack={handleBack}
            onArtworkFound={handleArtworkClick}
            onExhibitionFound={(exhibitionId) => handleNavigate('events')}
          />
        )}
        
        {appState.view === 'visit' && (
          <VisitInfoPage 
            onBack={handleBack}
          />
        )}
        
        {appState.view === 'tours' && (
          <VirtualTourPage 
            onBack={handleBack}
            onCategoryClick={handleCategoryClick}
          />
        )}
        
        {appState.view === 'collections' && (
          <CollectionsPage 
            onBack={handleBack}
            onCategoryClick={handleCategoryClick}
          />
        )}
        
        {appState.view === 'profile' && (
          <UserProfile onBack={handleBack} />
        )}
        
        {appState.view === 'history' && (
          <HistoryPage onBack={handleBack} />
        )}
        
        <Footer onNavigate={handleNavigate} />
        <Chatbot />
      </div>
    </LanguageProvider>
  );
}
