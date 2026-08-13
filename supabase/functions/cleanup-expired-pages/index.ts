import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Call the delete_expired_pages function
    const { data, error } = await supabaseClient.rpc('delete_expired_pages')

    if (error) {
      console.error('Error deleting expired pages:', error)
      return new Response(
        JSON.stringify({ error: error.message }),
        { headers: { 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Get count of expired pages
    const { count } = await supabaseClient
      .from('pages')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'expired')

    console.log(`Cleanup completed. Expired pages: ${count}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Expired pages cleaned up successfully',
        expiredCount: count 
      }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err) {
    console.error('Unexpected error:', err)
    return new Response(
      JSON.stringify({ error: String(err) }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
