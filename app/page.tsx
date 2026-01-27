import Navbar from './components/Navbar'
import Hero from './components/Hero'

const page = () => {
  return (
    <div className='relative'>
      <Navbar />
      <div className='pt-10'>
        <Hero />
      </div>
    </div>
  )
}

export default page