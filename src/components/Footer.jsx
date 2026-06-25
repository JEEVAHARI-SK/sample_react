import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__logo">▲ TERRAFORCE</div>
          <p className="footer__tagline">
            Where roads end,<br />our adventures begin.
          </p>
          <div className="footer__socials">
            {['FB', 'IG', 'YT', 'TW'].map(s => (
              <a key={s} href="#" className="footer__social">{s}</a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <div className="footer__col-title">FLEET</div>
          {['Wraith X', 'Phantom 4×4', 'Raptor R', 'Kraken', 'Titan S', 'Venom GTR'].map(c => (
            <a key={c} href="#" className="footer__link">{c}</a>
          ))}
        </div>

        <div className="footer__col">
          <div className="footer__col-title">EXPERIENCE</div>
          {['Rock Crawling', 'Desert Run', 'Mud Trails', 'Arctic Drive', 'Dune Bashing', 'Forest Tracks'].map(e => (
            <a key={e} href="#" className="footer__link">{e}</a>
          ))}
        </div>

        <div className="footer__col">
          <div className="footer__col-title">CONTACT</div>
          <div className="footer__contact-item">
            <span>📍</span>
            <span>Off Road Zone, Adventure Park,<br />Tamil Nadu, India</span>
          </div>
          <div className="footer__contact-item">
            <span>📞</span>
            <span>+91 98765 43210</span>
          </div>
          <div className="footer__contact-item">
            <span>✉</span>
            <span>drive@terraforce.in</span>
          </div>
          <div className="footer__contact-item">
            <span>⏰</span>
            <span>Mon–Sun, 6AM – 8PM</span>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-left">
          © 2026 TERRAFORCE. All rights reserved.
        </div>
        <div className="footer__bottom-right">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Safety Policy</a>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--deep);
          border-top: 1px solid var(--iron);
        }
        .footer__top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 60px;
          padding: 80px 60px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .footer__logo {
          font-family: var(--font-display);
          font-size: 32px;
          color: var(--white);
          letter-spacing: 6px;
          margin-bottom: 16px;
        }
        .footer__tagline {
          font-size: 15px;
          color: var(--fog);
          line-height: 1.7;
          margin-bottom: 28px;
        }
        .footer__socials { display: flex; gap: 8px; }
        .footer__social {
          width: 36px;
          height: 36px;
          border: 1px solid var(--ash);
          color: var(--fog);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-cond);
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0;
          transition: all 0.3s;
        }
        .footer__social:hover { border-color: var(--orange); color: var(--orange); }
        .footer__col-title {
          font-family: var(--font-cond);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          color: var(--orange);
          margin-bottom: 20px;
        }
        .footer__col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer__link {
          font-size: 13px;
          color: var(--fog);
          text-decoration: none;
          transition: color 0.3s;
          font-family: var(--font-cond);
          letter-spacing: 1px;
        }
        .footer__link:hover { color: var(--white); }
        .footer__contact-item {
          display: flex;
          gap: 12px;
          font-size: 13px;
          color: var(--fog);
          line-height: 1.5;
        }
        .footer__bottom {
          border-top: 1px solid var(--iron);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 60px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .footer__bottom-left {
          font-family: var(--font-cond);
          font-size: 11px;
          letter-spacing: 2px;
          color: var(--smoke);
        }
        .footer__bottom-right { display: flex; gap: 32px; }
        .footer__bottom-right a {
          font-family: var(--font-cond);
          font-size: 11px;
          letter-spacing: 2px;
          color: var(--smoke);
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer__bottom-right a:hover { color: var(--white); }

        @media (max-width: 1024px) {
          .footer__top { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .footer__top { grid-template-columns: 1fr; padding: 48px 24px; gap: 40px; }
          .footer__bottom { flex-direction: column; gap: 16px; padding: 24px; text-align: center; }
        }
      `}</style>
    </footer>
  )
}
