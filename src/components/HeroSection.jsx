import { useLang } from '../context/LangContext'
import WaitlistForm from './WaitlistForm'

export default function HeroSection() {
  const { tr } = useLang()

  return (
    <main className="hero">
      <h1 className="hero-title">Ledremeliai</h1>
      <p className="hero-tagline">{tr.tagline}</p>
      <div className="hero-form-wrap">
        <WaitlistForm />
      </div>
    </main>
  )
}
