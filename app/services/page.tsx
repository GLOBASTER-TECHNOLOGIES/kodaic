import React from 'react'
import ServicesHeader from '../components/services/ServicesHeader'
import CTASection from '../components/services/CTASection'
import ServiceStack from '../components/services/ServiceStack'

const page = () => {
  return (
    <div>
      <ServicesHeader />
      <ServiceStack />
      <CTASection />
    </div>
  )
}

export default page