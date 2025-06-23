import React from 'react'
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Badge } from '../ui/badge';


const TeamSection = () => {
    const team = [
    {
      name: "Marco Rossi",
      role: "Co-Founder & Head Chef",
      bio: "Born in Naples, Marco brings 20+ years of authentic Italian cooking experience to every pizza.",
      image: "/placeholder.svg?height=300&width=300",
      specialties: ["Traditional Neapolitan", "Wood-fired Cooking", "Recipe Development"],
    },
    {
      name: "Sofia Rossi",
      role: "Co-Founder & Operations Manager",
      bio: "Sofia ensures every customer experience exceeds expectations while maintaining our family values.",
      image: "/placeholder.svg?height=300&width=300",
      specialties: ["Customer Experience", "Quality Control", "Team Leadership"],
    },
    {
      name: "Antonio Martinez",
      role: "Executive Chef",
      bio: "Antonio's creative flair brings innovative flavors while respecting traditional techniques.",
      image: "/placeholder.svg?height=300&width=300",
      specialties: ["Creative Pizzas", "Seasonal Menus", "Staff Training"],
    },
    {
      name: "Elena Chen",
      role: "Pastry Chef",
      bio: "Elena crafts our delicious desserts and manages our fresh bread and appetizer program.",
      image: "/placeholder.svg?height=300&width=300",
      specialties: ["Desserts", "Fresh Bread", "Appetizers"],
    },
  ]
  return (
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The passionate individuals who make CrustCraft special, bringing their expertise and love for great food to
            every dish.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Specialties</p>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection;