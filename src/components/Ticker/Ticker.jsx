import './Ticker.css'

const WORDS = [
  { text: 'नाचो', lang: 'hi' }, { text: 'Dance' },
  { text: 'गाओ', lang: 'hi' }, { text: 'Music' },
  { text: 'धमाल', lang: 'hi' }, { text: 'Drama' },
  { text: 'रंग', lang: 'hi' }, { text: 'Art' },
  { text: 'स्वाद', lang: 'hi' }, { text: 'Food' },
  { text: 'जलसा', lang: 'hi' }, { text: 'Pro Nights' },
]

// Scrolling marquee band. The word list is rendered twice so the loop is seamless.
export default function Ticker() {
  const run = (hidden) => (
    <ul className="ticker__run" aria-hidden={hidden || undefined}>
      {WORDS.map(({ text, lang }) => (
        <li key={text} lang={lang} className={lang ? 'ticker__word ticker__word--hi' : 'ticker__word'}>
          {text}
        </li>
      ))}
    </ul>
  )

  return (
    <div className="ticker">
      <div className="ticker__track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  )
}
