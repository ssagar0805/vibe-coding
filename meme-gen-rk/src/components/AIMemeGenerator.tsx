'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Wand2, RefreshCw, Lightbulb, Download } from 'lucide-react';
import { MockAIMemeService, AIGeneratedMeme, MemePromptResponse } from '@/lib/aiMemeService';
import { memeTemplates } from '@/lib/memeTemplates';
import { GeneratedMeme, generateMemeOnCanvas, downloadMeme } from '@/lib/memeUtils';
import { MemeCanvas } from './MemeCanvas';

interface AIMemeGeneratorProps {
  onMemeGenerated: (meme: GeneratedMeme) => void;
}

export function AIMemeGenerator({ onMemeGenerated }: AIMemeGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState<MemePromptResponse | null>(null);
  const [selectedMeme, setSelectedMeme] = useState<AIGeneratedMeme | null>(null);
  const [currentCanvas, setCurrentCanvas] = useState<HTMLCanvasElement | null>(null);

  const suggestions = MockAIMemeService.getRandomPromptSuggestions();

  const handleGenerateAIMeme = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setAiResponse(null);
    setSelectedMeme(null);

    try {
      const response = await MockAIMemeService.generateMeme(prompt);
      setAiResponse(response);
      setSelectedMeme(response.meme);
    } catch (error) {
      console.error('Error generating AI meme:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectAlternative = (alternative: AIGeneratedMeme) => {
    setSelectedMeme(alternative);
  };

  const handleCanvasReady = (canvas: HTMLCanvasElement) => {
    setCurrentCanvas(canvas);
  };

  const handleSaveMeme = async () => {
    if (!selectedMeme) return;

    const template = memeTemplates.find(t => t.id === selectedMeme.templateId);
    if (!template) return;

    try {
      const dataUrl = await generateMemeOnCanvas(
        template.url,
        selectedMeme.topText,
        selectedMeme.bottomText,
        template.width,
        template.height
      );

      const meme: GeneratedMeme = {
        id: Date.now().toString(),
        templateId: selectedMeme.templateId,
        templateName: template.name,
        topText: selectedMeme.topText,
        bottomText: selectedMeme.bottomText,
        imageUrl: dataUrl,
        createdAt: new Date(),
      };

      onMemeGenerated(meme);
    } catch (error) {
      console.error('Error saving AI meme:', error);
    }
  };

  const handleDownloadMeme = () => {
    if (currentCanvas) {
      const dataUrl = currentCanvas.toDataURL('image/png');
      downloadMeme(dataUrl, `ai-meme-${Date.now()}.png`);
    }
  };

  const selectedTemplate = selectedMeme ? memeTemplates.find(t => t.id === selectedMeme.templateId) : null;

  return (
    <div className="space-y-8">
      {/* AI Prompt Input */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Wand2 className="w-6 h-6 text-indigo-600" />
            AI Meme Generator
          </CardTitle>
          <p className="text-sm text-gray-600">
            Describe what you want your meme to be about, and our AI will create the perfect meme for you!
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="aiPrompt" className="text-sm font-medium text-gray-700">
              Describe your meme idea
            </Label>
            <Input
              id="aiPrompt"
              placeholder="e.g., Monday morning energy, when WiFi goes down, trying to diet..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="text-lg border-2 focus:border-indigo-400 transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateAIMeme()}
            />
          </div>

          {/* Suggestions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lightbulb className="w-4 h-4" />
              Try these ideas:
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.slice(0, 4).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50"
                  onClick={() => setPrompt(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerateAIMeme}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating AI Meme...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Meme
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* AI Response */}
      {aiResponse && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Generated Options */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="w-6 h-6 text-purple-600" />
                AI Generated Options
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {Math.round(aiResponse.confidence * 100)}% Confidence
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main suggestion */}
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedMeme?.templateId === aiResponse.meme.templateId &&
                  selectedMeme?.topText === aiResponse.meme.topText
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                }`}
                onClick={() => setSelectedMeme(aiResponse.meme)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-purple-600">Recommended</Badge>
                  <span className="text-sm font-medium text-gray-700">
                    {memeTemplates.find(t => t.id === aiResponse.meme.templateId)?.name}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div><strong>Top:</strong> "{aiResponse.meme.topText}"</div>
                  <div><strong>Bottom:</strong> "{aiResponse.meme.bottomText}"</div>
                </div>
                {aiResponse.meme.explanation && (
                  <div className="text-xs text-gray-500 mt-2">
                    {aiResponse.meme.explanation}
                  </div>
                )}
              </div>

              {/* Alternatives */}
              {aiResponse.alternatives && aiResponse.alternatives.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Alternative Options:</h4>
                    {aiResponse.alternatives.map((alternative, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                          selectedMeme?.templateId === alternative.templateId &&
                          selectedMeme?.topText === alternative.topText
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                        }`}
                        onClick={() => handleSelectAlternative(alternative)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-600">
                            {memeTemplates.find(t => t.id === alternative.templateId)?.name}
                          </span>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div><strong>Top:</strong> "{alternative.topText}"</div>
                          <div><strong>Bottom:</strong> "{alternative.bottomText}"</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {selectedMeme && (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSaveMeme}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Save to Gallery
                  </Button>
                  <Button
                    onClick={handleDownloadMeme}
                    disabled={!currentCanvas}
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview */}
          {selectedMeme && selectedTemplate && (
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-pink-50">
              <CardHeader>
                <CardTitle className="text-xl">AI Meme Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <MemeCanvas
                  template={selectedTemplate}
                  topText={selectedMeme.topText}
                  bottomText={selectedMeme.bottomText}
                  onCanvasReady={handleCanvasReady}
                />
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}