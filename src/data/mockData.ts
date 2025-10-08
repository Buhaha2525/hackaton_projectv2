import { Artwork, Category, Exhibition, Event, MagazineArticle, GuidedTour, ScanPoint } from '../types';

export const categories: Category[] = [
  {
    id: 'sculpture',
    name: {
      fr: 'Sculpture',
      en: 'Sculpture',
      wo: 'Jaarul'
    },
    description: {
      fr: 'Sculptures en bois, bronze, pierre et métal, masques rituels, figurines traditionnelles',
      en: 'Wood, bronze, stone and metal sculptures, ritual masks, traditional figurines',
      wo: 'Jaarul garab, bronze, benn ak iron'
    },
    icon: '🗿'
  },
  {
    id: 'painting',
    name: {
      fr: 'Peinture',
      en: 'Painting',
      wo: 'Nat'
    },
    description: {
      fr: 'Peintures contemporaines et traditionnelles, fresques, art mural africain',
      en: 'Contemporary and traditional paintings, frescoes, African mural art',
      wo: 'Nat yu réew ak yu gàddi'
    },
    icon: '🎨'
  },
  {
    id: 'photography',
    name: {
      fr: 'Photographie',
      en: 'Photography',
      wo: 'Nataal'
    },
    description: {
      fr: 'Photographies historiques et contemporaines, archives visuelles de l\'Afrique',
      en: 'Historical and contemporary photography, visual archives of Africa',
      wo: 'Nataal yu tàriix ak yu réew'
    },
    icon: '📷'
  },
  {
    id: 'tapestry',
    name: {
      fr: 'Tapisserie',
      en: 'Tapestry',
      wo: 'Ndongo'
    },
    description: {
      fr: 'Textiles traditionnels, tissages, tapisseries narratives africaines',
      en: 'Traditional textiles, weavings, African narrative tapestries',
      wo: 'Ndongo yu gàddi, sereer'
    },
    icon: '🧵'
  },
  {
    id: 'videoart',
    name: {
      fr: 'Vidéo Art',
      en: 'Video Art',
      wo: 'Video Art'
    },
    description: {
      fr: 'Art vidéo contemporain, performances filmées, installations vidéo',
      en: 'Contemporary video art, filmed performances, video installations',
      wo: 'Video art yu réew'
    },
    icon: '🎬'
  },
  {
    id: 'installation',
    name: {
      fr: 'Installation',
      en: 'Installation',
      wo: 'Installation'
    },
    description: {
      fr: 'Installations artistiques immersives, art spatial et environnemental',
      en: 'Immersive artistic installations, spatial and environmental art',
      wo: 'Installation yu art'
    },
    icon: '🏛️'
  }
];

export const artworks: Artwork[] = [
  // Sculptures
  {
    id: 'sc1',
    title: {
      fr: 'Masque Sénoufo',
      en: 'Senufo Mask',
      wo: 'Mbedd Sénoufo'
    },
    description: {
      fr: 'Masque rituel traditionnel des Sénoufo de Côte d\'Ivoire, utilisé lors des cérémonies d\'initiation',
      en: 'Traditional ritual mask of the Senufo people from Ivory Coast, used in initiation ceremonies',
      wo: 'Mbedd yu dund ci Senufo, jëfandikoo ci jàngale'
    },
    culturalInfo: {
      fr: 'Les masques Sénoufo jouent un rôle central dans la société Poro, l\'institution d\'initiation masculine. Ils représentent des esprits ancestraux et sont considérés comme des objets sacrés.',
      en: 'Senufo masks play a central role in the Poro society, the male initiation institution. They represent ancestral spirits and are considered sacred objects.',
      wo: 'Mbedd Senufo dañu am njëriñ ci jamono Poro. Dañu melni ruxu mbokk ak dañuy seen jafe yu sërin.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1720945489924-19b707539b3a?w=800',
    category: 'sculpture',
    artist: {
      fr: 'Artisan Sénoufo anonyme',
      en: 'Anonymous Senufo artisan',
      wo: 'Boroom liggéey Senufo'
    },
    period: {
      fr: '19ème siècle',
      en: '19th century',
      wo: '19ème siècle'
    },
    materials: {
      fr: 'Bois, pigments naturels',
      en: 'Wood, natural pigments',
      wo: 'Garab, ñetti'
    },
    videoUrl: 'https://example.com/video-masque-senoufo.mp4'
  },
  {
    id: 'sc2',
    title: {
      fr: 'Statue Fang',
      en: 'Fang Statue',
      wo: 'Xibaar Fang'
    },
    description: {
      fr: 'Figure de gardien reliquaire du peuple Fang du Gabon, symbole de protection ancestrale',
      en: 'Reliquary guardian figure from the Fang people of Gabon, symbol of ancestral protection',
      wo: 'Xaj-mbett Fang, gëmu ci mbokk'
    },
    culturalInfo: {
      fr: 'Ces statues gardaient les reliques des ancêtres et étaient placées sur des boîtes contenant leurs ossements. Elles incarnent la force spirituelle et la continuité familiale.',
      en: 'These statues guarded the relics of ancestors and were placed on boxes containing their bones. They embody spiritual strength and family continuity.',
      wo: 'Yii xibaar dañuy gëm jafe yu mbokk te dañuy am doole ak njëriñ ci wàllu mbokk.'
    },
    imageUrl: 'https://i.pinimg.com/736x/b6/8d/4b/b68d4bdd181883aaff2889c267cc0890.jpg',
    category: 'sculpture',
    videoUrl: 'https://example.com/video-statue-fang.mp4'
  },
  // Peintures
  {
    id: 'pa1',
    title: {
      fr: 'Femmes au Marché',
      en: 'Women at the Market',
      wo: 'Jigéen ci Marché'
    },
    description: {
      fr: 'Scène vibrante de marché africain représentant la vie quotidienne et l\'économie locale',
      en: 'Vibrant African market scene depicting daily life and local economy',
      wo: 'Marché bu Afrik, nataal ci mbir ak liggéey'
    },
    culturalInfo: {
      fr: 'Les marchés africains sont au cœur de la vie sociale et économique. Cette peinture capture l\'énergie, les couleurs et la vitalité de ces espaces de rencontre.',
      en: 'African markets are at the heart of social and economic life. This painting captures the energy, colors and vitality of these meeting spaces.',
      wo: 'Marché ci Afrik dañu am njëriñ ci mbir ak liggéey. Ni nat bi mel na seen xew ak seen yore.'
    },
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.-8T7F4Zmm_pnXFZAEwvnMgHaLj?cb=12&w=770&h=1201&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'painting',
    artist: {
      fr: 'Amadou Seck',
      en: 'Amadou Seck',
      wo: 'Amadou Seck'
    },
    period: {
      fr: 'Contemporain (2019)',
      en: 'Contemporary (2019)',
      wo: 'Réew (2019)'
    },
    videoUrl: 'https://example.com/video-femmes-marche.mp4'
  },
  {
    id: 'pa2',
    title: {
      fr: 'Portrait Ancestral',
      en: 'Ancestral Portrait',
      wo: 'Natal ci Mbokk'
    },
    description: {
      fr: 'Portrait expressionniste d\'un sage africain, gardien de la tradition orale',
      en: 'Expressionist portrait of an African sage, guardian of oral tradition',
      wo: 'Nataal bu mag ci soxna bu mag'
    },
    culturalInfo: {
      fr: 'Ce portrait rend hommage aux griots et sages qui préservent l\'histoire et les traditions à travers la parole. Leurs visages portent la mémoire collective.',
      en: 'This portrait pays tribute to griots and sages who preserve history and traditions through speech. Their faces carry collective memory.',
      wo: 'Ni natal bi mel na ci gewël ak maggu njëkk bi gëmoo tàriix ak aada.'
    },
    imageUrl: 'https://i.pinimg.com/736x/ab/3a/76/ab3a76cb63c4ec553de70b7a789be43b--african-beauty-african-style.jpg',
    category: 'painting',
    videoUrl: 'https://example.com/video-portrait-ancestral.mp4'
  },
  // Photographie
  {
    id: 'ph1',
    title: {
      fr: 'Dakar 1960',
      en: 'Dakar 1960',
      wo: 'Ndakaaru 1960'
    },
    description: {
      fr: 'Photographie historique de l\'indépendance du Sénégal, témoignage d\'un moment fondateur',
      en: 'Historical photograph of Senegal\'s independence, testimony of a founding moment',
      wo: 'Nataal bu tàriix ci demokaraasi Senegaal'
    },
    culturalInfo: {
      fr: 'Cette image capture l\'euphorie de l\'indépendance en 1960, moment clé de l\'histoire sénégalaise et africaine. Elle témoigne de l\'espoir et de la fierté d\'une nation naissante.',
      en: 'This image captures the euphoria of independence in 1960, a key moment in Senegalese and African history. It testifies to the hope and pride of a nascent nation.',
      wo: 'Ni nataal bi mel na bañ bu demokaraasi ci 1960, wakhtub njëkk ci tàriix bu Senegaal.'
    },
    imageUrl: 'https://i.pinimg.com/1200x/39/25/24/3925240cf312cda17cdb33de1f8e86c4.jpg',
    category: 'photography',
    artist: {
      fr: 'Mama Casset',
      en: 'Mama Casset',
      wo: 'Mama Casset'
    },
    videoUrl: 'https://example.com/video-dakar-1960.mp4'
  },
  // Tapisserie
  {
    id: 'ta1',
    title: {
      fr: 'Tissage Kente',
      en: 'Kente Weaving',
      wo: 'Sereer Kente'
    },
    description: {
      fr: 'Tapisserie traditionnelle Kente du Ghana, symbole de royauté et d\'identité culturelle',
      en: 'Traditional Kente tapestry from Ghana, symbol of royalty and cultural identity',
      wo: 'Ndongo Kente ci Ghana'
    },
    culturalInfo: {
      fr: 'Le Kente est un tissu royal ashanti où chaque couleur et motif a une signification. Il est porté lors des grandes occasions et représente le prestige social.',
      en: 'Kente is an Ashanti royal fabric where each color and pattern has meaning. It is worn on special occasions and represents social prestige.',
      wo: 'Kente dafa am battu ci aada ak dafa mel ni mbagg bu mag.'
    },
    imageUrl: 'https://miro.medium.com/v2/resize:fit:1200/1*Zr8wuJjuh6_GPslp7ouKoA.jpeg',
    category: 'tapestry',
    videoUrl: 'https://example.com/video-tissage-kente.mp4'
  },
  // Vidéo Art
  {
    id: 'va1',
    title: {
      fr: 'Danses Urbaines',
      en: 'Urban Dances',
      wo: 'Fecc ci Dëkk'
    },
    description: {
      fr: 'Installation vidéo explorant les danses contemporaines et hip-hop en Afrique de l\'Ouest',
      en: 'Video installation exploring contemporary and hip-hop dances in West Africa',
      wo: 'Video bu fecc bu réew ci Afrik'
    },
    culturalInfo: {
      fr: 'Cette œuvre vidéo capture l\'énergie de la jeunesse africaine urbaine et son expression artistique à travers la danse, mélange de traditions et de modernité.',
      en: 'This video work captures the energy of urban African youth and their artistic expression through dance, a blend of tradition and modernity.',
      wo: 'Ni video bi mel na xew ak sañse ñi ñaw ci dëkk bi te seen fecc.'
    },
    imageUrl: 'https://i.pinimg.com/1200x/6b/6d/16/6b6d16b1691a53d2c8efa1b4e0ed99c9.jpg',
    category: 'videoart',
    videoUrl: 'https://example.com/video1.mp4'
  },
  // Nouvelle sculpture
  {
    id: 'sc3',
    title: {
      fr: 'Guerrier Bénin',
      en: 'Benin Warrior',
      wo: 'Jigeen-jii Bénin'
    },
    description: {
      fr: 'Bronze du royaume du Bénin représentant un guerrier royal, témoignage de l\'art de cour africain',
      en: 'Bronze from the Kingdom of Benin depicting a royal warrior, testimony to African court art',
      wo: 'Bronze ci royaume bu Bénin, natal ci jigeen-jii bu buur'
    },
    culturalInfo: {
      fr: 'Les bronzes du Bénin sont parmi les chefs-d\'œuvre de l\'art africain. Ils ornaient le palais royal et témoignent du raffinement artistique et technique de cette civilisation.',
      en: 'Benin bronzes are among the masterpieces of African art. They adorned the royal palace and testify to the artistic and technical refinement of this civilization.',
      wo: 'Bronze yu Bénin dañu am ci jafe yu mag yu art bu Afrika. Dañuy melni soxla ak teknik bu mag.'
    },
    imageUrl: 'https://i.pinimg.com/736x/c3/83/17/c383178eb5f6f0b8ca87dea1426a6fc1.jpg',
    category: 'sculpture',
    artist: {
      fr: 'Artisan Edo',
      en: 'Edo Artisan',
      wo: 'Boroom liggéey Edo'
    },
    period: {
      fr: '16ème siècle',
      en: '16th century',
      wo: '16ème siècle'
    },
    materials: {
      fr: 'Bronze, laiton',
      en: 'Bronze, brass',
      wo: 'Bronze, laiton'
    },
    videoUrl: 'https://example.com/video-guerrier-benin.mp4'
  },
  // Nouvelle peinture
  {
    id: 'pa3',
    title: {
      fr: 'Harmonie Africaine',
      en: 'African Harmony',
      wo: 'Mboolem Afrika'
    },
    description: {
      fr: 'Œuvre contemporaine célébrant la diversité et l\'unité des cultures africaines',
      en: 'Contemporary work celebrating the diversity and unity of African cultures',
      wo: 'Jafe bu réew bu wax ci suqali ak mboolem bu aada yu Afrika'
    },
    culturalInfo: {
      fr: 'Cette peinture abstraite contemporaine utilise des motifs traditionnels africains pour créer une synthèse entre passé et présent, tradition et modernité.',
      en: 'This contemporary abstract painting uses traditional African motifs to create a synthesis between past and present, tradition and modernity.',
      wo: 'Ni nat bi dafa jëfandikoo nataal yu gàddi ak yu réew ngir def mboolem ci kow ak léegi.'
    },
    imageUrl: 'https://i.pinimg.com/1200x/e0/82/f1/e082f1481a04c5d438a83204b926992d.jpg',
    category: 'painting',
    artist: {
      fr: 'Fatou Kiné Ndiaye',
      en: 'Fatou Kiné Ndiaye',
      wo: 'Fatou Kiné Ndiaye'
    },
    period: {
      fr: 'Contemporain (2022)',
      en: 'Contemporary (2022)',
      wo: 'Réew (2022)'
    },
    videoUrl: 'https://example.com/video-harmonie-africaine.mp4'
  },
  // Nouvelles photographies
  {
    id: 'ph2',
    title: {
      fr: 'Enfants de la Rue',
      en: 'Street Children',
      wo: 'Xale yi ci mbedd'
    },
    description: {
      fr: 'Série photographique documentaire sur la jeunesse urbaine africaine des années 1970',
      en: 'Documentary photography series on African urban youth in the 1970s',
      wo: 'Nataal yu dokumenter ci xale yi ci dëkk yi 1970'
    },
    culturalInfo: {
      fr: 'Ces photographies capturent l\'énergie et l\'innocence de l\'enfance urbaine africaine, témoignant des transformations sociales de l\'époque.',
      en: 'These photographs capture the energy and innocence of African urban childhood, witnessing the social transformations of the time.',
      wo: 'Nataal yi dañu dugg xew ak yàgg bu xale yi ci dëkk, te dañu wax ci coppite yi ci jamono.'
    },
    imageUrl: 'https://i.pinimg.com/736x/89/de/0c/89de0c0ca711e011eeab2092c9134cba.jpg',
    category: 'photography',
    artist: {
      fr: 'Seydou Keïta',
      en: 'Seydou Keïta',
      wo: 'Seydou Keïta'
    },
    period: {
      fr: 'Années 1970',
      en: '1970s',
      wo: 'Années 1970'
    },
    videoUrl: 'https://example.com/video-enfants-rue.mp4'
  },
  {
    id: 'ph3',
    title: {
      fr: 'Portraits de Famille',
      en: 'Family Portraits',
      wo: 'Natal ci Mbokk'
    },
    description: {
      fr: 'Collection de portraits familiaux célébrant la beauté et la dignité africaine',
      en: 'Collection of family portraits celebrating African beauty and dignity',
      wo: 'Njuumte bu natal yu mbokk bu wax ci raffet ak mbagg yu Afrika'
    },
    culturalInfo: {
      fr: 'Ces portraits intimes révèlent la richesse des liens familiaux et la fierté culturelle. Ils constituent un patrimoine visuel précieux de la société africaine.',
      en: 'These intimate portraits reveal the richness of family bonds and cultural pride. They constitute a precious visual heritage of African society.',
      wo: 'Nataal yi dañu wone ñoom bu wàllu mbokk ak fierté bu aada. Dañu melni xalaat bu nataal bu mag.'
    },
    imageUrl: 'https://i.pinimg.com/1200x/10/96/1b/10961b0dc888df1b73cd1d2fc30c7b60.jpg',
    category: 'photography',
    artist: {
      fr: 'Malick Sidibé',
      en: 'Malick Sidibé',
      wo: 'Malick Sidibé'
    },
    period: {
      fr: 'Années 1960-1980',
      en: '1960s-1980s',
      wo: 'Années 1960-1980'
    },
    videoUrl: 'https://example.com/video-portraits-famille.mp4'
  },
  // Nouvelles tapisseries
  {
    id: 'ta2',
    title: {
      fr: 'Bogolan Malien',
      en: 'Malian Bogolan',
      wo: 'Bogolan bu Mali'
    },
    description: {
      fr: 'Tissu traditionnel malien teint à la boue, racontant les légendes ancestrales',
      en: 'Traditional Malian fabric dyed with mud, telling ancestral legends',
      wo: 'Ndongo bu Mali bu teint ak tànk, wax ci légendes yu mbokk'
    },
    culturalInfo: {
      fr: 'Le bogolan ou "tissu de boue" est une technique de teinture traditionnelle malienne. Chaque motif raconte une histoire et transmet des valeurs culturelles.',
      en: 'Bogolan or "mud cloth" is a traditional Malian dyeing technique. Each pattern tells a story and transmits cultural values.',
      wo: 'Bogolan mooy ndongo bu teint ak tànk. Benn benn nataal am na ci tàriix.'
    },
    imageUrl: 'https://i.pinimg.com/736x/1a/d3/8c/1ad38caf77a1930ef57c4702c649765a.jpg',
    category: 'tapestry',
    artist: {
      fr: 'Tisserands Bamana',
      en: 'Bamana Weavers',
      wo: 'Ndënd-kat Bamana'
    },
    period: {
      fr: 'Traditionnel',
      en: 'Traditional',
      wo: 'Gàddi'
    },
    videoUrl: 'https://example.com/video-bogolan-malien.mp4'
  },
  {
    id: 'ta3',
    title: {
      fr: 'Wax Sénégalais',
      en: 'Senegalese Wax',
      wo: 'Wax bu Senegaal'
    },
    description: {
      fr: 'Pagnes en wax aux motifs symboliques, expression de l\'identité culturelle sénégalaise',
      en: 'Wax fabrics with symbolic patterns, expression of Senegalese cultural identity',
      wo: 'Ndongo wax ak nataal yu melni ci identité bu aada bu Senegaal'
    },
    culturalInfo: {
      fr: 'Le wax, bien qu\'originaire d\'Indonésie, est devenu emblématique de l\'Afrique de l\'Ouest. Chaque motif porte un nom et une signification particulière.',
      en: 'Wax, although originally from Indonesia, has become emblematic of West Africa. Each pattern has a specific name and meaning.',
      wo: 'Wax, ndax mu jóge ci Indonésie, dafa jàll ci Afrik ci ndigël. Benn benn nataal am na ci tur ak battu.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1702631779276-338ee5aed73a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBmYWJyaWMlMjBwYXR0ZXJufGVufDF8fHx8MTc1OTg4MDE5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'tapestry',
    artist: {
      fr: 'Artisans Sénégalais',
      en: 'Senegalese Artisans',
      wo: 'Boroom liggéey Senegaal'
    },
    period: {
      fr: 'Contemporain',
      en: 'Contemporary',
      wo: 'Réew'
    },
    videoUrl: 'https://example.com/video-wax-senegalais.mp4'
  },
  // Nouvelles œuvres vidéo art
  {
    id: 'va2',
    title: {
      fr: 'Griots Modernes',
      en: 'Modern Griots',
      wo: 'Gewël yu Réew'
    },
    description: {
      fr: 'Série vidéo sur les griots contemporains et leur adaptation aux nouvelles technologies',
      en: 'Video series on contemporary griots and their adaptation to new technologies',
      wo: 'Video yu gewël yi réew ak seen adaptation ak teknoloji yu bees'
    },
    culturalInfo: {
      fr: 'Cette série explore comment les griots, gardiens traditionnels de la mémoire orale, utilisent les médias numériques pour perpétuer leur mission.',
      en: 'This series explores how griots, traditional guardians of oral memory, use digital media to perpetuate their mission.',
      wo: 'Video yi dañu xool ni gewël yi dañuy jëfandikoo teknoloji ngir wax seen tàriix.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1559781563-8c506ccc726e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGFydCUyMGluc3RhbGxhdGlvbiUyMGFmcmljYW4lMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NTk4ODAyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'videoart',
    artist: {
      fr: 'Alassane Diarra',
      en: 'Alassane Diarra',
      wo: 'Alassane Diarra'
    },
    period: {
      fr: 'Contemporain (2023)',
      en: 'Contemporary (2023)',
      wo: 'Réew (2023)'
    },
    videoUrl: 'https://example.com/video-griots-modernes.mp4'
  },
  {
    id: 'va3',
    title: {
      fr: 'Migrations',
      en: 'Migrations',
      wo: 'Demmal'
    },
    description: {
      fr: 'Installation vidéo interactive sur les mouvements migratoires africains',
      en: 'Interactive video installation on African migratory movements',
      wo: 'Video installation interactif ci demmal yu Afrika'
    },
    culturalInfo: {
      fr: 'À travers des témoignages filmés et des cartes interactives, cette œuvre donne la parole aux migrants et questionne les enjeux contemporains.',
      en: 'Through filmed testimonies and interactive maps, this work gives voice to migrants and questions contemporary issues.',
      wo: 'Ci video yi ak carte yi interactives, jafe ji dafa wax ak migrants yi.'
    },
    imageUrl: 'https://i.pinimg.com/736x/31/0b/49/310b493d4752915139a93184e545236b.jpg',
    category: 'videoart',
    artist: {
      fr: 'Collectif Diasporas',
      en: 'Diasporas Collective',
      wo: 'Collectif Diasporas'
    },
    period: {
      fr: 'Contemporain (2024)',
      en: 'Contemporary (2024)',
      wo: 'Réew (2024)'
    },
    videoUrl: 'https://example.com/video-migrations.mp4'
  },
  // Nouvelles installations
  {
    id: 'in2',
    title: {
      fr: 'Échos Ancestraux',
      en: 'Ancestral Echoes',
      wo: 'Xew yu Mbokk'
    },
    description: {
      fr: 'Installation sonore et lumineuse évoquant les voix des ancêtres',
      en: 'Sound and light installation evoking the voices of ancestors',
      wo: 'Installation bu xew ak yeeg bu mel ni baat yu mbokk'
    },
    culturalInfo: {
      fr: 'Cette installation immersive combine sons traditionnels, chants ancestraux et projections lumineuses pour créer un dialogue entre passé et présent.',
      en: 'This immersive installation combines traditional sounds, ancestral songs and light projections to create a dialogue between past and present.',
      wo: 'Installation bi dafa ñeex xew yu gàddi, baat yu mbokk ak yeeg ngir def waxtaan ci kow ak léegi.'
    },
    imageUrl: 'https://i.pinimg.com/736x/75/1f/08/751f08970baecdfb72a35f94f6cbbd65.jpg',
    category: 'installation',
    artist: {
      fr: 'Khadija Fall',
      en: 'Khadija Fall',
      wo: 'Khadija Fall'
    },
    period: {
      fr: 'Contemporain (2023)',
      en: 'Contemporary (2023)',
      wo: 'Réew (2023)'
    },
    videoUrl: 'https://example.com/video-echos-ancestraux.mp4'
  },
  // Installation
  {
    id: 'in1',
    title: {
      fr: 'Mémoires Océaniques',
      en: 'Oceanic Memories',
      wo: 'Xalaat Géej'
    },
    description: {
      fr: 'Installation immersive évoquant la traite atlantique et la diaspora africaine',
      en: 'Immersive installation evoking the Atlantic slave trade and the African diaspora',
      wo: 'Installation bu mel ni géej ak diaspora'
    },
    culturalInfo: {
      fr: 'Cette installation utilise des sons, des projections et des objets symboliques pour créer une expérience émotionnelle sur la mémoire collective de la déportation.',
      en: 'This installation uses sounds, projections and symbolic objects to create an emotional experience about the collective memory of deportation.',
      wo: 'Installation bi dafa jëfandikoo xew, nataal ak jafe ngir xalaat bu diaspora.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1713700743037-ebc94696d157?w=800',
    category: 'installation',
    videoUrl: 'https://example.com/video-memoires-oceaniques.mp4'
  },
  {
    id: 'in3',
    title: {
      fr: 'Baobab Digital',
      en: 'Digital Baobab',
      wo: 'Baobab Digital'
    },
    description: {
      fr: 'Installation interactive célébrant le baobab comme symbole de sagesse et de connexion',
      en: 'Interactive installation celebrating the baobab as a symbol of wisdom and connection',
      wo: 'Installation interactif bu wax ci baobab ni symbole bu xam-xam ak connexion'
    },
    culturalInfo: {
      fr: 'Le baobab, arbre sacré africain, est ici réinterprété à travers la technologie. Les visiteurs peuvent interagir avec l\'arbre digital qui raconte des histoires ancestrales.',
      en: 'The baobab, African sacred tree, is reinterpreted here through technology. Visitors can interact with the digital tree that tells ancestral stories.',
      wo: 'Baobab, garab bu sërin bu Afrika, fii dañu koy wone ak teknoloji. Jëkkar yi mën nañu jël ak garab bu digital bu wax ci tàriix yu mbokk.'
    },
    imageUrl: 'https://i.pinimg.com/736x/cf/ad/cd/cfadcdfaa4339253df8a502309678f79.jpg',
    category: 'installation',
    artist: {
      fr: 'Studio Numérique Dakar',
      en: 'Dakar Digital Studio',
      wo: 'Studio Numérique Dakar'
    },
    period: {
      fr: 'Contemporain (2024)',
      en: 'Contemporary (2024)',
      wo: 'Réew (2024)'
    },
    videoUrl: 'https://example.com/video-baobab-digital.mp4'
  }
];

export const exhibitions: Exhibition[] = [
  {
    id: 'ex1',
    title: {
      fr: 'Renaissances Africaines',
      en: 'African Renaissances',
      wo: 'Njëkkal Afrika'
    },
    description: {
      fr: 'Une exploration de l\'art contemporain africain et ses multiples expressions de renouveau culturel',
      en: 'An exploration of contemporary African art and its multiple expressions of cultural renewal',
      wo: 'Xam-xam ci art bu réew bu Afrika ak seen aada bu bees'
    },
    startDate: '2025-02-15',
    endDate: '2025-06-30',
    imageUrl: 'https://images.unsplash.com/photo-1552793084-49132af00ff1?w=800',
    location: {
      fr: 'Salle principale',
      en: 'Main hall',
      wo: 'Kër bu mag'
    }
  },
  {
    id: 'ex2',
    title: {
      fr: 'Textiles Sacrés',
      en: 'Sacred Textiles',
      wo: 'Ndongo yu Sërin'
    },
    description: {
      fr: 'Collection exceptionnelle de tissus et tapisseries rituels d\'Afrique de l\'Ouest',
      en: 'Exceptional collection of ritual fabrics and tapestries from West Africa',
      wo: 'Njuumte bu bees bu ndongo ak sereer yu dund ci Afrik'
    },
    startDate: '2025-03-01',
    endDate: '2025-08-15',
    imageUrl: 'https://i.pinimg.com/736x/29/9e/6c/299e6c5b9b0f9938c96669d0eb50be22.jpg',
    location: {
      fr: 'Galerie Est',
      en: 'East Gallery',
      wo: 'Galerie Est'
    }
  }
];

export const events: Event[] = [
  {
    id: 'ev1',
    title: {
      fr: 'Nuit des Musées 2025',
      en: 'Museum Night 2025',
      wo: 'Guddi Musée 2025'
    },
    description: {
      fr: 'Soirée exceptionnelle avec performances artistiques, visites guidées et ateliers',
      en: 'Exceptional evening with artistic performances, guided tours and workshops',
      wo: 'Guddi bu bees ak performance, visite ak atelier'
    },
    date: '2025-05-18',
    time: '18:00 - 23:00',
    imageUrl: 'https://images.unsplash.com/photo-1713700743037-ebc94696d157?w=800',
    category: 'Événement spécial'
  },
  {
    id: 'ev2',
    title: {
      fr: 'Conférence: Art et Décolonisation',
      en: 'Conference: Art and Decolonization',
      wo: 'Conférence: Art ak Demokaraasi'
    },
    description: {
      fr: 'Table ronde avec des artistes et historiens sur le rôle de l\'art dans la décolonisation',
      en: 'Round table with artists and historians on the role of art in decolonization',
      wo: 'Waxtaan ak artiste yi ak historien yi'
    },
    date: '2025-04-22',
    time: '14:00 - 17:00',
    imageUrl: 'https://images.unsplash.com/photo-1552793084-49132af00ff1?w=800',
    category: 'Conférence'
  }
];

export const magazineArticles: MagazineArticle[] = [
  {
    id: 'mag1',
    title: {
      fr: 'Le retour des œuvres spoliées',
      en: 'The return of looted works',
      wo: 'Dellu jafe yi ñëw'
    },
    excerpt: {
      fr: 'Une analyse approfondie du processus de restitution des œuvres d\'art africaines',
      en: 'An in-depth analysis of the restitution process for African artworks',
      wo: 'Xam-xam bu mag ci dellu jafe yu art bu Afrika'
    },
    content: {
      fr: 'La question de la restitution des œuvres d\'art africaines est au cœur des débats contemporains sur le patrimoine culturel...',
      en: 'The question of restitution of African artworks is at the heart of contemporary debates on cultural heritage...',
      wo: 'Njëkk bu dellu jafe yu art bu Afrika dafa am njëriñ ci waxtaan bu réew...'
    },
    imageUrl: 'https://images.unsplash.com/photo-1720945489924-19b707539b3a?w=800',
    author: 'Dr. Aminata Diallo',
    date: '2025-03-15',
    category: 'Patrimoine'
  },
  {
    id: 'mag2',
    title: {
      fr: 'Jeunes artistes sénégalais à l\'honneur',
      en: 'Young Senegalese artists in the spotlight',
      wo: 'Artiste ñi ñaw ci Senegaal'
    },
    excerpt: {
      fr: 'Portrait de la nouvelle génération d\'artistes qui réinventent l\'art contemporain africain',
      en: 'Portrait of the new generation of artists reinventing contemporary African art',
      wo: 'Natal ci artiste ñi bees ñi danu def art bu réew bu bees'
    },
    content: {
      fr: 'Une nouvelle génération d\'artistes sénégalais émerge sur la scène internationale, apportant des perspectives fraîches...',
      en: 'A new generation of Senegalese artists is emerging on the international scene, bringing fresh perspectives...',
      wo: 'Artiste ñi bees ñi ci Senegaal dañuy wax ci àdduna bi te dañuy indil gëm bu bees...'
    },
    imageUrl: 'https://images.unsplash.com/photo-1633000098942-17449327bfc3?w=800',
    author: 'Moussa Kane',
    date: '2025-02-28',
    category: 'Portrait'
  }
];

export const getFeaturedArtworks = (categoryId?: string): Artwork[] => {
  if (categoryId) {
    return artworks.filter(a => a.category === categoryId).slice(0, 3);
  }

  const featured: Artwork[] = [];
  categories.forEach(cat => {
    const categoryArtworks = artworks.filter(a => a.category === cat.id);
    if (categoryArtworks.length > 0) {
      featured.push(categoryArtworks[0]);
    }
  });
  return featured;
};

export const getArtworksByCategory = (categoryId: string): Artwork[] => {
  return artworks.filter(a => a.category === categoryId);
};

export const guidedTours: GuidedTour[] = [
  {
    id: 'history',
    name: {
      fr: 'Histoire Précoloniale',
      en: 'Precolonial History',
      wo: 'Tàriix bu gàddi'
    },
    description: {
      fr: 'Découvrez les grands royaumes et empires africains avant la colonisation',
      en: 'Discover the great African kingdoms and empires before colonization',
      wo: 'Xam royaumes yu mag yu Afrik ci kow colonisation'
    },
    duration: '90 minutes',
    artworkIds: ['sc1', 'sc2', 'ta1'],
    icon: '👑'
  },
  {
    id: 'contemporary',
    name: {
      fr: 'Art Contemporain',
      en: 'Contemporary Art',
      wo: 'Art bu Réew'
    },
    description: {
      fr: 'Explorez les expressions artistiques modernes et contemporaines',
      en: 'Explore modern and contemporary artistic expressions',
      wo: 'Xam art bu réew bu léegi'
    },
    duration: '75 minutes',
    artworkIds: ['pa1', 'pa2', 'va1', 'in1'],
    icon: '🎨'
  },
  {
    id: 'textiles',
    name: {
      fr: 'Textiles et Artisanat',
      en: 'Textiles and Crafts',
      wo: 'Ndongo ak Liggéey-loxo'
    },
    description: {
      fr: 'Plongez dans l\'univers des tissages et textiles traditionnels',
      en: 'Dive into the world of traditional weaving and textiles',
      wo: 'Dugg ci ndongo ak sereer yu gàddi'
    },
    duration: '60 minutes',
    artworkIds: ['ta1'],
    icon: '🧵'
  },
  {
    id: 'music',
    name: {
      fr: 'Musique et Instruments',
      en: 'Music and Instruments',
      wo: 'Musique ak Jafe-xelam'
    },
    description: {
      fr: 'Découvrez les instruments traditionnels et l\'histoire musicale africaine',
      en: 'Discover traditional instruments and African musical history',
      wo: 'Xam jafe-xelam yu gàddi ak tàriix bu musique'
    },
    duration: '45 minutes',
    artworkIds: ['sc1'],
    icon: '🥁'
  },
  {
    id: 'general',
    name: {
      fr: 'Visite Complète',
      en: 'Complete Tour',
      wo: 'Jël bu Lépp'
    },
    description: {
      fr: 'Un panorama complet de toutes nos collections',
      en: 'A complete overview of all our collections',
      wo: 'Jël bu am lépp ci sunu njuumte'
    },
    duration: '120 minutes',
    artworkIds: ['sc1', 'sc2', 'pa1', 'pa2', 'ph1', 'ta1', 'va1', 'in1'],
    icon: '🏛️'
  }
];

export const scanPoints: ScanPoint[] = [
  {
    id: 'sp1',
    artworkId: 'sc1',
    points: 10,
    unlockContent: {
      type: 'video',
      url: 'https://example.com/senufo-mask-making.mp4',
      content: {
        fr: 'Vidéo : Fabrication d\'un masque Sénoufo',
        en: 'Video: Making of a Senufo Mask',
        wo: 'Video: Ñu ngay def mbedd Sénoufo'
      }
    }
  },
  {
    id: 'sp2',
    artworkId: 'pa1',
    points: 10,
    unlockContent: {
      type: 'audio',
      url: 'https://example.com/market-sounds.mp3',
      content: {
        fr: 'Audio : Sons du marché africain',
        en: 'Audio: African market sounds',
        wo: 'Audio: Xew yu marché bi'
      }
    }
  },
  {
    id: 'sp3',
    artworkId: 'ta1',
    points: 15,
    unlockContent: {
      type: 'text',
      content: {
        fr: 'Contenu exclusif : L\'histoire secrète du tissage Kente et ses symboles cachés...',
        en: 'Exclusive content: The secret history of Kente weaving and its hidden symbols...',
        wo: 'Xalaat bu bees: Tàriix bu sutura bu sereer Kente...'
      }
    }
  }
];
