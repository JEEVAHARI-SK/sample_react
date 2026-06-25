import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CarCard({ car, index }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="car-card"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ '--card-color': car.color }}
    >
      {/* Badge */}
      <div className="car-card__badge">{car.badge}</div>

      {/* Image */}
      <div className="car-card__img-wrap">
        <motion.img
          src={car.image}
          alt={car.name}
          className="car-card__img"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          loading="lazy"
        />
        <div className="car-card__img-overlay" />
        <div className="car-card__glow" />
      </div>

      {/* Content */}
      <div className="car-card__body">
        <div className="car-card__type">{car.type}</div>
        <h2 className="car-card__name">{car.name}</h2>
        <p className="car-card__tagline">{car.tagline}</p>

        {/* Quick Specs */}
        <div className="car-card__specs">
          <div className="car-card__spec">
            <span className="car-card__spec-val">{car.specs.power}</span>
            <span className="car-card__spec-label">Power</span>
          </div>
          <div className="car-card__spec-divider" />
          <div className="car-card__spec">
            <span className="car-card__spec-val">{car.specs.ground}</span>
            <span className="car-card__spec-label">Clearance</span>
          </div>
          <div className="car-card__spec-divider" />
          <div className="car-card__spec">
            <span className="car-card__spec-val">{car.specs.engine.split(' ')[0]}</span>
            <span className="car-card__spec-label">Engine</span>
          </div>
        </div>

        {/* Terrains */}
        <div className="car-card__terrains">
          {car.terrains.map(t => (
            <span key={t} className="car-card__terrain">{t}</span>
          ))}
        </div>

        {/* Footer */}
        <div className="car-card__footer">
          <div className="car-card__price">
            <span className="car-card__price-label">From</span>
            <span className="car-card__price-val">₹{car.price.toLocaleString()}</span>
            <span className="car-card__price-unit">{car.priceUnit}</span>
          </div>
          <motion.button
            className="car-card__btn"
            onClick={() => navigate(`/car/${car.id}`)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>DRIVE IT</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </div>

      <style>{`
        .car-card {
          position: relative;
          background: var(--carbon);
          border: 1px solid var(--iron);
          overflow: hidden;
          transition: border-color 0.4s;
          cursor: pointer;
        }
        .car-card:hover {
          border-color: var(--card-color);
        }
        .car-card__badge {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 10;
          background: var(--card-color);
          color: var(--black);
          font-family: var(--font-cond);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
          padding: 5px 12px;
        }
        .car-card__img-wrap {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        .car-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .car-card__img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, var(--carbon) 100%);
        }
        .car-card__glow {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 40px;
          background: var(--card-color);
          filter: blur(30px);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .car-card:hover .car-card__glow { opacity: 0.4; }

        .car-card__body {
          padding: 24px 28px 28px;
        }
        .car-card__type {
          font-family: var(--font-cond);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          color: var(--card-color);
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .car-card__name {
          font-family: var(--font-display);
          font-size: 48px;
          letter-spacing: 4px;
          line-height: 1;
          color: var(--white);
          margin-bottom: 8px;
        }
        .car-card__tagline {
          font-size: 13px;
          color: var(--fog);
          font-style: italic;
          margin-bottom: 20px;
        }
        .car-card__specs {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 16px;
          background: var(--steel);
          padding: 14px 20px;
        }
        .car-card__spec {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
        }
        .car-card__spec-val {
          font-family: var(--font-cond);
          font-size: 15px;
          font-weight: 700;
          color: var(--white);
          letter-spacing: 1px;
        }
        .car-card__spec-label {
          font-size: 9px;
          color: var(--fog);
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .car-card__spec-divider {
          width: 1px;
          height: 30px;
          background: var(--ash);
        }
        .car-card__terrains {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        .car-card__terrain {
          font-family: var(--font-cond);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.5px;
          color: var(--mist);
          border: 1px solid var(--ash);
          padding: 3px 10px;
          text-transform: uppercase;
        }
        .car-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--iron);
          padding-top: 20px;
        }
        .car-card__price {
          display: flex;
          flex-direction: column;
        }
        .car-card__price-label {
          font-size: 10px;
          color: var(--fog);
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .car-card__price-val {
          font-family: var(--font-cond);
          font-size: 26px;
          font-weight: 700;
          color: var(--card-color);
          letter-spacing: 1px;
        }
        .car-card__price-unit {
          font-size: 11px;
          color: var(--fog);
        }
        .car-card__btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--card-color);
          color: var(--black);
          border: none;
          padding: 14px 24px;
          font-family: var(--font-cond);
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 2px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .car-card__btn:hover { filter: brightness(1.1); }
      `}</style>
    </motion.div>
  )
}
