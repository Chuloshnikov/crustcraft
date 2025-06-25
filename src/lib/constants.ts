import { Award, Heart, Users, Clock, Truck, Shield, Leaf,  Sparkles } from "lucide-react";


export const MAIN_FEATURES = [
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

export const ABOUT_FEATURES = [
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every pizza crafted with passion and care',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized for excellence in taste',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Serving our neighbors like family',
  },
];

export const ABOUT_STATS = [
    { number: "50,000+", label: "Happy Customers", description: "Served with love since 2020" },
    { number: "25+", label: "Pizza Varieties", description: "From classic to creative" },
    { number: "4.9/5", label: "Customer Rating", description: "Based on 2,000+ reviews" },
    { number: "3", label: "Locations", description: "Growing across the city" },
];


export const ABOUT_VALUES = [
    {
      icon: Leaf,
      title: "Fresh Ingredients",
      description:
        "We source the finest, freshest ingredients daily from local suppliers and import authentic Italian products for that perfect taste.",
    },
    {
      icon: Clock,
      title: "Time-Honored Tradition",
      description:
        "Our dough is made fresh daily using a 48-hour fermentation process, following recipes passed down through generations.",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description:
        "Every pizza we make meets our highest quality standards. If you're not fully satisfied, we'll make it right — and even better — until you are.",
    },
    {
      icon: Sparkles,
      title: "Innovation & Creativity",
      description:
        "While respecting tradition, we're not afraid to innovate with seasonal specials and creative flavor combinations.",
    },
  ];

  export const ABOUT_TEAM = [
    {
      name: "Marco Rossi",
      role: "Co-Founder & Head Chef",
      bio: "Born in Naples, Marco brings 20+ years of authentic Italian cooking experience to every pizza.",
      image: "/marcoRossy1.png",
      specialties: ["Traditional Neapolitan", "Wood-fired Cooking", "Recipe Development"],
    },
    {
      name: "Sofia Rossi",
      role: "Co-Founder & Operations Manager",
      bio: "Sofia ensures every customer experience exceeds expectations while maintaining our family values.",
      image: "/sofiaRossi1.png",
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