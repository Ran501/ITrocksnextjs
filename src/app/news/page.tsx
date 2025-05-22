'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';
import { useNews } from '@/context/NewsContext';

export default function NewsPage() {
  const { articles } = useNews();

  return (
    <main className={styles.main}>
      <div className={styles.newsHeader}>
        <h1>Latest News</h1>
      </div>
      <div className={styles.newsGrid}>
        {articles.map(news => (
          <div key={news.id} className={styles.newsCard}>
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
              <h2>{news.title}</h2>
              <p>{news.excerpt}</p>
              <Link href={`/news/${news.id}`} className={styles.readMore}>
                Read More
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 