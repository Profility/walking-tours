import data from "@/data/destinations.json";
import { DestinationPage } from "@/components/destinationPage";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return data.map((d) => ({
    slug: d.link,
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const dest = data.find((d) => d.link === slug);

  if (!dest) {
    return notFound();
  }

  const heroImages =
    dest.showcaseImages && dest.showcaseImages.length > 0
      ? dest.showcaseImages
      : [dest.preview];

  return (
    <DestinationPage
      destination={dest.destination}
      title={dest.infoTitle}
      description={dest.infoDescription}
      embed={dest.mapsEmbed}
      image={heroImages}
    />
  );
}
