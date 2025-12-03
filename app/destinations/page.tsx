"use client";

import { DestinationCard } from '@/components/destinationCard';
import destinations from '@/data/destinations.json';

function getDestinationInfo(category: string){
  return destinations.filter(d => d.category == category)
}

export default function Home() {

  return (
    <div className='flex flex-col items-center w-full px-4 py-15'>
      <div className='text-center py-10 w-full max-w-7xl'>
        <span className='font-bold text-2xl'>Stay at Resorts and Hotels</span>
        <div className='grid gap-4 py-8 text-justify grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(200px,auto))] justify-center'>
          {getDestinationInfo("resortandhotel").map((d) => (
            <DestinationCard
              key={d.link}
              destination={d.destination}
              description={d.description}
              link={d.link}
              preview={d.preview}
            />
          ))}
        </div>
        
        <span className='font-bold text-2xl'>Discover Nature</span>
        <div className='grid gap-4 py-8 text-justify grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(200px,auto))] justify-center'>
          {getDestinationInfo("nature").map((d) => (
            <DestinationCard
              key={d.link}
              destination={d.destination}
              description={d.description}
              link={d.link}
              preview={d.preview}
            />
          ))}
        </div>

        <span className='font-bold text-2xl'>Visit Faith Sites</span>
        <div className='grid gap-4 py-8 text-justify grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(200px,auto))] justify-center'>
          {getDestinationInfo("faith").map((d) => (
            <DestinationCard
              key={d.link}
              destination={d.destination}
              description={d.description}
              link={d.link}
              preview={d.preview}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
