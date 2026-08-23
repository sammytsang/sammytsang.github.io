import { MotionConfig } from 'framer-motion'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { ScrollProgress } from './components/common/ScrollProgress'
import { Hero } from './components/hero/Hero'
import { ProjectsGrid } from './components/projects/ProjectsGrid'
import { Approach } from './components/approach/Approach'
import { Background } from './components/background/Background'
import { Skills } from './components/skills/Skills'
import { Contact } from './components/contact/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-accent-ink)]">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <ProjectsGrid />
        <Approach />
        <Background />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
