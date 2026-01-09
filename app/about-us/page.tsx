"use client";

import { ShowcaseCarousel } from "@/components/showcaseCarousel";
import { anchor } from "@/components/anchor";


export default function Home() {
  return (
    <div>
      <div className="relative w-full">
          <ShowcaseCarousel images={"/kamay-ni-hesus.jpg"} />
      
          <h1 className="absolute top-1/2 md:left-10 transform -translate-y-1/2 text-5xl md:text-left text-center font-bold px-15 text-white text-shadow-md text-shadow-black pointer-events-none">
          <span className="text-4xl">About Us</span>
        </h1>
      </div>

      <div className="w-full max-w-100 md:max-w-250 mx-auto py-10 px-4 md:text-lg text-base text-justify">
        <h1 className="font-bold text-2xl">About the Website</h1><br/>
        <p>Lakbay Lucban is a QR-code web-based information system serving as a centralized guide to enhance the trip planning and visitor experience in Lucban, Quezon by offering details about destinations selected by the Tourism Office of Lucban. This website was made as the output of a research conducted by Lucban Academy Senior High School Grade-12 Students to modernize the tourism experience in Lucban, Quezon.</p>
        <br/>
        <p>
          This website was developed using the following technologies: {anchor({ href: "https://nextjs.org/", children: "Next.js" })} as the front end, {anchor({ href: "https://tailwindcss.com/", children: "Tailwind CSS" })} for styling, and {anchor({ href: "https://ui.shadcn.com/", children: "shadcn/ui" })} as the component library. Other technologies include {anchor({ href: "https://www.google.com/maps/", children: "Google Maps" })} for map integration, {anchor({ href: "https://github.com/", children: "GitHub" })} for version control, {anchor({ href: "https://supabase.com", children: "Supabase" })} as the database, and {anchor({ href: "https://vercel.com/", children: "Vercel" })} for hosting. All images used on this website are publicly available from their respective Facebook pages, and proper credit is given. The source code for this website is open-source and can be found {anchor({ href: "https://github.com/Profility/walking-tours", children: " here" })}.
        </p>    
      </div>
    </div>
  );
}
