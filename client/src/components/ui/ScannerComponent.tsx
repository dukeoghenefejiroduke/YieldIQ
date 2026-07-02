import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface ScannerProps {
  onScan: (decodedText: string) => void;
  onClose: () => void;
}

export const ScannerComponent = ({ onScan, onClose }: ScannerProps) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    scanner.render(
      (decodedText) => {
        onScan(decodedText);
        scanner.clear();
      },
      (error) => {
        console.warn(error);
      }
    );
    scannerRef.current = scanner;

    return () => {
      scanner.clear();
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 p-4 flex flex-col items-center justify-center">
      <div id="qr-reader" className="w-full max-w-sm"></div>
      <button onClick={onClose} className="mt-4 p-3 bg-red-600 text-white rounded-lg">Cancel</button>
    </div>
  );
};
