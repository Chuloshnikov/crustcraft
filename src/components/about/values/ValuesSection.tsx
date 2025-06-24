import { ABOUT_VALUES } from "@/lib/constants";
import ValuesItem from "./ValuesItem";


const ValuesSection = () => {
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
          {ABOUT_VALUES.map((value, index) => (
            <ValuesItem
            key={index}
            icon={value.icon}
            title={value.title}
            description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesSection;