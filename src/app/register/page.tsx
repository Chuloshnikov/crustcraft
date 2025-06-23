import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth/authOptions";
import { redirect } from "next/navigation";

import AuthForm from '@/components/auth/AuthForm';



export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <AuthForm formType={'register'}/>
        </div>
    </section>
  )
}
