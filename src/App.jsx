import Hero from './components/Hero/Hero.jsx'
import Ticker from './components/Ticker/Ticker.jsx'
import About from './components/About/About.jsx'
import Events from './components/Events/Events.jsx'
import Faqs from './components/Faqs/Faqs.jsx'
import Sponsors from './components/Sponsors/Sponsors.jsx'
import Footer from './components/Footer/Footer.jsx'

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Ticker />
        <About />
        <div className="zigzag" style={{ '--zz': 'var(--cream)', backgroundColor: 'var(--paper)' }} aria-hidden="true" />
        <Events />
        <Faqs />
        <Sponsors />
      </main>
      <Footer />
    </>
  )
}
