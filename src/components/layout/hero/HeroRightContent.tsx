import Image from 'next/image';
import React from 'react'

const HeroRightContent = () => {
  return (
    <div className="relative">
        <div className="relative z-10 rotatingPizza">
            <Image
            src={'/pizza.png'}
            alt="Delicious pizza"
            width={659} 
            height={653}
            className="w-full h-auto rounded-3xl shadow-2xl"
            priority
            />
        </div>
        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
    </div>
  )
}

export default HeroRightContent;