'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSignOutAlt,
  faTicket,
  faTshirt,
  faTrophy,
  faNewspaper,
  faBars,
  faChevronRight,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import styles from './layout.module.css';
import Footer from '../components/Footer';

// Background images for different routes
const routeBackgrounds: Record<string, string> = {
  '/': '/img/ground.webp',
  '/ticket': '/img/stadium.webp',
  '/shop': '/img/shop.webp',
  '/squad': '/img/wallpaper.webp',
  '/club': '/img/stadium14.jpg',
  '/account': '/img/stadium15.jpg',
  '/admin': '/img/stadium16.jpg'
} as const;

// Overlay text for different routes
const pageOverlays: Record<string, { title: string; subtitle?: string }> = {
  '/': {
    title: 'Welcome to IT FC',
  },
  '/ticket': {
    title: 'Get Your Match Tickets',
  },
  '/shop': {
    title: 'Official IT FC Shop',
  },
  '/squad': {
    title: 'First Team Men',
  },
  '/club': {
    title: 'About the Club',
  },
  '/account': {
    title: 'Your Account',
  },
  '/admin': {
    title: 'Admin',
  },
};


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Get current background image based on route
  const currentBackground = routeBackgrounds[pathname] || routeBackgrounds['/'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      if (window.scrollY > 50) setShowOverlay(false);
      else setShowOverlay(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`${styles.mainNav} ${isScrolled ? styles.scrolled : ''}`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url('${currentBackground}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Left Navigation */}
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/img/it.jpg"
              alt="IT FC Logo"
              width={60}
              height={60}
              priority
            />
          </Link>
          {/* Hamburger for mobile */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {/* Middle - Navigation Links (desktop/tablet only) */}
          <div className={styles.navLinks}>
            <Link href="/ticket" className={pathname === '/ticket' ? styles.active : ''}>
              <FontAwesomeIcon icon={faTicket} />
              <span>TICKETS</span>
            </Link>
            <Link href="/shop" className={pathname === '/shop' ? styles.active : ''}>
              <FontAwesomeIcon icon={faTshirt} />
              <span>SHOP</span>
            </Link>
            <Link href="/squad" className={pathname === '/squad' ? styles.active : ''}>
              <FontAwesomeIcon icon={faTrophy} />
              <span>SQUAD</span>
            </Link>
            <Link href="/club" className={pathname === '/club' ? styles.active : ''}>
              <FontAwesomeIcon icon={faNewspaper} />
              <span>CLUB</span>
            </Link>
          </div>
        </div>
        {/* Right Navigation - Auth (no Drukfit) (desktop/tablet only) */}
        <div className={styles.rightNav}>
          {session ? (
            <>
              <span className={styles.userName}>
                <FontAwesomeIcon icon={faUser} /> {session.user?.name}
              </span>
              <button onClick={() => signOut()} className={styles.logoutButton}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </>
          ) : (
            <Link href="/account" className={styles.loginButton}>
              <FontAwesomeIcon icon={faUser} /> Login
            </Link>
          )}
        </div>
        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className={styles.mobileMenuOverlay}>
            <div className={styles.mobileMenuHeader}>
              <Link href="/" className={styles.mobileLogo} onClick={() => setMenuOpen(false)}>
                <Image src="/img/it.jpg" alt="IT FC Logo" width={48} height={48} priority />
              </Link>
              <button className={styles.closeMenu} onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className={styles.mobileMenuLinks}>
              <Link href="/" className={pathname === '/' ? styles.mobileActive : ''} onClick={() => setMenuOpen(false)}>
                <b>HOME</b>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
              <Link href="/shop" className={pathname === '/shop' ? styles.mobileActive : ''} onClick={() => setMenuOpen(false)}>
                <b>SHOP</b>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
              <Link href="/ticket" className={pathname === '/ticket' ? styles.mobileActive : ''} onClick={() => setMenuOpen(false)}>
                <b>TICKETS</b>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
              <Link href="/squad" className={pathname === '/squad' ? styles.mobileActive : ''} onClick={() => setMenuOpen(false)}>
                <b>SQUAD</b>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
              <Link href="/club" className={pathname === '/club' ? styles.mobileActive : ''} onClick={() => setMenuOpen(false)}>
                <b>CLUB</b>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
              <Link href="/account" className={pathname === '/account' ? styles.mobileActive : ''} onClick={() => setMenuOpen(false)}>
                <b>ACCOUNT</b>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className={`${styles.main} ${isScrolled ? styles.scrolled : ''}`}>
        {/* Fullscreen overlay text/banner that fades out on scroll */}
        {pageOverlays[pathname] && showOverlay && (
          <div className="fullscreen-overlay-banner mobile-hide">
            <h1 className="fullscreen-overlay-title" style={{ color: '#fff' }}>{pageOverlays[pathname].title}</h1>
            {pageOverlays[pathname].subtitle && (
              <p className="fullscreen-overlay-subtitle">{pageOverlays[pathname].subtitle}</p>
            )}
          </div>
        )}
        {children}
        <style jsx global>{`
          .fullscreen-overlay-banner {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 1200;
            color: #fff;
            text-shadow: 0 2px 16px #000, 0 0 8px #000;
            pointer-events: none;
            background: none;
            opacity: 1;
            transition: opacity 0.5s;
            animation: fadeInOverlay 0.7s;
          }
          @media (max-width: 600px) {
            .fullscreen-overlay-banner.mobile-hide {
              display: none !important;
            }
          }
          .fullscreen-overlay-title {
            font-family: 'Oswald', 'Montserrat', Arial, sans-serif;
            font-size: 4vw;
            font-weight: 900;
            letter-spacing: 0.1em;
            margin: 0 0 1rem 0;
            text-align: center;
            text-transform: uppercase;
            color: #fff;
          }
          .fullscreen-overlay-subtitle {
            font-size: 1.5vw;
            max-width: 700px;
            text-align: center;
            opacity: 0.95;
            margin: 0 auto;
          }
          @media (max-width: 900px) {
            .fullscreen-overlay-title { font-size: 2.2rem; }
            .fullscreen-overlay-subtitle { font-size: 1.1rem; }
          }

          @media (max-width: 769px) {
            .fullscreen-overlay-title { font-size: 2.2rem; }
            .fullscreen-overlay-subtitle { font-size: 1.1rem; }
          }
          @keyframes fadeInOverlay {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </main>

      <Footer />
    </>
  );
} 