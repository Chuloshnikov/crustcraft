import ContactCta from './ContactCta';
import { ABOUT_LOCATIONS } from '@/lib/constants';
import LocationItem from './LocationItem';

const LocationSection = () => {
  return (
     <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find us at one of our three convenient locations across the city. Each location offers the same great taste
            and warm atmosphere.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {ABOUT_LOCATIONS.map((location, index) => (
           <LocationItem key={index} location={location}/>
          ))}
        </div>
        <ContactCta/>
      </div>
    </section>
  )
}

export default LocationSection;