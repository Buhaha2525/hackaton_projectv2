import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface HistoryPageProps {
  onBack: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onBack }) => {
  const { language } = useLanguage();

  const museumHistory = {
    fr: {
      title: "L'Histoire du Musée",
      intro: "Projet au long cours, pensé tour à tour par un militant anticolonialiste (Lamine Senghor), un penseur de la négritude (Léopold Sedar Senghor) et un chantre de la renaissance africaine (Abdoulaye Wade), le Musée des Civilisations noires (MCN) a été inauguré le 6 décembre 2018 par le Président Macky Sall.",
      aboutTitle: "À propos du Musée des Civilisations noires",
      aboutContent: "Le MCN œuvre depuis lors pour la valorisation de l'apport des Civilisations noires au patrimoine universel de l'humanité. Ainsi, le visiteur qui franchit la porte de la case à impluvium qui a inspiré son architecture rencontre tout autour du grand Baobab de l'artiste haïtien Edouard Duval-Carrié, l'exposition : l'Afrique, berceau de l'humanité.",
      sections: [
        {
          title: "L'Expérience du Visiteur",
          content: "Partout ailleurs, à travers les fascinantes œuvres qui font les diverses expositions, le visiteur peut se faire une idée de la dispersion des peuples noirs à travers le monde. Il peut imaginer les formations sociales, les modes de production, les représentations symboliques, les rites initiatiques, produits par les civilisations noires depuis la nuit des temps. Il rencontre le rôle joué par les peuples noirs dans les guerres mondiales et l'avènement d'un monde libre. Il peut se remémorer les débats et les combats des intellectuels, des artistes et écrivains noirs dans les luttes pour l'émancipation, sans compter leur apport dans la naissance du Panafricanisme et les droits civiques."
        },
        {
          title: "Une Vision Authentique",
          content: "Le visiteur quitte la case en ayant foi en la communauté de destin qui lie les peuples noirs (africains, états-uniens, caraïbéens, européens, australiens, afro-latins, indiens…). Pour autant, sans tomber dans une approche faussement universalisante ou prétendument non-victimaire qui ruserait avec la réalité historique objective faite de maltraitance pluriséculaire des corps noirs à travers : la traite négrière, la colonisation, l'apartheid, le racisme systémique, etc. à aucun moment, les expositions ne tombent dans le piège du passéisme, du romantisme béat, de l'autoglorification et de la complaisance avec soi. Comme un miroir placé devant les visiteurs, bien des œuvres ou des expositions questionnent les inconséquences de nos trajectoires."
        },
        {
          title: "Un Musée Tourné vers l'Avenir",
          content: "Au demeurant, le futur africain est déjà-là ! Enfin, le MCN étant enraciné depuis sa conceptualisation, il y a six décennies, au pays de la teranga, il valorise l'hospitalité, l'interculturalité, et par là-même, insuffle le respect de la diversité culturelle et les pratiques qui vont dans le sens de l'engendrement d'un monde post-racial !"
        }
      ]
    },
    en: {
      title: "Museum History",
      intro: "A long-term project, conceived successively by an anti-colonialist activist (Lamine Senghor), a thinker of négritude (Léopold Sedar Senghor) and a champion of the African renaissance (Abdoulaye Wade), the Museum of Black Civilizations (MCN) was inaugurated on December 6, 2018 by President Macky Sall.",
      aboutTitle: "About the Museum of Black Civilizations",
      aboutContent: "The MCN has since been working to promote the contribution of Black Civilizations to the universal heritage of humanity. Thus, the visitor who crosses the threshold of the impluvium house that inspired its architecture encounters, all around the great Baobab of Haitian artist Edouard Duval-Carrié, the exhibition: Africa, cradle of humanity.",
      sections: [
        {
          title: "The Visitor Experience",
          content: "Everywhere else, through the fascinating works that make up the various exhibitions, visitors can get an idea of the dispersion of black peoples around the world. They can imagine the social formations, modes of production, symbolic representations, initiatory rites, produced by black civilizations since time immemorial. They encounter the role played by black peoples in world wars and the advent of a free world. They can recall the debates and struggles of black intellectuals, artists and writers in the struggles for emancipation, not to mention their contribution to the birth of Pan-Africanism and civil rights."
        },
        {
          title: "An Authentic Vision",
          content: "Visitors leave the house with faith in the community of destiny that binds black peoples (African, American, Caribbean, European, Australian, Afro-Latin, Indian...). However, without falling into a falsely universalizing or supposedly non-victimizing approach that would evade the objective historical reality of centuries-old mistreatment of black bodies through: the slave trade, colonization, apartheid, systemic racism, etc., at no time do the exhibitions fall into the trap of nostalgia, complacent romanticism, self-glorification and self-satisfaction. Like a mirror placed before visitors, many works or exhibitions question the inconsistencies of our trajectories."
        },
        {
          title: "A Museum Facing the Future",
          content: "Moreover, the African future is already here! Finally, the MCN being rooted since its conceptualization, six decades ago, in the land of teranga, it values hospitality, interculturality, and thereby, instills respect for cultural diversity and practices that go in the direction of engendering a post-racial world!"
        }
      ]
    },
    wo: {
      title: "Tàriix bu Musée bi",
      intro: "Ab xeetu bu gatt la, xam nañ ko ci benn militant anticolonialiste (Lamine Senghor), benn xam-xam bu négritude (Léopold Sedar Senghor) ak benn jëfandkat bu renaissance africaine (Abdoulaye Wade), Musée des Civilisations noires (MCN) ubbi nañ ko ci 6 Disàmbar 2018 ci President Macky Sall.",
      aboutTitle: "Ci Musée des Civilisations noires",
      aboutContent: "MCN dafay liggéey ci valorisation bu apport yu Civilisations noires ci patrimoine universel bu aadama. Kon, kuy dugg ci bunt bu case à impluvium bu inspiré architecture bi, dafay gis ci biir baobab bu mag bu artist haïtien Edouard Duval-Carrié, exposition: Afrique, berceau de l'humanité.",
      sections: [
        {
          title: "Expérience bu Njoolit bi",
          content: "Ci yépp, ci œuvres yu fascinant yu am expositions yi, njoolit bi mën na fekk ab xalaat ci dispersion yu nit ñu ñuul ci àdduna bi. Mën na xalaat ci formations sociales, modes de production, représentations symboliques, rites initiatiques, yu produit ci civilisations ñuul dale ci jamano. Dafay gis njëg bu jël yi ñuul ci guerres mondiales ak avènement bu àdduna bu libre. Mën na tàngal débats ak combats yu intellectuels, artistes ak écrivains ñuul ci luttes ngir émancipation, ak contribution bi ci naissance bu Panafricanisme ak droits civiques."
        },
        {
          title: "Ab Xel bu Dëgg",
          content: "Njoolit bi dafay génn case bi am ndigël ci communauté de destin bu tëral nit ñu ñuul (africains, états-uniens, caraïbéens, européens, australiens, afro-latins, indiens…). Waaye, du amul approche universalisante bu gaaw walla non-victimaire bu ruse ak réalité historique objective bu maltraitance bu peuples ñuul ci traite négrière, colonisation, apartheid, racisme systémique. Expositions yi xamul ci piège bu passéisme, romantisme béat, autoglorification ak complaisance. Ni ab miroir, ay œuvres dañuy seet inconséquences bu trajectoires yi."
        },
        {
          title: "Ab Musée bu Xool Futur bi",
          content: "Kon, futur bu Afrig fiy na fi! Ndax MCN jàpp nañ ko dale ci sa conceptualisation, juróom-benn dekad ci ginaaw, ci réew bu teranga, dafay valoriser hospitalité, interculturalité, te insuffler respect bu diversité culturelle ak pratiques ngir engendrement bu àdduna post-racial!"
        }
      ]
    }
  };

  const currentHistory = museumHistory[language];

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
          
          <div className="flex items-center gap-4 mb-4">
            <BookOpen className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl">
              {currentHistory.title}
            </h1>
          </div>
          <p className="text-xl opacity-90">
            Découvrez l'histoire et la mission du Musée des Civilisations Noires
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card className="shadow-lg border-[#B67332]/20 mb-8">
              <CardContent className="p-8">
                <p className="text-xl mb-8 text-muted-foreground leading-relaxed">
                  {currentHistory.intro}
                </p>

                {currentHistory.aboutTitle && (
                  <div className="mb-8 p-6 bg-gradient-to-br from-[#EED7C5] to-white rounded-xl">
                    <h3 className="text-2xl mb-4 text-[#93441A]">
                      {currentHistory.aboutTitle}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {currentHistory.aboutContent}
                    </p>
                  </div>
                )}

                <div className="space-y-8">
                  {currentHistory.sections.map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="border-l-4 border-[#B67332] pl-6 py-2"
                    >
                      <h3 className="text-2xl mb-3 text-[#93441A]">
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {section.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-[#B67332]/20 mt-6">
              <CardHeader className="bg-gradient-to-r from-[#EED7C5] to-[#B67332]/10 pb-4">
                <CardTitle className="text-2xl text-[#93441A]">Chiffres Clés</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-[#EED7C5] to-white rounded-xl">
                    <div className="text-4xl text-[#93441A] mb-2">2018</div>
                    <div className="text-sm text-muted-foreground">Année d'ouverture</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-[#EED7C5] to-white rounded-xl">
                    <div className="text-3xl text-[#93441A] mb-2">14 000 m²</div>
                    <div className="text-sm text-muted-foreground">Surface totale</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-[#EED7C5] to-white rounded-xl">
                    <div className="text-4xl text-[#93441A] mb-2">18 000+</div>
                    <div className="text-sm text-muted-foreground">Œuvres</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-[#EED7C5] to-white rounded-xl">
                    <div className="text-4xl text-[#93441A] mb-2">6</div>
                    <div className="text-sm text-muted-foreground">Catégories</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
