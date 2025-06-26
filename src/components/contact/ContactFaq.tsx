"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

export function ContactFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
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
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions. If you don't see what you're looking for, don't hesitate to contact
            us directly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="shadow-lg border-0">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-gray-900">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-orange-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-orange-600 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
