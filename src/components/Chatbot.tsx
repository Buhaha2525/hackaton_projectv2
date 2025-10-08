import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  'horaires': 'Le musée est ouvert du mardi au dimanche de 10h à 19h. Fermé le lundi.',
  'tarifs': 'Visite libre - Plein: 3000 FCFA, Scolaire/Étudiant: 500 FCFA, Groupe (10-30): 2500 FCFA/pers. | Visite guidée - Plein: 5000 FCFA, Scolaire: 1000 FCFA, Étudiant: 1500 FCFA, Groupe (10-30): 4000 FCFA/pers.',
  'localisation': 'Nous sommes situés Autoroute prolongée, Place de la Gare à Dakar, Sénégal.',
  'visite': 'Nous proposons des visites libres et guidées. Les visites guidées nécessitent une réservation obligatoire.',
  'exposition': 'Nous avons actuellement 2 expositions: "Renaissances Africaines" et "Textiles Sacrés".',
  'collection': 'Le musée compte plus de 18 000 œuvres d\'art réparties en 6 catégories: Sculpture, Peinture, Photographie, Tapisserie, Vidéo Art et Installation.',
  'bonjour': 'Bonjour ! Je suis l\'assistant virtuel du Musée des Civilisations Noires. Comment puis-je vous aider ?',
  'merci': 'Je vous en prie ! N\'hésitez pas si vous avez d\'autres questions.',
  'contact': 'Vous pouvez nous contacter au +221 33 823 52 23 ou par email à info@mcn.sn',
  'parcours': 'Nous proposons 5 parcours guidés thématiques: Histoire Précoloniale, Art Contemporain, Textiles et Artisanat, Musique et Instruments, et Visite Complète. Chaque parcours dure entre 45 et 120 minutes.',
  'scan': 'Notre système de points vous permet de scanner des QR codes près de certaines œuvres pour gagner des points et débloquer du contenu exclusif (vidéos, audio, informations). Scannez 3 codes actuellement disponibles !',
  'app': 'Notre application mobile offre : audio guides multilingues (français, anglais, wolof), réalité augmentée, carte interactive du musée, et système de points. Téléchargez-la gratuitement !',
  'magazine': 'La Casemac est notre magazine culturel avec des articles sur le patrimoine africain, des interviews d\'artistes et l\'actualité culturelle.',
  'événements': 'Nous organisons régulièrement des événements : conférences, ateliers, Nuit des Musées, performances artistiques. Consultez notre page Événements pour le programme complet.',
  'plan': 'Un plan interactif du musée est disponible dans la section "Infos & Visite". Il vous aidera à localiser toutes les salles, œuvres, toilettes et la cafétéria.'
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }
    
    return 'Je suis désolé, je n\'ai pas compris votre question. Vous pouvez me demander des informations sur les horaires, tarifs, expositions, collections, ou visites. Pour plus d\'informations, contactez-nous au +221 33 823 52 23.';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: findResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'Horaires d\'ouverture',
    'Tarifs',
    'Parcours guidés',
    'Système de points'
  ];

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#7a3715] hover:to-[#9e5f29] shadow-2xl"
              size="icon"
            >
              <MessageCircle className="w-8 h-8" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 w-96 z-50 shadow-2xl"
          >
            <Card className="overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#93441A] to-[#B67332] text-white p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <div>
                    <h3 className="text-sm">{t('chatbot.title')}</h3>
                    <p className="text-xs opacity-90">En ligne</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="h-72 overflow-y-auto p-4 bg-gray-50 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-[#93441A] to-[#B67332] text-white'
                          : 'bg-white text-gray-800 shadow'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="p-4 bg-white border-t">
                  <p className="text-sm text-gray-600 mb-2">Questions rapides :</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputValue(question);
                          setTimeout(() => handleSend(), 100);
                        }}
                        className="text-xs px-3 py-1 bg-[#EED7C5] hover:bg-[#B67332]/20 text-[#93441A] rounded-full transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 bg-white border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('chatbot.placeholder')}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#B67332]"
                  />
                  <Button
                    onClick={handleSend}
                    className="rounded-full bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#7a3715] hover:to-[#9e5f29]"
                    size="icon"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
