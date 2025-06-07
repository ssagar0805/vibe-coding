'use client';

import { useState } from 'react';
import { MemeGenerator } from '@/components/MemeGenerator';
import { AIMemeGenerator } from '@/components/AIMemeGenerator';
import { MemeGallery } from '@/components/MemeGallery';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneratedMeme } from '@/lib/memeUtils';
import { Smile, Zap, Wand2, Image as ImageIcon } from 'lucide-react';

export default function Home() {
  const [generatedMemes, setGeneratedMemes] = useState<GeneratedMeme[]>([]);

  const handleMemeGenerated = (meme: GeneratedMeme) => {
    setGeneratedMemes(prev => [meme, ...prev]);
  };

  const handleDeleteMeme = (id: string) => {
    setGeneratedMemes(prev => prev.filter(meme => meme.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Smile className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">
                Meme Generator
              </h1>
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Zap className="w-8 h-8" />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Create hilarious memes in seconds! Choose a template, add your text, or let AI generate the perfect meme for you.
            </p>
            <div className="flex justify-center gap-6 mt-8 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-300 rounded-full" />
                Multiple Templates
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-300 rounded-full" />
                AI Generation
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-300 rounded-full" />
                Instant Download
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="manual" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg">
              <TabsTrigger 
                value="manual" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                <ImageIcon className="w-4 h-4" />
                Manual Mode
              </TabsTrigger>
              <TabsTrigger 
                value="ai" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                <Wand2 className="w-4 h-4" />
                AI Mode
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="manual" className="space-y-8">
            <MemeGenerator onMemeGenerated={handleMemeGenerated} />
          </TabsContent>

          <TabsContent value="ai" className="space-y-8">
            <AIMemeGenerator onMemeGenerated={handleMemeGenerated} />
          </TabsContent>
        </Tabs>
        
        {generatedMemes.length > 0 && (
          <>
            <Separator className="my-16 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-px" />
            <MemeGallery memes={generatedMemes} onDeleteMeme={handleDeleteMeme} />
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Made with ❤️ for meme lovers everywhere • Now with AI-powered generation
          </p>
        </div>
      </footer>
    </div>
  );
}