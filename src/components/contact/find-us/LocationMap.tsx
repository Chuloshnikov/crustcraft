import LocationQuickAccess from "./LocationQuickAccess"
import MapPlaceholder from "./MapPlaceholder"

export function LocationMap() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visit us at any of our three convenient locations. Each offers the same great food and warm atmosphere.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <MapPlaceholder/>
          <LocationQuickAccess/>
        </div>
      </div>
    </section>
  )
}
