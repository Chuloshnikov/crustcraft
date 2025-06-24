import React from 'react'
import { AboutStatTypes } from '../../../../types/types';

const StatsItem = ({ stat }: { stat: AboutStatTypes }) => {
  return (
    <div className="text-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
            <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
            <div className="text-gray-600 text-sm">{stat.description}</div>
        </div>
    </div>
  )
}

export default StatsItem;