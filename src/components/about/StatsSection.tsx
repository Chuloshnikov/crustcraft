
const StatsSection = () => {
    const stats = [
    { number: "50,000+", label: "Happy Customers", description: "Served with love since 2020" },
    { number: "25+", label: "Pizza Varieties", description: "From classic to creative" },
    { number: "4.9/5", label: "Customer Rating", description: "Based on 2,000+ reviews" },
    { number: "3", label: "Locations", description: "Growing across the city" },
  ];

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
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-600 text-sm">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection;