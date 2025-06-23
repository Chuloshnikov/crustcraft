import { Award, Heart, Users } from 'lucide-react';
import Image from 'next/image';

const OurStory = () => {
  return (
     <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                CrustCraft began as a dream shared by Marco and Sofia Rossi, two passionate food lovers who immigrated
                from Naples with nothing but traditional family recipes and an unwavering commitment to authentic
                Italian cuisine.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                What started as a small neighborhood pizzeria has grown into the city&apos;s most beloved pizza destination,
                but we&apos;ve never forgotten our roots. Every pizza is still made with the same love, attention to detail,
                and authentic ingredients that Marco&apos;s grandmother used in her kitchen back in Italy.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">Made with Love</h3>
                <p className="text-sm text-gray-600">Every pizza crafted with passion and care</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">Award Winning</h3>
                <p className="text-sm text-gray-600">Recognized for excellence in taste</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">Community First</h3>
                <p className="text-sm text-gray-600">Serving our neighbors like family</p>
              </div>
            </div>
          </div>

          {/* Right Content - Images */}
          <div className="space-y-6">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Marco and Sofia Rossi, founders of CrustCraft"
                width={500}
                height={400}
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm font-semibold text-gray-900">Marco & Sofia Rossi</p>
                <p className="text-xs text-gray-600">Founders & Head Chefs</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/placeholder.svg?height=200&width=240"
                alt="Traditional pizza making"
                width={240}
                height={200}
                className="w-full h-32 object-cover rounded-xl shadow-md"
              />
              <Image
                src="/placeholder.svg?height=200&width=240"
                alt="Fresh ingredients"
                width={240}
                height={200}
                className="w-full h-32 object-cover rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStory