import { EditUserForm } from '@/components/user/EditUserForm';
import { isAdmin } from '@/lib/server/isAdmin';
import { redirect } from 'next/navigation';

export default async function EditUser({ params }: { params: { id: string } }) {
    const admin = await isAdmin();
    if (!admin) {
      redirect('/profile');
    }

    const { id } = params;

  return (
     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <EditUserForm userId={id} />
     </div>
  )
}
