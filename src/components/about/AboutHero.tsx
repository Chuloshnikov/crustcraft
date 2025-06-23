import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight, Play } from "lucide-react";

const AboutHero = () => {
  return (
     <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Crafting Pizza
                <br />
                <span className="text-orange-100">Since 2020</span>
              </h1>
              <p className="text-xl text-orange-100 max-w-md">
                From a small family dream to the city's favorite pizzeria, discover the passion and dedication behind
                every slice we serve.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg"
              >
                Our Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/placeholder.svg?height=600&width=600"
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
        </div>
      </div>
    </section>
  )
}

export default AboutHero;