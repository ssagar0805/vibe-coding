"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Twitter, Instagram, Linkedin, Copy, Share2, Sparkles, Zap, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SocialMediaGenerator() {
  const { toast } = useToast()
  const [userInput, setUserInput] = useState("")
  const [keywords, setKeywords] = useState("")
  const [tone, setTone] = useState("professional")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState({
    twitter: "",
    instagram: "",
    linkedin: "",
  })

  const generateContent = () => {
    if (!userInput.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some content to generate descriptions",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Generate platform-specific content based on input
      const twitterContent = createTwitterContent(userInput, keywords, tone)
      const instagramContent = createInstagramContent(userInput, keywords, tone)
      const linkedinContent = createLinkedinContent(userInput, keywords, tone)

      setGeneratedContent({
        twitter: twitterContent,
        instagram: instagramContent,
        linkedin: linkedinContent,
      })

      setIsGenerating(false)

      toast({
        title: "Content generated!",
        description: "Your social media posts have been created",
      })
    }, 1500)
  }

  const copyToClipboard = (text: string, platform: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${platform} content copied to clipboard`,
    })
  }

  const shareContent = (text: string, platform: string) => {
    let url = ""

    switch (platform) {
      case "Twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
        break
      case "LinkedIn":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(text)}`
        break
      case "Instagram":
        toast({
          title: "Instagram sharing",
          description: "Copy the text and open Instagram to share",
        })
        return
    }

    if (url) {
      window.open(url, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 text-center text-white">
          <div className="mx-auto max-w-4xl">
            <img
              src="/placeholder.svg?height=200&width=400"
              alt="Social Media Marketing Illustration"
              className="mx-auto mb-8 rounded-lg shadow-2xl"
            />
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">Social Media Post Generator</h1>
            <p className="mb-8 text-xl opacity-90 md:text-2xl">
              Create engaging content for Twitter, Instagram, and LinkedIn in seconds
            </p>
            <div className="flex justify-center gap-8 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI-Powered
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Instant Results
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Platform Optimized
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Input Section */}
        <div className="mx-auto mb-12 max-w-4xl">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">What's your story?</CardTitle>
              <CardDescription className="text-lg">
                Tell us what you want to share, and we'll craft the perfect posts for each platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <Label htmlFor="content" className="text-base font-semibold">
                  Content Idea
                </Label>
                <Textarea
                  id="content"
                  placeholder="Enter your content idea, product description, announcement, or any message you want to share..."
                  className="min-h-[120px] text-base"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="keywords" className="text-base font-semibold">
                    Keywords (optional)
                  </Label>
                  <Input
                    id="keywords"
                    placeholder="marketing, announcement, product launch"
                    className="text-base"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="tone" className="text-base font-semibold">
                    Tone & Style
                  </Label>
                  <select
                    id="tone"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="enthusiastic">Enthusiastic</option>
                    <option value="informative">Informative</option>
                    <option value="humorous">Humorous</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={generateContent}
                disabled={isGenerating || !userInput.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-6 text-lg font-semibold hover:from-purple-700 hover:to-blue-700"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Generating Amazing Content...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Platform Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Twitter Card */}
          <PlatformCard
            platform="Twitter"
            icon={<Twitter className="h-6 w-6" />}
            content={generatedContent.twitter}
            onCopy={() => copyToClipboard(generatedContent.twitter, "Twitter")}
            onShare={() => shareContent(generatedContent.twitter, "Twitter")}
            characterLimit={280}
            bgColor="bg-gradient-to-br from-blue-400 to-blue-600"
            mockupImage="/placeholder.svg?height=300&width=400"
            platformDescription="Perfect for quick, engaging updates"
          />

          {/* Instagram Card */}
          <PlatformCard
            platform="Instagram"
            icon={<Instagram className="h-6 w-6" />}
            content={generatedContent.instagram}
            onCopy={() => copyToClipboard(generatedContent.instagram, "Instagram")}
            onShare={() => shareContent(generatedContent.instagram, "Instagram")}
            characterLimit={2200}
            bgColor="bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600"
            mockupImage="/placeholder.svg?height=400&width=400"
            platformDescription="Visual storytelling with hashtags"
          />

          {/* LinkedIn Card */}
          <PlatformCard
            platform="LinkedIn"
            icon={<Linkedin className="h-6 w-6" />}
            content={generatedContent.linkedin}
            onCopy={() => copyToClipboard(generatedContent.linkedin, "LinkedIn")}
            onShare={() => shareContent(generatedContent.linkedin, "LinkedIn")}
            characterLimit={3000}
            bgColor="bg-gradient-to-br from-blue-600 to-blue-800"
            mockupImage="/placeholder.svg?height=350&width=400"
            platformDescription="Professional networking content"
          />
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="mb-8 text-3xl font-bold text-gray-800">Why Choose Our Generator?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white/60 p-6 backdrop-blur-sm">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="AI Technology"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="mb-2 text-xl font-semibold">AI-Powered</h3>
              <p className="text-gray-600">Advanced algorithms create engaging content tailored to each platform</p>
            </div>
            <div className="rounded-lg bg-white/60 p-6 backdrop-blur-sm">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Multiple Platforms"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="mb-2 text-xl font-semibold">Multi-Platform</h3>
              <p className="text-gray-600">
                Generate optimized content for Twitter, Instagram, and LinkedIn simultaneously
              </p>
            </div>
            <div className="rounded-lg bg-white/60 p-6 backdrop-blur-sm">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Time Saving"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="mb-2 text-xl font-semibold">Time-Saving</h3>
              <p className="text-gray-600">Create weeks worth of content in minutes, not hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface PlatformCardProps {
  platform: string
  icon: React.ReactNode
  content: string
  onCopy: () => void
  onShare: () => void
  characterLimit: number
  bgColor: string
  mockupImage: string
  platformDescription: string
}

function PlatformCard({
  platform,
  icon,
  content,
  onCopy,
  onShare,
  characterLimit,
  bgColor,
  mockupImage,
  platformDescription,
}: PlatformCardProps) {
  return (
    <Card className="group h-full overflow-hidden border-0 bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105">
      {/* Platform Header with Gradient */}
      <div className={`${bgColor} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <h3 className="text-xl font-bold">{platform}</h3>
              <p className="text-sm opacity-90">{platformDescription}</p>
            </div>
          </div>
          <img
            src={mockupImage || "/placeholder.svg"}
            alt={`${platform} mockup`}
            className="h-16 w-16 rounded-lg object-cover opacity-80"
          />
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Generated Content</span>
          <span
            className={`text-sm font-medium ${
              content.length > characterLimit * 0.9
                ? "text-red-500"
                : content.length > characterLimit * 0.7
                  ? "text-yellow-500"
                  : "text-green-500"
            }`}
          >
            {content ? `${content.length}/${characterLimit}` : `0/${characterLimit}`}
          </span>
        </div>

        <div className="relative">
          <div className="min-h-[200px] max-h-[300px] overflow-y-auto rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 p-4">
            {content ? (
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">{content}</div>
            ) : (
              <div className="flex h-full items-center justify-center text-center">
                <div>
                  <img
                    src="/placeholder.svg?height=80&width=80"
                    alt="Waiting for content"
                    className="mx-auto mb-3 opacity-50"
                  />
                  <p className="text-gray-500">Your generated content will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between bg-gray-50/50 p-6">
        <Button
          variant="outline"
          size="sm"
          onClick={onCopy}
          disabled={!content}
          className="flex-1 mr-2 hover:bg-gray-100"
        >
          <Copy className="mr-2 h-4 w-4" /> Copy
        </Button>
        <Button
          size="sm"
          onClick={onShare}
          disabled={!content}
          className={`flex-1 ml-2 ${bgColor} border-0 hover:opacity-90`}
        >
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </CardFooter>
    </Card>
  )
}

// Helper functions remain the same
function createTwitterContent(input: string, keywords: string, tone: string): string {
  const hashtags = keywords
    ? keywords
        .split(",")
        .map((k) => `#${k.trim().replace(/\s+/g, "")}`)
        .join(" ")
    : ""

  let content = ""

  switch (tone) {
    case "professional":
      content = `${input.slice(0, 200)}${input.length > 200 ? "..." : ""}`
      break
    case "casual":
      content = `Hey everyone! ${input.slice(0, 180)}${input.length > 180 ? "..." : ""}`
      break
    case "enthusiastic":
      content = `Exciting news! ✨ ${input.slice(0, 180)}${input.length > 180 ? "..." : ""}`
      break
    case "informative":
      content = `Did you know? ${input.slice(0, 180)}${input.length > 180 ? "..." : ""}`
      break
    case "humorous":
      content = `OK this is too good not to share 😂 ${input.slice(0, 170)}${input.length > 170 ? "..." : ""}`
      break
    default:
      content = input.slice(0, 220)
  }

  return hashtags ? `${content} ${hashtags}` : content
}

function createInstagramContent(input: string, keywords: string, tone: string): string {
  const hashtags = keywords
    ? keywords
        .split(",")
        .map((k) => `#${k.trim().replace(/\s+/g, "")}`)
        .join(" ")
    : ""

  let content = ""

  switch (tone) {
    case "professional":
      content = `${input}\n\n`
      break
    case "casual":
      content = `${input} 👋\n\n`
      break
    case "enthusiastic":
      content = `✨ ${input} ✨\n\n`
      break
    case "informative":
      content = `${input}\n\nDid you find this helpful? Let me know in the comments!\n\n`
      break
    case "humorous":
      content = `${input} 😂\n\nDouble tap if you can relate!\n\n`
      break
    default:
      content = input
  }

  content = content.replace(/\. /g, ".\n\n")
  return hashtags ? `${content}\n\n${hashtags}` : content
}

function createLinkedinContent(input: string, keywords: string, tone: string): string {
  const hashtags = keywords
    ? keywords
        .split(",")
        .map((k) => `#${k.trim().replace(/\s+/g, "")}`)
        .join(" ")
    : ""

  let content = ""

  switch (tone) {
    case "professional":
      content = `I'm pleased to share: ${input}\n\n`
      break
    case "casual":
      content = `Hey connections,\n\n${input}\n\n`
      break
    case "enthusiastic":
      content = `I'm thrilled to announce: ${input}\n\n`
      break
    case "informative":
      content = `I wanted to share some insights:\n\n${input}\n\n`
      break
    case "humorous":
      content = `A little professional humor for your feed today:\n\n${input}\n\n`
      break
    default:
      content = input
  }

  content = content.replace(/\. /g, ".\n\n")
  content += "\n\nWhat are your thoughts on this? I'd love to hear your perspective in the comments."

  return hashtags ? `${content}\n\n${hashtags}` : content
}
