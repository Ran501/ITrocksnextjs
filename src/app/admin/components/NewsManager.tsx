'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './NewsManager.module.css';
import { useNews } from '@/context/NewsContext';

interface NewsArticle {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export default function NewsManager() {
  const { articles, addArticle, updateArticle, deleteArticle } = useNews();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<NewsArticle>>({
    title: '',
    date: '',
    image: '/img/team-logo.jpg',
    excerpt: '',
    content: ''
  });

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      title: '',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      image: '/img/team-logo.jpg',
      excerpt: '',
      content: ''
    });
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingId(article.id);
    setFormData(article);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteArticle(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing article
      updateArticle(editingId, formData);
      setEditingId(null);
    } else {
      // Add new article
      addArticle(formData as Omit<NewsArticle, 'id'>);
      setIsAdding(false);
    }
    
    setFormData({
      title: '',
      date: '',
      image: '/img/team-logo.jpg',
      excerpt: '',
      content: ''
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      title: '',
      date: '',
      image: '/img/team-logo.jpg',
      excerpt: '',
      content: ''
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>News Articles</h2>
        <button onClick={handleAdd} className={styles.addButton}>
          <FontAwesomeIcon icon={faPlus} />
          Add New Article
        </button>
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input
              type="text"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="excerpt">Excerpt</label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={6}
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {editingId ? 'Update Article' : 'Add Article'}
            </button>
            <button type="button" onClick={handleCancel} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className={styles.articlesList}>
        {articles.map(article => (
          <div key={article.id} className={styles.articleCard}>
            <div className={styles.articleImage}>
              <Image
                src={article.image}
                alt={article.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.articleContent}>
              <h3>{article.title}</h3>
              <p className={styles.date}>{article.date}</p>
              <p className={styles.excerpt}>{article.excerpt}</p>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(article)} className={styles.editButton}>
                  <FontAwesomeIcon icon={faEdit} />
                  Edit
                </button>
                <button onClick={() => handleDelete(article.id)} className={styles.deleteButton}>
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 