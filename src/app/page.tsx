'use client';

import React, { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import styles from './page.module.css';
import PlayerStats, { players } from '../components/PlayerStats';
import { useNews } from '@/context/NewsContext';
import { useProducts } from '@/context/ProductContext';
import NewsCard from '../components/NewsCard';
import AnimatedElement from '@/components/AnimatedElement';

// Lazy load PlayerStats component
const PlayerStatsComponent = dynamic(() => import('../components/PlayerStats'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

// Memoized stats card component
const StatCard = memo(({ number, label }: { number: string; label: string }) => (
  <div className={styles.statCard}>
    <span className={styles.statNumber}>{number}</span>
    <span className={styles.statLabel}>{label}</span>
  </div>
));

StatCard.displayName = 'StatCard';

export default function Home() {
  const { articles } = useNews();
  const { products } = useProducts();
  console.log('products:', products, Array.isArray(products));
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  // Ticket match date/time (set to your match's kickoff time in UTC)
  const matchDate = new Date('2025-05-27T13:00:00+06:00'); // 27 May 2025, 13:00
  const [countdown, setCountdown] = useState('00 : 00 : 00');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = matchDate.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown('00 : 00 : 00');
        return;
      }
      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
      setCountdown(`${hours} : ${minutes} : ${seconds}`);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [matchDate]);

  const handlePreviousPlayer = () => {
    setCurrentPlayer(prev => (prev > 0 ? prev - 1 : players.length - 1));
  };

  const handleNextPlayer = () => {
    setCurrentPlayer(prev => (prev < players.length - 1 ? prev + 1 : 0));
  };

  // Get latest 3 news articles and featured products
  const latestNews = Array.isArray(articles) ? articles.slice(0, 3) : [];
  const featuredProducts = Array.isArray(products) ? products.slice(0, 3) : [];

  const stats = [
    { 
      number: "15", 
      label: "Matches Won",
      description: "Out of 20 matches played",
      percentage: 75,
      total: "20"
    },
    { 
      number: "42", 
      label: "Goals Scored",
      description: "Out of 50 attempts on target",
      percentage: 85,
      total: "50"
    },
    { 
      number: "82", 
      label: "Pass Accuracy",
      description: "Successful passes per 100 attempts",
      percentage: 82,
      total: "100"
    },
    { 
      number: "12", 
      label: "Clean Sheets",
      description: "Out of 20 matches played",
      percentage: 60,
      total: "20"
    }
  ];

  return (
    <main className={`${styles.main} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.spacer}></div>
      
      <div style={{ height: '150px', backgroundColor: 'white' }}></div>
      
      <AnimatedElement animation="fadeInUp">
        <section className={styles.newsSection}>
          <div className={styles.sectionHeader}>
            <h2>LATEST NEWS</h2>
            <Link href="/news" className={styles.viewAll}>
              View All News
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </div>
          <div className={styles.newsGrid}>
            {latestNews.map((news, index) => (
              <AnimatedElement key={news.id} animation="fadeInUp" delay={index * 0.1}>
                <NewsCard news={news} />
              </AnimatedElement>
            ))}
          </div>
        </section>
      </AnimatedElement>

      <AnimatedElement animation="fadeInUp">
        <section className={styles.statsSection}>
          <div className={styles.sectionHeader}>
            <h2>SEASON STATISTICS</h2>
            <p className={styles.statsSubheader}>Our performance in numbers for the 2023/24 season</p>
          </div>
          <div className={styles.statsContainer}>
            {stats.map((stat, index) => (
              <AnimatedElement key={index} animation="slideInLeft" delay={index * 0.1}>
                <div className={styles.statRow}>
                  <div className={styles.statInfo}>
                    <div className={styles.statLabel}>{stat.label}</div>
                    <div className={styles.statMetrics}>
                      <span className={styles.statNumber}>{stat.number}</span>
                      <span className={styles.statTotal}>/ {stat.total}</span>
                    </div>
                    <div className={styles.statDescription}>{stat.description}</div>
                  </div>
                  <div className={styles.progressBarWrapper}>
                    <div className={styles.progressBarContainer}>
                      <div 
                        className={styles.progressBar} 
                        style={{ width: `${stat.percentage}%`, animation: 'none' }}
                      ></div>
                    </div>
                    <div className={styles.progressPercentage}>{stat.percentage}%</div>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </section>
      </AnimatedElement>

      <AnimatedElement animation="fadeInUp">
        <section className={styles.shopSection}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '350px',
            width: '100%',
          }}>
            <Link href="/shop" style={{ display: 'block', width: '100%', maxWidth: 1100 }}>
              <Image
                src="/img/itstore.png"
                alt="IT Store"
                width={1400}
                height={350}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '32px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  background: '#fff'
                }}
                priority
              />
            </Link>
          </div>
        </section>
      </AnimatedElement>

      <AnimatedElement animation="fadeInUp">
        <section className={styles.ticketSection}>
          <div className={styles.ticketContainer}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <img src="/img/cst.png" alt="Premier League" style={{ height: 40, marginBottom: 16 }} />
              <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 500 }}>
                Tuesday 27 May 2025<br />Kick Off 13:00
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
                <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 8, padding: '0.5rem 1.5rem', fontSize: '2rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="32" height="32" fill="#fff" style={{ marginRight: 8 }} viewBox="0 0 24 24"><path d="M12 8a1 1 0 0 1 1 1v3.586l2.293 2.293a1 1 0 0 1-1.414 1.414l-2.586-2.586A1 1 0 0 1 11 13V9a1 1 0 0 1 1-1zm0-8C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{countdown}</span>
                </div>
              </div>
            </div>
            <div className={styles.ticketTeamsRow} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 180 }}>
                <img src="/img/it.jpg" alt="2ITFC" style={{ width: 120, height: 120, objectFit: 'contain', background: '#fff', borderRadius: '50%', padding: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} />
                <div style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: 2, color: '#fff', textShadow: '2px 2px 8px rgba(0,0,0,0.4)', marginTop: 16 }}>2ITFC</div>
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', margin: '0 2rem', opacity: 0.85 }}>VS</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 180 }}>
                <img src="/img/7035929.jpg" alt="AkaboTayFC" style={{ width: 120, height: 120, objectFit: 'contain', background: '#fff', borderRadius: '50%', padding: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} />
                <div style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: 2, color: '#fff', textShadow: '2px 2px 8px rgba(0,0,0,0.4)', marginTop: 16 }}>AKABOTAYFC</div>
              </div>
            </div>
            <Link href="/ticket" style={{ marginTop: '2.5rem', background: '#e31837', color: 'white', fontSize: '1.3rem', fontWeight: 700, border: 'none', borderRadius: '32px', padding: '1rem 3rem', cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'inline-block', textDecoration: 'none' }}>
              GO TO TICKET SECTION
            </Link>
          </div>
        </section>
      </AnimatedElement>

      <div style={{ height: '50px', backgroundColor: 'white' }}></div>

      <AnimatedElement animation="fadeInUp">
        <section className={styles.playerStatsSection}>
          <div className={styles.playerStatsWrapper}>
            <PlayerStatsComponent
              currentPlayer={currentPlayer}
              onPrevious={handlePreviousPlayer}
              onNext={handleNextPlayer}
            />
          </div>
        </section>
      </AnimatedElement>
    </main>
  );
} 