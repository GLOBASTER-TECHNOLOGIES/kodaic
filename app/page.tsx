import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CoreServices from './components/CoreServices'
import Footer from './components/Footer'
import CTASection from './components/CTASection'

const page = () => {
  return (
    <div className='relative'>
      <div className=''>
        <Hero />
        <CoreServices />
        <CTASection />
        <Footer />
      </div>
    </div>
  )
}

export default page