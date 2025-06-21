import { Clock, Truck, Shield, Award } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Hot and fresh pizza delivered to your door in 30 minutes or less",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "We use only the finest ingredients and traditional recipes",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free delivery on orders over $25 within our delivery zone",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized as the best pizza place in the city for 3 years running",
  },
]

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose CrustCraft?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to delivering not just pizza, but an exceptional experience that keeps our customers coming
            back for more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection;
