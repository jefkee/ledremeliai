import { LangProvider } from './context/LangContext'
import VideoBackground from './components/VideoBackground'
import Header from './components/Header'
import HeroSection from './components/HeroSection'

export default function App() {
  return (
    <LangProvider>
      <VideoBackground />
      <Header />
      <HeroSection />
    </LangProvider>
  )
}
