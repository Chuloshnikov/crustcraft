"use client"

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Settings,
  Heart,
  ShoppingBag,
  CreditCard,
  ChartColumnStacked,
  ShoppingBasket,
  Users,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import SuccessAlert from "./profile-ui/SuccessAlert";
import ProfileHeader from "./profile-ui/ProfileHeader";
import { LoadingContent } from "../loading/LoadingContent";
import { UserInfoProps } from "../../../types/types";

import { validateUserProfile, UserProfileType } from "@/lib/validation";
import ProfileTab from "./profile-tabs/ProfileTab";
import OrdersTab from "./profile-tabs/OrdersTab";
import FavoritesTab from "./profile-tabs/FavoritesTab";
import CategoriesTab from "./profile-tabs/CategoriesTab";
import SettingsTab from "./profile-tabs/SettingsTab";
import PaymentsTab from "./profile-tabs/PaymentsTab";
import MenuItemsTab from "./profile-tabs/MenuItemsTab";
import UsersTab from "./profile-tabs/UsersTab";

export function ProfileContent() {
  const { data: session, status } = useSession();
  //crutch for typing
  const emptyUserInfo: UserInfoProps = {
  email: "",
  firstName: "",
  lastName: "",
  avatarUrl: "",
  phone: "",
  address: "",
  dateOfBirth: "",
  admin: false
};
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showSuccess, setShowSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfoProps>(emptyUserInfo);
  const [userImageLink, setUserImageLink] = useState(userInfo?.avatarUrl || session?.user?.image || "");

  useEffect(() => {
  if (userInfo?.avatarUrl) {
    setUserImageLink(userInfo.avatarUrl);
  } else if (session?.user?.image) {
    setUserImageLink(session.user.image);
  } else {
    setUserImageLink("");
  }
}, [userInfo, session]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user-info")
        .then((response) => response.json())
        .then((data) => setUserInfo(data));
    }
  }, [status]);



  const handleSave = async () => {
    const payload: UserProfileType = {
    email: userInfo.email,
    firstName: userInfo.firstName ?? "",
    lastName: userInfo.lastName ?? "",
    avatarUrl: userImageLink || undefined,
    phone: userInfo.phone || undefined,
    address: userInfo.address || undefined,
    dateOfBirth: userInfo.dateOfBirth || undefined,
    };

    const validationErrors = validateUserProfile(payload);

    if (validationErrors.length > 0) {
      alert(`Validation error:\n${validationErrors.join("\n")}`);
      return;
    }

    try {
      const res = await fetch("/api/user-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const { error } = await res.json();
        alert(`Error: ${error}`);
        return;
      }

      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

    if (status === "loading") {
    return <LoadingContent />;
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        {userInfo && <ProfileHeader userImageLink={userImageLink} setUserImageLink={setUserImageLink} userInfo={userInfo} />}

        {showSuccess && <SuccessAlert text={"Profile updated successfully!"}/>}

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className={`grid w-full lg:w-auto grid-cols-5 ${userInfo?.admin && "grid-cols-4 h-18"}`}>
              {[
                { value: "profile", icon: User, label: "Profile" },
                { value: "orders", icon: ShoppingBag, label: "Orders" },
                { value: "favorites", icon: Heart, label: "Favorites" },
                { value: "payment", icon: CreditCard, label: "Payments" },
                ...(userInfo?.admin
                  ? [
                      { value: "categories", icon: ChartColumnStacked, label: "Categories" },
                      { value: "menu-items", icon: ShoppingBasket, label: "Menu Items" },
                      { value: "users", icon: Users, label: "Users" },
                    
                    ]
                  : []),
                { value: "settings", icon: Settings, label: "Settings" },
              ].map(({ value, icon: Icon, label }) => (
                <TabsTrigger key={value} value={value} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </TabsTrigger>
              ))}
  </TabsList>

          {/* Profile Tab */}
          <ProfileTab
          userInfo={userInfo} 
          setUserInfo={setUserInfo} 
          isEditing={isEditing} 
          handleSave={handleSave} 
          setIsEditing={setIsEditing}
          />
          {/* Orders Tab */}
          <OrdersTab/>

          {/* Favorites Tab */}
          <FavoritesTab/>

          {/* Categories Tab */}
          {userInfo?.admin && (<CategoriesTab/>)}

          {/* Menu Items Tab */}
          {userInfo?.admin && (<MenuItemsTab/>)}

           {/* Users Tab */}
           {userInfo?.admin && (<UsersTab/>)}

          {/* Payments Tab */}
          <PaymentsTab/>

          {/* Settings Tab */}
          <SettingsTab/>
        </Tabs>
      </div>
    </section>
  )
}
