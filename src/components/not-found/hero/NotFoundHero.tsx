import { Pizza } from "lucide-react";

const NotFoundHero = () => {
  return (
     <div className="mb-12">
            <div className="relative mb-8">
              <div className="text-9xl sm:text-[12rem] font-bold text-orange-200 select-none">
                4
                <span className="relative inline-block">
                  0
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 w-20 h-20 sm:w-32 sm:h-32 rounded-full flex items-center justify-center animate-spin-slow">
                      <Pizza className="h-10 w-10 sm:h-16 sm:w-16 text-white" />
                    </div>
                  </div>
                </span>
                4
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Oops! This Page Got Lost</h1>
            <p className="text-xl text-gray-600 mb-2">
              Looks like this page took a wrong turn on the way to your table!
            </p>
        <p className="text-gray-500">
            Don&apos;t worry, our pizzas are still hot and ready. Let&apos;s get you back on track.
        </p>
    </div>
  )
}

export default NotFoundHero;