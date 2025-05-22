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
  faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import styles from './layout.module.css';
import Footer from '../components/Footer';

// Background images for different routes
const routeBackgrounds: Record<string, string> = {
  '/': '/img/ground.webp',
  '/ticket': '/img/stadium.webp',
  '/shop': '/img/shop.webp',
  '/squad': '/img/wallpaper.webp',
  '/club': '/img/stadium.webp',
  '/drukfit': '/img/drukfit-bg.webp',
  '/account': '/img/account-bg.webp'
} as const;

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Get current background image based on route
  const currentBackground = routeBackgrounds[pathname] || routeBackgrounds['/'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
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

          {/* Middle - Navigation Links */}
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

        {/* Right Navigation - Auth & Drukfit */}
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
          <Link href="https://drukfit.com/" className={`${styles.drukfitLogo} ${pathname === '/drukfit' ? styles.active : ''}`}>
            <Image
              src="/img/drukfit.png"
              alt="Drukfit Logo"
              width={60}
              height={60}
              priority
            />
            <span>DRUKFIT</span>
          </Link>
        </div>
      </nav>

      <main className={`${styles.main} ${isScrolled ? styles.scrolled : ''}`}>
        {children}
      </main>

      <Footer />
    </>
  );
} 