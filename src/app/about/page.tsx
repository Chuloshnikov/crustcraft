import AboutHero from "@/components/about/hero/AboutHero";
import  OurStory  from "@/components/about/our-story/OurStory";
import TeamSection from "@/components/about/TeamSection";
import ValuesSection from "@/components/about/values/ValuesSection"
import StatsSection from "@/components/about/stats/StatsSection";
import LocationSection from "@/components/about/LocationSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <AboutHero />
        <OurStory />
        <StatsSection />
        <ValuesSection />
        <TeamSection />
        <LocationSection />
    </div>
  )
}
