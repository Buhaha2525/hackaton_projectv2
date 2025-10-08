import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';
import { magazineArticles } from '../data/mockData';

interface MagazinePageProps {
  onBack: () => void;
}

export const MagazinePage: React.FC<MagazinePageProps> = ({ onBack }) => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EED7C5] via-white to-[#EED7C5]">
      {/* Header */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#93441A] to-[#B67332] text-white">
        <div className="container mx-auto">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('action.back')}
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <BookOpen className="w-16 h-16" />
            <div>
              <h1 className="text-5xl md:text-6xl mb-2">
                {t('magazine.title')}
              </h1>
              <p className="text-xl opacity-90">
                {t('magazine.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          {/* Featured Article */}
          {magazineArticles.length > 0 && (
            <Card className="mb-12 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-96 lg:h-auto">
                  <img
                    src={magazineArticles[0].imageUrl}
                    alt={magazineArticles[0].title[language]}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#93441A] text-white px-4 py-2">
                    Article vedette
                  </Badge>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge className="w-fit mb-4 bg-[#B67332] text-white">{magazineArticles[0].category}</Badge>
                  <h2 className="text-3xl md:text-4xl mb-4 text-[#93441A]">
                    {magazineArticles[0].title[language]}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {magazineArticles[0].excerpt[language]}
                  </p>
                  <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {magazineArticles[0].author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(magazineArticles[0].date).toLocaleDateString(language)}
                    </div>
                  </div>
                  <Button size="lg" className="bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#7a3715] hover:to-[#9e5f29] text-white">
                    {t('action.readMore')}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Latest Articles */}
          <h2 className="text-3xl mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-[#93441A] to-[#B67332] rounded-full"></span>
            {t('magazine.latestArticles')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {magazineArticles.slice(1).map((article) => (
              <Card key={article.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="relative h-48">
                  <img
                    src={article.imageUrl}
                    alt={article.title[language]}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-orange-500 text-white">
                    {article.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2">
                    {article.title[language]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground line-clamp-3">
                    {article.excerpt[language]}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    {article.author}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.date).toLocaleDateString(language)}
                  </div>
                  <Button variant="outline" className="w-full">
                    {t('action.readMore')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
