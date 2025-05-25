import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from '../app/page.module.css';

interface NewsCardProps {
  news: {
    id: number;
    image: string;
    title: string;
    date: string;
    excerpt: string;
  };
}

const NewsCard = memo(({ news }: NewsCardProps) => {
  console.log('Rendering NewsCard:', news.image, news.title);
  return (
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
  );
});

NewsCard.displayName = 'NewsCard';

export default NewsCard; 