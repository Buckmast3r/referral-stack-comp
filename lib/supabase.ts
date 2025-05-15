import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database'; // Adjust the path if needed

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create a Supabase client with the service role key for server-side admin operations
export const supabaseAdmin = createServerClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    cookies: {
      get: () => undefined,
      set: () => {},
      remove: () => {},
    },
  }
);

// Create a server-side Supabase client
export const createServerSupabaseClient = () => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get: (name: string) => {
          return cookieStore.get(name)?.value;
        },
        set: (name: string, value: string, options: CookieOptions) => {
          cookieStore.set({ name, value, ...options });
        },
        remove: (name: string, options: CookieOptions) => {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
};

// Create a client-side Supabase client (for use in client components)
export const createBrowserSupabaseClient = () => {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
};
import { cookies } from 'next/headers';
import type { Database } from '@/types_db'; // Ensure this path points to your generated DB types

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const createSupabaseBrowserClient = () =>
  createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

export const createSupabaseServerClient = () => {
  const cookieStore = cookies();
  return createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // Server Components might not be able to set cookies directly.
            // Handle or log error as appropriate.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.delete(name, options);
          } catch (error) {
            // Server Components might not be able to delete cookies directly.
            // Handle or log error as appropriate.
          }
        },
      },
    }
  );
};

// Admin client using supabase-js for operations requiring service_role key
import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Re-export Database type for convenience
export type { Database };

// If you need a way to get cookies for Route Handlers specifically:
// You would pass `request.cookies` to a similar factory function or handle it in the route.
// For Route Handlers, you typically call `createServerClient` from `@supabase/ssr`
// with cookie handling adapted for `NextRequest` and `NextResponse`.

// Example for Route Handler (if needed separately, often createSupabaseServerClient can be adapted)
/*
import { type NextRequest, type NextResponse } from 'next/server';

export const createSupabaseRouteHandlerClient = (req: NextRequest, res: NextResponse) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set(name, value, options)
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.delete(name, options)
        },
      },
    }
  )
}
*/