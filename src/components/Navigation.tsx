'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './Navigation.module.css';

export default function Navigation() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContent}>
        {/* Left side - Logo */}
        <Link href="/" className={styles.logo}>
          IT FC
        </Link>

        {/* Middle - Navigation Links */}
        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/club">Club</Link>
          <Link href="/team">Team</Link>
          <Link href="/ticket">Tickets</Link>
          <Link href="/shop">Shop</Link>
        </div>

        {/* Right side - Auth */}
        <div className={styles.authSection}>
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
      </div>
    </nav>
  );
} 