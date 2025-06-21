import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import HeroLinks from './HeroLinks';
import HeroStats from './HeroStats';
import HeroLeftContent from './HeroLeftContent';
import HeroRightContent from './HeroRightContent';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
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