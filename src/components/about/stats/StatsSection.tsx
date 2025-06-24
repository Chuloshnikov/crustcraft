import { ABOUT_STATS } from "@/lib/constants";
import StatsItem from "./StatsItem";

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Numbers that tell the story of our growth and the trust our community has placed in us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ABOUT_STATS.map((stat, index) => (
            <StatsItem key={index} stat={stat}/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection;