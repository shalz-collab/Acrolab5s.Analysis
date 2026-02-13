import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { beforeImage, afterImage } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a professional 5S workplace analysis expert. You will receive two workplace images: a "Before" image and an "After" image.

Analyze both images and evaluate the improvement based on the 5S methodology:
1. Sort (Seiri) – Removing unnecessary items
2. Set in Order (Seiton) – Organizing items for easy access
3. Shine (Seiso) – Cleaning the workspace
4. Standardize (Seiketsu) – Establishing consistent procedures
5. Sustain (Shitsuke) – Maintaining discipline

You MUST respond with a valid JSON object using this exact structure (no markdown, no code fences, just raw JSON):
{
  "summary": "A professional 2-3 sentence summary of the overall improvement observed.",
  "scores": {
    "sort": <number 0-100>,
    "setInOrder": <number 0-100>,
    "shine": <number 0-100>,
    "standardize": <number 0-100>,
    "sustain": <number 0-100>
  },
  "scoreExplanations": {
    "sort": "1-2 sentences explaining why this specific score was given for Sort based on what you see in the images.",
    "setInOrder": "1-2 sentences explaining the Set in Order score.",
    "shine": "1-2 sentences explaining the Shine score.",
    "standardize": "1-2 sentences explaining the Standardize score.",
    "sustain": "1-2 sentences explaining the Sustain score."
  },
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3", "recommendation 4", "recommendation 5"]
}

Be specific about what you observe in the images. Reference actual objects, surfaces, and arrangements you can see. Scores should reflect real improvement between Before and After.`;

    const userContent: any[] = [
      { type: "text", text: "Analyze these workplace images for 5S improvement. The first image is BEFORE and the second is AFTER." },
    ];

    if (beforeImage) {
      userContent.push({
        type: "image_url",
        image_url: { url: beforeImage },
      });
    }
    if (afterImage) {
      userContent.push({
        type: "image_url",
        image_url: { url: afterImage },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(JSON.stringify({ error: "AI analysis failed. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON from the AI response
    let analysisResult;
    try {
      // Strip markdown code fences if present
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      analysisResult = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse analysis results");
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-5s error:", e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
