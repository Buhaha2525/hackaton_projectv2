import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Calendar, Clock, MapPin, Euro, CreditCard, Smartphone, Banknote, Shield, Users, User, Receipt, Ticket } from 'lucide-react';
import { events, exhibitions } from '../data/mockData';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventsPageProps {
  onBack: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onBack }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('events');
  const [selectedExhibition, setSelectedExhibition] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [reservationData, setReservationData] = useState({
    name: '',
    email: '',
    phone: '',
    visitDate: '',
    visitTime: '',
    numberOfPeople: '1',
    ticketType: 'full',
    paymentMethod: 'card',
    comments: ''
  });

  const handleReservation = (exhibitionId: string) => {
    setSelectedExhibition(exhibitionId);
  };

  const handleEventReservation = (eventId: string) => {
    setSelectedEvent(eventId);
  };

  const handleSubmitReservation = () => {
    // Simulation d'une réservation
    const type = selectedExhibition ? 'exposition' : 'événement';
    const participants = reservationData.numberOfPeople;
    const paymentMethod = reservationData.paymentMethod === 'card' ? 'carte bancaire' : 
                         reservationData.paymentMethod === 'mobile' ? 'paiement mobile' : 'sur place';
    
    alert(`Réservation confirmée pour ${type} !\nNombre de participants: ${participants}\nMode de paiement: ${paymentMethod}\nVous recevrez un email de confirmation.`);
    setSelectedExhibition(null);
    setSelectedEvent(null);
    setReservationData({
      name: '',
      email: '',
      phone: '',
      visitDate: '',
      visitTime: '',
      numberOfPeople: '1',
      ticketType: 'full',
      paymentMethod: 'card',
      comments: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EED7C5] via-white to-[#EED7C5]">
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#B67332] to-[#93441A] text-white">
        <div className="container mx-auto">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('action.back')}
          </Button>
          
          <h1 className="text-4xl md:text-5xl mb-4">
            {t('events.title')}
          </h1>
          <p className="text-xl opacity-90">
            Découvrez nos événements culturels et expositions en cours
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="events">Événements</TabsTrigger>
              <TabsTrigger value="exhibitions">Expositions</TabsTrigger>
            </TabsList>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-8">
              <h2 className="text-3xl mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-gradient-to-b from-[#B67332] to-[#93441A] rounded-full"></span>
                {t('events.upcoming')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-[#B67332]/20 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={event.imageUrl}
                          alt={event.title[language]}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <Badge className="absolute top-4 right-4 bg-[#93441A] text-white">
                          Événement
                        </Badge>
                        <CardTitle className="absolute bottom-4 left-4 right-4 text-xl text-white">
                          {event.title[language]}
                        </CardTitle>
                      </div>
                      <CardContent className="p-6 space-y-4">
                      <p className="text-muted-foreground">
                        {event.description[language]}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-[#B67332]" />
                        <span>{new Date(event.date).toLocaleDateString(language)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-[#B67332]" />
                        <span>{event.time}</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full bg-gradient-to-r from-[#B67332] to-[#93441A] hover:from-[#9e5f29] hover:to-[#7a3715] text-white"
                            onClick={() => handleEventReservation(event.id)}
                          >
                            Réserver
                          </Button>
                        </DialogTrigger>
                        
                       <DialogContent className="w-full max-w-[1400px] min-w-[700px] max-h-[95vh] overflow-y-auto p-6">



  {/* En-tête */}
  <div className="bg-gradient-to-r from-[#B67332] to-[#93441A] text-white p-8">
    <DialogHeader>
      <DialogTitle className="text-2xl leading-tight">
        Réserver une place - {event.title[language]} - Gratuit
      </DialogTitle>
    </DialogHeader>
  </div>
  
  {/* Contenu principal */}
  <div className="p-10 space-y-10">
    
    {/* Section Réservation */}
    <div>
      <h3 className="text-xl mb-6 flex items-center gap-2 text-gray-800">
        <Users className="w-5 h-5 text-[#B67332]" />
        Nombre de participants
      </h3>
      
      <div className="max-w-sm">
        <Label htmlFor="numberOfPeople" className="mb-3 block text-gray-700">
          Nombre de personnes
        </Label>
        <Input
          id="numberOfPeople"
          type="number"
          min="1"
          max="30"
          value={reservationData.numberOfPeople}
          onChange={(e) => setReservationData({...reservationData, numberOfPeople: e.target.value})}
          className="h-12"
        />
      </div>
    </div>

    <Separator />

    {/* Section Tarifs */}
    <div>
      <h3 className="text-xl mb-6 flex items-center gap-2 text-gray-800">
        <Receipt className="w-5 h-5 text-[#B67332]" />
        Tarifs
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-gray-200 rounded-xl p-8 bg-[#EED7C5]/20 min-w-[240px] shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Ticket className="w-6 h-6 text-[#93441A]" />
            <h4 className="font-medium text-gray-800">Tarif Normal</h4>
          </div>
          <p className="text-2xl font-bold text-[#93441A]">GRATUIT</p>
          <p className="text-sm text-muted-foreground mt-1">Événement gratuit pour tous</p>
        </div>
        
        <div className="border border-gray-200 rounded-xl p-8 bg-[#EED7C5]/20 min-w-[240px] shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-6 h-6 text-[#B67332]" />
            <h4 className="font-medium text-gray-800">Durée</h4>
          </div>
          <p className="text-lg font-semibold text-[#B67332]">3h00</p>
          <p className="text-sm text-muted-foreground mt-1">Soirée complète</p>
        </div>

        <div className="border border-gray-200 rounded-xl p-8 bg-[#EED7C5]/20 min-w-[240px] shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-6 h-6 text-[#B67332]" />
            <h4 className="font-medium text-gray-800">Places</h4>
          </div>
          <p className="text-lg font-semibold text-[#B67332]">Limitées</p>
          <p className="text-sm text-muted-foreground mt-1">Réservation recommandée</p>
        </div>
      </div>
    </div>

    <Separator />

    {/* Section Méthode de paiement */}
    <div>
      <h3 className="text-xl mb-6 flex items-center gap-2 text-gray-800">
        <CreditCard className="w-5 h-5 text-[#B67332]" />
        Méthode de paiement
      </h3>
      
      <RadioGroup 
        value={reservationData.paymentMethod} 
        onValueChange={(value) => setReservationData({...reservationData, paymentMethod: value})}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Carte bancaire */}
        <div className="flex items-start space-x-4 border border-gray-200 rounded-xl p-8 hover:bg-gray-50 hover:border-[#B67332]/30 transition-all cursor-pointer min-h-[120px] shadow-sm">
          <RadioGroupItem value="card" id="card" className="mt-1" />
          <div className="flex flex-col space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-[#93441A] flex-shrink-0" />
              <div className="flex-1">
                <Label htmlFor="card" className="text-base font-medium cursor-pointer block">
                  Carte bancaire
                </Label>
                <p className="text-sm text-muted-foreground mt-1">Visa, Mastercard</p>
              </div>
            </div>
          </div>
        </div>

        {/* Paiement mobile */}
        <div className="flex items-start space-x-4 border border-gray-200 rounded-xl p-8 hover:bg-gray-50 hover:border-[#B67332]/30 transition-all cursor-pointer min-h-[120px] shadow-sm">
          <RadioGroupItem value="mobile" id="mobile" className="mt-1" />
          <div className="flex flex-col space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-[#B67332] flex-shrink-0" />
              <div className="flex-1">
                <Label htmlFor="mobile" className="text-base font-medium cursor-pointer block">
                  Paiement mobile
                </Label>
                <p className="text-sm text-muted-foreground mt-1">Orange Money, Wave</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sur place */}
        <div className="flex items-start space-x-4 border border-gray-200 rounded-xl p-8 hover:bg-gray-50 hover:border-[#B67332]/30 transition-all cursor-pointer min-h-[120px] shadow-sm">
          <RadioGroupItem value="onsite" id="onsite" className="mt-1" />
          <div className="flex flex-col space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <Banknote className="w-8 h-8 text-[#B67332] flex-shrink-0" />
              <div className="flex-1">
                <Label htmlFor="onsite" className="text-base font-medium cursor-pointer block">
                  Sur place
                </Label>
                <p className="text-sm text-muted-foreground mt-1">Espèces ou carte</p>
              </div>
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  </div>
  
  {/* Boutons de bas de page */}
  <div className="flex gap-4 p-6 bg-gray-50 border-t">
    <Button
      variant="outline"
      className="flex-1 h-12"
      onClick={() => setSelectedEvent(null)}
    >
      Annuler
    </Button>
    <Button
      className="flex-1 h-12 bg-gradient-to-r from-[#B67332] to-[#93441A] hover:from-[#9e5f29] hover:to-[#7a3715] text-white"
      onClick={handleSubmitReservation}
      disabled={!reservationData.numberOfPeople}
    >
      Confirmer la réservation
    </Button>
  </div>
</DialogContent>

                      </Dialog>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Exhibitions Tab */}
            <TabsContent value="exhibitions" className="space-y-8">
              <h2 className="text-3xl mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-gradient-to-b from-[#93441A] to-[#B67332] rounded-full"></span>
                Expositions en cours & à venir
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {exhibitions.map((exhibition, index) => (
                  <motion.div
                    key={exhibition.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-[#93441A]/20 h-full">
                      <div className="relative h-64 overflow-hidden">
                        <ImageWithFallback
                          src={exhibition.imageUrl}
                          alt={exhibition.title[language]}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <Badge className="absolute top-4 right-4 bg-[#93441A] text-white">
                          Exposition
                        </Badge>
                        <CardTitle className="absolute bottom-4 left-4 right-4 text-2xl text-white">
                          {exhibition.title[language]}
                        </CardTitle>
                      </div>
                      
                      <CardContent className="p-6 space-y-4">
                        <p className="text-muted-foreground">
                          {exhibition.description[language]}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-[#93441A]" />
                            <span>
                              {new Date(exhibition.startDate).toLocaleDateString(language)} - {new Date(exhibition.endDate).toLocaleDateString(language)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-[#93441A]" />
                            <span>{exhibition.location[language]}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <Euro className="w-4 h-4 text-[#93441A]" />
                            <span>Inclus dans le billet d'entrée</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button 
                            variant="outline"
                            className="flex-1 border-[#93441A]/20 text-[#93441A] hover:bg-[#93441A]/5"
                          >
                            Voir détails
                          </Button>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                className="flex-1 bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#7a3715] hover:to-[#9e5f29] text-white"
                                onClick={() => handleReservation(exhibition.id)}
                              >
                                Réserver
                              </Button>
                            </DialogTrigger>
                            
                            <DialogContent className="max-w-[1400px] w-[98vw] max-h-[95vh] overflow-y-auto p-0">
                              <div className="bg-gradient-to-r from-[#93441A] to-[#B67332] text-white p-8">
                                <DialogHeader>
                                  <DialogTitle className="text-2xl leading-tight">
                                    Réserver une visite - {exhibition.title[language]} - Inclus dans le billet d'entrée
                                  </DialogTitle>
                                </DialogHeader>
                              </div>
                              
                              <div className="p-8 space-y-8">
                                {/* Section Informations personnelles */}
                                <div>
                                  <h3 className="text-xl mb-6 flex items-center gap-2 text-gray-800">
                                    <User className="w-5 h-5 text-[#93441A]" />
                                    Informations personnelles
                                  </h3>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <Label htmlFor="name" className="mb-3 block text-gray-700">Nom complet *</Label>
                                      <Input
                                        id="name"
                                        value={reservationData.name}
                                        onChange={(e) => setReservationData({...reservationData, name: e.target.value})}
                                        placeholder="Votre nom complet"
                                        className="h-12"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="email" className="mb-3 block text-gray-700">Email *</Label>
                                      <Input
                                        id="email"
                                        type="email"
                                        value={reservationData.email}
                                        onChange={(e) => setReservationData({...reservationData, email: e.target.value})}
                                        placeholder="votre@email.com"
                                        className="h-12"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="phone" className="mb-3 block text-gray-700">Téléphone *</Label>
                                      <Input
                                        id="phone"
                                        value={reservationData.phone}
                                        onChange={(e) => setReservationData({...reservationData, phone: e.target.value})}
                                        placeholder="+221 XX XXX XX XX"
                                        className="h-12"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="numberOfPeople" className="mb-3 block text-gray-700">Nombre de personnes</Label>
                                      <Input
                                        id="numberOfPeople"
                                        type="number"
                                        min="1"
                                        max="30"
                                        value={reservationData.numberOfPeople}
                                        onChange={(e) => setReservationData({...reservationData, numberOfPeople: e.target.value})}
                                        className="h-12"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <Separator />

                                {/* Section Date et heure de visite */}
                                <div>
                                  <h3 className="text-xl mb-6 flex items-center gap-2 text-gray-800">
                                    <Calendar className="w-5 h-5 text-[#93441A]" />
                                    Planification de la visite
                                  </h3>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <Label htmlFor="visitDate" className="mb-3 block text-gray-700">Date de visite *</Label>
                                      <Input
                                        id="visitDate"
                                        type="date"
                                        value={reservationData.visitDate}
                                        onChange={(e) => setReservationData({...reservationData, visitDate: e.target.value})}
                                        min={new Date().toISOString().split('T')[0]}
                                        max={exhibition.endDate}
                                        className="h-12"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="visitTime" className="mb-3 block text-gray-700">Heure souhaitée</Label>
                                      <Input
                                        id="visitTime"
                                        type="time"
                                        value={reservationData.visitTime}
                                        onChange={(e) => setReservationData({...reservationData, visitTime: e.target.value})}
                                        className="h-12"
                                      />
                                      <p className="text-xs text-muted-foreground mt-2">
                                        Musée ouvert de 10h à 19h (fermé le lundi)
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <Separator />

                                {/* Section Type de billet */}
                                <div>
                                  <h3 className="text-xl mb-6 flex items-center gap-2 text-gray-800">
                                    <Users className="w-5 h-5 text-[#B67332]" />
                                    Type de visite
                                  </h3>
                                  
                                  <RadioGroup 
                                    value={reservationData.ticketType} 
                                    onValueChange={(value) => setReservationData({...reservationData, ticketType: value})}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                  >
                                    <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                      <RadioGroupItem value="full" id="full" />
                                      <div className="grid gap-1.5 leading-none">
                                        <Label htmlFor="full" className="text-sm font-medium cursor-pointer">
                                          Tarif plein
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                          3 000 FCFA
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                      <RadioGroupItem value="student" id="student" />
                                      <div className="grid gap-1.5 leading-none">
                                        <Label htmlFor="student" className="text-sm font-medium cursor-pointer">
                                          Étudiant/Scolaire
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                          500 FCFA
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                      <RadioGroupItem value="group" id="group" />
                                      <div className="grid gap-1.5 leading-none">
                                        <Label htmlFor="group" className="text-sm font-medium cursor-pointer">
                                          Groupe (10-30 pers.)
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                          2 500 FCFA/pers.
                                        </p>
                                      </div>
                                    </div>
                                  </RadioGroup>
                                </div>

                                <Separator />

                                {/* Section Tarifs */}
                                <div>
                                  <h3 className="text-xl mb-6 flex items-center gap-2 text-gray-800">
                                    <Receipt className="w-5 h-5 text-[#B67332]" />
                                    Tarifs détaillés
                                  </h3>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="border border-gray-200 rounded-lg p-6 bg-[#EED7C5]/20">
                                      <div className="flex items-center gap-3 mb-3">
                                        <Ticket className="w-6 h-6 text-[#93441A]" />
                                        <h4 className="font-medium text-gray-800">Tarif Plein</h4>
                                      </div>
                                      <p className="text-2xl font-bold text-[#93441A]">3 000 FCFA</p>
                                      <p className="text-sm text-muted-foreground mt-1">Adulte, entrée complète</p>
                                    </div>
                                    
                                    <div className="border border-gray-200 rounded-lg p-6 bg-[#EED7C5]/20">
                                      <div className="flex items-center gap-3 mb-3">
                                        <Users className="w-6 h-6 text-[#B67332]" />
                                        <h4 className="font-medium text-gray-800">Étudiant</h4>
                                      </div>
                                      <p className="text-2xl font-bold text-[#B67332]">500 FCFA</p>
                                      <p className="text-sm text-muted-foreground mt-1">Avec justificatif</p>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-6 bg-[#EED7C5]/20">
                                      <div className="flex items-center gap-3 mb-3">
                                        <User className="w-6 h-6 text-[#B67332]" />
                                        <h4 className="font-medium text-gray-800">Scolaire</h4>
                                      </div>
                                      <p className="text-2xl font-bold text-[#B67332]">500 FCFA</p>
                                      <p className="text-sm text-muted-foreground mt-1">Groupes scolaires</p>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-6 bg-[#EED7C5]/20">
                                      <div className="flex items-center gap-3 mb-3">
                                        <Users className="w-6 h-6 text-[#B67332]" />
                                        <h4 className="font-medium text-gray-800">Groupe</h4>
                                      </div>
                                      <p className="text-2xl font-bold text-[#B67332]">2 500 FCFA</p>
                                      <p className="text-sm text-muted-foreground mt-1">Par personne (10-30)</p>
                                    </div>
                                  </div>

                                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-start gap-3">
                                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                                      <div>
                                        <h4 className="font-medium text-blue-900 mb-1">Informations importantes</h4>
                                        <ul className="text-sm text-blue-700 space-y-1">
                                          <li>• Gratuit pour les enfants de moins de 6 ans</li>
                                          <li>• Réduction de 50% pour les seniors (65 ans et +)</li>
                                          <li>• Billet valable toute la journée</li>
                                          <li>• Accès libre aux expositions temporaires inclus</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <Separator />

                                {/* Section Méthode de paiement */}
                                <div>
                                  <h3 className="text-xl mb-6 flex items-center gap-2 text-gray-800">
                                    <CreditCard className="w-5 h-5 text-[#B67332]" />
                                    Méthode de paiement
                                  </h3>
                                  
                                  <RadioGroup 
                                    value={reservationData.paymentMethod} 
                                    onValueChange={(value) => setReservationData({...reservationData, paymentMethod: value})}
                                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                                  >
                                    <div className="flex items-start space-x-4 border border-gray-200 rounded-lg p-6 hover:bg-gray-50 hover:border-[#B67332]/30 transition-all cursor-pointer min-h-[100px]">
                                      <RadioGroupItem value="card" id="card" className="mt-1" />
                                      <div className="flex flex-col space-y-3 flex-1">
                                        <div className="flex items-center gap-3">
                                          <CreditCard className="w-8 h-8 text-[#93441A] flex-shrink-0" />
                                          <div className="flex-1">
                                            <Label htmlFor="card" className="text-base font-medium cursor-pointer block">
                                              Carte bancaire
                                            </Label>
                                            <p className="text-sm text-muted-foreground mt-1">
                                              Visa, Mastercard
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-start space-x-4 border border-gray-200 rounded-lg p-6 hover:bg-gray-50 hover:border-[#B67332]/30 transition-all cursor-pointer min-h-[100px]">
                                      <RadioGroupItem value="mobile" id="mobile" className="mt-1" />
                                      <div className="flex flex-col space-y-3 flex-1">
                                        <div className="flex items-center gap-3">
                                          <Smartphone className="w-8 h-8 text-[#B67332] flex-shrink-0" />
                                          <div className="flex-1">
                                            <Label htmlFor="mobile" className="text-base font-medium cursor-pointer block">
                                              Paiement mobile
                                            </Label>
                                            <p className="text-sm text-muted-foreground mt-1">
                                              Orange Money, Wave
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-start space-x-4 border border-gray-200 rounded-lg p-6 hover:bg-gray-50 hover:border-[#B67332]/30 transition-all cursor-pointer min-h-[100px]">
                                      <RadioGroupItem value="onsite" id="onsite" className="mt-1" />
                                      <div className="flex flex-col space-y-3 flex-1">
                                        <div className="flex items-center gap-3">
                                          <Banknote className="w-8 h-8 text-[#B67332] flex-shrink-0" />
                                          <div className="flex-1">
                                            <Label htmlFor="onsite" className="text-base font-medium cursor-pointer block">
                                              Sur place
                                            </Label>
                                            <p className="text-sm text-muted-foreground mt-1">
                                              Espèces ou carte
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </RadioGroup>
                                </div>



                              </div>
                              
                              <div className="flex gap-4 p-6 bg-gray-50 border-t">
                                <Button
                                  variant="outline"
                                  className="flex-1 h-12"
                                  onClick={() => setSelectedExhibition(null)}
                                >
                                  Annuler
                                </Button>
                                <Button
                                  className="flex-1 h-12 bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#7a3715] hover:to-[#9e5f29] text-white"
                                  onClick={handleSubmitReservation}
                                  disabled={!reservationData.name || !reservationData.email || !reservationData.phone || !reservationData.visitDate}
                                >
                                  Confirmer la réservation
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};
