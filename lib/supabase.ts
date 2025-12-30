import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function retrieveDestinations(category?: string) {
  let query = supabase
    .from("destinations")
    .select("slug, destination, location");

  if (category) query = query.eq("category", category);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }

  return data ?? [];
}

export async function getAllDestinationSlugs(options?: { excludeCategory?: string; includeCategory?: string }): Promise<string[]> {
  const { data, error } = await supabase
    .from("destinations")
    .select("slug, category");

  if (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }

  let filtered = data ?? [];

  if (options?.excludeCategory) {
    filtered = filtered.filter(d => d.category !== options.excludeCategory);
  }

  if (options?.includeCategory) {
    filtered = filtered.filter(d => d.category === options.includeCategory);
  }

  return filtered.map(d => d.slug as string);
}

export async function getDestinationBySlug(slug: string) {
  const { data, error } = await supabase
    .from("destinations")
    .select("destination, location, content, embed")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Supabase error in getDestinationBySlug:", error);
    return null;
  }

  return data;
}