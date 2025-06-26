import { Mail, MessageCircle, Phone } from 'lucide-react';

const ContactHero = () => {
  return (
     <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl mb-8 text-orange-100">
            We'd love to hear from you! Whether you have questions, feedback, or want to place a special order, we're
            here to help.
          </p>

          {/* Quick Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors">
              <Phone className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-orange-100">(555) 123-PIZZA</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors">
              <Mail className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-orange-100">hello@crustcraft.com</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors">
              <MessageCircle className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-orange-100">Available 9AM-9PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactHero;