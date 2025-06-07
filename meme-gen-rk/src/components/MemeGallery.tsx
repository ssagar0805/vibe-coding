'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Trash2 } from 'lucide-react';
import { GeneratedMeme, downloadMeme } from '@/lib/memeUtils';

interface MemeGalleryProps {
  memes: GeneratedMeme[];
  onDeleteMeme: (id: string) => void;
}

export function MemeGallery({ memes, onDeleteMeme }: MemeGalleryProps) {
  if (memes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
          <div className="text-3xl">🎭</div>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No memes yet</h3>
        <p className="text-gray-500">Create your first meme to see it here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Your Meme Collection
        </h2>
        <p className="text-gray-600 mt-2">{memes.length} meme{memes.length !== 1 ? 's' : ''} generated</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memes.map((meme) => (
          <Card key={meme.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img
                  src={meme.imageUrl}
                  alt={`Meme: ${meme.topText} ${meme.bottomText}`}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white shadow-lg"
                    onClick={() => downloadMeme(meme.imageUrl, `meme-${meme.id}.png`)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-red-500/90 hover:bg-red-600 shadow-lg"
                    onClick={() => onDeleteMeme(meme.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">
                  Template: {meme.templateName}
                </div>
                {meme.topText && (
                  <div className="text-xs text-gray-500">
                    Top: "{meme.topText}"
                  </div>
                )}
                {meme.bottomText && (
                  <div className="text-xs text-gray-500">
                    Bottom: "{meme.bottomText}"
                  </div>
                )}
                <div className="text-xs text-gray-400">
                  {meme.createdAt.toLocaleDateString()} at {meme.createdAt.toLocaleTimeString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}