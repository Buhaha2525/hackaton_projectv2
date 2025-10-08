import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Camera, AlertCircle, CheckCircle, ScanLine } from 'lucide-react';
import { artworks } from '../data/mockData';
import { Artwork } from '../types';

interface QRScanPageProps {
  onBack: () => void;
  onArtworkFound: (artwork: Artwork) => void;
  onExhibitionFound: (exhibitionId: string) => void;
}

// QR Code patterns
const QR_PATTERNS = {
  artwork: /^ARTWORK_(\d+)$/,
  exhibition: /^EXHIBITION_(\d+)$/,
};

export const QRScanPage: React.FC<QRScanPageProps> = ({ onBack, onArtworkFound, onExhibitionFound }) => {
  const { t } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Démarrer la caméra
  const startCamera = async () => {
    try {
      setError(null);

      // Arrêter le flux existant
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
      }
    } catch (err) {
      console.error('Erreur caméra:', err);
      setError(t('scan.cameraError'));
      setHasPermission(false);
    }
  };

  // Arrêter la caméra
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Simuler la détection de QR code
  const simulateQRDetection = () => {
    if (!isScanning) return;

    // Liste des QR codes de test
    const testQRCodes = ['ARTWORK_1', 'ARTWORK_2', 'ARTWORK_3', 'EXHIBITION_1'];

    // Simuler la détection après un délai aléatoire
    const delay = 1000 + Math.random() * 2000; // 1-3 secondes

    setTimeout(() => {
      if (isScanning) {
        const randomQR = testQRCodes[Math.floor(Math.random() * testQRCodes.length)];
        handleQRCodeDetected(randomQR);
      }
    }, delay);
  };

  // Traiter le QR code détecté
  const handleQRCodeDetected = (qrData: string) => {
    setScanResult(qrData);
    setIsScanning(false);
    stopCamera();

    // Vérifier si c'est une œuvre
    const artworkMatch = qrData.match(QR_PATTERNS.artwork);
    if (artworkMatch) {
      const artworkId = parseInt(artworkMatch[1]);
      const artwork = artworks.find(a => a.id === artworkId);
      if (artwork) {
        setTimeout(() => onArtworkFound(artwork), 1000);
        return;
      }
    }

    // Vérifier si c'est une exposition
    const exhibitionMatch = qrData.match(QR_PATTERNS.exhibition);
    if (exhibitionMatch) {
      const exhibitionId = exhibitionMatch[1];
      setTimeout(() => onExhibitionFound(exhibitionId), 1000);
      return;
    }

    // Aucun match trouvé
    setError(t('scan.noMatch'));
    setTimeout(() => {
      setScanResult(null);
      setError(null);
    }, 3000);
  };

  // Démarrer le scan
  const startScanning = async () => {
    if (!hasPermission) {
      await startCamera();
    }

    setIsScanning(true);
    setError(null);
    setScanResult(null);
    simulateQRDetection();
  };

  // Arrêter le scan
  const stopScanning = () => {
    setIsScanning(false);
    stopCamera();
  };

  // Réinitialiser
  const resetScanner = () => {
    stopScanning();
    setScanResult(null);
    setError(null);
  };

  // Nettoyer à la fermeture
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
      <div className="min-h-screen bg-gradient-to-br from-[#93441A] via-[#B67332] to-[#EED7C5] px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={onBack} className="text-white hover:text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('action.back')}
            </Button>
            <h1 className="text-2xl font-bold text-white">
              {t('scan.title')}
            </h1>
            <div className="w-20" />
          </div>

          <div className="space-y-6">
            {/* Instructions */}
            <Card className="p-6 bg-white/95 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#93441A] to-[#B67332] rounded-full flex items-center justify-center mx-auto">
                  <ScanLine className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#2d1a0f]">
                  {t('scan.instructions')}
                </h2>
                <p className="text-[#6b4423]">
                  {t('scan.instructionsText')}
                </p>
              </div>
            </Card>

            {/* Vue caméra */}
            <Card className="p-6 bg-white/95 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="relative aspect-square max-w-md mx-auto bg-black rounded-lg overflow-hidden">
                  {hasPermission ? (
                      <>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                        />
                        {isScanning && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-48 h-48 border-2 border-white rounded-lg animate-pulse" />
                            </div>
                        )}
                      </>
                  ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white space-y-4">
                        <Camera className="w-16 h-16" />
                        <p className="text-sm text-center px-4">
                          {t('scan.cameraPermission')}
                        </p>
                      </div>
                  )}
                </div>

                {/* Messages de statut */}
                {error && (
                    <div className="flex items-center justify-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                      <span>{error}</span>
                    </div>
                )}

                {scanResult && (
                    <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                      <span>{t('scan.success')}</span>
                    </div>
                )}

                {/* Contrôles */}
                <div className="flex flex-col gap-2 justify-center items-center">
                  {!hasPermission ? (
                      <Button
                          onClick={startCamera}
                          className="bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#8b3e18] hover:to-[#a66b2e] text-white"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        {t('scan.enableCamera')}
                      </Button>
                  ) : isScanning ? (
                      <Button
                          onClick={stopScanning}
                          variant="outline"
                          className="border-[#93441A] text-[#93441A] hover:bg-[#93441A] hover:text-white"
                      >
                        {t('scan.stopScanning')}
                      </Button>
                  ) : (
                      <Button
                          onClick={startScanning}
                          className="bg-gradient-to-r from-[#93441A] to-[#B67332] hover:from-[#8b3e18] hover:to-[#a66b2e] text-white"
                      >
                        <ScanLine className="w-4 h-4 mr-2" />
                        {t('scan.startScanning')}
                      </Button>
                  )}

                  {(hasPermission || scanResult || error) && (
                      <Button
                          onClick={resetScanner}
                          variant="outline"
                          size="sm"
                          className="border-[#93441A] text-[#93441A] hover:bg-[#93441A] hover:text-white"
                      >
                        {t('scan.reset')}
                      </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
  );
};