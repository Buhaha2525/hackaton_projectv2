# Guidelines - Musée des Civilisations Noires

## Vue d'ensemble du projet

Application web interactive pour le Musée des Civilisations Noires au Sénégal, accessible depuis PC et mobiles avec un design très artistique et immersif.

## Catégories d'œuvres

L'application présente 6 catégories principales :
1. **Sculpture** - Sculptures en bois, bronze, pierre et métal, masques rituels
2. **Peinture** - Peintures contemporaines et traditionnelles, fresques
3. **Photographie** - Photographies historiques et contemporaines, archives visuelles
4. **Tapisserie** - Textiles traditionnels, tissages, tapisseries narratives
5. **Vidéo Art** - Art vidéo contemporain, performances filmées
6. **Installation** - Installations artistiques immersives

## Sections principales

### 1. Page d'accueil
- Slider avec 5 images défilantes du musée
- Expositions en vedette
- Collections organisées par catégorie
- Événements à venir
- Call-to-action pour réserver

### 2. Collections
- Vue par catégorie avec fiches détaillées
- Navigation entre les œuvres
- Audio narratif et vidéos pour certaines œuvres

### 3. Expositions
- Expositions en cours et à venir
- Détails : dates, localisation, description

### 4. Événements
- Calendrier des événements culturels
- Conférences, ateliers, nuit des musées, etc.

### 5. Magazine - La Casemac
- Articles sur le patrimoine africain
- Interviews d'artistes
- Actualités culturelles

### 6. Infos & Visite
- **Localisation** : Autoroute prolongée, Place de la Gare
- **Horaires** : 
  - Ouvert du mardi au dimanche de 10h à 19h
  - Lundi : Fermé
- **Tarifs** :
  
  **Visite libre :**
  - Tarif plein: 3 000 FCFA
  - Tarif scolaire et étudiant: 500 FCFA
  - Groupe de 10 à 30 personnes: 2 500 FCFA/personne
  
  **Visite guidée :**
  - Tarif plein: 5 000 FCFA
  - Tarif scolaire: 1 000 FCFA
  - Tarif étudiant: 1 500 FCFA
  - Groupe de 10 à 30 personnes: 4 000 FCFA/personne

- **Visites guidées** : Réservation obligatoire
- **Conseils de visite** : Ne pas toucher les œuvres, photos sans flash autorisées

## Fonctionnalités interactives

### 1. Visite Immersive
- **Parcours guidés personnalisés** : Thèmes selon les intérêts (histoire, art contemporain, textiles, musique)
- **Collections thématiques** : Organisation par périodes ou thèmes culturels

### 2. Chatbot
- Assistant virtuel pour répondre aux questions
- Informations sur horaires, tarifs, expositions, collections
- Disponible en bas à droite de l'écran

### 3. Système de points (Scan)
- Scanner les QR codes dans le musée
- Gagner des points
- Débloquer du contenu exclusif

### 4. Visite guidée avec plan
- Plan interactif du musée
- Localisation des salles et œuvres
- Points d'intérêt (toilettes, cafétéria, etc.)

## Multilingue

Support de 3 langues :
- **Français** (fr)
- **English** (en)
- **Wolof** (wo)

Tous les contenus (descriptions, audio, interface) sont disponibles dans ces 3 langues.

## Design

### Palette de couleurs
- Gradient orange-rouge pour les éléments principaux
- Fond dégradé orange-blanc-rouge pour les pages
- Utilisation de cards avec ombres pour les contenus

### Typographie
- Polices par défaut du système
- Tailles variées pour hiérarchie visuelle

### Composants UI
- Utilisation de shadcn/ui pour les composants de base
- Animations avec Motion (Framer Motion)
- Icons avec Lucide React

## Structure technique

### Technologies
- React + TypeScript
- Tailwind CSS v4
- Motion/React pour animations
- Composants shadcn/ui

### Architecture
- `/components` : Tous les composants React
- `/data` : Données mockées (mockData.ts) et traductions
- `/contexts` : Context pour la langue
- `/types` : Types TypeScript

### Navigation
- Système de vues avec state management
- Navigation par catégorie avec retour
- Deep navigation : Home → Category → Artwork

## Accessibilité

- Support audio pour descriptions
- Navigation au clavier
- Texte alternatif pour images
- Contraste élevé pour lisibilité

## Notes importantes

- Les données actuelles sont mockées (simulation)
- Les vidéos et audios utilisent des URLs d'exemple
- Le chatbot utilise des réponses prédéfinies
- Le système de points est simulé (frontend only)
