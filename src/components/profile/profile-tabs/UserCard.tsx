import { UserInfoProps } from '../../../../types/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface UserCardProps {
  item: UserInfoProps;
  onDelete: (id: string, firstName: string, lastName: string) => void;
}

const UserCard = ({ item, onDelete }: UserCardProps) => {
  return (
       <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {item.firstName && item.firstName.charAt(0).toUpperCase()}{item.lastName && item.lastName.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 className="font-semibold">{`${item.firstName} ${item.lastName}`}</h3>
                    <p className="text-sm text-gray-600">{item.email} • {item.admin ? 'Admin' : 'Customer'}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <Link href={`/users/edit/${item._id}`}>
                    <Button className='cursor-pointer' size="sm" variant="outline">
                        Edit
                    </Button>
                </Link>
                <Button
                    size="sm"
                    variant="outline"
                    className="cursor-pointer text-red-600 hover:text-red-700 bg-transparent"
                    onClick={() => onDelete(item._id!, item.firstName!, item.lastName!)}
                    >
                    Delete
                </Button>
            </div>
    </div>
  )
}   

export default UserCard;