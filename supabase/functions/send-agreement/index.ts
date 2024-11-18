import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AgreementRequest {
  to: string;
  mavenName: string;
  maestroName: string;
  signedDate: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, mavenName, maestroName, signedDate }: AgreementRequest = await req.json();

    const html = `
      <h1>Opportunity Knocks Accolade Agreement</h1>
      <p>This agreement has been signed by ${maestroName} on ${signedDate}.</p>
      <p>Please review and sign the agreement to proceed with the collaboration.</p>
      <p>Maven: ${mavenName}</p>
      <p>Maestro: ${maestroName}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Opportunity Knocks <agreements@opportunityknocks.com>",
        to: [to],
        subject: "Opportunity Knocks Agreement - Signature Required",
        html,
      }),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);