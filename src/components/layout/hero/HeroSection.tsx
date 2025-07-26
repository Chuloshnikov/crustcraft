import HeroLeftContent from './HeroLeftContent';
import HeroRightContent from './HeroRightContent';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 accent-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroLeftContent/>
          <HeroRightContent/>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;