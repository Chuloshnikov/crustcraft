import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';
import { Edit, Save, User } from 'lucide-react';
import React from 'react';

import { UserInfoProps } from '../../../../types/types';

export type ProfileTabProps = {
  userInfo: UserInfoProps;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoProps>>;
  isEditing: boolean;
  handleSave: () => void | Promise<void>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileTab: React.FC<ProfileTabProps> = ({ 
    userInfo,
    setUserInfo,
    isEditing,
    handleSave,
    setIsEditing,
}) => {
  return (
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
  )
}

export default ProfileTab;