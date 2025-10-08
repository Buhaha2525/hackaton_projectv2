import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { AudioPlayer } from './AudioPlayer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { Artwork } from '../types';
import { ArrowLeft, ArrowRight, Play, Info, Calendar, Palette, Ruler } from 'lucide-react';

interface ArtworkDetailProps {
  artwork: Artwork;
  onBack: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export const ArtworkDetail: React.FC<ArtworkDetailProps> = ({
  artwork,
  onBack,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext
}) => {
  const { language, t } = useLanguage();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EED7C5] via-white to-[#EED7C5]">
      {/* Navigation Header */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('action.back')}
            </Button>
            
            <div className="flex items-center gap-2">
              {onPrevious && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('action.previous')}
                </Button>
              )}
              {onNext && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onNext}
                  disabled={!hasNext}
                  className="gap-2"
                >
                  {t('action.next')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-6">
            <Card className="overflow-hidden shadow-xl">
              <div className="relative">
                <ImageWithFallback
                  src={artwork.imageUrl}
                  alt={artwork.title[language]}
                  className="w-full h-[500px] md:h-[600px] object-cover"
                />
                
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {artwork.audioUrl && (
                    <Badge className="bg-[#B67332] text-white border-0">
                      Audio disponible
                    </Badge>
                  )}

                </div>
              </div>
            </Card>

            {/* Video Section */}
            {artwork.videoUrl && (
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#93441A] to-[#B67332] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    {t('artwork.watchVideo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {!showVideo ? (
                    <div className="bg-gradient-to-br from-[#EED7C5]/30 to-[#B67332]/10 p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#93441A] to-[#B67332] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-muted-foreground mb-2">
                        {language === 'fr' && 'Contenu vidéo exclusif pour cette œuvre'}
                        {language === 'en' && 'Exclusive video content for this artwork'}
                        {language === 'wo' && 'Video bu bees ngir ni jafe'}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'fr' && 'Découvrez l\'histoire et les détails de cette œuvre en vidéo'}
                        {language === 'en' && 'Discover the history and details of this artwork in video'}
                        {language === 'wo' && 'Xam tàriix ak jafe yi ci video'}
                      </p>
                      <Button 
                        className="bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#7a3616] hover:to-[#9e5e2a]" 
                        onClick={() => setShowVideo(true)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {t('artwork.watchVideo')}
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 bg-black">
                      <video 
                        controls 
                        autoPlay
                        className="w-full rounded-lg"
                        poster={artwork.imageUrl}
                      >
                        <source src={artwork.videoUrl} type="video/mp4" />
                        {language === 'fr' && 'Votre navigateur ne supporte pas la lecture de vidéos.'}
                        {language === 'en' && 'Your browser does not support video playback.'}
                        {language === 'wo' && 'Sa navigateur xamul video.'}
                      </video>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

          </div>

          {/* Content Section */}
          <div className="space-y-6">
            {/* Title and Basic Info */}
            <div>
              <h1 className="text-4xl md:text-5xl mb-4 leading-tight">
                {artwork.title[language]}
              </h1>
              
              {artwork.artist && (
                <p className="text-xl text-[#93441A] mb-2">
                  {artwork.artist[language]}
                </p>
              )}
              
              {artwork.period && (
                <p className="text-lg text-muted-foreground">
                  {artwork.period[language]}
                </p>
              )}
            </div>

            {/* Audio Player */}
            <AudioPlayer
              audioUrl={artwork.audioUrl}
              title={`Narration - ${artwork.title[language]}`}
            />

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">
                  {artwork.description[language]}
                </p>
              </CardContent>
            </Card>

            {/* Cultural Information */}
            {artwork.culturalInfo && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('details.culturalInfo')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed">
                    {artwork.culturalInfo[language]}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Technical Details */}
            <Card>
              <CardHeader>
                <CardTitle>Détails techniques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {artwork.materials && (
                  <div className="flex items-start gap-3">
                    <Palette className="w-5 h-5 text-[#B67332] mt-0.5" />
                    <div>
                      <p>{t('details.materials')}</p>
                      <p className="text-muted-foreground">{artwork.materials[language]}</p>
                    </div>
                  </div>
                )}
                
                {artwork.dimensions && (
                  <div className="flex items-start gap-3">
                    <Ruler className="w-5 h-5 text-[#B67332] mt-0.5" />
                    <div>
                      <p>{t('details.dimensions')}</p>
                      <p className="text-muted-foreground">{artwork.dimensions[language]}</p>
                    </div>
                  </div>
                )}
                
                {artwork.period && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#B67332] mt-0.5" />
                    <div>
                      <p>{t('details.period')}</p>
                      <p className="text-muted-foreground">{artwork.period[language]}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};