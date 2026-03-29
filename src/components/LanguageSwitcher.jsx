import { useLang } from '../context/LangContext'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()

  return (
    <div className="lang-switcher" role="group" aria-label="Language selector">
      <button
        id="lang-en"
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <button
        id="lang-lt"
        className={`lang-btn ${lang === 'lt' ? 'active' : ''}`}
        onClick={() => setLang('lt')}
        aria-pressed={lang === 'lt'}
      >
        LT
      </button>
    </div>
  )
}
