import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from './ui/button';

interface FooterProps {
  onNavigate: (view: 'contact' | 'about' | 'visit' | 'events') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-r from-[#93441A] to-[#B67332] text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold mb-4">Musée des Civilisations Noires</h3>
            <p className="text-sm opacity-90 mb-4">
              Un lieu emblématique dédié à la préservation et la célébration du patrimoine africain et de la diaspora.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:underline opacity-90 hover:opacity-100 transition-opacity"
                >
                  À propos
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:underline opacity-90 hover:opacity-100 transition-opacity"
                >
                  Événements
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('visit')}
                  className="hover:underline opacity-90 hover:opacity-100 transition-opacity"
                >
                  Infos
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-90">Autoroute prolongée, Place de la Gare</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="opacity-90">+221 33 889 11 80</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="opacity-90">info@mcn.sn</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="opacity-90">
                  <div>Lun-Ven: 9h-18h</div>
                  <div>Sam-Dim: 10h-17h</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Social & CTA */}
          <div>
            <h3 className="font-bold mb-4">Suivez-nous</h3>
            <div className="flex gap-3 mb-6">
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
            <Button
              onClick={() => onNavigate('contact')}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/30"
              variant="outline"
            >
              Nous contacter
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 text-center text-sm opacity-80">
          <p>&copy; 2025 Musée des Civilisations Noires. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
