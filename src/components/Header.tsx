import React, { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';
import { Globe, User, Menu, X, QrCode } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type ViewType = 'home' | 'category' | 'events' | 'magazine' | 'scan' | 'visit' | 'tours' | 'collections' | 'profile' | 'history';

interface HeaderProps {
  onNavigate: (view: ViewType) => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languageOptions = [
    { value: 'fr' as Language, label: 'Français' },
    { value: 'en' as Language, label: 'English' },
    { value: 'wo' as Language, label: 'Wolof' }
  ];

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-2">
        {/* Logo - Cliquable pour retour accueil */}
        <div 
          className="flex items-center gap-3 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onNavigate('home')}
        >
          <ImageWithFallback 
            src="https://mcn-sn.com/wp-content/uploads/2025/02/Logo_MCN_ang_Fran_Plan-de-travail-1-copie-4.png" 
            alt="Logo Musée des Civilisations Noires" 
            className="w-12 h-12 object-cover rounded-full"
          />
          <h1 className="hidden md:block text-sm whitespace-nowrap">
            {t('museum.title')}
          </h1>
        </div>
        
        {/* Navigation Desktop */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto">
          <Button
            variant={currentView === 'home' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('home')}
          >
            {t('nav.home')}
          </Button>
          <Button
            variant={currentView === 'history' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('history')}
          >
            Histoire du Musée
          </Button>
          <Button
            variant={currentView === 'collections' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('collections')}
          >
            Collections
          </Button>
          <Button
            variant={currentView === 'events' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('events')}
          >
            {t('events.title')}
          </Button>
          <Button
            variant={currentView === 'magazine' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('magazine')}
          >
            {t('nav.magazine')}
          </Button>
          <Button
            variant={currentView === 'scan' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('scan')}
          >
            {t('nav.scan')}
          </Button>
          <Button
            variant={currentView === 'tours' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('tours')}
          >
            {t('tour.title')}
          </Button>
          <Button
            variant={currentView === 'visit' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('visit')}
          >
            {t('nav.visit')}
          </Button>
        </nav>

        {/* Actions Desktop + Mobile */}
        <div className="flex items-center gap-2 shrink-0">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="h-9 w-28 text-sm gap-1">
              <Globe className="w-4 h-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant={currentView === 'profile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('profile')}
            className="hidden lg:flex w-9 h-9 p-0"
          >
            <User className="w-5 h-5" />
          </Button>

          {/* Menu Hamburger Mobile */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden w-9 h-9 p-0"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[340px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <ImageWithFallback 
                    src="https://mcn-sn.com/wp-content/uploads/2025/02/Logo_MCN_ang_Fran_Plan-de-travail-1-copie-4.png" 
                    alt="MCN" 
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <span className="text-sm">Menu</span>
                </SheetTitle>
              </SheetHeader>
              
              <nav className="flex flex-col gap-2 mt-8">
                <Button
                  variant={currentView === 'home' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate('home');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t('nav.home')}
                </Button>
                <Button
                  variant={currentView === 'history' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate('history');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Histoire du Musée
                </Button>
                <Button
                  variant={currentView === 'collections' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate('collections');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Collections
                </Button>
                <Button
                  variant={currentView === 'events' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate('events');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t('events.title')}
                </Button>
                <Button
                  variant={currentView === 'magazine' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate('magazine');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t('nav.magazine')}
                </Button>
                <Button
                  variant={currentView === 'scan' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate('scan');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t('nav.scan')}
                </Button>
                <Button
                  variant={currentView === 'tours' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate('tours');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t('tour.title')}
                </Button>
                <Button
                  variant={currentView === 'visit' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate('visit');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t('nav.visit')}
                </Button>
                
                <div className="border-t border-border my-4" />
                
                <Button
                  variant={currentView === 'profile' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate('profile');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};