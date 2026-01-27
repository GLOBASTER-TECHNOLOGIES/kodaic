import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CoreServices from './components/CoreServices'

const page = () => {
  return (
    <div className='relative'>
      <Navbar />
      <div className='pt-10'>
        <Hero />
        <CoreServices />
      </div>
    </div>
  )
}

export default page