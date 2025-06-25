import React from 'react'
import { AboutTeamMemberCartTypes } from '../../../../types/types';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface TeamMemberCartProps {
    member: AboutTeamMemberCartTypes;
}

const TeamMemberCart = ({member}: TeamMemberCartProps) => {
  return (
    <Card
        className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
        >
        <div className="relative">
            <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
        </div>
        <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Specialties</p>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
        </CardContent>
    </Card>
  )
}

export default TeamMemberCart;