import { Card, CardContent } from '@/components/ui/card';
import { POPULAR_LINKS } from '@/lib/constants';
import Link from 'next/link';
import React from 'react'

const QuickActions = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {POPULAR_LINKS.map((link, index) => (
        <Link key={index} href={link.href}>
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <link.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{link.name}</h3>
                    <p className="text-gray-600 text-sm">{link.description}</p>
                </CardContent>
            </Card>
        </Link>
        ))}
    </div>
  )
}

export default QuickActions;