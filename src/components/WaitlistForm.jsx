import { useState } from 'react'
import { useLang } from '../context/LangContext'

export default function WaitlistForm() {
  const { tr } = useLang()
  const [type, setType] = useState('email')   // 'email' | 'ig'
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    console.log({ type, value })
    setSubmitted(true)
  }

  // Reset when language switches or type changes (keep UX clean)
  const handleTypeSwitch = (next) => {
    setType(next)
    setValue('')
    setSubmitted(false)
  }

  return (
    <div className="waitlist-card">
      {/* Type toggle */}
      <div className="type-toggle" role="group" aria-label="Contact type">
        <button
          id="toggle-email"
          className={`type-btn ${type === 'email' ? 'active' : ''}`}
          onClick={() => handleTypeSwitch('email')}
          type="button"
        >
          {tr.switchEmail}
        </button>
        <button
          id="toggle-ig"
          className={`type-btn ${type === 'ig' ? 'active' : ''}`}
          onClick={() => handleTypeSwitch('ig')}
          type="button"
        >
          {tr.switchIg}
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>
        <div className={`input-wrap ${submitted ? 'success' : ''}`}>
          <input
            id="contact-input"
            type={type === 'email' ? 'email' : 'text'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder=" "
            autoComplete={type === 'email' ? 'email' : 'off'}
            required
            disabled={submitted}
          />
          <label htmlFor="contact-input">
            {type === 'email' ? tr.emailLabel : `@${tr.igLabel}`}
          </label>
        </div>

        <button
          id="cta-submit"
          className={`cta-btn ${submitted ? 'submitted' : ''}`}
          type="submit"
        >
          <span>{submitted ? tr.success : tr.cta}</span>
        </button>
      </form>

      <p className="legal-text">{tr.legal}</p>
    </div>
  )
}
