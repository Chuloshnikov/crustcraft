import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const MenuHero = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl mb-8 text-orange-100">
            Discover our delicious selection of handcrafted pizzas, fresh salads, and more
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for your favorite dish..."
              className="pl-10 py-3 bg-white/90 border-0 text-gray-900 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
    </section>
  )
}


export default MenuHero;