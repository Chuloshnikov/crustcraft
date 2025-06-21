import React from 'react'
import HeroLinks from './HeroLinks';
import HeroStats from './HeroStats';

const HeroLeftContent = () => {
  return (
    <div className="space-y-8">
        <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Everything
                <br />
                is better
                <br />
                with a{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Pizza</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
                Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life that brings
                people together.
            </p>
        </div>
        <HeroLinks/>
        <HeroStats/>
    </div>
  )
}

export default HeroLeftContent;