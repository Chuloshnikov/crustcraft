import AboutHeroLeftContent from "./AboutHeroLeftContent";
import AboutHeroRightContent from "./AboutHeroRightContent";

const AboutHero = () => {
  return (
     <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AboutHeroLeftContent/>
          <AboutHeroRightContent/>
        </div>
      </div>
    </section>
  )
}

export default AboutHero;