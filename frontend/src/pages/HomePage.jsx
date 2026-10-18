import CTA from "../components/CTA"
import Features from "../components/Features"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  )
}

export default HomePage