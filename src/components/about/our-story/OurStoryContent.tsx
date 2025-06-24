import { ABOUT_FEATURES, features } from '@/lib/constants';
import React from 'react';
import OurStoryItem from './OurStoryItem';



const OurStoryContent = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          CrustCraft began as a dream shared by Marco and Sofia Rossi, two passionate food lovers who immigrated
          from Naples with nothing but traditional family recipes and an unwavering commitment to authentic
          Italian cuisine.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          What started as a small neighborhood pizzeria has grown into the city&apos;s most beloved pizza destination,
          but we&apos;ve never forgotten our roots. Every pizza is still made with the same love, attention to detail,
          and authentic ingredients that Marco&apos;s grandmother used in her kitchen back in Italy.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {ABOUT_FEATURES.map((feature, index) => (
            <OurStoryItem 
            key={index} 
            icon={feature.icon} 
            title={feature.title}
            description={feature.description}
            />
        ))}
      </div>
    </div>
  );
};

export default OurStoryContent;