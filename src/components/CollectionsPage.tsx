import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { categories } from '../data/mockData';
import { CategoryType } from '../types';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CollectionsPageProps {
  onBack: () => void;
  onCategoryClick: (categoryId: CategoryType) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ 
  onBack, 
  onCategoryClick
}) => {
  const { language, t } = useLanguage();

  const categoryImages: Record<CategoryType, string> = {
    'sculpture': 'https://images.unsplash.com/photo-1720945489924-19b707539b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc2N1bHB0dXJlJTIwbXVzZXVtfGVufDF8fHx8MTc1OTc5NDcwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    'painting': 'https://images.unsplash.com/photo-1722717820200-9666326fcacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcGFpbnRpbmclMjBhcnR8ZW58MXx8fHwxNzU5Nzk0NzAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'photography': 'https://images.unsplash.com/photo-1652002039648-8e2026e099cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcGhvdG9ncmFwaHklMjBleGhpYml0aW9ufGVufDF8fHx8MTc1OTc5NDcwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    'tapestry': 'https://images.unsplash.com/photo-1756364071388-862fedb2fc09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdGV4dGlsZSUyMHRhcGVzdHJ5fGVufDF8fHx8MTc1OTc5NDcwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'videoart': 'https://images.unsplash.com/photo-1567446054752-3d70339da25a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGFydCUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3NTk3OTQ3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'installation': 'https://images.unsplash.com/photo-1723112032128-dcfa04d4745a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBpbnN0YWxsYXRpb24lMjBtdXNldW18ZW58MXx8fHwxNzU5Nzk0NzAzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  };

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
            Retour
          </Button>
          
          <h1 className="text-4xl md:text-5xl mb-4">
            Collections
          </h1>
          <p className="text-xl opacity-90">
            Découvrez nos catégories d'œuvres
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full border-[#B67332]/20 overflow-hidden"
                  onClick={() => onCategoryClick(category.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback 
                      src={categoryImages[category.id]}
                      alt={category.name[language]}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <CardTitle className="absolute bottom-4 left-4 right-4 text-2xl text-white">
                      {category.name[language]}
                    </CardTitle>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      {category.description[language]}
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#7a3715] hover:to-[#9e5f29] text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCategoryClick(category.id);
                      }}
                    >
                      {t('home.viewMore')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
