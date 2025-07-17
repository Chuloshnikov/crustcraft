import { ProfileContent } from "@/components/profile/ProfileContent";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) {
        redirect('/');
    }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <ProfileContent />
    </div>
  )
}