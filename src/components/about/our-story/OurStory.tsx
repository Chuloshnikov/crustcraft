import OurStoryContent from './OurStoryContent';
import OurStoryImages from './OurStoryImages';

const OurStory = () => {
  return (
     <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <OurStoryContent/>
          <OurStoryImages/>
        </div>
      </div>
    </section>
  )
}

export default OurStory