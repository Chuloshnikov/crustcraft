import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";


const FaqItem = ({ faq, openFAQ, setOpenFAQ, index} ) => {
  return (
     <Card className="shadow-lg border-0">
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
  )
}

export default FaqItem;