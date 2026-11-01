import { useId, useState } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading.jsx'
import { LINKS, CONTACTS, ADDRESS } from '../../content/links.js'
import paperDivider from '../../assets/section-art/paper-divider.webp'
import './Faqs.css'

const ext = { target: '_blank', rel: 'noopener noreferrer' }

const FAQS = [
  {
    q: 'What is Nitrutsav?',
    a: <>The annual literary and cultural fest of NIT Rourkela, and Odisha&rsquo;s largest cultural fest. This year&rsquo;s theme is the Carnival of Colours.</>,
  },
  {
    q: 'When and where is Nitrutsav 2026?',
    a: <>6 to 8 February 2026, on the NIT Rourkela campus &mdash; {ADDRESS}.</>,
  },
  {
    q: 'Which events can I take part in?',
    a: <>Lalkaar (street play), Spotlight (monoact), Breakbeats (street dance battle), Footloose (flagship dance) and the MUN, with more being announced. See the <a href={LINKS.events} {...ext}>events page</a> for rules and details.</>,
  },
  {
    q: 'How do I register for the MUN?',
    a: <>Registrations are open on the <a href={LINKS.mun} {...ext}>MUN registration page</a>.</>,
  },
  {
    q: 'Is there official merch?',
    a: <>Yes &mdash; the Hue Riot and Carniquad T-shirts, in regular fit (₹379) and oversized (₹449). Grab yours on the <a href={LINKS.merch} {...ext}>merch page</a>.</>,
  },
  {
    q: 'Where can I find the brochure?',
    a: <>The full brochure is in our <a href={LINKS.brochure} {...ext}>Google Drive folder</a>.</>,
  },
  {
    q: 'Who do I contact with questions?',
    a: (
      <>
        Reach the convenors: {CONTACTS.filter((c) => c.role === 'Convenor').map((c, i) => (
          <span key={c.name}>{i > 0 && ' or '}{c.name} (<a href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a>)</span>
        ))}. All contacts are listed at the bottom of this page.
      </>
    ),
  },
]

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(index === 0)
  const id = useId()
  return (
    <div className="faq" data-open={open} data-reveal="faq" style={{ '--d': index % 3 }}>
      <h3 className="faq__heading">
        <button className="faq__q" id={`${id}-question`} aria-expanded={open}
          aria-controls={`${id}-answer`} onClick={() => setOpen((value) => !value)}>
          <span className="faq__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span>{q}</span>
          <span className="faq__icon" aria-hidden="true">+</span>
        </button>
      </h3>
      <div className="faq__panel" id={`${id}-answer`} role="region"
        aria-labelledby={`${id}-question`} aria-hidden={!open} inert={!open}>
        <div className="faq__panel-inner"><p className="faq__a">{a}</p></div>
      </div>
    </div>
  )
}

export default function Faqs() {
  return (
    <section id="faqs" className="section faqs">
      <div className="faqs__divider" aria-hidden="true">
        <img src={paperDivider} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="container faqs__inner">
        <SectionHeading kicker="सवाल जवाब" title="FAQs" />
        <div className="faqs__list">
          {FAQS.map((faq, index) => <FaqItem key={faq.q} {...faq} index={index} />)}
        </div>
      </div>
    </section>
  )
}
