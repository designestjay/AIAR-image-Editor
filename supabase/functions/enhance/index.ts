import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    // Parse request body
    const { prompt, image_urls, output_format = 'png', image_size = 'auto' } = await req.json()

    // Validate required fields
    if (!prompt || !image_urls || !Array.isArray(image_urls)) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: prompt and image_urls array are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const requestData = {
      model: 'google/nano-banana-edit',
      input: {
        prompt,
        image_urls,
        output_format,
        image_size
      }
    }

    console.log('Creating Nano Banana Edit task with data:', JSON.stringify(requestData, null, 2))

    // Step 1: Create the task
    const createResponse = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 3f0a03e48875c3c6832e2f8c3858535d',
      },
      body: JSON.stringify(requestData)
    })

    if (!createResponse.ok) {
      throw new Error(`Failed to create task: ${createResponse.status} ${createResponse.statusText}`)
    }

    const createData = await createResponse.json()
    console.log('Task creation response:', createData)

    if (createData.code !== 200) {
      throw new Error(`Failed to create task: ${JSON.stringify(createData)}`)
    }

    const taskId = createData.data.taskId
    console.log('Task created with ID:', taskId)

    // Step 2: Poll for task completion
    const maxAttempts = 30
    let attempts = 0

    while (attempts < maxAttempts) {
      attempts++
      console.log(`Checking task status (attempt ${attempts}/${maxAttempts})...`)
      
      await new Promise(resolve => setTimeout(resolve, 5000))

      const statusResponse = await fetch(
        `https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`,
        {
          headers: {
            'Authorization': 'Bearer 3f0a03e48875c3c6832e2f8c3858535d',
          }
        }
      )

      if (!statusResponse.ok) {
        throw new Error(`Failed to get task status: ${statusResponse.status} ${statusResponse.statusText}`)
      }

      const statusData = await statusResponse.json()
      console.log('Task status response:', statusData)

      if (statusData.code !== 200) {
        throw new Error(`Failed to get task status: ${JSON.stringify(statusData)}`)
      }

      const taskData = statusData.data

      if (taskData.state === 'success') {
        const resultJson = JSON.parse(taskData.resultJson)
        const resultUrls = resultJson.resultUrls
        
        if (resultUrls && resultUrls.length > 0) {
          console.log('Task completed successfully:', resultUrls[0])
          return new Response(
            JSON.stringify({
              image: resultUrls[0],
              taskId: taskId,
              message: 'Image enhanced successfully!'
            }),
            { 
              status: 200, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        } else {
          throw new Error('No result URLs found in successful task')
        }
      } else if (taskData.state === 'fail') {
        throw new Error(`Task failed: ${taskData.failMsg || 'Unknown error'}`)
      }
      // If state is 'waiting', continue polling
    }

    throw new Error(`Task timed out after ${maxAttempts} attempts`)

  } catch (error) {
    console.error('Server error:', error)
    
    let statusCode = 500
    let errorMessage = 'Internal server error'

    if (error.message.includes('timeout')) {
      statusCode = 408
      errorMessage = 'Request timeout'
    } else if (error.message.includes('Failed to create task')) {
      statusCode = 400
      errorMessage = error.message
    }

    return new Response(
      JSON.stringify({
        error: errorMessage,
        details: error.message
      }),
      { 
        status: statusCode, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
