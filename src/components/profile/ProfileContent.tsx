"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Calendar,
  Settings,
  Heart,
  ShoppingBag,
  CreditCard,
  Bell,
  Shield,
  Edit,
  Save,
  Star,
} from "lucide-react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import SuccessAlert from "./profile-ui/SuccessAlert";
import ProfileHeader from "./profile-ui/ProfileHeader";
import { LoadingContent } from "../loading/LoadingContent";
import { UserInfoProps } from "../../../types/types";

import { validateUserProfile, UserProfileType } from "@/lib/validation";

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
  dateOfBirth: ""
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



  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      items: ["Margherita Classic", "Pepperoni Supreme"],
      total: 41.98,
      status: "Delivered",
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      items: ["Meat Lovers", "Caesar Salad"],
      total: 38.98,
      status: "Delivered",
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      items: ["Veggie Delight", "Garlic Breadsticks"],
      total: 29.98,
      status: "Delivered",
    },
  ]

  const favoriteItems = [
    {
      name: "Margherita Classic",
      price: "$18.99",
      rating: 4.8,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Pepperoni Supreme",
      price: "$22.99",
      rating: 4.9,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Meat Lovers",
      price: "$26.99",
      rating: 4.9,
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

  

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
           <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            {[
              { value: "profile", icon: User, label: "Profile" },
              { value: "orders", icon: ShoppingBag, label: "Orders" },
              { value: "favorites", icon: Heart, label: "Favorites" },
              { value: "categories", icon: CreditCard, label: "Categories" },
              { value: "settings", icon: Settings, label: "Settings" }
            ].map(({ value, icon: Icon, label }) => (
              <TabsTrigger key={value} value={value} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-orange-600" />
                  Personal Information
                </CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className={
                    isEditing
                      ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                      : "border-orange-200 text-orange-600 hover:bg-orange-50"
                  }
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={userInfo?.firstName}
                      onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                      disabled={!isEditing}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={userInfo?.lastName}
                      onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                      disabled={!isEditing}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo?.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                      disabled={true}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={userInfo?.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                      disabled={!isEditing}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={userInfo?.address}
                    onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                    disabled={!isEditing}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={userInfo?.dateOfBirth}
                    onChange={(e) => setUserInfo({ ...userInfo, dateOfBirth: e.target.value })}
                    disabled={!isEditing}
                    className="h-12"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-orange-600" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-lg">#{order.id}</span>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {order.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(order.date).toLocaleDateString()}</span>
                          </div>
                          <div className="text-sm text-gray-600">{order.items.join(", ")}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">${order.total.toFixed(2)}</div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                          >
                            Reorder
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-orange-600" />
                  Favorite Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteItems.map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="w-full h-32 object-cover"
                        />
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                        >
                          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-orange-600">{item.price}</span>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                          >
                            Order Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="categories">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600">Expires 12/25</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Default</Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    Add New Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-orange-600" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Updates</p>
                      <p className="text-sm text-gray-600">Get notified about your order status</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Promotional Emails</p>
                      <p className="text-sm text-gray-600">Receive special offers and deals</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-orange-600" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    Enable Two-Factor Authentication
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
