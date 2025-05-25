'use client';

import React from 'react';
import NewsCard from '../../components/NewsCard';
import styles from '../page.module.css';
import { useNews } from '@/context/NewsContext';

export default function NewsPage() {
  const { articles } = useNews();

  return (
    <main className={styles.main}>
      <div style={{ height: '250px' }} />
      <section className={styles.newsSection}>
        <div className={styles.sectionHeader}>
          <h2>LATEST NEWS</h2>
        </div>
        <div className={styles.newsGrid}>
          {articles.map(news => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>
    </main>
  );
} 