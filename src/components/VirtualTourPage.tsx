import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { RoomDetail } from './RoomDetail';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Users, 
  Coffee,
  ShoppingBag,
  DoorOpen,
  DoorClosed,
  Info,
  Map as MapIcon,
  Play,
  Eye,
  ChevronRight
} from 'lucide-react';

interface VirtualTourPageProps {
  onBack: () => void;
  onCategoryClick: (categoryId: string) => void;
}

interface Room {
  id: string;
  name: string;
  category: string;
  artworkCount: number;
  x: number;
  y: number;
  description: string;
}

interface Route {
  id: string;
  titleKey: string;
  descKey: string;
  duration: number;
  artworkCount: number;
  rooms: string[];
  color: string;
}

interface Facility {
  id: string;
  nameKey: string;
  icon: React.ComponentType<any>;
  x: number;
  y: number;
}

const museumRooms: Room[] = [
  {
    id: 'sculpture-hall',
    name: 'Salle de Sculpture',
    category: 'sculpture',
    artworkCount: 12,
    x: 20,
    y: 30,
    description: 'Sculptures traditionnelles et contemporaines'
  },
  {
    id: 'painting-gallery',
    name: 'Galerie de Peinture',
    category: 'peinture',
    artworkCount: 18,
    x: 60,
    y: 20,
    description: 'Peintures et fresques africaines'
  },
  {
    id: 'photo-exhibition',
    name: 'Espace Photographie',
    category: 'photographie',
    artworkCount: 24,
    x: 80,
    y: 60,
    description: 'Archives photographiques historiques'
  },
  {
    id: 'textile-room',
    name: 'Salle des Textiles',
    category: 'tapisserie',
    artworkCount: 15,
    x: 30,
    y: 70,
    description: 'Textiles et tissages traditionnels'
  },
  {
    id: 'video-space',
    name: 'Espace Vidéo',
    category: 'video-art',
    artworkCount: 8,
    x: 70,
    y: 40,
    description: 'Art vidéo et performances'
  },
  {
    id: 'installation-area',
    name: 'Zone d\'Installation',
    category: 'installation',
    artworkCount: 6,
    x: 40,
    y: 50,
    description: 'Installations artistiques immersives'
  }
];

const guidedRoutes: Route[] = [
  {
    id: 'historical',
    titleKey: 'routes.history',
    descKey: 'routes.historyDesc',
    duration: 45,
    artworkCount: 25,
    rooms: ['sculpture-hall', 'textile-room', 'photo-exhibition'],
    color: '#93441A'
  },
  {
    id: 'contemporary',
    titleKey: 'routes.contemporary',
    descKey: 'routes.contemporaryDesc',
    duration: 35,
    artworkCount: 20,
    rooms: ['painting-gallery', 'video-space', 'installation-area'],
    color: '#B67332'
  },
  {
    id: 'textiles',
    titleKey: 'routes.textiles',
    descKey: 'routes.textilesDesc',
    duration: 30,
    artworkCount: 15,
    rooms: ['textile-room', 'sculpture-hall'],
    color: '#EED7C5'
  },
  {
    id: 'cultural',
    titleKey: 'routes.cultural',
    descKey: 'routes.culturalDesc',
    duration: 50,
    artworkCount: 30,
    rooms: ['sculpture-hall', 'textile-room', 'photo-exhibition', 'installation-area'],
    color: '#d89563'
  }
];

const facilities: Facility[] = [
  { id: 'entrance', nameKey: 'tour.facilities.entrance', icon: DoorOpen, x: 10, y: 90 },
  { id: 'exit', nameKey: 'tour.facilities.exit', icon: DoorClosed, x: 90, y: 10 },
  { id: 'info', nameKey: 'tour.facilities.info', icon: Info, x: 15, y: 80 },
  { id: 'cafe', nameKey: 'tour.facilities.cafe', icon: Coffee, x: 85, y: 80 },
  { id: 'shop', nameKey: 'tour.facilities.shop', icon: ShoppingBag, x: 90, y: 20 },
  { id: 'restrooms', nameKey: 'tour.facilities.restrooms', icon: Users, x: 10, y: 10 }
];

export function VirtualTourPage({ onBack, onCategoryClick }: VirtualTourPageProps) {
  const { language, t } = useLanguage();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showRoutes, setShowRoutes] = useState(false);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room.id);
  };

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
    setShowRoutes(false);
  };

  const selectedRouteData = guidedRoutes.find(r => r.id === selectedRoute);
  const selectedRoomData = museumRooms.find(r => r.id === selectedRoom);

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
          
          <div className="text-center">
            <h1 className="text-4xl mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {t('tour.title')}
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              {t('tour.subtitle')}
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <MapIcon className="w-5 h-5" />
                  {t('tour.interactiveMap')}
                </CardTitle>
                <CardDescription>
                  {t('tour.rooms')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-4 h-96 overflow-hidden">
                  {/* Museum Layout Background */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  
                  {/* Rooms */}
                  {museumRooms.map((room) => (
                    <motion.div
                      key={room.id}
                      className={`absolute w-16 h-12 rounded cursor-pointer transition-all duration-300 ${
                        selectedRoom === room.id
                          ? 'bg-primary shadow-lg scale-110 z-10'
                          : selectedRouteData?.rooms.includes(room.id)
                          ? 'bg-secondary shadow-md'
                          : 'bg-primary/20 hover:bg-primary/30'
                      }`}
                      style={{
                        left: `${room.x}%`,
                        top: `${room.y}%`,
                      }}
                      onClick={() => handleRoomClick(room)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap text-center">
                        <div className={`font-medium ${selectedRoom === room.id ? 'text-primary' : 'text-gray-700'}`}>
                          {room.name.split(' ')[0]}
                        </div>
                      </div>
                      <div className="w-full h-full flex items-center justify-center text-white text-xs">
                        {room.artworkCount}
                      </div>
                    </motion.div>
                  ))}

                  {/* Facilities */}
                  {facilities.map((facility) => {
                    const IconComponent = facility.icon;
                    return (
                      <div
                        key={facility.id}
                        className="absolute w-8 h-8 bg-accent/60 rounded-full flex items-center justify-center"
                        style={{
                          left: `${facility.x}%`,
                          top: `${facility.y}%`,
                        }}
                      >
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                    );
                  })}

                  {/* Route Path */}
                  {selectedRouteData && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {selectedRouteData.rooms.map((roomId, index) => {
                        const room = museumRooms.find(r => r.id === roomId);
                        const nextRoom = museumRooms.find(r => r.id === selectedRouteData.rooms[index + 1]);
                        if (!room || !nextRoom) return null;
                        
                        return (
                          <line
                            key={`${roomId}-${nextRoom.id}`}
                            x1={`${room.x + 8}%`}
                            y1={`${room.y + 6}%`}
                            x2={`${nextRoom.x + 8}%`}
                            y2={`${nextRoom.y + 6}%`}
                            stroke={selectedRouteData.color}
                            strokeWidth="3"
                            strokeDasharray="5,5"
                          />
                        );
                      })}
                    </svg>
                  )}
                </div>

                {/* Map Legend */}
                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-primary/20 rounded"></div>
                    <span className="text-gray-600">{t('tour.rooms')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-accent/60 rounded-full"></div>
                    <span className="text-gray-600">{t('tour.facilitiesTitle')}</span>
                  </div>
                  {selectedRouteData && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 rounded" style={{ backgroundColor: selectedRouteData.color }}></div>
                      <span className="text-gray-600">{t(selectedRouteData.titleKey)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            
            {/* Guided Tours */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">{t('routes.title')}</CardTitle>
                <CardDescription>{t('routes.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant={showRoutes ? "secondary" : "default"}
                  onClick={() => setShowRoutes(!showRoutes)}
                  className="w-full mb-4"
                >
                  {t('tour.selectRoute')}
                  <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${showRoutes ? 'rotate-90' : ''}`} />
                </Button>

                {showRoutes && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3"
                  >
                    {guidedRoutes.map((route) => (
                      <motion.div
                        key={route.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedRoute === route.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                        onClick={() => handleRouteSelect(route.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{t(route.titleKey)}</h4>
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: route.color }}></div>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{t(route.descKey)}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {route.duration} {t('routes.minutes')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {route.artworkCount} {t('routes.artworks')}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {selectedRoute && !showRoutes && (
                  <div className="mt-4">
                    <Badge variant="secondary" className="mb-2">
                      {t(selectedRouteData!.titleKey)}
                    </Badge>
                    <p className="text-sm text-gray-600">
                      {t(selectedRouteData!.descKey)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Room Details */}
            {selectedRoomData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <MapPin className="w-5 h-5" />
                      {selectedRoomData.name}
                    </CardTitle>
                    <CardDescription>{selectedRoomData.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{t('tour.artworksInRoom')}</span>
                        <Badge variant="outline">{selectedRoomData.artworkCount}</Badge>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <Button
                          variant="default"
                          className="w-full"
                          onClick={() => onCategoryClick(selectedRoomData.category)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {t('tour.exploreArtworks')}
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setSelectedRoom(null)}
                        >
                          {t('action.back')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Facilities List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">{t('tour.facilitiesTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {facilities.map((facility) => {
                    const IconComponent = facility.icon;
                    return (
                      <div key={facility.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                        <div className="w-8 h-8 bg-accent/60 rounded-full flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm">{t(facility.nameKey)}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(147, 68, 26, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 68, 26, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}