'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';
import { useNews } from '@/context/NewsContext';

export default function NewsArticle({ params }: { params: { id: string } }) {
  const { articles } = useNews();
  const article = articles.find(article => article.id === parseInt(params.id));

  if (!article) {
    return (
      <main className={styles.main}>
        <div className={styles.error}>
          <h1>Article Not Found</h1>
          <p>The article you're looking for doesn't exist.</p>
          <Link href="/news" className={styles.backLink}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to News
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Link href="/news" className={styles.backLink}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to News
      </Link>
      <article className={styles.article}>
        <div className={styles.articleHeader}>
          <span className={styles.date}>{article.date}</span>
          <h1>{article.title}</h1>
        </div>
        <div className={styles.articleImage}>
          <Image 
            src={article.image} 
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            quality={90}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.articleContent}>
          <p>{article.content}</p>
        </div>
      </article>
    </main>
  );
} 