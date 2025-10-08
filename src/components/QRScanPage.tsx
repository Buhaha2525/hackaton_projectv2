import React, { useState, useRef, useEffect, useCallback } from 'react';
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

// QR Code patterns for different content types
const QR_PATTERNS = {
  artwork: /^ARTWORK_(.+)$/,
  exhibition: /^EXHIBITION_(.+)$/,
};

export const QRScanPage: React.FC<QRScanPageProps> = ({ onBack, onArtworkFound, onExhibitionFound }) => {
  const { t } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check camera permission and initialize
  const initializeCamera = useCallback(async () => {
    try {
      setError(null);
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Votre navigateur ne supporte pas l\'accès à la caméra');
        return;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setHasPermission(true);
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError(t('scan.cameraError'));
      setHasPermission(false);
    }
  }, [t]);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  }, []);

  // Simple QR code detection simulation
  const detectQRCode = useCallback(async (): Promise<string | null> => {
    // In a real implementation, this would use a QR detection library like jsQR
    // For this demo, we'll simulate finding QR codes after a few seconds
    const mockQRCodes = [
      'ARTWORK_sc1',
      'ARTWORK_sc2',
      'ARTWORK_pa1',
      'ARTWORK_pa2',
      'ARTWORK_ph1',
      'ARTWORK_ta1',
      'ARTWORK_va1',
      'ARTWORK_in1',
      'EXHIBITION_ex1',
      'EXHIBITION_ex2'
    ];
    
    // Simulate random QR detection (20% chance per second)
    if (Math.random() > 0.8) {
      return mockQRCodes[Math.floor(Math.random() * mockQRCodes.length)];
    }
    
    return null;
  }, []);

  // Process detected QR code
  const processQRCode = useCallback((qrData: string) => {
    setScanResult(qrData);
    setIsScanning(false);
    stopCamera();

    // Check if it's an artwork QR code
    const artworkMatch = qrData.match(QR_PATTERNS.artwork);
    if (artworkMatch) {
      const artworkId = artworkMatch[1];
      const artwork = artworks.find(a => a.id === artworkId);
      if (artwork) {
        setTimeout(() => onArtworkFound(artwork), 1500);
        return;
      }
    }

    // Check if it's an exhibition QR code
    const exhibitionMatch = qrData.match(QR_PATTERNS.exhibition);
    if (exhibitionMatch) {
      const exhibitionId = exhibitionMatch[1];
      // For now, just redirect to exhibitions page
      setTimeout(() => onExhibitionFound(exhibitionId), 1500);
      return;
    }

    // If no match found
    setError(t('scan.noMatch'));
    setTimeout(() => {
      setScanResult(null);
      setError(null);
    }, 3000);
  }, [onArtworkFound, onExhibitionFound, stopCamera, t]);

  // Start scanning
  const startScanning = useCallback(async () => {
    if (!hasPermission) {
      await initializeCamera();
      // After initializing, wait a bit and start scanning
      setTimeout(() => {
        if (videoRef.current && videoRef.current.srcObject) {
          startScanning();
        }
      }, 1000);
      return;
    }

    setIsScanning(true);
    setError(null);
    setScanResult(null);

    // Start detection loop
    scanIntervalRef.current = setInterval(async () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const qrCode = await detectQRCode();
        if (qrCode) {
          if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current);
            scanIntervalRef.current = null;
          }
          processQRCode(qrCode);
        }
      }
    }, 1000);
  }, [hasPermission, initializeCamera, detectQRCode, processQRCode]);

  // Stop scanning
  const stopScanning = useCallback(() => {
    setIsScanning(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#93441A] via-[#B67332] to-[#EED7C5] px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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

        {/* Main Content */}
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
              <p className="text-[#6b4423] max-w-md mx-auto">
                {t('scan.instructionsText')}
              </p>
            </div>
          </Card>

          {/* Camera View */}
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
                      onLoadedMetadata={() => {
                        if (videoRef.current) {
                          videoRef.current.play().catch(err => {
                            console.error('Error playing video:', err);
                          });
                        }
                      }}
                    />
                    {isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative">
                          <div className="w-48 h-48 border-4 border-white rounded-lg shadow-lg">
                            {/* Corner decorations */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#B67332] rounded-tl-lg" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#B67332] rounded-tr-lg" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#B67332] rounded-bl-lg" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#B67332] rounded-br-lg" />
                          </div>
                          {/* Scanning line animation */}
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B67332] to-transparent animate-scan" />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white space-y-4">
                    <Camera className="w-16 h-16 opacity-50" />
                    <p className="text-sm text-center px-4">
                      {t('scan.cameraPermission')}
                    </p>
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Status Messages */}
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

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                {!hasPermission ? (
                  <Button 
                    onClick={initializeCamera}
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
              </div>
            </div>
          </Card>

          {/* Demo Info */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Mode Démo</p>
                <p>Cette version simule la détection de QR codes. Dans le musée, vous pourrez scanner les vrais QR codes devant chaque œuvre pour accéder instantanément aux informations détaillées.</p>
              </div>
            </div>
          </Card>

          {/* Help Section */}
          <Card className="p-6 bg-white/95 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-[#2d1a0f] mb-4">
              {t('scan.help')}
            </h3>
            <div className="space-y-3 text-sm text-[#6b4423]">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#93441A] rounded-full mt-2 flex-shrink-0" />
                <p>{t('scan.help1')}</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#B67332] rounded-full mt-2 flex-shrink-0" />
                <p>{t('scan.help2')}</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#EED7C5] rounded-full mt-2 flex-shrink-0" />
                <p>{t('scan.help3')}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};