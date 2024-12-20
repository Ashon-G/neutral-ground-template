import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  senderName: string;
  messageContent: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const { to, senderName, messageContent }: EmailRequest = await req.json();

    console.log(`Attempting to send notification to user ID: ${to}`);

    // Get the recipient's email from profiles using username column
    const { data: recipientData, error: recipientError } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', to)
      .single();

    if (recipientError) {
      console.error("Error fetching recipient data:", recipientError);
      return new Response(JSON.stringify({ error: recipientError.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!recipientData?.username) {
      console.error("No email found for recipient");
      return new Response(JSON.stringify({ error: "Recipient email not found" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Sending email to: ${recipientData.username}`);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Maven <notifications@updates.itscoop.com>",
        to: [recipientData.username],
        subject: `New message from ${senderName}`,
        html: `
          <div>
            <h2>You have a new message from ${senderName}</h2>
            <p style="margin: 16px 0; padding: 12px; background-color: #f3f4f6; border-radius: 6px;">
              ${messageContent}
            </p>
            <p>
              <a href="https://maven.dev/dashboard/chat" style="color: #0ea5e9;">
                Click here to view and reply to the message
              </a>
            </p>
          </div>
        `,
      }),
    });

    const resData = await emailResponse.json();
    console.log("Resend API response:", resData);

    if (!emailResponse.ok) {
      console.error("Error from Resend API:", resData);
      return new Response(JSON.stringify({ error: resData.message || "Failed to send email" }), {
        status: emailResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(resData), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in send-message-notification function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);