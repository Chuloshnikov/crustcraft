import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Pizza } from 'lucide-react';
import { MenuItem } from '../../../../types/types';

interface MenuItemCardProps {
  item: MenuItem;
  onDelete: (id: string, name: string) => void;
}

const MenuItemCard = ({ item, onDelete }: MenuItemCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Pizza className="h-6 w-6" />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600">
            ${item.basePrice?.toFixed(2)} • {item.category}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link href={`/menu-items/edit/${item._id}`}>
          <Button className='cursor-pointer' size="sm" variant="outline">
            Edit
          </Button>
        </Link>
        <Button
          size="sm"
          variant="outline"
          className="text-red-600 hover:text-red-700 bg-transparent"
          onClick={() => onDelete(item._id, item.name)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MenuItemCard;