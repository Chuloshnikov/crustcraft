import Image from 'next/image';
import React from 'react'

const OurStoryImages = () => {
  return (
    <div className="space-y-6">
        <div className="relative">
              <Image
                src="/rossiFamily2.png"
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
                src="/ourStoryPhoto1.png"
                alt="Traditional pizza making"
                width={240}
                height={200}
                className="w-full h-32 object-cover rounded-xl shadow-md"
              />
              <Image
                src="/ourStoryPhoto2.png"
                alt="Fresh ingredients"
                width={240}
                height={200}
                className="w-full h-32 object-cover rounded-xl shadow-md"
              />
        </div>
    </div>
  )
}

export default OurStoryImages;