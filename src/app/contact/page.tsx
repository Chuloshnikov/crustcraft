import ContactHero from "@/components/contact/hero/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/info/ContactInfo";
import { LocationMap } from "@/components/contact/find-us/LocationMap";
import { ContactFAQ } from "@/components/contact/faq/ContactFaq";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <ContactHero />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">         
          <ContactForm />
          <ContactInfo />
        </div>
        <LocationMap />
        <ContactFAQ />
    </div>
  )
}


