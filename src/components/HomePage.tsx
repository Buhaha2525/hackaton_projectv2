import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArtworkCard } from './ArtworkCard';
import { HeroSlider } from './HeroSlider';
import { useLanguage } from '../contexts/LanguageContext';
import { categories, getFeaturedArtworks, exhibitions, events } from '../data/mockData';
import { Artwork, CategoryType } from '../types';
import { ArrowRight, Calendar, Map as MapIcon, Play, QrCode } from 'lucide-react';

interface HomePageProps {
  onArtworkClick: (artwork: Artwork) => void;
  onCategoryClick: (categoryId: CategoryType) => void;
  onNavigate: (view: 'events' | 'tours' | 'scan' | 'visit' | 'virtual360') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onArtworkClick, 
  onCategoryClick,
  onNavigate 
}) => {
  const { language, t } = useLanguage();

  const scrollToCollections = () => {
    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EED7C5] via-white to-[#EED7C5]">
      {/* Hero Slider */}
      <HeroSlider 
        onExploreClick={scrollToCollections}
        onScanClick={() => onNavigate('scan')}
      />

      {/* Virtual Tour Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#EED7C5] to-[#B67332]/10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-6 text-[#93441A]">
              {t('home.virtualTour')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Explorez le Musée des Civilisations Noires depuis chez vous grâce à notre visite virtuelle immersive. Découvrez nos collections, parcourez les salles et profitez d'une expérience interactive avec plan du musée, parcours thématiques personnalisés et contenus enrichis.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#7a3715] hover:to-[#9e5f29] text-white px-10 py-6 shadow-lg hover:shadow-xl transition-all"
              onClick={() => onNavigate('virtual360')}
            >
              <Play className="w-5 h-5 mr-2" />
              Commencer la visite
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Exhibitions */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl">
              {t('home.featuredExhibitions')}
            </h2>
            <Button 
              variant="outline"
              onClick={() => onNavigate('events')}
              className="gap-2"
            >
              {t('action.seeMore')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {exhibitions.slice(0, 2).map((exhibition) => (
              <Card 
                key={exhibition.id} 
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                onClick={() => onNavigate('events')}
              >
                <div className="relative h-64">
                  <img
                    src={exhibition.imageUrl}
                    alt={exhibition.title[language]}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-2">{exhibition.title[language]}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{exhibition.description[language]}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-[#B67332]">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(exhibition.startDate).toLocaleDateString(language)} - 
                      {new Date(exhibition.endDate).toLocaleDateString(language)}
                    </div>
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#7a3715] hover:to-[#9e5f29] text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('events');
                      }}
                    >
                      En savoir plus
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories with Featured Artworks */}
      <section id="collections" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">
              {t('home.discoverCollections')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explorez notre collection de plus de 18 000 œuvres d'art réparties en 6 catégories
            </p>
          </div>

          {categories.map((category) => {
            const categoryArtworks = getFeaturedArtworks(category.id);
            
            return (
              <div key={category.id} className="mb-16">
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-[#EED7C5] to-[#B67332]/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl text-[#93441A] mb-3">{category.name[language]}</CardTitle>
                        <p className="text-muted-foreground">{category.description[language]}</p>
                      </div>
                      <Button
                        onClick={() => onCategoryClick(category.id)}
                        className="bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#7a3715] hover:to-[#9e5f29] text-white"
                      >
                        {t('action.seeMore')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  {categoryArtworks.length > 0 && (
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {categoryArtworks.map((artwork) => (
                          <ArtworkCard
                            key={artwork.id}
                            artwork={artwork}
                            onClick={() => onArtworkClick(artwork)}
                          />
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl">
              {t('home.upcomingEvents')}
            </h2>
            <Button 
              variant="outline"
              onClick={() => onNavigate('events')}
              className="gap-2"
            >
              {t('action.seeMore')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.slice(0, 2).map((event) => (
              <Card 
                key={event.id} 
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex gap-4 p-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#93441A] to-[#B67332] rounded-lg flex flex-col items-center justify-center text-white">
                      <span className="text-2xl">
                        {new Date(event.date).getDate()}
                      </span>
                      <span className="text-xs uppercase">
                        {new Date(event.date).toLocaleDateString(language, { month: 'short' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl mb-2">{event.title[language]}</h3>
                    <p className="text-muted-foreground mb-3">{event.description[language]}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{event.time}</span>
                      <span>•</span>
                      <span>{event.category}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">
              Expériences Interactives
            </h2>
            <p className="text-lg text-muted-foreground">
              Découvrez le musée d'une nouvelle façon
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer" onClick={() => onNavigate('tours')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#93441A] to-[#B67332] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-3">Visite virtuelle</h3>
                <p className="text-muted-foreground mb-4">
                  Explorez le musée virtuellement avec des parcours thématiques personnalisés
                </p>
                <Button variant="outline" className="w-full border-[#B67332]/30">
                  Commencer la visite
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer" onClick={() => onNavigate('scan')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#B67332] to-[#93441A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-3">Points de Scan</h3>
                <p className="text-muted-foreground mb-4">
                  Scannez les QR codes et débloquez du contenu exclusif
                </p>
                <Button variant="outline" className="w-full border-[#B67332]/30">
                  Commencer à scanner
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer" onClick={() => onNavigate('visit')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#93441A] to-[#B67332] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-3">Plan du Musée</h3>
                <p className="text-muted-foreground mb-4">
                  Naviguez facilement avec notre carte interactive
                </p>
                <Button variant="outline" className="w-full border-[#B67332]/30">
                  Voir le plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-[#93441A] to-[#B67332] text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl mb-6">
                Planifiez votre visite
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                Découvrez les trésors du patrimoine africain dans un cadre exceptionnel
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg"
                  className="bg-[#EED7C5] text-[#93441A] hover:bg-[#EED7C5]/90 px-8 py-6 border-2 border-[#EED7C5] shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
                  onClick={() => onNavigate('visit')}
                >
                  {t('action.bookTicket')}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-6 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                  onClick={() => onNavigate('virtual360')}
                >
                  {t('home.virtualTour')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
