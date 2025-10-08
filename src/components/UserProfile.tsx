import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { QrCode, Trophy, Star, User, Mail, MapPin, Calendar, Award, Gift } from 'lucide-react';
import { motion } from 'motion/react';

interface UserProfileProps {
  onBack: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [scanPoints, setScanPoints] = useState(125);
  const [scannedArtworks, setScannedArtworks] = useState(8);
  const totalArtworks = 50;

  const userData = {
    name: "Visiteur",
    email: "visiteur@mcn.sn",
    memberSince: "Janvier 2025",
    level: "Bronze",
    nextLevel: "Argent",
    pointsToNextLevel: 75
  };

  const achievements = [
    { id: 1, name: "Premier pas", description: "Première œuvre scannée", unlocked: true, points: 10 },
    { id: 2, name: "Explorateur", description: "5 œuvres scannées", unlocked: true, points: 25 },
    { id: 3, name: "Collectionneur", description: "10 œuvres scannées", unlocked: false, points: 50 },
    { id: 4, name: "Expert", description: "25 œuvres scannées", unlocked: false, points: 100 },
    { id: 5, name: "Maître", description: "Toutes les œuvres scannées", unlocked: false, points: 250 }
  ];

  const recentScans = [
    { artwork: "Masque Rituel Gelede", date: "Il y a 2 heures", points: 15 },
    { artwork: "Sculpture en Bronze", date: "Hier", points: 15 },
    { artwork: "Tapisserie Royale", date: "Il y a 3 jours", points: 15 }
  ];

  const rewards = [
    { id: 1, name: "Visite guidée gratuite", points: 200, available: false },
    { id: 2, name: "Réduction 20% boutique", points: 150, available: false },
    { id: 3, name: "Accès exposition privée", points: 300, available: false },
    { id: 4, name: "Poster exclusif", points: 100, available: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EED7C5] via-white to-[#EED7C5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#93441A] to-[#B67332] text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-white hover:bg-white/20"
          >
            ← Retour
          </Button>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 border-4 border-white rounded-full bg-white flex items-center justify-center">
              <User className="w-12 h-12 text-[#93441A]" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl mb-2">{userData.name}</h1>
              <p className="text-white/90 mb-2">{userData.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  <Calendar className="w-3 h-3 mr-1" />
                  Membre depuis {userData.memberSince}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  <Trophy className="w-3 h-3 mr-1" />
                  Niveau {userData.level}
                </Badge>
              </div>
            </div>
            
            <Card className="p-6 bg-white/10 backdrop-blur border-white/20 text-white">
              <div className="text-center">
                <div className="text-4xl mb-2">{scanPoints}</div>
                <p className="text-sm">Points totaux</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Tabs defaultValue="scan" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="scan">
              <QrCode className="w-4 h-4 mr-2" />
              Points de Scan
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Award className="w-4 h-4 mr-2" />
              Succès
            </TabsTrigger>
            <TabsTrigger value="rewards">
              <Gift className="w-4 h-4 mr-2" />
              Récompenses
            </TabsTrigger>
            <TabsTrigger value="account">
              <User className="w-4 h-4 mr-2" />
              Compte
            </TabsTrigger>
          </TabsList>

          {/* Points de Scan Tab */}
          <TabsContent value="scan" className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-[#93441A] to-[#B67332] text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl mb-1">Progression</h2>
                  <p className="text-white/90">Niveau {userData.level} → {userData.nextLevel}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl">{scanPoints}</div>
                  <p className="text-sm text-white/90">/{scanPoints + userData.pointsToNextLevel} pts</p>
                </div>
              </div>
              <Progress 
                value={(scanPoints / (scanPoints + userData.pointsToNextLevel)) * 100} 
                className="h-3 bg-white/20"
              />
              <p className="text-sm mt-2 text-white/90">
                Plus que {userData.pointsToNextLevel} points pour atteindre le niveau {userData.nextLevel}
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-[#93441A]/20">
                <h3 className="text-xl mb-4 text-[#93441A]">Scanner des QR Codes</h3>
                <div className="flex items-center justify-center py-8">
                  <div className="w-40 h-40 border-4 border-dashed border-[#B67332] rounded-lg flex items-center justify-center">
                    <QrCode className="w-20 h-20 text-[#B67332]" />
                  </div>
                </div>
                <p className="text-center text-sm mb-4 text-muted-foreground">
                  Scannez les QR codes près des œuvres dans le musée pour gagner des points
                </p>
                <Button className="w-full bg-gradient-to-r from-[#93441A] to-[#B67332]">
                  <QrCode className="w-4 h-4 mr-2" />
                  Scanner un QR Code
                </Button>
              </Card>

              <Card className="p-6 border-[#B67332]/20">
                <h3 className="text-xl mb-4 text-[#B67332]">Statistiques</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Œuvres découvertes</span>
                      <span className="font-medium">{scannedArtworks}/{totalArtworks}</span>
                    </div>
                    <Progress value={(scannedArtworks / totalArtworks) * 100} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-3 bg-[#EED7C5] rounded-lg">
                      <div className="text-2xl text-[#93441A] mb-1">{scannedArtworks}</div>
                      <p className="text-xs">Œuvres scannées</p>
                    </div>
                    <div className="text-center p-3 bg-[#EED7C5] rounded-lg">
                      <div className="text-2xl text-[#93441A] mb-1">{scanPoints}</div>
                      <p className="text-xs">Points gagnés</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 border-[#93441A]/20">
              <h3 className="text-xl mb-4 text-[#93441A]">Scans récents</h3>
              <div className="space-y-3">
                {recentScans.map((scan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-[#EED7C5]/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#93441A] to-[#B67332] rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{scan.artwork}</p>
                        <p className="text-sm text-muted-foreground">{scan.date}</p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-[#93441A] to-[#B67332] text-white">
                      +{scan.points} pts
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <Card className="p-6 border-[#B67332]/20">
              <h2 className="text-2xl mb-6 text-[#B67332]">Vos Succès</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-[#93441A]/10 to-[#B67332]/10 border-[#93441A]'
                        : 'bg-gray-100 border-gray-300 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.unlocked
                            ? 'bg-gradient-to-br from-[#93441A] to-[#B67332]'
                            : 'bg-gray-400'
                        }`}
                      >
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement.description}
                        </p>
                        <Badge variant={achievement.unlocked ? 'default' : 'secondary'}>
                          {achievement.points} points
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-4">
            <Card className="p-6 border-[#93441A]/20">
              <h2 className="text-2xl mb-6 text-[#93441A]">Boutique de Récompenses</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {rewards.map((reward) => (
                  <Card
                    key={reward.id}
                    className={`p-6 ${
                      reward.available
                        ? 'border-[#B67332] bg-[#EED7C5]/30'
                        : 'border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          reward.available
                            ? 'bg-gradient-to-br from-[#93441A] to-[#B67332]'
                            : 'bg-gray-400'
                        }`}
                      >
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{reward.name}</h3>
                        <Badge
                          variant={reward.available ? 'default' : 'secondary'}
                          className="bg-gradient-to-r from-[#93441A] to-[#B67332]"
                        >
                          {reward.points} points
                        </Badge>
                      </div>
                    </div>
                    <Button
                      disabled={!reward.available}
                      className={`w-full ${
                        reward.available
                          ? 'bg-gradient-to-r from-[#93441A] to-[#B67332]'
                          : ''
                      }`}
                    >
                      {reward.available ? 'Échanger' : 'Bientôt disponible'}
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-4">
            <Card className="p-6 border-[#B67332]/20">
              <h2 className="text-2xl mb-6 text-[#B67332]">Informations du compte</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" defaultValue={userData.name} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={userData.email} className="mt-1" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Niveau actuel</Label>
                    <div className="mt-1 p-3 bg-[#EED7C5] rounded-lg">
                      <p className="font-medium text-[#93441A]">{userData.level}</p>
                    </div>
                  </div>
                  <div>
                    <Label>Membre depuis</Label>
                    <div className="mt-1 p-3 bg-[#EED7C5] rounded-lg">
                      <p className="font-medium text-[#93441A]">{userData.memberSince}</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#93441A] to-[#B67332]">
                  Sauvegarder les modifications
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
