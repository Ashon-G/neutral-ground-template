import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TIMEOUT_DURATION = 25000; // 25 seconds to allow for some buffer

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { founderId, title, description } = await req.json();
    console.log('Starting task generation for:', title);

    if (!founderId || !title || !description) {
      throw new Error('Missing required fields');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!supabaseUrl || !supabaseKey || !openAIApiKey) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Initialized Supabase client');

    const prompt = `As a project manager, analyze this project and create 3-5 specific, actionable tasks:

Project Title: ${title}
Project Description: ${description}

Generate tasks in this exact JSON format:
[
  {
    "title": "Task title here",
    "description": "Detailed task description here"
  }
]

Make tasks specific, actionable, and focused on project implementation.`;

    console.log('Sending prompt to OpenAI');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a helpful project manager that generates specific, actionable tasks.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Received response from OpenAI');

      const generatedText = data.choices[0].message.content;
      const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
      let tasks;

      if (jsonMatch) {
        tasks = JSON.parse(jsonMatch[0]);
        console.log('Successfully parsed tasks:', tasks);
      } else {
        console.log('No JSON found in response, using fallback tasks');
        tasks = [{
          title: "Project Analysis",
          description: `Analyze requirements for: ${title}`,
        }, {
          title: "Project Planning",
          description: "Create detailed project plan and timeline",
        }];
      }

      const { data: createdTasks, error: tasksError } = await supabase
        .from('tasks')
        .insert(
          tasks.map((task: any) => ({
            title: task.title,
            description: task.description,
            created_by: founderId,
            status: 'pending'
          }))
        )
        .select();

      if (tasksError) {
        console.error('Error creating tasks:', tasksError);
        throw tasksError;
      }

      console.log('Tasks created successfully:', createdTasks);

      return new Response(
        JSON.stringify({ tasks: createdTasks }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Task generation timed out after 25 seconds');
      }
      throw error;
    }
  } catch (error) {
    console.error('Error in generate-tasks function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});