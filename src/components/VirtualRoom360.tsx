import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, ZoomIn, ZoomOut, RotateCcw, Info, Volume2, VolumeX, Navigation, Home, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Artwork } from '../types';

interface VirtualRoom360Props {
  onBack: () => void;
  onArtworkClick?: (artwork: Artwork) => void;
}

interface WallArtwork {
  id: string;
  artwork: Artwork;
  wall: 'front' | 'right' | 'back' | 'left';
  position: { x: number; y: number }; // Position sur le mur en pourcentage
}

export const VirtualRoom360: React.FC<VirtualRoom360Props> = ({ onBack, onArtworkClick }) => {
  const { language } = useLanguage();
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [visitedArtworks, setVisitedArtworks] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Collection d'œuvres positionnées sur les murs de la salle 3D
  const wallArtworks: WallArtwork[] = [
    // Mur de face
    {
      id: '1',
      wall: 'front',
      position: { x: 25, y: 40 },
      artwork: {
        id: 'wall1',
        title: { fr: 'Masques Traditionnels Wolof', en: 'Traditional Wolof Masks', wo: 'Mbedd yu gëstu yu Wolof' },
        artist: { fr: 'Artisan Sénégalais', en: 'Senegalese Artisan', wo: 'Seen-doom bu Senegaal' },
        category: 'sculpture',
        description: { fr: 'Collection de masques traditionnels utilisés lors des cérémonies wolof', en: 'Collection of traditional masks used in Wolof ceremonies', wo: 'Mbedd yu gëstu ci jubbal yu Wolof' },
        imageUrl: 'https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFzayUyMGFydCUyMG11c2V1bXxlbnwxfHx8fDE3NTk4NzU5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        year: 1890,
        materials: { fr: 'Bois sculpté, pigments naturels', en: 'Carved wood, natural pigments', wo: 'Garab bu setal, mëlokaan yu dëmm' }
      }
    },
    {
      id: '2',
      wall: 'front',
      position: { x: 75, y: 35 },
      artwork: {
        id: 'wall2',
        title: { fr: 'Art Contemporain Africain', en: 'African Contemporary Art', wo: 'Seen gu Afrika gu réew' },
        artist: { fr: 'Ousmane Sow', en: 'Ousmane Sow', wo: 'Ousmane Sow' },
        category: 'peinture',
        description: { fr: 'Peinture représentant la modernité africaine', en: 'Painting representing African modernity', wo: 'Nataal ci geestu gu bees gu Afrika' },
        imageUrl: 'https://images.unsplash.com/photo-1690812258830-694b8a7bd56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYXJ0JTIwcGFpbnRpbmclMjBtdXNldW18ZW58MXx8fHwxNzU5ODc1OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        year: 2020,
        materials: { fr: 'Huile sur toile', en: 'Oil on canvas', wo: 'Alkat ci tëdd' }
      }
    },
    // Mur de droite
    {
      id: '3',
      wall: 'right',
      position: { x: 30, y: 45 },
      artwork: {
        id: 'wall3',
        title: { fr: 'Textile Traditionnel Sénégalais', en: 'Traditional Senegalese Textile', wo: 'Ndënd gu gëstu gu Senegaal' },
        artist: { fr: 'Tisseuses de Saint-Louis', en: 'Weavers of Saint-Louis', wo: 'Ndënd-kat yu Saint-Louis' },
        category: 'tapisserie',
        description: { fr: 'Tapisserie racontant l\'histoire des rois du Sénégal', en: 'Tapestry telling the story of Senegalese kings', wo: 'Ndënd bu wax ci tàriix yu buur yi Senegaal' },
        imageUrl: 'https://images.unsplash.com/photo-1680345575812-2f6878d7d775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdGV4dGlsZSUyMGFydCUyMG11c2V1bXxlbnwxfHx8fDE3NTk4NzU5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        year: 2010,
        materials: { fr: 'Coton, fils d\'or', en: 'Cotton, gold thread', wo: 'Koton, jifeex wu xaalis' }
      }
    },
    {
      id: '4',
      wall: 'right',
      position: { x: 70, y: 30 },
      artwork: {
        id: 'wall4',
        title: { fr: 'Photographie Historique', en: 'Historical Photography', wo: 'Nataal bu tàriix' },
        artist: { fr: 'Mama Casset', en: 'Mama Casset', wo: 'Mama Casset' },
        category: 'photographie',
        description: { fr: 'Portrait de la société sénégalaise des années 1950', en: 'Portrait of Senegalese society in the 1950s', wo: 'Beret ci jamono Senegaal ci 1950' },
        imageUrl: 'https://images.unsplash.com/photo-1652002039648-8e2026e099cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcGhvdG9ncmFwaHklMjBhcnQlMjBleGhpYml0aW9ufGVufDF8fHx8MTc1OTg3NTk0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        year: 1955,
        materials: { fr: 'Tirage argentique', en: 'Silver print', wo: 'Nataal ci këpp' }
      }
    },
    // Mur du fond
    {
      id: '5',
      wall: 'back',
      position: { x: 40, y: 35 },
      artwork: {
        id: 'wall5',
        title: { fr: 'Installation Multimédia', en: 'Multimedia Installation', wo: 'Installation gu bari' },
        artist: { fr: 'Barthélémy Toguo', en: 'Barthélémy Toguo', wo: 'Barthélémy Toguo' },
        category: 'installation',
        description: { fr: 'Installation interactive sur l\'identité africaine contemporaine', en: 'Interactive installation on contemporary African identity', wo: 'Installation ci jëm bu Afrika bu réew' },
        imageUrl: 'https://images.unsplash.com/photo-1690812258830-694b8a7bd56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYXJ0JTIwcGFpbnRpbmclMjBtdXNldW18ZW58MXx8fHwxNzU5ODc1OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        year: 2023,
        materials: { fr: 'Installation multimédia', en: 'Multimedia installation', wo: 'Installation gu bari' }
      }
    },
    // Mur de gauche
    {
      id: '6',
      wall: 'left',
      position: { x: 25, y: 40 },
      artwork: {
        id: 'wall6',
        title: { fr: 'Sculpture Moderne', en: 'Modern Sculpture', wo: 'Jaarul bu bees' },
        artist: { fr: 'El Hadji Sy', en: 'El Hadji Sy', wo: 'El Hadji Sy' },
        category: 'sculpture',
        description: { fr: 'Sculpture en bronze représentant la renaissance africaine', en: 'Bronze sculpture representing African renaissance', wo: 'Jaarul ci bronze ci banneexu Afrika' },
        imageUrl: 'https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc2N1bHB0dXJlJTIwYXJ0JTIwbXVzZXVtfGVufDF8fHx8MTc1OTg3NTkzOXww&ixlib=rb-4.1.0&q=80&w=1080',
        year: 2015,
        materials: { fr: 'Bronze patiné', en: 'Patinated bronze', wo: 'Bronze bu setal' }
      }
    },
    {
      id: '7',
      wall: 'left',
      position: { x: 65, y: 50 },
      artwork: {
        id: 'wall7',
        title: { fr: 'Art Vidéo Contemporain', en: 'Contemporary Video Art', wo: 'Video Art bu réew' },
        artist: { fr: 'Alioune Diagne', en: 'Alioune Diagne', wo: 'Alioune Diagne' },
        category: 'video-art',
        description: { fr: 'Performance artistique filmée sur l\'oralité africaine', en: 'Filmed artistic performance on African orality', wo: 'Performance bu nataal ci waxtaan bu Afrika' },
        imageUrl: 'https://images.unsplash.com/photo-1652002039648-8e2026e099cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcGhvdG9ncmFwaHklMjBhcnQlMjBleGhpYml0aW9ufGVufDF8fHx8MTc1OTg3NTk0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        year: 2022,
        materials: { fr: 'Vidéo HD, 20 min', en: 'HD Video, 20 min', wo: 'Video HD, 20 simili' }
      }
    }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotationY(prev => prev + deltaX * 0.5);
    setRotationX(prev => Math.max(-30, Math.min(30, prev - deltaY * 0.3)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.3, 4));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.3, 0.3));
  };

  const resetView = () => {
    setZoom(1);
    setRotationY(0);
    setRotationX(0);
  };

  const handleArtworkSelect = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setVisitedArtworks(prev => new Set([...prev, artwork.id]));
  };

  const quickNavigation = (direction: 'front' | 'right' | 'back' | 'left') => {
    const rotations = {
      front: 0,
      right: -90,
      back: -180,
      left: -270
    };
    setRotationY(rotations[direction]);
    setRotationX(0);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(prev => Math.max(0.3, Math.min(4, prev + delta)));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, []);

  const renderWall = (wallId: 'front' | 'right' | 'back' | 'left', transform: string) => {
    const wallArtworksList = wallArtworks.filter(wa => wa.wall === wallId);

    return (
        <div
            className={`absolute w-full h-full bg-gradient-to-b from-[#EED7C5]/20 to-[#B67332]/10 border border-[#93441A]/20 wall-${wallId}`}
            style={{ transform }}
        >
          {/* Texture de mur */}
          <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 100px,
                rgba(147, 68, 26, 0.1) 101px
              )
            `
              }}
          />

          {/* Éclairage du mur */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-200/10 via-transparent to-orange-200/5"></div>

          {/* Œuvres sur ce mur */}
          {wallArtworksList.map((wallArtwork) => {
            const isVisited = visitedArtworks.has(wallArtwork.artwork.id);
            return (
                <motion.div
                    key={wallArtwork.id}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `${wallArtwork.position.x}%`,
                      top: `${wallArtwork.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.random() * 0.5 }}
                    onClick={() => handleArtworkSelect(wallArtwork.artwork)}
                >
                  {/* Cadre de l'œuvre */}
                  <div className={`relative bg-gradient-to-br p-3 rounded-lg shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_20px_40px_rgba(147,68,26,0.4)] ${
                      isVisited
                          ? 'from-[#EED7C5] to-[#B67332] shadow-[#EED7C5]/30'
                          : 'from-[#B67332] to-[#93441A] shadow-[#B67332]/30'
                  }`}>
                    <div className="bg-white p-2 rounded relative">
                      <img
                          src={wallArtwork.artwork.imageUrl}
                          alt={wallArtwork.artwork.title[language]}
                          className="w-24 h-18 object-cover rounded shadow-inner"
                      />
                      {/* Reflet sur le verre */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded pointer-events-none"></div>

                      {/* Indicateur de visite */}
                      {isVisited && (
                          <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full border border-white shadow-sm">
                            <div className="w-1 h-1 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                      )}
                    </div>

                    {/* Plaque descriptive */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#93441A] text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-10">
                      <div className="font-medium">{wallArtwork.artwork.title[language]}</div>
                      <div className="text-[#EED7C5] text-xs">{wallArtwork.artwork.artist?.[language]}</div>
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 border-2 border-transparent border-b-[#93441A]"></div>
                    </div>

                    {/* Effet de pulse pour œuvres non visitées */}
                    {!isVisited && (
                        <div className="absolute inset-0 rounded-lg animate-pulse bg-[#B67332]/20 pointer-events-none"></div>
                    )}

                    {/* Icône d'interaction */}
                    <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg ${
                        isVisited ? 'bg-green-500' : 'bg-[#EED7C5]'
                    }`}>
                      <Info className={`w-2.5 h-2.5 ${isVisited ? 'text-white' : 'text-[#93441A]'}`} />
                    </div>
                  </div>
                </motion.div>
            );
          })}
        </div>
    );
  };

  return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1312] to-[#0f0a08] relative overflow-hidden">
        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <Button
                variant="outline"
                onClick={onBack}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>

            <div className="text-center">
              <h1 className="text-xl font-medium text-white mb-1">Salle des Civilisations</h1>
              <p className="text-white/70 text-sm">Visite virtuelle 3D • {visitedArtworks.size}/{wallArtworks.length} œuvres découvertes</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Salle 3D */}
        <div
            ref={containerRef}
            className="absolute inset-0 cursor-grab active:cursor-grabbing perspective-[1000px]"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
          <div
              className="relative w-full h-full transform-gpu transition-transform duration-300 ease-out"
              style={{
                transform: `
              translateZ(${-300 + zoom * 200}px)
              rotateX(${rotationX}deg) 
              rotateY(${rotationY}deg)
              scale(${zoom})
            `,
                transformStyle: 'preserve-3d'
              }}
          >
            {/* Sol */}
            <div
                className="absolute w-[800px] h-[800px] bg-gradient-to-r from-[#93441A]/30 to-[#B67332]/20 border border-[#EED7C5]/20"
                style={{
                  transform: 'rotateX(90deg) translateZ(-200px)',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-400px',
                  marginTop: '-400px',
                  background: `
                linear-gradient(45deg, rgba(147, 68, 26, 0.1) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(147, 68, 26, 0.1) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(147, 68, 26, 0.1) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(147, 68, 26, 0.1) 75%)
              `,
                  backgroundSize: '50px 50px',
                  backgroundPosition: '0 0, 0 25px, 25px -25px, -25px 0px'
                }}
            />

            {/* Plafond */}
            <div
                className="absolute w-[800px] h-[800px] bg-gradient-to-r from-[#2d1a0f] to-[#1a1312] border border-[#EED7C5]/10"
                style={{
                  transform: 'rotateX(-90deg) translateZ(200px)',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-400px',
                  marginTop: '-400px'
                }}
            />

            {/* Murs */}
            {renderWall('front', 'translateZ(400px)')}
            {renderWall('right', 'rotateY(90deg) translateZ(400px)')}
            {renderWall('back', 'rotateY(180deg) translateZ(400px)')}
            {renderWall('left', 'rotateY(-90deg) translateZ(400px)')}

            {/* Éclairage ambiant */}
            <div
                className="absolute w-40 h-40 bg-yellow-200/20 rounded-full blur-3xl"
                style={{ transform: 'translateZ(150px) translateX(-100px) translateY(-100px)' }}
            />
            <div
                className="absolute w-32 h-32 bg-orange-200/15 rounded-full blur-2xl"
                style={{ transform: 'translateZ(150px) translateX(100px) translateY(100px)' }}
            />
          </div>
        </div>

        {/* Navigation rapide */}
        <div className="absolute top-24 left-4 z-20">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <h3 className="text-white text-sm font-medium mb-2 text-center">Navigation</h3>
            <div className="grid grid-cols-3 gap-1">
              <div></div>
              <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-8 h-8 p-0"
                  onClick={() => quickNavigation('front')}
              >
                ↑
              </Button>
              <div></div>
              <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-8 h-8 p-0"
                  onClick={() => quickNavigation('left')}
              >
                ←
              </Button>
              <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-8 h-8 p-0"
                  onClick={resetView}
              >
                <Home className="w-3 h-3" />
              </Button>
              <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-8 h-8 p-0"
                  onClick={() => quickNavigation('right')}
              >
                →
              </Button>
              <div></div>
              <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-8 h-8 p-0"
                  onClick={() => quickNavigation('back')}
              >
                ↓
              </Button>
              <div></div>
            </div>
          </div>
        </div>

        {/* Contrôles de zoom */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-4 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>

            <div className="text-white text-sm font-medium min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>

            <div className="w-px h-6 bg-white/20 mx-2"></div>

            <Button
                variant="outline"
                size="sm"
                onClick={resetView}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-20 right-4 z-20">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white max-w-xs border border-white/20">
            <h3 className="font-medium mb-2 text-[#EED7C5]">Instructions</h3>
            <ul className="text-sm space-y-1 opacity-80">
              <li>• <span className="text-[#B67332]">Cliquez et glissez</span> pour explorer</li>
              <li>• <span className="text-[#B67332]">Molette</span> pour zoomer</li>
              <li>• <span className="text-[#B67332]">Flèches</span> pour navigation rapide</li>
              <li>• <span className="text-[#B67332]">Cliquez sur les œuvres</span> pour les découvrir</li>
            </ul>
          </div>
        </div>

        {/* Progression */}
        {visitedArtworks.size === wallArtworks.length && (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
            >
              <div className="bg-gradient-to-r from-[#93441A] to-[#B67332] text-white p-6 rounded-xl shadow-2xl text-center border border-[#EED7C5]/30">
                <div className="w-16 h-16 bg-[#EED7C5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Maximize2 className="w-8 h-8 text-[#93441A]" />
                </div>
                <h3 className="text-xl font-medium mb-2">Félicitations !</h3>
                <p className="text-[#EED7C5] mb-4">Vous avez découvert toutes les œuvres de cette salle</p>
                <Button
                    onClick={onBack}
                    className="bg-[#EED7C5] text-[#93441A] hover:bg-[#EED7C5]/90"
                >
                  Continuer la visite
                </Button>
              </div>
            </motion.div>
        )}

        {/* Modal détail œuvre */}
        <AnimatePresence>
          {selectedArtwork && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
                  onClick={() => setSelectedArtwork(null)}
              >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#B67332]/20"
                    onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative h-64">
                    <img
                        src={selectedArtwork.imageUrl}
                        alt={selectedArtwork.title[language]}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h2 className="text-2xl font-medium mb-1">{selectedArtwork.title[language]}</h2>
                      <p className="text-sm text-[#EED7C5]">{selectedArtwork.artist?.[language]} • {selectedArtwork.year}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-muted-foreground mb-4">
                      {selectedArtwork.description[language]}
                    </p>

                    {selectedArtwork.materials && (
                        <div className="mb-4">
                          <h4 className="font-medium text-[#93441A] mb-1">Matériaux</h4>
                          <p className="text-sm text-muted-foreground">{selectedArtwork.materials[language]}</p>
                        </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                          className="flex-1 bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#7a3715] hover:to-[#9e5f29]"
                          onClick={() => {
                            setSelectedArtwork(null);
                            if (onArtworkClick) {
                              onArtworkClick(selectedArtwork);
                            }
                          }}
                      >
                        Voir les détails complets
                      </Button>
                      <Button
                          variant="outline"
                          onClick={() => setSelectedArtwork(null)}
                          className="border-[#B67332] text-[#B67332] hover:bg-[#B67332] hover:text-white"
                      >
                        Fermer
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};