'use client';

import { useEffect, useRef } from 'react';
import { MemeTemplate } from '@/lib/memeTemplates';

interface MemeCanvasProps {
  template: MemeTemplate;
  topText: string;
  bottomText: string;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export function MemeCanvas({ template, topText, bottomText, onCanvasReady }: MemeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      canvas.width = template.width;
      canvas.height = template.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw image
      ctx.drawImage(img, 0, 0, template.width, template.height);
      
      // Configure text style
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';
      ctx.font = `bold ${Math.max(template.width * 0.05, 24)}px Arial`;
      
      // Draw top text
      if (topText) {
        const topY = template.height * 0.15;
        ctx.strokeText(topText.toUpperCase(), template.width / 2, topY);
        ctx.fillText(topText.toUpperCase(), template.width / 2, topY);
      }
      
      // Draw bottom text
      if (bottomText) {
        const bottomY = template.height * 0.9;
        ctx.strokeText(bottomText.toUpperCase(), template.width / 2, bottomY);
        ctx.fillText(bottomText.toUpperCase(), template.width / 2, bottomY);
      }
      
      onCanvasReady?.(canvas);
    };
    
    img.src = template.url;
  }, [template, topText, bottomText, onCanvasReady]);

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto border-2 border-gray-200 rounded-lg shadow-lg"
        style={{ maxHeight: '400px' }}
      />
    </div>
  );
}