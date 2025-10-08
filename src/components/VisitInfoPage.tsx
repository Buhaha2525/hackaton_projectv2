import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Info
} from 'lucide-react';

interface VisitInfoPageProps {
  onBack: () => void;
}

export const VisitInfoPage: React.FC<VisitInfoPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('info');

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
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('visit.title')}
          </h1>
          <p className="text-xl opacity-90">
            Tout ce que vous devez savoir pour votre visite
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="prices">Tarifs</TabsTrigger>
              <TabsTrigger value="guidelines">Conseils</TabsTrigger>
            </TabsList>

            {/* General Info Tab */}
            <TabsContent value="info" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="shadow-lg border-[#B67332]/20">
                  <CardHeader className="bg-gradient-to-r from-[#EED7C5] to-[#B67332]/10">
                    <CardTitle className="flex items-center gap-3 text-[#93441A]">
                      <MapPin className="w-6 h-6 text-[#B67332]" />
                      {t('visit.location')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-lg">{t('visit.address')}</p>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.8776!2d-17.468!3d14.717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQzJzAxLjIiTiAxN8KwMjgnMDQuOCJX!5e0!3m2!1sfr!2ssn!4v1234567890"
                      width="100%"
                      height="250"
                      style={{ border: 0, borderRadius: '8px' }}
                      allowFullScreen
                      loading="lazy"
                    />
                    <Button className="w-full" variant="outline">
                      Ouvrir dans Google Maps
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-[#B67332]/20">
                  <CardHeader className="bg-gradient-to-r from-[#EED7C5] to-[#B67332]/10">
                    <CardTitle className="flex items-center gap-3 text-[#93441A]">
                      <Clock className="w-6 h-6 text-[#B67332]" />
                      {t('visit.hours')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-[#EED7C5] rounded-lg">
                        <span className="font-medium">Lundi - Vendredi</span>
                        <span className="text-[#93441A] font-semibold">9h00 - 18h00</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-[#EED7C5] rounded-lg">
                        <span className="font-medium">Samedi - Dimanche</span>
                        <span className="text-[#93441A] font-semibold">10h00 - 17h00</span>
                      </div>
                      <p className="text-sm text-muted-foreground pt-2">
                        Fermé les jours fériés nationaux
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg border-[#B67332]/20">
                <CardHeader className="bg-gradient-to-r from-[#EED7C5] to-[#B67332]/10">
                  <CardTitle className="flex items-center gap-3 text-[#93441A]">
                    <Users className="w-6 h-6 text-[#B67332]" />
                    {t('visit.groupVisits')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">{t('visit.groupInfo')}</p>
                  <Button className="bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#7a3715] hover:to-[#9e5f29] text-white">
                    Réserver une visite de groupe
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Prices Tab */}
            <TabsContent value="prices">
              <Card className="shadow-lg border-[#B67332]/20">
                <CardHeader className="bg-gradient-to-r from-[#EED7C5] to-[#B67332]/10">
                  <CardTitle className="flex items-center gap-3 text-[#93441A]">
                    <DollarSign className="w-6 h-6 text-[#B67332]" />
                    {t('visit.prices')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Visite libre */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-[#93441A]">Visite libre</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-6 bg-gradient-to-br from-[#EED7C5] to-[#B67332]/10 rounded-xl border-2 border-[#B67332]/30">
                        <h4 className="text-lg font-semibold mb-2 text-[#93441A]">Tarif plein</h4>
                        <p className="text-3xl text-[#93441A] mb-2">3 000 FCFA</p>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-[#EED7C5] to-[#B67332]/10 rounded-xl border-2 border-[#B67332]/30">
                        <h4 className="text-lg font-semibold mb-2 text-[#93441A]">Scolaire & Étudiant</h4>
                        <p className="text-3xl text-[#93441A] mb-2">500 FCFA</p>
                        <p className="text-sm text-muted-foreground">Sur présentation carte</p>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-[#EED7C5] to-[#B67332]/10 rounded-xl border-2 border-[#B67332]/30">
                        <h4 className="text-lg font-semibold mb-2 text-[#93441A]">Groupe (10-30 pers.)</h4>
                        <p className="text-3xl text-[#93441A] mb-2">2 500 FCFA</p>
                        <p className="text-sm text-muted-foreground">Par personne</p>
                      </div>
                    </div>
                  </div>

                  {/* Visite guidée */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-4 text-[#93441A]">Visite guidée</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-6 bg-gradient-to-br from-[#B67332]/20 to-[#93441A]/10 rounded-xl border-2 border-[#93441A]/40">
                        <h4 className="text-lg font-semibold mb-2 text-[#93441A]">Tarif plein</h4>
                        <p className="text-3xl text-[#93441A] mb-2">5 000 FCFA</p>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-[#B67332]/20 to-[#93441A]/10 rounded-xl border-2 border-[#93441A]/40">
                        <h4 className="text-lg font-semibold mb-2 text-[#93441A]">Tarif scolaire</h4>
                        <p className="text-3xl text-[#93441A] mb-2">1 000 FCFA</p>
                        <p className="text-sm text-muted-foreground">Sur présentation carte</p>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-[#B67332]/20 to-[#93441A]/10 rounded-xl border-2 border-[#93441A]/40">
                        <h4 className="text-lg font-semibold mb-2 text-[#93441A]">Tarif étudiant</h4>
                        <p className="text-3xl text-[#93441A] mb-2">1 500 FCFA</p>
                        <p className="text-sm text-muted-foreground">Sur présentation carte</p>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-[#B67332]/20 to-[#93441A]/10 rounded-xl border-2 border-[#93441A]/40">
                        <h4 className="text-lg font-semibold mb-2 text-[#93441A]">Groupe (10-30 pers.)</h4>
                        <p className="text-3xl text-[#93441A] mb-2">4 000 FCFA</p>
                        <p className="text-sm text-muted-foreground">Par personne</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-6 bg-blue-50 rounded-xl">
                    <h3 className="font-semibold mb-2">Informations importantes</h3>
                    <ul className="space-y-2 text-sm">
                      <li>✓ Réservation obligatoire pour les visites guidées</li>
                      <li>✓ Paiement en espèces ou par carte bancaire</li>
                      <li>✓ Les tarifs groupe s'appliquent de 10 à 30 personnes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Guidelines Tab */}
            <TabsContent value="guidelines">
              <Card className="shadow-lg border-[#B67332]/20">
                <CardHeader className="bg-gradient-to-r from-[#EED7C5] to-[#B67332]/10">
                  <CardTitle className="flex items-center gap-3 text-[#93441A]">
                    <Info className="w-6 h-6 text-[#B67332]" />
                    {t('visit.guidelines')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                      <h3 className="font-semibold text-green-700 mb-4">✓ Autorisé</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Photos sans flash</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Enregistrements audio des guides</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Petits sacs à dos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Application mobile du musée</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200">
                      <h3 className="font-semibold text-red-700 mb-4">✗ Interdit</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600">✗</span>
                          <span>Toucher les œuvres</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600">✗</span>
                          <span>Flash et lumière vive</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600">✗</span>
                          <span>Nourriture et boissons</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600">✗</span>
                          <span>Téléphone en mode sonnerie</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 p-6 bg-blue-50 rounded-xl">
                    <h3 className="font-semibold mb-3">Recommandations</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Prévoir 2 à 3 heures pour une visite complète</li>
                      <li>• Des casiers gratuits sont disponibles pour les bagages</li>
                      <li>• Le musée est accessible aux personnes à mobilité réduite</li>
                      <li>• Une cafétéria est disponible au rez-de-chaussée</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>


          </Tabs>
        </div>
      </section>
    </div>
  );
};
