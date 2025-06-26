import QuickContact from "./QuickContact";
import BusinessHours from "./BusinessHours";
import Locations from "./Locations";
import SocialMedia from "./SocialMedia";

export function ContactInfo() {
  return (
    <section className="bg-gradient-to-br from-orange-50 to-red-50 p-8 lg:p-12">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
          <p className="text-gray-600">Multiple ways to reach us. Choose the method that works best for you.</p>
        </div>
        <QuickContact/>
        <BusinessHours/>     
        <Locations/>
        <SocialMedia/>
      </div>
    </section>
  )
}
