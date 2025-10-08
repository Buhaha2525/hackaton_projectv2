import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArtworkCard } from './ArtworkCard';
import { useLanguage } from '../contexts/LanguageContext';
import { categories, getArtworksByCategory } from '../data/mockData';
import { Artwork, CategoryType } from '../types';
import { ArrowLeft, Filter } from 'lucide-react';

interface CategoryPageProps {
  categoryId: CategoryType;
  onArtworkClick: (artwork: Artwork) => void;
  onBack: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ 
  categoryId, 
  onArtworkClick, 
  onBack 
}) => {
  const { language, t } = useLanguage();
  
  const category = categories.find(cat => cat.id === categoryId);
  const artworks = getArtworksByCategory(categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Catégorie non trouvée</h2>
          <Button onClick={onBack}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EED7C5] via-white to-[#EED7C5]">
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#93441A] to-[#B67332] text-white">
        <div className="container mx-auto">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('action.back')}
          </Button>
          
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl mb-2">
              {category.name[language]}
            </h1>
            <p className="text-xl opacity-90">
              {category.description[language]}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-0 text-lg px-4 py-2">
              {artworks.length} œuvre{artworks.length > 1 ? 's' : ''}
            </Badge>
          </div>
        </div>
      </section>

      {/* Artworks Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {artworks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aucune œuvre disponible</h3>
              <p className="text-muted-foreground">
                Cette catégorie sera bientôt enrichie avec de nouvelles œuvres.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl">
                  Toutes les œuvres - {category.name[language]}
                </h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Filter className="w-4 h-4" />
                  <span>{artworks.length} résultat{artworks.length > 1 ? 's' : ''}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {artworks.map((artwork) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    onClick={() => onArtworkClick(artwork)}
                    size="medium"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

    </div>
  );
};