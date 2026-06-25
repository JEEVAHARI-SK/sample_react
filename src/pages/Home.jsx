import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import CarCard from '../components/CarCard'
import { cars } from '../data/cars'

const heroImages = [
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1800&q=95&auto=format',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1800&q=95&auto=format',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1800&q=95&auto=format',
]

const stats = [
  { val: '6', label: 'Elite Vehicles', suffix: '+' },
  { val: '500', label: 'Adventures Done', suffix: '+' },
  { val: '100', label: 'Terrain Types', suffix: '%' },
  { val: '24', label: 'Support Hours', suffix: '/7' },
]

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0)
  const [filter, setFilter] = useState('ALL')
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => setHeroIdx(i => (i + 1) % heroImages.length), 5000)
    return () => clearInterval(interval)
  }, [])

  const terrainFilters = ['ALL', 'Rock', 'Desert', 'Mud', 'Dunes', 'Snow']
  const filtered = filter === 'ALL' ? cars : cars.filter(c => c.terrains.includes(filter))

  return (
    <div className="home">
      {/* ─── HERO ─── */}
      <section className="hero" ref={heroRef}>
        <motion.div className="hero__bg-wrap" style={{ y: heroY }}>
          <AnimatePresence mode="sync">
            <motion.img
              key={heroIdx}
              src={heroImages[heroIdx]}
              className="hero__bg"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            />
          </AnimatePresence>
          <div className="hero__bg-overlay" />
        </motion.div>

        <motion.div className="hero__content" style={{ opacity: heroOpacity }}>
          <motion.div
            className="hero__eyebrow"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            ▲ PREMIUM OFF-ROAD EXPERIENCE
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            NO ROAD.
            <br />
            <span className="hero__title-accent">NO LIMITS.</span>
          </motion.h1>

          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Handpicked fleet of the world's most capable off-road machines.<br />
            Built for those who refuse to stay on the map.
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a href="#fleet" className="hero__btn hero__btn--primary">
              Explore Fleet
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#experience" className="hero__btn hero__btn--ghost">How It Works</a>
          </motion.div>

          {/* Hero Image Dots */}
          <div className="hero__dots">
            {heroImages.map((_, i) => (
              <button
                key={i}
                className={`hero__dot ${i === heroIdx ? 'active' : ''}`}
                onClick={() => setHeroIdx(i)}
              />
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="hero__scroll"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="hero__scroll-line" />
          <span>SCROLL</span>
        </motion.div>
      </section>

      {/* ─── STATS ─── */}
      <section className="stats-bar">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stats-bar__item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <span className="stats-bar__val">{s.val}<span className="stats-bar__suffix">{s.suffix}</span></span>
            <span className="stats-bar__label">{s.label}</span>
          </motion.div>
        ))}
      </section>

      {/* ─── FLEET ─── */}
      <section className="fleet" id="fleet">
        <div className="fleet__header">
          <motion.div
            className="section-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            ▲ THE FLEET
          </motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            CHOOSE YOUR WEAPON
          </motion.h2>
          <motion.p
            className="section-sub"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Six machines. Six personalities. One mission — conquer every terrain.
          </motion.p>

          {/* Filters */}
          <div className="fleet__filters">
            {terrainFilters.map(f => (
              <button
                key={f}
                className={`fleet__filter ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div className="fleet__grid" layout>
          <AnimatePresence>
            {filtered.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section className="experience" id="experience">
        <div className="experience__inner">
          <div className="section-eyebrow">▲ THE PROCESS</div>
          <h2 className="section-title">HOW IT WORKS</h2>
          <div className="experience__steps">
            {[
              { num: '01', title: 'Pick Your Beast', desc: 'Browse our fleet and select the machine that matches your terrain and ambition.' },
              { num: '02', title: 'Choose Duration', desc: 'Half day, full day, weekend or week — we have packages for every adventure.' },
              { num: '03', title: 'Fill Your Details', desc: 'Complete the booking form with your info and valid driving license.' },
              { num: '04', title: 'Drive the Wild', desc: 'Show up, get briefed, and go. We provide full safety gear and route maps.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                className="experience__step"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
              >
                <div className="experience__step-num">{step.num}</div>
                <div className="experience__step-line" />
                <h3 className="experience__step-title">{step.title}</h3>
                <p className="experience__step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="cta-banner">
        <div className="cta-banner__bg" />
        <motion.div
          className="cta-banner__content"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-eyebrow" style={{ color: 'var(--orange)', marginBottom: 20 }}>▲ READY?</div>
          <h2 className="cta-banner__title">YOUR ADVENTURE<br />STARTS HERE</h2>
          <p className="cta-banner__sub">No ordinary roads. No ordinary machines. No ordinary memories.</p>
          <a href="#fleet" className="hero__btn hero__btn--primary" style={{ display: 'inline-flex' }}>
            Select Your Vehicle
          </a>
        </motion.div>
      </section>

      <style>{`
        /* HERO */
        .hero {
          position: relative;
          height: 100vh;
          min-height: 700px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero__bg-wrap {
          position: absolute;
          inset: -10%;
          will-change: transform;
        }
        .hero__bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .hero__bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(8,8,8,0.95) 0%,
            rgba(8,8,8,0.7) 50%,
            rgba(8,8,8,0.3) 100%
          );
        }
        .hero__content {
          position: relative;
          z-index: 10;
          padding: 0 80px;
          max-width: 760px;
        }
        .hero__eyebrow {
          font-family: var(--font-cond);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 4px;
          color: var(--orange);
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .hero__title {
          font-family: var(--font-display);
          font-size: clamp(72px, 10vw, 140px);
          line-height: 0.9;
          color: var(--white);
          letter-spacing: 4px;
          margin-bottom: 28px;
        }
        .hero__title-accent {
          color: var(--orange);
          -webkit-text-stroke: 2px var(--orange);
        }
        .hero__sub {
          font-size: 17px;
          line-height: 1.7;
          color: var(--mist);
          margin-bottom: 40px;
          max-width: 500px;
        }
        .hero__ctas { display: flex; gap: 16px; flex-wrap: wrap; }
        .hero__btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          font-family: var(--font-cond);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;
        }
        .hero__btn--primary {
          background: var(--orange);
          color: var(--black);
        }
        .hero__btn--primary:hover { background: var(--orange-hot); transform: translateY(-3px); }
        .hero__btn--ghost {
          background: transparent;
          color: var(--white);
          border: 1px solid rgba(255,255,255,0.3);
        }
        .hero__btn--ghost:hover { border-color: var(--white); }

        .hero__dots {
          display: flex;
          gap: 8px;
          margin-top: 48px;
        }
        .hero__dot {
          width: 32px;
          height: 3px;
          background: rgba(255,255,255,0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .hero__dot.active { background: var(--orange); width: 56px; }

        .hero__scroll {
          position: absolute;
          bottom: 40px;
          right: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 10;
        }
        .hero__scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, var(--orange), transparent);
        }
        .hero__scroll span {
          font-family: var(--font-cond);
          font-size: 10px;
          letter-spacing: 3px;
          color: var(--fog);
          writing-mode: vertical-rl;
        }

        /* STATS BAR */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: var(--steel);
          border-top: 1px solid var(--iron);
          border-bottom: 1px solid var(--iron);
        }
        .stats-bar__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          border-right: 1px solid var(--iron);
        }
        .stats-bar__item:last-child { border-right: none; }
        .stats-bar__val {
          font-family: var(--font-display);
          font-size: 56px;
          color: var(--orange);
          letter-spacing: 2px;
          line-height: 1;
        }
        .stats-bar__suffix {
          font-size: 32px;
          color: var(--orange-glow);
        }
        .stats-bar__label {
          font-family: var(--font-cond);
          font-size: 11px;
          letter-spacing: 3px;
          color: var(--fog);
          text-transform: uppercase;
          margin-top: 6px;
        }

        /* SECTION COMMONS */
        .section-eyebrow {
          font-family: var(--font-cond);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 4px;
          color: var(--orange);
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(40px, 6vw, 80px);
          color: var(--white);
          letter-spacing: 4px;
          line-height: 1;
          margin-bottom: 16px;
        }
        .section-sub {
          font-size: 15px;
          color: var(--fog);
          max-width: 500px;
        }

        /* FLEET */
        .fleet {
          padding: 120px 60px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .fleet__header {
          margin-bottom: 60px;
        }
        .fleet__filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 32px;
        }
        .fleet__filter {
          font-family: var(--font-cond);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 8px 20px;
          background: transparent;
          color: var(--fog);
          border: 1px solid var(--ash);
          cursor: pointer;
          transition: all 0.3s;
        }
        .fleet__filter:hover { color: var(--white); border-color: var(--smoke); }
        .fleet__filter.active {
          background: var(--orange);
          color: var(--black);
          border-color: var(--orange);
        }
        .fleet__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 2px;
        }

        /* EXPERIENCE */
        .experience {
          background: var(--deep);
          border-top: 1px solid var(--iron);
          border-bottom: 1px solid var(--iron);
          padding: 120px 60px;
        }
        .experience__inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .experience__steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          margin-top: 60px;
        }
        .experience__step {
          padding: 40px;
          border-right: 1px solid var(--iron);
          position: relative;
        }
        .experience__step:last-child { border-right: none; }
        .experience__step-num {
          font-family: var(--font-display);
          font-size: 72px;
          color: var(--iron);
          line-height: 1;
          margin-bottom: 16px;
          transition: color 0.4s;
        }
        .experience__step:hover .experience__step-num { color: var(--orange); }
        .experience__step-line {
          width: 40px;
          height: 2px;
          background: var(--orange);
          margin-bottom: 16px;
        }
        .experience__step-title {
          font-family: var(--font-cond);
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 2px;
          color: var(--white);
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .experience__step-desc {
          font-size: 14px;
          color: var(--fog);
          line-height: 1.7;
        }

        /* CTA BANNER */
        .cta-banner {
          position: relative;
          padding: 140px 60px;
          text-align: center;
          overflow: hidden;
        }
        .cta-banner__bg {
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1800&q=80&auto=format') center/cover;
          filter: brightness(0.12);
        }
        .cta-banner__content {
          position: relative;
          z-index: 2;
        }
        .cta-banner__title {
          font-family: var(--font-display);
          font-size: clamp(48px, 8vw, 100px);
          color: var(--white);
          letter-spacing: 6px;
          line-height: 1;
          margin-bottom: 24px;
        }
        .cta-banner__sub {
          font-size: 16px;
          color: var(--fog);
          margin-bottom: 48px;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .experience__steps { grid-template-columns: repeat(2, 1fr); }
          .experience__step:nth-child(2) { border-right: none; }
          .experience__step:nth-child(3) { border-top: 1px solid var(--iron); }
          .experience__step:nth-child(4) { border-right: none; border-top: 1px solid var(--iron); }
        }
        @media (max-width: 768px) {
          .hero__content { padding: 0 24px; }
          .hero__scroll { display: none; }
          .stats-bar { grid-template-columns: repeat(2, 1fr); }
          .stats-bar__item:nth-child(2) { border-right: none; }
          .stats-bar__item:nth-child(3) { border-top: 1px solid var(--iron); }
          .stats-bar__item:nth-child(4) { border-top: 1px solid var(--iron); border-right: none; }
          .fleet { padding: 80px 20px; }
          .fleet__grid { grid-template-columns: 1fr; }
          .experience { padding: 80px 20px; }
          .experience__steps { grid-template-columns: 1fr; }
          .experience__step { border-right: none; border-bottom: 1px solid var(--iron); }
          .cta-banner { padding: 80px 24px; }
        }
      `}</style>
    </div>
  )
}
