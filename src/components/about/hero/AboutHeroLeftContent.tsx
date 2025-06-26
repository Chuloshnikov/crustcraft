import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const AboutHeroLeftContent = () => {
  return (
    <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Crafting Pizza
                <br />
                <span className="text-orange-100">Since 2020</span>
              </h1>
              <p className="text-xl text-orange-100 max-w-md">
                From a small family dream to the city&apos;s favorite pizzeria, discover the passion and dedication behind
                every slice we serve.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                href={"/menu"}
                >
                    <Button
                    size="lg"
                    variant="secondary"
                    className="cursor-pointer bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg"
                    >
                    Our Menu
                    <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
                <Link 
                href={"https://www.youtube.com/watch?v=nAMD6re5BjM"}
                target="_blank"
                rel="noopener noreferrer"
                >
                    <Button
                    variant="outline"
                    size="lg"
                    className="cursor-pointer border-white bg-orange-300 text-black/80 hover:bg-white/10 px-8 py-3 text-lg"
                    >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Our Story
                    </Button>
                </Link>
            </div>
          </div>
  )
}

export default AboutHeroLeftContent;