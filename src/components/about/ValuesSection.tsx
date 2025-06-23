import { Leaf, Clock, Shield, Sparkles } from "lucide-react";

const ValuesSection = () => {
     const values = [
    {
      icon: Leaf,
      title: "Fresh Ingredients",
      description:
        "We source the finest, freshest ingredients daily from local suppliers and import authentic Italian products for that perfect taste.",
    },
    {
      icon: Clock,
      title: "Time-Honored Tradition",
      description:
        "Our dough is made fresh daily using a 48-hour fermentation process, following recipes passed down through generations.",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description:
        "Every pizza meets our strict quality standards. If you're not completely satisfied, we'll make it right.",
    },
    {
      icon: Sparkles,
      title: "Innovation & Creativity",
      description:
        "While respecting tradition, we're not afraid to innovate with seasonal specials and creative flavor combinations.",
    },
  ];

  return (
     <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do, from sourcing ingredients to serving our customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesSection;