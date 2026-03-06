import { Community } from '../sections/Community';
import { BrandPhilosophy } from '../sections/BrandPhilosophy';
import { DownloadCTA } from '../sections/DownloadCTA';
import { Features } from '../sections/Features';
import { Hero } from '../sections/Hero';
import { FAQ } from '../sections/FAQ';
import { VisualShowcase } from '../sections/VisualShowcase';

export function Home() {
  return (
    <main className="flex-1 w-full flex flex-col items-center">
      <Hero />
      <VisualShowcase />
      <Features />
      <Community />
      <FAQ />
      <BrandPhilosophy />
      <DownloadCTA />
    </main>
  );
}
