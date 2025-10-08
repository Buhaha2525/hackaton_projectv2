import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { scanPoints, artworks } from '../data/mockData';
import { ArrowLeft, QrCode, Trophy, Unlock, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface ScanPointsPageProps {
  onBack: () => void;
}

export const ScanPointsPage: React.FC<ScanPointsPageProps> = ({ onBack }) => {
  const { language } = useLanguage();
  const [totalPoints, setTotalPoints] = useState(0);
  const [scannedPoints, setScannedPoints] = useState<Set<string>>(new Set());
  const [showUnlockedContent, setShowUnlockedContent] = useState<any>(null);

  const handleScan = (pointId: string) => {
    const point = scanPoints.find(p => p.id === pointId);
    if (!point || scannedPoints.has(pointId)) {
      alert('Code déjà scanné ou invalide');
      return;
    }

    setScannedPoints(prev => new Set(prev).add(pointId));
    setTotalPoints(prev => prev + point.points);
    
    if (point.unlockContent) {
      setShowUnlockedContent(point.unlockContent);
    }
  };

  const simulateScan = () => {
    const unscannedPoints = scanPoints.filter(p => !scannedPoints.has(p.id));
    if (unscannedPoints.length > 0) {
      const randomPoint = unscannedPoints[Math.floor(Math.random() * unscannedPoints.length)];
      handleScan(randomPoint.id);
    } else {
      alert('Tous les points ont déjà été scannés !');
    }
  };

  const getLevel = () => {
    if (totalPoints >= 50) return { level: 'Expert', icon: '🏆', color: 'gold' };
    if (totalPoints >= 30) return { level: 'Connaisseur', icon: '⭐', color: 'silver' };
    if (totalPoints >= 10) return { level: 'Explorateur', icon: '🌟', color: 'bronze' };
    return { level: 'Débutant', icon: '✨', color: 'gray' };
  };

  const levelInfo = getLevel();
  const progress = Math.min((totalPoints / 50) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
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
            Système de Points
          </h1>
          <p className="text-xl opacity-90">
            Scannez les QR codes et débloquez du contenu exclusif
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Points Dashboard */}
          <Card className="shadow-xl mb-8">
            <CardHeader className="bg-gradient-to-br from-orange-50 to-red-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl">Mes Points</CardTitle>
                <div className="text-5xl">{levelInfo.icon}</div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <p className="text-6xl font-bold text-orange-600 mb-2">{totalPoints}</p>
                <p className="text-xl text-muted-foreground">points collectés</p>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Niveau: {levelInfo.level}</span>
                  <span className="text-muted-foreground">{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {50 - totalPoints > 0 ? `${50 - totalPoints} points pour atteindre Expert` : 'Niveau Expert atteint !'}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <QrCode className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-2xl font-bold">{scannedPoints.size}</p>
                  <p className="text-sm text-muted-foreground">Codes scannés</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Unlock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-2xl font-bold">{scannedPoints.size}</p>
                  <p className="text-sm text-muted-foreground">Contenus débloqués</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-2xl font-bold">{totalPoints >= 50 ? '1' : '0'}</p>
                  <p className="text-sm text-muted-foreground">Badges gagnés</p>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-6 text-lg"
                onClick={simulateScan}
              >
                <QrCode className="w-5 h-5 mr-2" />
                Scanner un QR code (simulation)
              </Button>
            </CardContent>
          </Card>

          {/* Available Scan Points */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Points de scan disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scanPoints.map((point) => {
                  const artwork = artworks.find(a => a.id === point.artworkId);
                  const isScanned = scannedPoints.has(point.id);

                  return (
                    <div
                      key={point.id}
                      className={`p-4 rounded-lg border-2 ${
                        isScanned 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200 hover:border-orange-300'
                      } transition-all`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">
                            {artwork?.title[language] || 'Œuvre inconnue'}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {point.unlockContent?.content?.[language]}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1 text-orange-600">
                              <Star className="w-4 h-4" />
                              <span className="font-semibold">{point.points} points</span>
                            </span>
                            {isScanned && (
                              <span className="text-sm text-green-600 font-semibold">
                                ✓ Scanné
                              </span>
                            )}
                          </div>
                        </div>
                        {!isScanned && (
                          <Button
                            variant="outline"
                            onClick={() => handleScan(point.id)}
                          >
                            Scanner
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Unlocked Content Modal */}
          {showUnlockedContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowUnlockedContent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl max-w-lg w-full p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Unlock className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Contenu débloqué !</h2>
                  <p className="text-muted-foreground">
                    Vous avez débloqué du contenu exclusif
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg mb-6">
                  <p className="text-lg">
                    {showUnlockedContent.content?.[language]}
                  </p>
                </div>

                <Button
                  className="w-full"
                  onClick={() => setShowUnlockedContent(null)}
                >
                  Fermer
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};
