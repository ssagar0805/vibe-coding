'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Download, Sparkles, Image as ImageIcon } from 'lucide-react';
import { memeTemplates, MemeTemplate } from '@/lib/memeTemplates';
import { GeneratedMeme, generateMemeOnCanvas, downloadMeme } from '@/lib/memeUtils';
import { MemeCanvas } from './MemeCanvas';

interface MemeGeneratorProps {
  onMemeGenerated: (meme: GeneratedMeme) => void;
}

export function MemeGenerator({ onMemeGenerated }: MemeGeneratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate>(memeTemplates[0]);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentCanvas, setCurrentCanvas] = useState<HTMLCanvasElement | null>(null);

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    setCurrentCanvas(canvas);
  }, []);

  const generateMeme = async () => {
    if (!topText && !bottomText) return;

    setIsGenerating(true);
    
    try {
      const dataUrl = await generateMemeOnCanvas(
        selectedTemplate.url,
        topText,
        bottomText,
        selectedTemplate.width,
        selectedTemplate.height
      );

      const meme: GeneratedMeme = {
        id: Date.now().toString(),
        templateId: selectedTemplate.id,
        templateName: selectedTemplate.name,
        topText,
        bottomText,
        imageUrl: dataUrl,
        createdAt: new Date(),
      };

      onMemeGenerated(meme);
    } catch (error) {
      console.error('Error generating meme:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCurrentMeme = () => {
    if (currentCanvas) {
      const dataUrl = currentCanvas.toDataURL('image/png');
      downloadMeme(dataUrl, `meme-${selectedTemplate.id}-${Date.now()}.png`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Template Selection */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <ImageIcon className="w-6 h-6 text-blue-600" />
            Choose a Meme Template
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {memeTemplates.map((template) => (
              <div
                key={template.id}
                className={`relative cursor-pointer group transition-all duration-300 ${
                  selectedTemplate.id === template.id
                    ? 'ring-4 ring-blue-500 scale-105'
                    : 'hover:scale-105 hover:shadow-lg'
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="relative rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={template.url}
                    alt={template.name}
                    className="w-full h-24 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  {selectedTemplate.id === template.id && (
                    <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                      <Badge className="bg-blue-600">Selected</Badge>
                    </div>
                  )}
                </div>
                <p className="text-xs text-center mt-2 font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  {template.name}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Text Input Section */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Add Your Text
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topText" className="text-sm font-medium text-gray-700">
                Top Text
              </Label>
              <Input
                id="topText"
                placeholder="Enter top text..."
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="text-lg border-2 focus:border-blue-400 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bottomText" className="text-sm font-medium text-gray-700">
                Bottom Text
              </Label>
              <Input
                id="bottomText"
                placeholder="Enter bottom text..."
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                className="text-lg border-2 focus:border-blue-400 transition-colors"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={generateMeme}
                disabled={isGenerating || (!topText && !bottomText)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {isGenerating ? 'Generating...' : 'Generate Meme'}
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
              
              <Button
                onClick={downloadCurrentMeme}
                disabled={!currentCanvas}
                variant="outline"
                className="border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50">
          <CardHeader>
            <CardTitle className="text-xl">Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <MemeCanvas
              template={selectedTemplate}
              topText={topText}
              bottomText={bottomText}
              onCanvasReady={handleCanvasReady}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}