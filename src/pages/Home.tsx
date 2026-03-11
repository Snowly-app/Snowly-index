import { Community } from '../sections/Community';
import { DownloadCTA } from '../sections/DownloadCTA';
import { FAQ } from '../sections/FAQ';
import { Features } from '../sections/Features';
import { Hero } from '../sections/Hero';
import { VisualShowcase } from '../sections/VisualShowcase';

export function Home() {
  return (
    <main className="flex-1 w-full flex flex-col items-center">
      <Hero />
      <VisualShowcase />
      <Features />
      <FAQ />
      <Community />
      <DownloadCTA />
    </main>
  );
}
