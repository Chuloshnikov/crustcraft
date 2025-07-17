import { Camera } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";
import { toast } from "sonner";

const EditableImage = ({ setLink }: { setLink: (link: string) => void }) => {
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
    
      if (files && files.length === 1) {
        const data = new FormData();
        data.set('file', files[0]);

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: data,
          });

          if (!response.ok) throw new Error('Upload failed');

          const result = await response.json();
          
          // Ожидаем объект с полем link
          if (!result?.link || typeof result.link !== 'string') {
            throw new Error('Invalid image URL received');
          }

          setLink(result.link);
          toast.success('Image uploaded successfully!');
        } catch (err) {
          console.error('Upload error:', err);
          toast.error(err instanceof Error ? err.message : 'Upload failed');
        }
      }
    };

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };

    return (
        <label className="absolute -bottom-2 -right-2">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
            />
            <Button
                size="sm"
                type="button"
                onClick={handleButtonClick}
                className="cursor-pointer bg-white text-orange-600 hover:bg-orange-50 rounded-full w-8 h-8 p-0"
            >
                <Camera className="h-4 w-4" />
            </Button>
        </label>
    )
}

export default EditableImage;