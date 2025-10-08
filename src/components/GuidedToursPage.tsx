import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { guidedTours } from '../data/mockData';
import { GuidedTour, TourType } from '../types';
import { ArrowLeft, Clock, MapPin, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface GuidedToursPageProps {
  onBack: () => void;
  onStartTour?: (tourId: TourType) => void;
}

export const GuidedToursPage: React.FC<GuidedToursPageProps> = ({ onBack, onStartTour }) => {
  const { language } = useLanguage();
  const [selectedTour, setSelectedTour] = useState<GuidedTour | null>(null);

  const handleStartTour = (tourId: TourType) => {
    if (onStartTour) {
      onStartTour(tourId);
    } else {
      alert(`Démarrage du parcours "${guidedTours.find(t => t.id === tourId)?.name[language]}" (simulation)`);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-[#EED7C5]/30 via-white to-[#EED7C5]/50">
        {/* Header */}
        <section className="py-12 px-4 bg-gradient-to-r from-[#93441A] to-[#B67332] text-white">
          <div className="container mx-auto">
            <Button
                variant="outline"
                onClick={onBack}
                className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Parcours Guidés Personnalisés
            </h1>
            <p className="text-xl opacity-90">
              Choisissez un parcours thématique adapté à vos intérêts
            </p>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guidedTours.map((tour, index) => (
                  <motion.div
                      key={tour.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                  >
                    <Card
                        className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full"
                        onClick={() => setSelectedTour(tour)}
                    >
                      <CardHeader className="bg-gradient-to-br from-[#EED7C5]/30 to-[#EED7C5]/50">
                        <div className="text-5xl mb-4">{tour.icon}</div>
                        <CardTitle className="text-2xl">{tour.name[language]}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-muted-foreground mb-4">
                          {tour.description[language]}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{tour.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{tour.artworkIds.length} œuvres</span>
                          </div>
                        </div>
                        <Button
                            className="w-full bg-gradient-to-r from-[#B67332] to-[#93441A] hover:from-[#9e5f29] hover:to-[#7a3715]"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartTour(tour.id);
                            }}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Commencer le parcours
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
              ))}
            </div>

            {/* Tour Details Modal */}
            {selectedTour && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    onClick={() => setSelectedTour(null)}
                >
                  <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white rounded-xl max-w-2xl w-full p-8"
                      onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="text-6xl">{selectedTour.icon}</div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">{selectedTour.name[language]}</h2>
                        <p className="text-lg text-muted-foreground">{selectedTour.description[language]}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-[#EED7C5]/30 rounded-lg">
                        <div className="flex items-center gap-2 text-[#93441A] mb-1">
                          <Clock className="w-5 h-5" />
                          <span className="font-semibold">Durée</span>
                        </div>
                        <p className="text-2xl font-bold text-[#93441A]">{selectedTour.duration}</p>
                      </div>
                      <div className="p-4 bg-[#EED7C5]/30 rounded-lg">
                        <div className="flex items-center gap-2 text-[#B67332] mb-1">
                          <MapPin className="w-5 h-5" />
                          <span className="font-semibold">Œuvres</span>
                        </div>
                        <p className="text-2xl font-bold text-[#B67332]">{selectedTour.artworkIds.length}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Ce parcours inclut :</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="text-[#B67332]">✓</span>
                          <span>Audio guide en {language === 'fr' ? 'français' : language === 'en' ? 'anglais' : 'wolof'}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#B67332]">✓</span>
                          <span>Descriptions détaillées de chaque œuvre</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#B67332]">✓</span>
                          <span>Contexte historique et culturel</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#B67332]">✓</span>
                          <span>Points de scan pour contenu exclusif</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <Button
                          className="flex-1 bg-gradient-to-r from-[#B67332] to-[#93441A] hover:from-[#9e5f29] hover:to-[#7a3715]"
                          onClick={() => handleStartTour(selectedTour.id)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Commencer maintenant
                      </Button>
                      <Button
                          variant="outline"
                          onClick={() => setSelectedTour(null)}
                      >
                        Fermer
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
            )}
          </div>
        </section>
      </div>
  );
};
