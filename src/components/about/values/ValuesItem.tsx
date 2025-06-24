import React from 'react'
import { AboutValuesProps } from '../../../../types/types';

const ValuesItem = ({ icon: Icon, title, description }: AboutValuesProps) => {
  return (
     <div className="text-center group">
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-4 text-gray-900">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    </div>
  )
}

export default ValuesItem;