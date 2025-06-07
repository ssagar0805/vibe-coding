import { generateText, generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { type NextRequest, NextResponse } from "next/server"

const scheduleSchema = z.object({
  timeline: z.array(
    z.object({
      time: z.string(),
      activity: z.string(),
      description: z.string(),
      duration: z.number(),
      type: z.string().optional(),
    }),
  ),
  recommendations: z.array(z.string()),
})

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json()

    // Generate event schedule
    const { object: schedule } = await generateObject({
      model: openai("gpt-4o"),
      schema: scheduleSchema,
      prompt: `Create a detailed event schedule based on the following information:
      
      Event Duration: ${eventData.duration}
      Objective: ${eventData.objective}
      Audience: ${eventData.audienceType}
      Attendees: ${eventData.estimatedAttendees}
      Venue: ${eventData.venue} ${eventData.venueDetails ? `(${eventData.venueDetails})` : ""}
      
      Tasks and their durations:
      ${eventData.tasks.map((task: any) => `- ${task.name}: ${task.duration} minutes${task.description ? ` (${task.description})` : ""}`).join("\n")}
      
      Create a logical timeline that:
      1. Includes all the specified tasks
      2. Adds appropriate breaks and transitions
      3. Considers the audience type and venue
      4. Optimizes for engagement and flow
      5. Includes buffer time for Q&A or networking
      
      Also provide 3-5 practical recommendations for improving the event.`,
    })

    // Generate social media posts
    const { text: instagramPost } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Create an Instagram post for this event. Use a casual, engaging tone with emojis and relevant hashtags:
      
      Event: ${eventData.objective}
      Duration: ${eventData.duration}
      Audience: ${eventData.audienceType}
      Venue: ${eventData.venue}
      Attendees: ${eventData.estimatedAttendees}
      
      Make it exciting and visually appealing for Instagram's casual audience. Include 5-8 relevant hashtags.`,
    })

    const { text: twitterPost } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Create a Twitter post for this event. Keep it under 280 characters, versatile and punchy:
      
      Event: ${eventData.objective}
      Duration: ${eventData.duration}
      Audience: ${eventData.audienceType}
      Venue: ${eventData.venue}
      
      Make it concise with a clear call-to-action and 2-3 hashtags. Focus on the key value proposition.`,
    })

    const { text: linkedinPost } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Create a LinkedIn post for this event. Use a professional, formal tone:
      
      Event: ${eventData.objective}
      Duration: ${eventData.duration}
      Audience: ${eventData.audienceType}
      Venue: ${eventData.venue}
      Attendees: ${eventData.estimatedAttendees}
      
      Focus on professional development, networking opportunities, and business value. Use industry-relevant language and include a professional call-to-action.`,
    })

    return NextResponse.json({
      schedule,
      socialPosts: {
        instagram: instagramPost,
        twitter: twitterPost,
        linkedin: linkedinPost,
      },
      poster: "Generated poster design", // Placeholder for actual poster generation
    })
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
