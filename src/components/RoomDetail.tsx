import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  Play,
  Eye,
  Users,
  Clock,
  MapPin
} from 'lucide-react';
import { artworks } from '../data/mockData';

interface RoomDetailProps {
  roomId: string;
  onBack: () => void;
  onArtworkClick: (artwork: any) => void;
}

const roomImages: Record<string, string> = {
  'sculpture-hall': 'https://images.unsplash.com/photo-1736782683071-cf2a6b7d80fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwcm9vbSUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTk3ODQ5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'painting-gallery': 'https://images.unsplash.com/photo-1720945489924-19b707539b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbXVzZXVtJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5Nzg0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'textile-room': 'https://images.unsplash.com/photo-1680345575812-2f6878d7d775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdGV4dGlsZSUyMGV4aGliaXRpb258ZW58MXx8fHwxNzU5Nzg0OTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'photo-exhibition': 'https://images.unsplash.com/photo-1720945489924-19b707539b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbXVzZXVtJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5Nzg0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'video-space': 'https://images.unsplash.com/photo-1720945489924-19b707539b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbXVzZXVtJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5Nzg0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'installation-area': 'https://images.unsplash.com/photo-1720945489924-19b707539b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbXVzZXVtJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5Nzg0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080'
};

const roomInfo: Record<string, { name: string; description: string; category: string; features: string[] }> = {
  'sculpture-hall': {
    name: 'Salle de Sculpture',
    description: 'Une collection impressionnante de sculptures traditionnelles et contemporaines d\'Afrique, incluant des masques rituels, des statues en bois et bronze.',
    category: 'sculpture',
    features: ['Sculptures en bois', 'Masques traditionnels', 'Art contemporain', 'Éclairage spécialisé']
  },
  'painting-gallery': {
    name: 'Galerie de Peinture',
    description: 'Découvrez les peintures et fresques qui racontent l\'histoire et la culture africaine à travers les âges.',
    category: 'peinture',
    features: ['Peintures historiques', 'Art moderne', 'Fresques murales', 'Portraits d\'artistes']
  },
  'textile-room': {
    name: 'Salle des Textiles',
    description: 'Explorez l\'art textile africain avec ses tissages complexes, tapisseries narratives et traditions vestimentaires.',
    category: 'tapisserie',
    features: ['Textiles traditionnels', 'Tissages complexes', 'Costumes rituels', 'Techniques ancestrales']
  },
  'photo-exhibition': {
    name: 'Espace Photographie',
    description: 'Archives photographiques historiques et contemporaines documentant la vie et la culture africaine.',
    category: 'photographie',
    features: ['Archives historiques', 'Photojournalisme', 'Portraits culturels', 'Documents d\'époque']
  },
  'video-space': {
    name: 'Espace Vidéo',
    description: 'Art vidéo contemporain et performances filmées d\'artistes africains et de la diaspora.',
    category: 'video-art',
    features: ['Art vidéo', 'Performances', 'Documentaires', 'Installations multimédias']
  },
  'installation-area': {
    name: 'Zone d\'Installation',
    description: 'Installations artistiques immersives qui invitent à la réflexion sur les enjeux contemporains africains.',
    category: 'installation',
    features: ['Installations immersives', 'Art interactif', 'Expériences sensorielles', 'Art conceptuel']
  }
};

export function RoomDetail({ roomId, onBack, onArtworkClick }: RoomDetailProps) {
  const { language, t } = useLanguage();
  
  const room = roomInfo[roomId];
  const roomArtworks = artworks.filter(artwork => artwork.category === room?.category).slice(0, 6);
  
  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('action.back')}
          </Button>
          <p>Salle non trouvée</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-primary hover:text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('action.back')}
          </Button>
        </motion.div>

        {/* Room Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="overflow-hidden">
            <div className="relative h-64 md:h-80">
              <ImageWithFallback
                src={roomImages[roomId]}
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-3xl md:text-4xl mb-2">{room.name}</h1>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Eye className="w-3 h-3 mr-1" />
                    {roomArtworks.length} œuvres
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Clock className="w-3 h-3 mr-1" />
                    15-20 min
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Room Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <MapPin className="w-5 h-5" />
                  Informations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm text-gray-600">{room.description}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Caractéristiques</h3>
                  <div className="space-y-2">
                    {room.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium">Actions</h3>
                  <Button className="w-full" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Visite guidée audio
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Partager cette salle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Artworks in Room */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">
                  {t('tour.artworksInRoom')}
                </CardTitle>
                <CardDescription>
                  Découvrez les œuvres exposées dans cette salle
                </CardDescription>
              </CardHeader>
              <CardContent>
                {roomArtworks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {roomArtworks.map((artwork) => (
                      <motion.div
                        key={artwork.id}
                        className="group cursor-pointer"
                        onClick={() => onArtworkClick(artwork)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-all">
                          <div className="relative h-48">
                            <ImageWithFallback
                              src={artwork.imageUrl}
                              alt={artwork.title[language]}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-sm font-medium">{artwork.title[language]}</p>
                              <p className="text-xs">{artwork.artist}</p>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-medium text-sm mb-1 truncate">
                              {artwork.title[language]}
                            </h4>
                            <p className="text-xs text-gray-600 truncate">
                              {artwork.artist}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucune œuvre disponible dans cette salle</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}