import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { toast } from 'sonner';
import { UseFormSetValue } from 'react-hook-form';
import { MenuItemFormData } from '@/lib/validation';

interface MenuItemImageUploadProps {
  image: string | null;
  setValue: UseFormSetValue<MenuItemFormData>;
}

const MenuItemImageUpload = ({ image, setValue }: MenuItemImageUploadProps) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && files.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);

      try {
        const uploadPromise = fetch('/api/upload', {
          method: 'POST',
          body: data,
        }).then(async (response) => {
          if (response.ok) {
            const { link } = await response.json();
            setValue('image', link, { shouldValidate: true });
            return link;
          }
          throw new Error('Upload failed');
        });

        await toast.promise(uploadPromise, {
          loading: 'Uploading image...',
          success: 'Image uploaded successfully!',
          error: 'Failed to upload image',
        });
      } catch (err) {
        console.error("Upload error:", err);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setValue('image', null, { shouldValidate: true });
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
                  src={image}
                  alt="Menu item preview"
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg"
                  priority
                />
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={handleRemoveImage}
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
                  accept="image/*"
                />
                <label htmlFor="image-upload">
                  <Button 
                    onClick={handleButtonClick}
                    type="button" 
                    variant="outline" 
                    className="cursor-pointer bg-transparent"
                  >
                    Choose Image
                  </Button>
                </label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuItemImageUpload;