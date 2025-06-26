import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";


const QuickContact = () => {
  return (
     <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <h3 className="font-bold text-xl mb-4">Quick Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Main Line</p>
                  <p className="text-gray-600">(555) 123-PIZZA</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">hello@crustcraft.com</p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2 flex flex-col gap-1">
                <Link href={"tel:+555353535"}>
                    <Button className="cursor-pointer w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                            <Phone className="h-4 w-4 mr-2" />
                            Call Now
                    </Button>
                </Link>
                <Link href={"mailto:hello@crustcraft.com"}>
                    <Button variant="outline" className="cursor-pointer w-full border-orange-200 text-orange-600 hover:bg-orange-50">
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                    </Button>
                </Link>
            </div>
          </CardContent>
        </Card>
  )
}

export default QuickContact;