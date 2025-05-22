'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import NewsManager from './components/NewsManager';
import ProductManager from './components/ProductManager';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'news' | 'products'>('news');

  return (
    <main className={styles.main}>
      <div style={{ height: '300px' }} />
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
      </div>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'news' ? styles.active : ''}`}
          onClick={() => setActiveTab('news')}
        >
          Manage News
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'products' ? styles.active : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Manage Products
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'news' ? (
          <NewsManager />
        ) : (
          <ProductManager />
        )}
      </div>
    </main>
  );
} 