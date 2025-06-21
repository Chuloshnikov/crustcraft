import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

import Link from 'next/link';
import React from 'react'

const HeroLinks = () => {
  return (
     <div className="flex flex-col sm:flex-row gap-4">
        <Link
        href={"/menu"}
        >
            <Button
            size="lg"
            className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 text-lg"
            >
                ORDER NOW
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </Link>
        <Link
        href="#about"
        >
            <Button
            variant="outline"
            size="lg"
            className="cursor-pointer border-orange-200 text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg"
            >
                <Play className="mr-2 h-5 w-5" />
                Learn more
            </Button>
        </Link>
    </div>
    )
}

export default HeroLinks;