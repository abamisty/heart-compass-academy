import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Crown level progression rules
const crownLevelRules = {
  1: "Single words & picture matches. Basic vocabulary introduction. Simple true/false questions. Direct image-to-word connections.",
  2: "Short sentences & simple grammar. Fill-in-the-blank with simple words. Basic sentence reordering. Multiple choice with short phrases.",
  3: "Longer sentences + listening exercises. Basic role-play scenarios. Audio comprehension tasks. Simple conversation starters.",
  4: "Scenario branching & multi-step responses. Complex decision trees. Sequential problem-solving. Multi-part dialogue exercises.",
  5: "Timed mastery challenges. Mixed exercise sets. Real-world application scenarios. Comprehensive skill demonstration."
};

// Exercise types available
const exerciseTypes = [
  "match_image_text",
  "fill_blank", 
  "reorder_words",
  "multiple_choice_audio",
  "picture_choice",
  "speak_prompt",
  "true_false",
  "scenario_response"
];

// Skill definitions
const skillDefinitions = {
  "u1s1": "The Love Map - Defining love and different types of love for ages 10-12",
  "u1s2": "The Warm Fuzzies - Recognizing feelings of love and affection",
  "u1s3": "The First Step – I am Awesome! - Building self-worth and self-love",
  "u2s1": "The Secret Codes of Caring - Understanding Love Languages", 
  "u2s2": "Fueling Your Compass - Active self-care for body, mind, and emotions",
  "u2s3": "Mapping Your Family's Heart - How love is shown in families",
  "u3s1": "The Friendship Formula - Ingredients of healthy friendships",
  "u3s2": "Bouncing Back Together - Resilience and self-compassion after mistakes",
  "u3s3": "Drawing the Line (in a friendly way) - Setting personal boundaries",
  "u4s1": "Stepping Into Their Shoes - Practicing empathy",
  "u4s2": "Compassion in Action - Turning empathy into community kindness", 
  "u4s3": "Gracefully Receiving - Accepting love, compliments, and help",
  "u5s1": "Red Flags & Green Flags - Recognizing healthy vs. unhealthy behaviors",
  "u5s2": "Mending Fences - Conflict resolution and forgiveness",
  "u5s3": "Your Support Network - Seeking help & understanding love globally"
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { skillId, crownLevel, numExercises = 7 } = await req.json();

    if (!skillId || !crownLevel) {
      throw new Error('skillId and crownLevel are required');
    }

    if (!skillDefinitions[skillId]) {
      throw new Error(`Unknown skill ID: ${skillId}`);
    }

    if (crownLevel < 1 || crownLevel > 5) {
      throw new Error('crownLevel must be between 1 and 5');
    }

    if (numExercises < 6 || numExercises > 8) {
      throw new Error('numExercises must be between 6 and 8');
    }

    const skillDescription = skillDefinitions[skillId];
    const levelRules = crownLevelRules[crownLevel];

    const prompt = `You are an Exercise Designer for the "Compass of Love" curriculum for children ages 10-12.

SKILL: ${skillId} - ${skillDescription}
CROWN LEVEL: ${crownLevel}
LEVEL RULES: ${levelRules}
NUMBER OF EXERCISES: ${numExercises}

Generate exactly ${numExercises} micro-exercises following these requirements:

EXERCISE TYPES (use variety, no repeats): ${exerciseTypes.join(', ')}

FOR EACH EXERCISE, provide:
- exerciseId: unique ID like "${skillId}_c${crownLevel}_e{number}"
- type: one of the allowed exercise types
- promptText: clear instruction for child (ages 10-12 language)
- imageDesc: description for 512x512 flat rounded icon art (bright palette)
- audioTranscript: text for text-to-speech (if audio exercise)
- options: array with correct answer first, then 3 distractors (for choice exercises)
- correctAnswer: the right answer (string or array)
- hintText: helpful hint (short, encouraging)
- feedbackCorrect: positive reinforcement message
- feedbackIncorrect: supportive, encouraging message
- xpReward: points (8-22 range based on difficulty)

RULES:
- Child-friendly, positive language
- Progressive difficulty matching crown level
- Each exercise type used only once
- Focus on empathy, love, kindness themes
- Image descriptions suitable for illustration
- Audio transcripts under 30 words

Return ONLY valid JSON in this format:
{
  "exercises": [
    {
      "exerciseId": "string",
      "type": "string", 
      "promptText": "string",
      "imageDesc": "string",
      "audioTranscript": "string",
      "options": ["correct", "distractor1", "distractor2", "distractor3"],
      "correctAnswer": "string",
      "hintText": "string", 
      "feedbackCorrect": "string",
      "feedbackIncorrect": "string",
      "xpReward": number
    }
  ]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert curriculum designer specializing in character education for children. You create engaging, age-appropriate learning exercises with positive reinforcement.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Parse the JSON response
    let exercises;
    try {
      exercises = JSON.parse(generatedContent);
    } catch (parseError) {
      console.error('Failed to parse generated content:', generatedContent);
      throw new Error('Failed to parse AI response as JSON');
    }

    return new Response(JSON.stringify(exercises), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-exercises function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.stack 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});