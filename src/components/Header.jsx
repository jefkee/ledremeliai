import { useLang } from '../context/LangContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { tr } = useLang()

  return (
    <header className="header">
      <LanguageSwitcher />
    </header>
  )
}
