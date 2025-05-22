import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import '../style/footer.css';

const Footer = () => {
  const sponsors = [
    // Top tier sponsors
    { name: 'Adidas', logo: '/img/adidas.png', tier: 1 },
    { name: 'Samsung', logo: '/img/samsung.png', tier: 1 },
    { name: 'Huawei', logo: '/img/huawei.png', tier: 1 },
    { name: 'Electronics Arts', logo: '/img/electronics-arts.png', tier: 1 },
    
    // Second tier sponsors
    { name: 'Discord', logo: '/img/discord.png', tier: 2 },
    { name: 'Firefox', logo: '/img/firefox.png', tier: 2 },
    { name: 'DrukFit', logo: '/img/drukfit.png', tier: 2 },
  ];

  const socialLinks = [
    { icon: faTiktok, href: 'https://www.tiktok.com/@cstbeit', label: 'TikTok' }
  ];

  const footerLinks = [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms Of Use', href: '/terms' },
    { name: 'Contact Us', href: '/contact' }
  ];

  return (
    <footer className="site-footer">
      {/* Sponsors Section */}
      <div className="sponsors-container">
        <div className="sponsors-tier-1">
          {sponsors.filter(s => s.tier === 1).map((sponsor, index) => (
            <div key={index} className="sponsor-logo">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={120}
                height={60}
                style={{ 
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.9,
                  transition: 'opacity 0.3s ease'
                }}
                priority={true}
              />
            </div>
          ))}
        </div>
        <div className="sponsors-tier-2">
          {sponsors.filter(s => s.tier === 2).map((sponsor, index) => (
            <div key={index} className="sponsor-logo">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={100}
                height={50}
                style={{ 
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.9,
                  transition: 'opacity 0.3s ease'
                }}
              />
            </div>
          ))}
        </div>
        <div className="sponsors-tier-3">
          {sponsors.filter(s => s.tier === 3).map((sponsor, index) => (
            <div key={index} className="sponsor-logo">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={80}
                height={40}
                style={{ 
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.9,
                  transition: 'opacity 0.3s ease'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Links */}
      <div className="social-links">
        {socialLinks.map((social, index) => (
          <Link key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
            <FontAwesomeIcon icon={social.icon} />
          </Link>
        ))}
      </div>

      {/* Footer Links */}
      <div className="footer-links">
        {footerLinks.map((link, index) => (
          <React.Fragment key={index}>
            <Link href={link.href}>{link.name}</Link>
            {index < footerLinks.length - 1 && <span className="separator">|</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Copyright */}
      <div className="copyright">
        <p>©2025 2IT Football Club Ltd</p>
      </div>
    </footer>
  );
};

export default Footer; 