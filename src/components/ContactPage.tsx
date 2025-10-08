import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
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
            {t('contact.title')}
          </h1>
          <p className="text-xl opacity-90">
            Nous sommes là pour vous accompagner dans votre découverte culturelle
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-orange-500" />
                    Adresse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">
                    {t('visit.address')}
                  </p>
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Voir sur la carte
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-orange-500" />
                    {t('contact.phone')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-2">+221 33 889 11 80</p>
                  <p className="text-muted-foreground">Accueil et réservations</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-orange-500" />
                    {t('contact.email')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-2">info@mcn.sn</p>
                  <p className="text-muted-foreground">Pour toutes vos questions</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-orange-500" />
                    {t('visit.hours')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-lg">{t('contact.hours.weekdays')}</p>
                  <p className="text-lg">{t('contact.hours.weekend')}</p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Fermé les jours fériés nationaux
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Envoyez-nous un message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Prénom</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Sujet</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option>Visite guidée</option>
                      <option>Événements privés</option>
                      <option>Recherche/Étude</option>
                      <option>Partenariat</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      placeholder="Décrivez votre demande ou votre message..."
                    ></textarea>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    onClick={() => alert('Message envoyé ! (simulation)')}
                  >
                    Envoyer le message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Info */}
          <Card className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Planifiez votre visite</h3>
              <p className="text-lg opacity-90 mb-6">
                Découvrez les trésors du patrimoine africain dans un cadre exceptionnel. 
                Réservez votre visite guidée ou participez à nos événements culturels.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => alert('Réservation en ligne (simulation)')}
                >
                  Réserver une visite
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => alert('Calendrier des événements (simulation)')}
                >
                  Voir les événements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};