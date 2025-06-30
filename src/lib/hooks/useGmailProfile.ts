import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useProfile } from "@/lib/hooks/useProfile";
import { UserProfileTypes, UserTypes } from "../../../types/types";


export const useGmailProfile = () => {
  const { data: session } = useSession();
  const profile = useProfile();

  const userData = session?.user as UserTypes | undefined;
  const profileEmail = (profile.data as UserProfileTypes)?.email;

  useEffect(() => {
    if (!userData?.email) return;

    const isGmail = userData.email.includes("gmail");
    if (isGmail && !profileEmail) {
      fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          name: userData.name,
          image: userData.image,
        }),
      }).catch((err) => console.error("Error saving profile:", err));
    }
  }, [userData, profileEmail]);
};