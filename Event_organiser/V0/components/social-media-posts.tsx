"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Copy, Instagram, Twitter, Linkedin } from "lucide-react"
import { useState } from "react"
import type { EventData } from "@/app/page"

interface SocialMediaPostsProps {
  eventData: EventData | null
  socialPosts:
    | {
        instagram: string
        twitter: string
        linkedin: string
      }
    | undefined
  isGenerating: boolean
}

export function SocialMediaPosts({ eventData, socialPosts, isGenerating }: SocialMediaPostsProps) {
  const [copiedPost, setCopiedPost] = useState<string | null>(null)

  const copyToClipboard = async (text: string, platform: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedPost(platform)
    setTimeout(() => setCopiedPost(null), 2000)
  }

  if (!eventData) return null

  if (isGenerating) {
    return (
      <div className="space-y-6">
        {["Instagram", "Twitter", "LinkedIn"].map((platform) => (
          <Card key={platform}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const platforms = [
    {
      name: "Instagram",
      icon: Instagram,
      content: socialPosts?.instagram,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      description: "Casual and engaging tone with emojis",
    },
    {
      name: "Twitter",
      icon: Twitter,
      content: socialPosts?.twitter,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Concise and versatile with hashtags",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      content: socialPosts?.linkedin,
      color: "text-blue-800",
      bgColor: "bg-blue-50",
      description: "Professional and formal tone",
    },
  ]

  return (
    <div className="space-y-6">
      {platforms.map((platform) => (
        <Card key={platform.name}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${platform.bgColor}`}>
                <platform.icon className={`w-5 h-5 ${platform.color}`} />
              </div>
              <div>
                <CardTitle className="text-lg">{platform.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{platform.description}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => platform.content && copyToClipboard(platform.content, platform.name)}
              disabled={!platform.content}
            >
              <Copy className="w-4 h-4 mr-2" />
              {copiedPost === platform.name ? "Copied!" : "Copy"}
            </Button>
          </CardHeader>
          <CardContent>
            {platform.content ? (
              <div className="space-y-3">
                <Textarea value={platform.content} readOnly className="min-h-[120px] resize-none" />
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {platform.content.length} characters
                  </Badge>
                  {platform.name === "Twitter" && (
                    <Badge variant={platform.content.length <= 280 ? "default" : "destructive"} className="text-xs">
                      {platform.content.length <= 280 ? "Within limit" : "Over limit"}
                    </Badge>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Content will be generated automatically...</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Platform Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-600" />
                Instagram
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use emojis and casual language</li>
                <li>• Include relevant hashtags</li>
                <li>• Focus on visual appeal</li>
                <li>• Encourage engagement</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Twitter className="w-4 h-4 text-blue-600" />
                Twitter
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Keep under 280 characters</li>
                <li>• Use trending hashtags</li>
                <li>• Be concise and punchy</li>
                <li>• Include call-to-action</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-800" />
                LinkedIn
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Professional tone</li>
                <li>• Focus on business value</li>
                <li>• Include industry keywords</li>
                <li>• Encourage networking</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
