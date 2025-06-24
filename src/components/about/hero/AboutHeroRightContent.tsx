import Image from 'next/image';
import React from 'react'

const AboutHeroRightContent = () => {
  return (
     <div className="relative">
            <div className="relative z-10 rotatingPizza">
              <Image
                src="/aboutPizza.png"
                alt="CrustCraft restaurant interior"
                width={600}
                height={600}
                className="w-full h-auto rounded-3xl shadow-2xl"
                priority
              />
            </div>
            {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-1000"></div>
    </div>
  )
}

export default AboutHeroRightContent;