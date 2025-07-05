"use client"

import EditableImage from '@/components/EditableImage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {  Mail, Phone } from 'lucide-react';
import { UserInfoProps } from '../../../../types/types';
import React from 'react';
import { formatMemberSince } from '@/lib/utils';



const ProfileHeader = ({ 
  userImageLink, 
  setUserImageLink, 
  userInfo
}: { 
  userImageLink: string; 
  setUserImageLink: React.Dispatch<React.SetStateAction<string>>;
  userInfo: UserInfoProps 
}) => {


  // Format member since date
  const memberSince = formatMemberSince(userInfo?.createdAt as Date);

  return (
    <div className="mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar */}
                <div className="relative w-24 h-24">
                  <Avatar className="absolute w-full h-full border-4 border-white shadow-lg rounded-full overflow-hidden">
                    {userImageLink && (<AvatarImage 
                      src={userImageLink} 
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"/>
                    )}
                    {!userImageLink && 
                    (<AvatarFallback className="text-2xl font-bold bg-white text-orange-600 flex items-center justify-center w-full h-full rounded-full">
                      {userInfo.firstName && userInfo?.firstName[0]}
                      {userInfo.lastName && userInfo?.lastName[0]}
                    </AvatarFallback>
                    )}              
                  </Avatar>
                   <EditableImage setLink={setUserImageLink}/>
                </div>
                {/* User Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">
                    Hello, {userInfo?.firstName} {userInfo?.lastName}!
                  </h1>
                  <p className="text-orange-100 mb-4">{memberSince}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{userInfo?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{userInfo?.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-xs text-orange-100">Orders</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-xs text-orange-100">Favorites</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-2xl font-bold">4.9</div>
                    <div className="text-xs text-orange-100">Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full"></div>
          </div>
        </div>
  )
}

export default ProfileHeader;