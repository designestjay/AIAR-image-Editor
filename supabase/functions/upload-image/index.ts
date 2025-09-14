import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://cursor-playground-ab79a.web.app',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // For now, return a sample image URL
    // In a real implementation, you'd handle file upload and upload to a CDN
    const sampleImageUrl = "https://file.aiquickdraw.com/custom-page/akr/section-images/1756223420389w8xa2jfe.png"
    
    return new Response(
      JSON.stringify({ 
        url: sampleImageUrl,
        message: 'Image uploaded successfully (using sample for demo)'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
    
  } catch (error) {
    console.error('Image upload error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process image' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
