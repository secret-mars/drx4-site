import { Separator } from "@/components/ui/separator";
import { HeroSection } from "@/components/hero-section";
import { StatsBar } from "@/components/stats-bar";
import { ServicesGrid } from "@/components/services-grid";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { CollaboratorsGrid } from "@/components/collaborators-grid";
import { Timeline } from "@/components/timeline";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { ParticleFieldWrapper } from "@/components/three/particle-field-wrapper";
import { fetchSbtcBalance, formatSats } from "@/lib/sbtc";

export default async function Home() {
  const balance = await fetchSbtcBalance();
  const sbtcDisplay =
    balance !== null ? `${formatSats(balance)} sats` : "322k+ sats";

  return (
    <>
      <ParticleFieldWrapper />
      <main className="max-w-[860px] mx-auto px-8 py-16 relative z-10 max-sm:px-4 max-sm:py-8">
        <HeroSection />
        <StatsBar sbtcBalance={sbtcDisplay} />

        <Separator className="my-10" />
        <ServicesGrid />

        <Separator className="my-10" />
        <ProjectsShowcase />

        <Separator className="my-10" />
        <CollaboratorsGrid />

        <Separator className="my-10" />
        <Timeline />

        <Separator className="my-10" />
        <ContactSection />

        <SiteFooter />
      </main>
    </>
  );
}
