import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Building, Users, Award, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const { t } = useLanguage();

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
            {t('action.back')}
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('about.title')}
          </h1>
          <p className="text-xl opacity-90 max-w-3xl">
            {t('about.mission')}
          </p>
        </div>
      </section>

      {/* Museum Image */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
            <img
              src={museumImage}
              alt="Musée des Civilisations Noires"
              className="w-full h-[400px] md:h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Musée des Civilisations Noires</h2>
              <p className="text-lg opacity-90">Dakar, Sénégal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* History */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Building className="w-6 h-6 text-orange-500" />
                  Histoire du Musée
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  {t('about.history')}
                </p>
                <p className="text-muted-foreground">
                  Le musée s'étend sur 14 000 m² et présente une architecture moderne 
                  inspirée des formes traditionnelles africaines. Il abrite plus de 
                  18 000 objets et œuvres d'art provenant de tout le continent africain 
                  et de la diaspora.
                </p>
              </CardContent>
            </Card>

            {/* Mission */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-orange-500" />
                  Notre Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Préserver et valoriser le patrimoine culturel des civilisations noires, 
                  promouvoir la recherche historique et artistique, et offrir un espace 
                  de dialogue interculturel.
                </p>
                <p className="text-muted-foreground">
                  Nous nous engageons à être un pont entre le passé et l'avenir, 
                  entre l'Afrique et sa diaspora, entre les générations et les cultures.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
              <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-orange-600 mb-2">18,000+</h3>
              <p className="text-muted-foreground">Œuvres d'art et objets</p>
            </Card>
            
            <Card className="text-center p-8 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
              <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-orange-600 mb-2">200,000+</h3>
              <p className="text-muted-foreground">Visiteurs par an</p>
            </Card>
            
            <Card className="text-center p-8 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
              <Calendar className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-orange-600 mb-2">2018</h3>
              <p className="text-muted-foreground">Année d'inauguration</p>
            </Card>
          </div>

          {/* Values */}
          <Card className="shadow-lg bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-6">Nos Valeurs</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-2">Authenticité</h4>
                  <p className="opacity-90">
                    Préserver l'intégrité et l'authenticité du patrimoine culturel africain
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Inclusion</h4>
                  <p className="opacity-90">
                    Rendre la culture accessible à tous, sans distinction
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Innovation</h4>
                  <p className="opacity-90">
                    Utiliser les technologies modernes pour enrichir l'expérience culturelle
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};