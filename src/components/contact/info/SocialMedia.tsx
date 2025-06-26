import Facebook from "@/assets/icons/Facebook";
import Instagram from "@/assets/icons/Instagram";
import Twitter from "@/assets/icons/Twitter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


const SocialMedia = () => {
  return (
     <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <h3 className="font-bold text-xl mb-4">Follow Us</h3>
            <p className="text-gray-600 mb-4">
              Stay connected for the latest updates, special offers, and behind-the-scenes content.
            </p>
            <div className="flex flex-col sm:flex-row space-x-4">
              <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50 max-w-max">
                <Facebook/>
                <span className="ml-1">Facebook</span>
              </Button>
              <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50 max-w-max">
                <Instagram/>
                <span className="ml-1">Instagram</span>
              </Button>
              <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50 max-w-max">
                <Twitter/>
                <span className="ml-1">Twitter</span>
              </Button>
            </div>
          </CardContent>
    </Card>
  )
}

export default SocialMedia;