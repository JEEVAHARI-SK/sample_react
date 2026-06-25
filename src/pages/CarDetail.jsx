import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cars } from '../data/cars'

const specIcons = {
  engine: '⚙',
  power: '⚡',
  torque: '🔩',
  ground: '📐',
  approach: '↗',
  departure: '↘',
  wading: '💧',
  weight: '⚖',
}

export default function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const car = cars.find(c => c.id === id)
  const [selectedDuration, setSelectedDuration] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', license: '',
    dob: '', address: '', emergency: '', experience: 'beginner',
    date: '', notes: '', terms: false
  })
  const [errors, setErrors] = useState({})
  const [activeTab, setActiveTab] = useState('specs')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (!car) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--fog)', fontFamily: 'var(--font-cond)', letterSpacing: 4 }}>VEHICLE NOT FOUND</p>
        <button onClick={() => navigate('/')} style={{ marginTop: 20, background: 'var(--orange)', border: 'none', color: 'var(--black)', padding: '12px 32px', cursor: 'pointer', fontFamily: 'var(--font-cond)', fontWeight: 700, letterSpacing: 2 }}>GO BACK</button>
      </div>
    </div>
  )

  const duration = car.durations[selectedDuration]
  const totalPrice = Math.round(car.price * duration.multiplier)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Valid phone number required'
    if (!form.license.trim()) e.license = 'License number required'
    if (!form.dob) e.dob = 'Date of birth required'
    if (!form.address.trim()) e.address = 'Address required'
    if (!form.emergency.trim()) e.emergency = 'Emergency contact required'
    if (!form.date) e.date = 'Booking date required'
    if (!form.terms) e.terms = 'You must agree to terms'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    setSubmitted(true)
  }

  const handleChange = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n })
  }

  const otherCars = cars.filter(c => c.id !== car.id).slice(0, 3)

  return (
    <div className="detail" style={{ '--car-color': car.color }}>
      {/* ─── HERO ─── */}
      <div className="detail__hero">
        <motion.img
          src={car.image}
          alt={car.name}
          className="detail__hero-img"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <div className="detail__hero-overlay" />

        <div className="detail__hero-content">
          <motion.button
            className="detail__back"
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ x: -4 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Fleet
          </motion.button>

          <div className="detail__hero-badge">{car.badge}</div>

          <motion.div
            className="detail__hero-type"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {car.type}
          </motion.div>

          <motion.h1
            className="detail__hero-name"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {car.name}
          </motion.h1>

          <motion.p
            className="detail__hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {car.tagline}
          </motion.p>

          {/* Terrain Tags */}
          <motion.div
            className="detail__terrains"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {car.terrains.map(t => (
              <span key={t} className="detail__terrain">{t}</span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="detail__body">
        <div className="detail__left">
          {/* Tabs */}
          <div className="detail__tabs">
            {['specs', 'features'].map(tab => (
              <button
                key={tab}
                className={`detail__tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'specs' ? 'SPECIFICATIONS' : 'FEATURES'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'specs' && (
              <motion.div
                key="specs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="detail__specs"
              >
                {Object.entries(car.specs).map(([key, val], i) => (
                  <motion.div
                    key={key}
                    className="detail__spec-row"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <span className="detail__spec-icon">{specIcons[key]}</span>
                    <span className="detail__spec-key">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                    <span className="detail__spec-val">{val}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="detail__features"
              >
                {car.features.map((f, i) => (
                  <motion.div
                    key={f}
                    className="detail__feature"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className="detail__feature-icon">◆</span>
                    <span>{f}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── BOOKING PANEL ─── */}
        <div className="detail__right">
          <div className="booking-panel">
            <div className="booking-panel__header">
              <span className="booking-panel__label">BOOKING</span>
              <span className="booking-panel__total">₹{totalPrice.toLocaleString()}</span>
            </div>

            {/* Duration */}
            <div className="booking-panel__section">
              <div className="booking-panel__section-title">SELECT DURATION</div>
              <div className="booking-panel__durations">
                {car.durations.map((d, i) => (
                  <motion.button
                    key={d.label}
                    className={`booking-panel__dur ${selectedDuration === i ? 'active' : ''}`}
                    onClick={() => setSelectedDuration(i)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="booking-panel__dur-label">{d.label}</span>
                    <span className="booking-panel__dur-price">
                      ₹{Math.round(car.price * d.multiplier).toLocaleString()}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Includes */}
            <div className="booking-panel__includes">
              {['Full insurance coverage', 'Safety gear & helmet', 'Route maps & GPS', 'Emergency support'].map(item => (
                <div key={item} className="booking-panel__include">
                  <span style={{ color: 'var(--car-color)' }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <motion.button
              className="booking-panel__cta"
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              BOOK NOW — ₹{totalPrice.toLocaleString()}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <p className="booking-panel__note">
              Free cancellation up to 48 hours before your adventure begins
            </p>
          </div>
        </div>
      </div>

      {/* ─── OTHER CARS ─── */}
      <div className="detail__others">
        <div className="section-eyebrow" style={{ color: 'var(--orange)', marginBottom: 12 }}>▲ EXPLORE MORE</div>
        <h3 className="detail__others-title">OTHER MACHINES</h3>
        <div className="detail__others-grid">
          {otherCars.map(c => (
            <motion.div
              key={c.id}
              className="other-card"
              onClick={() => { navigate(`/car/${c.id}`); window.scrollTo(0,0) }}
              whileHover={{ y: -6 }}
              style={{ '--oc': c.color }}
            >
              <img src={c.thumb} alt={c.name} />
              <div className="other-card__overlay" />
              <div className="other-card__info">
                <div className="other-card__name">{c.name}</div>
                <div className="other-card__price">From ₹{c.price.toLocaleString()}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── BOOKING FORM MODAL ─── */}
      <AnimatePresence>
        {showForm && !submitted && (
          <motion.div
            className="form-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="form-container"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
            >
              {/* Form Header */}
              <div className="form-header">
                <div>
                  <div className="form-header__badge">{car.badge}</div>
                  <h2 className="form-header__title">BOOKING — {car.name}</h2>
                  <p className="form-header__sub">{duration.label} · ₹{totalPrice.toLocaleString()}</p>
                </div>
                <button className="form-close" onClick={() => setShowForm(false)}>✕</button>
              </div>

              {/* Form Body */}
              <div className="form-body">
                {/* Personal Info */}
                <div className="form-section">
                  <div className="form-section__title">◆ PERSONAL INFORMATION</div>
                  <div className="form-grid form-grid--2">
                    <div className="form-field">
                      <label>FULL NAME <span className="req">*</span></label>
                      <input
                        type="text"
                        placeholder="Your full legal name"
                        value={form.name}
                        onChange={e => handleChange('name', e.target.value)}
                        className={errors.name ? 'error' : ''}
                      />
                      {errors.name && <span className="form-err">{errors.name}</span>}
                    </div>
                    <div className="form-field">
                      <label>DATE OF BIRTH <span className="req">*</span></label>
                      <input
                        type="date"
                        value={form.dob}
                        onChange={e => handleChange('dob', e.target.value)}
                        className={errors.dob ? 'error' : ''}
                      />
                      {errors.dob && <span className="form-err">{errors.dob}</span>}
                    </div>
                    <div className="form-field">
                      <label>EMAIL ADDRESS <span className="req">*</span></label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <span className="form-err">{errors.email}</span>}
                    </div>
                    <div className="form-field">
                      <label>PHONE NUMBER <span className="req">*</span></label>
                      <input
                        type="tel"
                        placeholder="+91 00000 00000"
                        value={form.phone}
                        onChange={e => handleChange('phone', e.target.value)}
                        className={errors.phone ? 'error' : ''}
                      />
                      {errors.phone && <span className="form-err">{errors.phone}</span>}
                    </div>
                    <div className="form-field form-field--full">
                      <label>HOME ADDRESS <span className="req">*</span></label>
                      <input
                        type="text"
                        placeholder="Full address"
                        value={form.address}
                        onChange={e => handleChange('address', e.target.value)}
                        className={errors.address ? 'error' : ''}
                      />
                      {errors.address && <span className="form-err">{errors.address}</span>}
                    </div>
                  </div>
                </div>

                {/* Driving Info */}
                <div className="form-section">
                  <div className="form-section__title">◆ DRIVING CREDENTIALS</div>
                  <div className="form-grid form-grid--2">
                    <div className="form-field">
                      <label>DRIVING LICENSE NO. <span className="req">*</span></label>
                      <input
                        type="text"
                        placeholder="DL-XXXXXXXXXXXXXXX"
                        value={form.license}
                        onChange={e => handleChange('license', e.target.value.toUpperCase())}
                        className={errors.license ? 'error' : ''}
                      />
                      {errors.license && <span className="form-err">{errors.license}</span>}
                    </div>
                    <div className="form-field">
                      <label>OFF-ROAD EXPERIENCE</label>
                      <select
                        value={form.experience}
                        onChange={e => handleChange('experience', e.target.value)}
                      >
                        <option value="beginner">Beginner (0-1 years)</option>
                        <option value="intermediate">Intermediate (1-3 years)</option>
                        <option value="advanced">Advanced (3-5 years)</option>
                        <option value="expert">Expert (5+ years)</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>EMERGENCY CONTACT <span className="req">*</span></label>
                      <input
                        type="text"
                        placeholder="Name & phone number"
                        value={form.emergency}
                        onChange={e => handleChange('emergency', e.target.value)}
                        className={errors.emergency ? 'error' : ''}
                      />
                      {errors.emergency && <span className="form-err">{errors.emergency}</span>}
                    </div>
                    <div className="form-field">
                      <label>PREFERRED DATE <span className="req">*</span></label>
                      <input
                        type="date"
                        value={form.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => handleChange('date', e.target.value)}
                        className={errors.date ? 'error' : ''}
                      />
                      {errors.date && <span className="form-err">{errors.date}</span>}
                    </div>
                    <div className="form-field form-field--full">
                      <label>ADDITIONAL NOTES</label>
                      <textarea
                        placeholder="Any special requirements, medical conditions, or requests..."
                        value={form.notes}
                        onChange={e => handleChange('notes', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="form-summary">
                  <div className="form-summary__row">
                    <span>Vehicle</span>
                    <span>{car.name}</span>
                  </div>
                  <div className="form-summary__row">
                    <span>Duration</span>
                    <span>{duration.label}</span>
                  </div>
                  <div className="form-summary__row">
                    <span>Experience Level</span>
                    <span className="capitalize">{form.experience}</span>
                  </div>
                  <div className="form-summary__divider" />
                  <div className="form-summary__row form-summary__row--total">
                    <span>TOTAL AMOUNT</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Terms */}
                <div className={`form-terms ${errors.terms ? 'error' : ''}`}>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={form.terms}
                    onChange={e => handleChange('terms', e.target.checked)}
                  />
                  <label htmlFor="terms">
                    I agree to the <a href="#">Terms & Conditions</a>, confirm I hold a valid driving license,
                    and accept full responsibility for the vehicle during my booking period. I understand that
                    TERRA FORCE is not liable for damages caused by reckless driving.
                  </label>
                </div>
                {errors.terms && <span className="form-err">{errors.terms}</span>}

                {/* Submit */}
                <motion.button
                  className="form-submit"
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  CONFIRM BOOKING — ₹{totalPrice.toLocaleString()}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SUCCESS ─── */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            className="form-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="success-box"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
            >
              <motion.div
                className="success-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                ✓
              </motion.div>
              <h2 className="success-title">BOOKING CONFIRMED!</h2>
              <p className="success-sub">
                Your {car.name} is booked for {duration.label} on {form.date}.
                A confirmation has been sent to <strong>{form.email}</strong>.
              </p>
              <div className="success-ref">
                REF: TF-{Math.random().toString(36).toUpperCase().slice(2, 10)}
              </div>
              <div className="success-total">
                ₹{totalPrice.toLocaleString()} Total
              </div>
              <motion.button
                className="form-submit"
                onClick={() => { setSubmitted(false); setShowForm(false); navigate('/') }}
                whileHover={{ scale: 1.02 }}
              >
                BACK TO FLEET
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .detail__hero {
          position: relative;
          height: 75vh;
          min-height: 500px;
          overflow: hidden;
        }
        .detail__hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .detail__hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.5) 60%, rgba(8,8,8,0.2) 100%),
                      linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 50%);
        }
        .detail__hero-content {
          position: absolute;
          bottom: 60px;
          left: 60px;
          right: 60px;
          z-index: 10;
        }
        .detail__back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: 1px solid rgba(255,255,255,0.2);
          color: var(--mist);
          padding: 8px 20px;
          font-family: var(--font-cond);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          cursor: pointer;
          text-transform: uppercase;
          margin-bottom: 24px;
          transition: all 0.3s;
        }
        .detail__back:hover { border-color: var(--white); color: var(--white); }
        .detail__hero-badge {
          display: inline-block;
          background: var(--car-color);
          color: var(--black);
          font-family: var(--font-cond);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
          padding: 4px 12px;
          margin-bottom: 12px;
        }
        .detail__hero-type {
          font-family: var(--font-cond);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 3px;
          color: var(--car-color);
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .detail__hero-name {
          font-family: var(--font-display);
          font-size: clamp(56px, 10vw, 120px);
          color: var(--white);
          letter-spacing: 4px;
          line-height: 1;
          margin-bottom: 12px;
        }
        .detail__hero-tagline {
          font-size: 16px;
          color: var(--fog);
          font-style: italic;
          margin-bottom: 20px;
        }
        .detail__terrains { display: flex; gap: 8px; flex-wrap: wrap; }
        .detail__terrain {
          font-family: var(--font-cond);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          color: var(--mist);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 4px 12px;
          text-transform: uppercase;
        }

        /* BODY */
        .detail__body {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 0;
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 60px 80px;
          align-items: start;
          gap: 48px;
        }

        /* TABS */
        .detail__tabs {
          display: flex;
          border-bottom: 1px solid var(--iron);
          margin-bottom: 32px;
        }
        .detail__tab {
          font-family: var(--font-cond);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 3px;
          color: var(--fog);
          background: none;
          border: none;
          padding: 16px 24px;
          cursor: pointer;
          position: relative;
          transition: color 0.3s;
        }
        .detail__tab.active { color: var(--white); }
        .detail__tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0; right: 0;
          height: 2px;
          background: var(--car-color);
        }

        /* SPECS */
        .detail__specs { display: flex; flex-direction: column; gap: 2px; }
        .detail__spec-row {
          display: grid;
          grid-template-columns: 28px 1fr auto;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: var(--steel);
          transition: background 0.2s;
        }
        .detail__spec-row:hover { background: var(--iron); }
        .detail__spec-icon { font-size: 16px; text-align: center; }
        .detail__spec-key {
          font-family: var(--font-cond);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          color: var(--fog);
        }
        .detail__spec-val {
          font-family: var(--font-cond);
          font-size: 16px;
          font-weight: 700;
          color: var(--white);
          letter-spacing: 1px;
        }

        /* FEATURES */
        .detail__features { display: flex; flex-direction: column; gap: 2px; }
        .detail__feature {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          background: var(--steel);
          font-family: var(--font-cond);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 1px;
          color: var(--mist);
          transition: background 0.2s;
        }
        .detail__feature:hover { background: var(--iron); color: var(--white); }
        .detail__feature-icon { color: var(--car-color); font-size: 10px; }

        /* BOOKING PANEL */
        .booking-panel {
          background: var(--carbon);
          border: 1px solid var(--iron);
          position: sticky;
          top: 100px;
        }
        .booking-panel__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          background: var(--steel);
          border-bottom: 1px solid var(--iron);
        }
        .booking-panel__label {
          font-family: var(--font-cond);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          color: var(--fog);
        }
        .booking-panel__total {
          font-family: var(--font-display);
          font-size: 32px;
          color: var(--car-color);
          letter-spacing: 2px;
        }
        .booking-panel__section { padding: 24px; border-bottom: 1px solid var(--iron); }
        .booking-panel__section-title {
          font-family: var(--font-cond);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          color: var(--fog);
          margin-bottom: 16px;
        }
        .booking-panel__durations { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .booking-panel__dur {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 14px;
          background: var(--steel);
          border: 1px solid var(--iron);
          cursor: pointer;
          transition: all 0.3s;
        }
        .booking-panel__dur.active {
          background: var(--car-color);
          border-color: var(--car-color);
        }
        .booking-panel__dur.active .booking-panel__dur-label,
        .booking-panel__dur.active .booking-panel__dur-price {
          color: var(--black);
        }
        .booking-panel__dur-label {
          font-family: var(--font-cond);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          color: var(--mist);
        }
        .booking-panel__dur-price {
          font-family: var(--font-cond);
          font-size: 14px;
          font-weight: 600;
          color: var(--white);
        }
        .booking-panel__includes {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-bottom: 1px solid var(--iron);
        }
        .booking-panel__include {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--fog);
        }
        .booking-panel__cta {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: var(--car-color);
          color: var(--black);
          border: none;
          padding: 20px;
          font-family: var(--font-cond);
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 2px;
          cursor: pointer;
          transition: filter 0.3s;
          margin: 24px;
          width: calc(100% - 48px);
        }
        .booking-panel__cta:hover { filter: brightness(1.1); }
        .booking-panel__note {
          font-size: 11px;
          color: var(--fog);
          text-align: center;
          padding: 0 24px 24px;
          line-height: 1.5;
        }

        /* OTHER CARS */
        .detail__others {
          padding: 60px;
          border-top: 1px solid var(--iron);
          max-width: 1400px;
          margin: 0 auto;
        }
        .detail__others-title {
          font-family: var(--font-display);
          font-size: 48px;
          color: var(--white);
          letter-spacing: 4px;
          margin-bottom: 32px;
        }
        .detail__others-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        .other-card {
          position: relative;
          height: 220px;
          overflow: hidden;
          cursor: pointer;
        }
        .other-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .other-card:hover img { transform: scale(1.08); }
        .other-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 60%);
        }
        .other-card__info {
          position: absolute;
          bottom: 20px;
          left: 20px;
        }
        .other-card__name {
          font-family: var(--font-display);
          font-size: 28px;
          color: var(--white);
          letter-spacing: 3px;
        }
        .other-card__price {
          font-family: var(--font-cond);
          font-size: 12px;
          color: var(--oc);
          letter-spacing: 1px;
        }

        /* FORM MODAL */
        .form-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          z-index: 2000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 40px 20px;
          overflow-y: auto;
          backdrop-filter: blur(10px);
        }
        .form-container {
          background: var(--carbon);
          border: 1px solid var(--iron);
          width: 100%;
          max-width: 780px;
          margin: auto;
        }
        .form-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 32px 40px;
          background: var(--steel);
          border-bottom: 1px solid var(--iron);
        }
        .form-header__badge {
          display: inline-block;
          background: var(--car-color);
          color: var(--black);
          font-family: var(--font-cond);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
          padding: 3px 10px;
          margin-bottom: 8px;
        }
        .form-header__title {
          font-family: var(--font-display);
          font-size: 32px;
          color: var(--white);
          letter-spacing: 3px;
        }
        .form-header__sub {
          font-family: var(--font-cond);
          font-size: 13px;
          color: var(--car-color);
          letter-spacing: 2px;
          margin-top: 4px;
        }
        .form-close {
          background: none;
          border: 1px solid var(--ash);
          color: var(--fog);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .form-close:hover { border-color: var(--white); color: var(--white); }
        .form-body { padding: 40px; display: flex; flex-direction: column; gap: 32px; }

        .form-section__title {
          font-family: var(--font-cond);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          color: var(--car-color);
          margin-bottom: 20px;
        }
        .form-grid { display: grid; gap: 16px; }
        .form-grid--2 { grid-template-columns: 1fr 1fr; }
        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .form-field--full { grid-column: 1 / -1; }
        .form-field label {
          font-family: var(--font-cond);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: var(--fog);
        }
        .req { color: var(--orange); }
        .form-field input, .form-field select, .form-field textarea {
          background: var(--steel);
          border: 1px solid var(--ash);
          color: var(--white);
          padding: 14px 16px;
          font-family: var(--font-body);
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s;
          width: 100%;
        }
        .form-field input:focus, .form-field select:focus, .form-field textarea:focus {
          border-color: var(--car-color);
        }
        .form-field input.error, .form-field select.error { border-color: var(--red); }
        .form-field select { cursor: pointer; }
        .form-field textarea { resize: vertical; }
        .form-err {
          font-size: 11px;
          color: var(--red);
          font-family: var(--font-cond);
          letter-spacing: 1px;
        }

        .form-summary {
          background: var(--steel);
          padding: 24px;
          border: 1px solid var(--iron);
        }
        .form-summary__row {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-cond);
          font-size: 13px;
          color: var(--fog);
          padding: 6px 0;
          letter-spacing: 1px;
        }
        .form-summary__row span:last-child { color: var(--white); font-weight: 600; }
        .form-summary__divider { height: 1px; background: var(--ash); margin: 12px 0; }
        .form-summary__row--total span {
          font-size: 18px;
          font-weight: 700;
          color: var(--car-color) !important;
        }
        .capitalize { text-transform: capitalize; }

        .form-terms {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--ash);
        }
        .form-terms.error { border-color: var(--red); }
        .form-terms input[type="checkbox"] { margin-top: 3px; flex-shrink: 0; accent-color: var(--car-color); width: 16px; height: 16px; }
        .form-terms label { font-size: 12px; color: var(--fog); line-height: 1.6; }
        .form-terms a { color: var(--car-color); }

        .form-submit {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: var(--car-color);
          color: var(--black);
          border: none;
          padding: 20px;
          font-family: var(--font-cond);
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 2px;
          cursor: pointer;
          transition: filter 0.3s;
        }
        .form-submit:hover { filter: brightness(1.1); }

        /* SUCCESS */
        .success-box {
          background: var(--carbon);
          border: 1px solid var(--car-color);
          padding: 60px 48px;
          max-width: 520px;
          width: 100%;
          margin: auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .success-icon {
          width: 80px;
          height: 80px;
          background: var(--car-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          color: var(--black);
          font-weight: 700;
        }
        .success-title {
          font-family: var(--font-display);
          font-size: 40px;
          color: var(--white);
          letter-spacing: 3px;
        }
        .success-sub { font-size: 14px; color: var(--fog); line-height: 1.7; }
        .success-sub strong { color: var(--white); }
        .success-ref {
          font-family: var(--font-cond);
          font-size: 12px;
          letter-spacing: 3px;
          color: var(--smoke);
          border: 1px solid var(--ash);
          padding: 8px 20px;
        }
        .success-total {
          font-family: var(--font-display);
          font-size: 36px;
          color: var(--car-color);
          letter-spacing: 2px;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .detail__body { grid-template-columns: 1fr; padding: 40px 32px; }
          .detail__others-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .detail__hero-content { bottom: 32px; left: 24px; right: 24px; }
          .detail__body { padding: 32px 20px; }
          .detail__others { padding: 40px 20px; }
          .detail__others-grid { grid-template-columns: 1fr; }
          .form-body { padding: 24px 20px; }
          .form-header { padding: 24px 20px; }
          .form-grid--2 { grid-template-columns: 1fr; }
          .success-box { padding: 40px 24px; }
        }
      `}</style>
    </div>
  )
}
