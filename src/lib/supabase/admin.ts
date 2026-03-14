import { createClient } from '@supabase/supabase-js'

// Service-role client — no cookies needed, safe to call outside request scope
// (e.g. generateStaticParams, sitemap, cron jobs)
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
