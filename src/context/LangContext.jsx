import { createContext, useContext, useState } from 'react'

export const translations = {
  en: {
    tagline:     'Crafted for those who notice the difference.',
    sub:         'Join the waitlist — be first when we launch.',
    emailLabel:  'Email address',
    igLabel:     'Instagram handle',
    switchEmail: 'Email',
    switchIg:    'Instagram',
    cta:         'Reserve my spot',
    success:     '✓  You\'re on the list',
    legal:       'No spam. Ever.',
  },
  lt: {
    tagline:     'Sukurta tiems, kurie pastebi skirtumus.',
    sub:         'Prisijunk prie laukiančiųjų sąrašo — būk pirmas.',
    emailLabel:  'El. pašto adresas',
    igLabel:     'Instagram vardas',
    switchEmail: 'El. paštas',
    switchIg:    'Instagram',
    cta:         'Rezervuoti vietą',
    success:     '✓  Esi sąraše',
    legal:       'Jokio šlamšto. Niekada.',
  },
}

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')
  const tr = translations[lang]
  return (
    <LangContext.Provider value={{ lang, setLang, tr }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
