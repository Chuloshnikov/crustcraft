import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { toast } from 'sonner';

const MenuItemImageUpload = ({image, setImage}: {image: string, setImage: (image: string) => void }) => {

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
    
          if (files && files.length === 1) {
            const data = new FormData();
            data.set('file', files[0]);
    
            const uploadPromise = fetch('/api/upload', {
              method: 'POST',
              body: data,
            }).then(async (response) => {
              if (response.ok) {
                const link = await response.json();
                setImage(link); // Assuming setImage expects a string link
              } else {
                throw new Error('Something went wrong');
              }
            });
    
            toast.promise(uploadPromise, {
              loading: 'Uploading...',
              success: 'Upload complete',
              error: 'Upload error',
            });
          }
    };

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };
  return (
      <div className="lg:col-span-1">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-orange-600" />
                      Item Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {image ? (
                        <div className="relative">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt="Menu item preview"
                            width={300}
                            height={300}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => setImage("")}
                            className="cursor-pointer absolute top-2 right-2"
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-4">Upload an image for your menu item</p>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <label htmlFor="image-upload">
                            <Button 
                            onClick={handleButtonClick}
                            type="button" variant="outline" className="cursor-pointer bg-transparent">
                              Choose Image
                            </Button>
                          </label>
                        </div>
                      )}
                    </div>
                </CardContent>
            </Card>
        </div>
  )
}

export default MenuItemImageUpload;