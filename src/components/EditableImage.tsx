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
    
            const uploadPromise = fetch('/api/upload', {
              method: 'POST',
              body: data,
            }).then(async (response) => {
              if (response.ok) {
                const link = await response.json();
                setLink(link); 
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
        <label className="absolute -bottom-2 -right-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                      />
            <Button
            size="sm"
            onClick={handleButtonClick}
            className="cursor-pointer bg-white text-orange-600 hover:bg-orange-50 rounded-full w-8 h-8 p-0"
            >
                <Camera className="h-4 w-4" />
            </Button>
        </label>
    )
}

export default EditableImage;