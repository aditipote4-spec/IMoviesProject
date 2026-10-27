import React from 'react';
import { Film, Heart, Github, Shield, Sparkles } from 'lucide-react';

export default function Footer({ dbStatus }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="brand-logo" style={{ cursor: 'default' }}>
          <div className="logo-icon-wrapper" style={{ width: '36px', height: '36px' }}>
            <Film size={18} strokeWidth={2.5} />
          </div>
          <div className="brand-text" style={{ fontSize: '1.4rem' }}>
            <span>i</span>Movies
          </div>
        </div>

        <p style={{ maxWidth: '520px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
          Movie Ticket Booking Made Simple. A complete modern MERN stack web application built for college project submission and portfolio.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>React + Vite</span>
          <span>•</span>
          <span>Node.js + Express</span>
          <span>•</span>
          <span>MongoDB Atlas</span>
          <span>•</span>
          <span>RESTful APIs</span>
        </div>

        <div className="footer-meta">
          Designed with <span>♥</span> by Student • Database Mode:{' '}
          <span style={{ color: dbStatus?.isMongoAtlasConnected ? '#10b981' : '#f59e0b' }}>
            {dbStatus?.isMongoAtlasConnected ? 'MongoDB Atlas (Connected)' : 'Demo Fallback Mode (In-Memory)'}
          </span>
        </div>
      </div>
    </footer>
  );
}
