"use client"

import { useState } from "react"
import { CONTACT_FAQS } from "@/lib/constants"
import FaqItem from "./FaqItem"

export function ContactFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions. If you don&apos;t see what you&apos;re looking for, don&apos;t hesitate to contact
            us directly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {CONTACT_FAQS.map((faq, index) => (
            <FaqItem key={index} faq={faq} openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} index={index}/>
          ))}
        </div>
      </div>
    </section>
  )
}
