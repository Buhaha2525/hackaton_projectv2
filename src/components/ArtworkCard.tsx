import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Artwork } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Volume2, Eye } from 'lucide-react';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: () => void;
  size?: 'small' | 'medium' | 'large';
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ 
  artwork, 
  onClick, 
  size = 'medium' 
}) => {
  const { language } = useLanguage();

  const sizeClasses = {
    small: 'w-full h-48',
    medium: 'w-full h-64',
    large: 'w-full h-80'
  };

  const cardClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg'
  };

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] overflow-hidden ${cardClasses[size]}`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={artwork.imageUrl}
          alt={artwork.title[language]}
          className={`${sizeClasses[size]} object-cover transition-transform duration-300 group-hover:scale-110`}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3 flex gap-2">
          {artwork.audioUrl && (
            <Badge variant="secondary" className="bg-orange-500/90 text-white border-0">
              <Volume2 className="w-3 h-3 mr-1" />
              Audio
            </Badge>
          )}
          {artwork.videoUrl && (
            <Badge variant="secondary" className="bg-blue-500/90 text-white border-0">
              <Eye className="w-3 h-3 mr-1" />
              Vidéo
            </Badge>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
            {artwork.title[language]}
          </h3>
          {artwork.artist && (
            <p className="text-orange-200 text-sm">
              {artwork.artist[language]}
            </p>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {artwork.title[language]}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
          {artwork.description[language]}
        </p>
        
        <div className="flex items-center justify-between">
          {artwork.artist && (
            <p className="text-xs text-muted-foreground">
              {artwork.artist[language]}
            </p>
          )}
          {artwork.period && (
            <p className="text-xs text-muted-foreground">
              {artwork.period[language]}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};