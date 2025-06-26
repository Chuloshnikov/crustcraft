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
      image: "/martinez.png",
      specialties: ["Creative Pizzas", "Seasonal Menus", "Staff Training"],
    },
    {
      name: "Elena Chen",
      role: "Pastry Chef",
      bio: "Elena crafts our delicious desserts and manages our fresh bread and appetizer program.",
      image: "/elenaChan.png",
      specialties: ["Desserts", "Fresh Bread", "Appetizers"],
    },
  ];


  export const ABOUT_LOCATIONS = [
    {
      name: "Downtown Location",
      address: "123 Main Street, Downtown, City 12345",
      phone: "(555) 123-PIZZA",
      hours: "Mon-Thu: 11AM-10PM, Fri-Sat: 11AM-11PM, Sun: 12PM-9PM",
      isMain: true,
    },
    {
      name: "Westside Location",
      address: "456 Oak Avenue, Westside, City 12346",
      phone: "(555) 456-PIZZA",
      hours: "Mon-Thu: 11AM-10PM, Fri-Sat: 11AM-11PM, Sun: 12PM-9PM",
      isMain: false,
    },
    {
      name: "Northside Location",
      address: "789 Pine Boulevard, Northside, City 12347",
      phone: "(555) 789-PIZZA",
      hours: "Mon-Thu: 11AM-10PM, Fri-Sat: 11AM-11PM, Sun: 12PM-9PM",
      isMain: false,
    },
  ];


  export const CONTACT_LOCATIONS = [
    {
      name: "Downtown Location",
      address: "123 Main Street, Downtown, City 12345",
      phone: "(555) 123-PIZZA",
      isMain: true,
    },
    {
      name: "Westside Location",
      address: "456 Oak Avenue, Westside, City 12346",
      phone: "(555) 456-PIZZA",
      isMain: false,
    },
    {
      name: "Northside Location",
      address: "789 Pine Boulevard, Northside, City 12347",
      phone: "(555) 789-PIZZA",
      isMain: false,
    },
  ];


  export const CONTACT_BUSINESS_HOURS = [
    { day: "Monday - Thursday", hours: "11:00 AM - 10:00 PM" },
    { day: "Friday - Saturday", hours: "11:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "12:00 PM - 9:00 PM" },
  ]


  export const CONTACT_FAQS = [
    {
      question: "What are your delivery hours?",
      answer:
        "We deliver during all business hours: Monday-Thursday 11AM-10PM, Friday-Saturday 11AM-11PM, and Sunday 12PM-9PM. Delivery typically takes 30-45 minutes depending on location and order size.",
    },
    {
      question: "Do you offer catering services?",
      answer:
        "Yes! We offer catering for events of all sizes. Please contact us at least 24 hours in advance for orders over 10 pizzas. We can accommodate dietary restrictions and provide setup services for larger events.",
    },
    {
      question: "Can I make reservations?",
      answer:
        "We accept reservations for parties of 6 or more. For smaller groups, we operate on a first-come, first-served basis. You can make reservations by calling any of our locations directly.",
    },
    {
      question: "Do you have gluten-free options?",
      answer:
        "Yes, we offer gluten-free pizza crusts and several gluten-free toppings. Please inform us of any allergies when ordering, as we prepare food in a shared kitchen environment.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, all major credit cards (Visa, MasterCard, American Express, Discover), and digital payments including Apple Pay, Google Pay, and contactless payments.",
    },
    {
      question: "How can I apply for a job?",
      answer:
        "We're always looking for passionate team members! You can apply in person at any of our locations, email your resume to careers@crustcraft.com, or fill out our online application form.",
    },
  ];


