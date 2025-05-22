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

// Lazy load PlayerStats component
const PlayerStatsComponent = dynamic(() => import('../components/PlayerStats'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

// Memoized news card component
const NewsCard = memo(({ news }: { news: any }) => (
  <div className={styles.newsCard}>
    <div className={styles.newsImage}>
      <Image 
        src={news.image} 
        alt={news.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
        quality={75}
        style={{ objectFit: 'cover' }}
      />
    </div>
    <div className={styles.newsContent}>
      <span className={styles.newsDate}>{news.date}</span>
      <h3>{news.title}</h3>
      <p>{news.excerpt}</p>
      <Link href={`/news/${news.id}`} className={styles.readMore}>
        Read More
        <FontAwesomeIcon icon={faChevronRight} />
      </Link>
    </div>
  </div>
));

NewsCard.displayName = 'NewsCard';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePreviousPlayer = () => {
    setCurrentPlayer(prev => (prev > 0 ? prev - 1 : players.length - 1));
  };

  const handleNextPlayer = () => {
    setCurrentPlayer(prev => (prev < players.length - 1 ? prev + 1 : 0));
  };

  // Get latest 3 news articles and featured products
  const latestNews = articles.slice(0, 3);
  const featuredProducts = products.slice(0, 3);

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
      <section className={styles.newsSection}>
        <div className={styles.sectionHeader}>
          <h2>LATEST NEWS</h2>
          <Link href="/news" className={styles.viewAll}>
            View All News
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
        <div className={styles.newsGrid}>
          {latestNews.map(news => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.sectionHeader}>
          <h2>SEASON STATISTICS</h2>
          <p className={styles.statsSubheader}>Our performance in numbers for the 2023/24 season</p>
        </div>
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statRow}>
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
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                </div>
                <div className={styles.progressPercentage}>{stat.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.shopSection}>
        <div className={styles.sectionHeader}>
          <h2>FEATURED PRODUCTS</h2>
          <Link href="/shop" className={styles.viewAll}>
            Visit Shop
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
        <div className={styles.productsGrid}>
          {featuredProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <span className={styles.price}>${product.price.toFixed(2)}</span>
                <Link href={`/shop/${product.id}`} className={styles.shopNow}>
                  Shop Now
                  <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ticketSection}>
        <div className={styles.ticketContainer}>
          <div className={styles.sectionHeader}>
            <h2>MATCH TICKETS</h2>
            <Link href="/ticket" className={styles.viewAll}>
              View All Matches
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </div>
          <div className={styles.ticketGrid}>
            <div className={styles.ticketCard}>
              <div className={styles.matchDate}>JUN 15, 2025 • 15:00</div>
              <div className={styles.matchTeams}>2IT FC vs AkaboTay FC</div>
              <div className={styles.ticketPrice}>From Nu. 500</div>
              <Link href="/tickets" className={styles.buyTicket}>
                Buy Tickets
              </Link>
            </div>
            <div className={styles.ticketCard}>
              <div className={styles.matchDate}>JUL 10, 2025 • 15:00</div>
              <div className={styles.matchTeams}>2IT FC vs Kazuka FC</div>
              <div className={styles.ticketPrice}>From Nu. 500</div>
              <div className={styles.comingSoon}>Sale Starting Soon</div>
            </div>
            <div className={styles.ticketCard}>
              <div className={styles.matchDate}>JUL 25, 2025 • 18:00</div>
              <div className={styles.matchTeams}>2IT FC vs JeepJeep FC</div>
              <div className={styles.ticketPrice}>From Nu. 500</div>
              <div className={styles.comingSoon}>Sale Starting Soon</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.playerStatsSection}>
        <div className={styles.playerStatsWrapper}>
          <PlayerStatsComponent
            currentPlayer={currentPlayer}
            onPrevious={handlePreviousPlayer}
            onNext={handleNextPlayer}
          />
        </div>
      </section>
    </main>
  );
} 