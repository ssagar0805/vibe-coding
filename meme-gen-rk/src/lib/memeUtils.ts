export interface GeneratedMeme {
  id: string;
  templateId: string;
  templateName: string;
  topText: string;
  bottomText: string;
  imageUrl: string;
  createdAt: Date;
}

export const generateMemeOnCanvas = (
  templateUrl: string,
  topText: string,
  bottomText: string,
  width: number,
  height: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Unable to get canvas context'));
      return;
    }

    canvas.width = width;
    canvas.height = height;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Draw the image
      ctx.drawImage(img, 0, 0, width, height);
      
      // Configure text style
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.textAlign = 'center';
      ctx.font = `bold ${Math.max(width * 0.05, 24)}px Arial`;
      
      // Draw top text
      if (topText) {
        const topY = height * 0.15;
        ctx.strokeText(topText.toUpperCase(), width / 2, topY);
        ctx.fillText(topText.toUpperCase(), width / 2, topY);
      }
      
      // Draw bottom text
      if (bottomText) {
        const bottomY = height * 0.9;
        ctx.strokeText(bottomText.toUpperCase(), width / 2, bottomY);
        ctx.fillText(bottomText.toUpperCase(), width / 2, bottomY);
      }
      
      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = templateUrl;
  });
};

export const downloadMeme = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};