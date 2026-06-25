import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-mark">▲</span>
          TERRA<span>FORCE</span>
        </Link>

        <div className="navbar__links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Fleet</Link>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <Link to="/" className="navbar__cta">Book Now</Link>
        </div>

        <button className="navbar__hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/">Fleet</Link>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            <Link to="/" className="mobile-menu__cta">Book Now</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 48px;
          transition: all 0.4s ease;
        }
        .navbar--scrolled {
          background: rgba(8,8,8,0.96);
          backdrop-filter: blur(20px);
          padding: 16px 48px;
          border-bottom: 1px solid rgba(232,93,4,0.2);
        }
        .navbar__logo {
          font-family: var(--font-display);
          font-size: 28px;
          color: var(--white);
          text-decoration: none;
          letter-spacing: 4px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .navbar__logo span { color: var(--orange); }
        .navbar__logo-mark {
          color: var(--orange);
          font-size: 20px;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .navbar__links a {
          color: var(--mist);
          text-decoration: none;
          font-family: var(--font-cond);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          transition: color 0.3s;
        }
        .navbar__links a:hover, .navbar__links a.active { color: var(--white); }
        .navbar__cta {
          background: var(--orange) !important;
          color: var(--black) !important;
          padding: 10px 24px;
          font-weight: 700 !important;
          transition: all 0.3s !important;
        }
        .navbar__cta:hover {
          background: var(--orange-hot) !important;
          transform: translateY(-2px);
        }
        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .navbar__hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--white);
          transition: all 0.3s;
        }
        .navbar__hamburger span.open:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .navbar__hamburger span.open:nth-child(2) { opacity: 0; }
        .navbar__hamburger span.open:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

        .mobile-menu {
          position: fixed;
          inset: 0;
          background: var(--black);
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 40px;
        }
        .mobile-menu a {
          font-family: var(--font-display);
          font-size: 48px;
          color: var(--white);
          text-decoration: none;
          letter-spacing: 6px;
        }
        .mobile-menu__cta {
          background: var(--orange);
          color: var(--black) !important;
          padding: 16px 48px;
          font-size: 28px !important;
        }

        @media (max-width: 768px) {
          .navbar { padding: 20px 24px; }
          .navbar--scrolled { padding: 14px 24px; }
          .navbar__links { display: none; }
          .navbar__hamburger { display: flex; }
        }
      `}</style>
    </>
  )
}
