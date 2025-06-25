import { ABOUT_TEAM } from '@/lib/constants';
import TeamMemberCart from './TeamMemberCart';


const TeamSection = () => {
    
  return (
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The passionate individuals who make CrustCraft special, bringing their expertise and love for great food to
            every dish.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ABOUT_TEAM.map((member, index) => (
           <TeamMemberCart key={index} member={member}/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection;