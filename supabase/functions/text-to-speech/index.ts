import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, voiceId, model } = await req.json()
    
    console.log('TTS Request received:', { text: text?.substring(0, 50) + '...', voiceId, model });

    if (!text) {
      console.error('No text provided')
      throw new Error('Text is required')
    }

    const elevenLabsApiKey = Deno.env.get('ELEVENLABS_API_KEY')
    console.log('API Key exists:', !!elevenLabsApiKey)
    
    if (!elevenLabsApiKey) {
      console.error('ElevenLabs API key not configured')
      throw new Error('ElevenLabs API key not configured')
    }

    console.log('Making ElevenLabs API call with voice:', voiceId || 'pFZP5JQG7iQjIQuC4Bku')
    
    // Generate speech using ElevenLabs
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId || 'pFZP5JQG7iQjIQuC4Bku'}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey,
        },
        body: JSON.stringify({
          text,
          model_id: model || 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.85,
            style: 0.15,
            use_speaker_boost: true
          },
          output_format: 'mp3_44100_128'
        }),
      }
    )

    console.log('ElevenLabs response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', errorText)
      throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`)
    }

    // Convert audio to base64
    const arrayBuffer = await response.arrayBuffer()
    console.log('Audio buffer size:', arrayBuffer.byteLength)
    
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    )

    console.log('Successfully generated audio, base64 length:', base64Audio.length)

    return new Response(
      JSON.stringify({ audioContent: base64Audio }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in text-to-speech function:', error)
    console.error('Error stack:', error.stack)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})