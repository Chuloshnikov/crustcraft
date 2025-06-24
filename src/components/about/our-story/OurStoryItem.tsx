import { OurStoryItemProps } from '../../../../types/types';

const OurStoryItem = ({ icon: Icon, title, description }: OurStoryItemProps) => {
  return (
    <div className="text-center">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

export default OurStoryItem;