export const revalidate = 10;

import { getInfoBySlug, getAllSlugs } from "@/lib/supabase";
import { DestinationPage } from "@/components/destinationPage";
import { notFound } from "next/navigation";
import { getImageBySlug } from "@/lib/utils";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dest = await getInfoBySlug("destinations", slug);

  if (!dest) {
    return {
      title: "Destination Not Found - Lakbay Lucban",
      description: "The destination you're looking for could not be found.",
    };
  }

  return {
    title: `${dest.name} - Lakbay Lucban`,
    description: dest.description,
    openGraph: {
      title: `${dest.name} - Lakbay Lucban`,
      description: dest.description,
      type: "website",
    },
  };
}
interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs("destinations");
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const dest = await getInfoBySlug("destinations", slug);

  const image = await getImageBySlug(slug);
  if (!dest) return notFound();

  return (
    <DestinationPage
      destination={dest.name}
      embed={dest.embed}
      content={dest.content}
      image={image}
      slug={slug}
      description={dest.description}
      aboutPage={dest.about_page}
    />
  );
}
