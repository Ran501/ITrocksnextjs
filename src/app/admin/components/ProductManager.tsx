'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './ProductManager.module.css';
import { useProducts } from '@/context/ProductContext';

enum Category {
  jerseys = 'jerseys',
  apparel = 'apparel',
  accessories = 'accessories'
}

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  category: Category;
  discount: number;
}

export default function ProductManager() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    price: 0,
    originalPrice: 0,
    image: '/img/placeholder.jpg',
    category: Category.jerseys,
    discount: 0
  });

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      title: '',
      price: 0,
      originalPrice: 0,
      image: '/img/placeholder.jpg',
      category: Category.jerseys,
      discount: 0
    });
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing product
      await updateProduct(editingId, formData);
      setEditingId(null);
    } else {
      // Add new product
      await addProduct(formData as Omit<Product, 'id'>);
      setIsAdding(false);
    }
    
    setFormData({
      title: '',
      price: 0,
      originalPrice: 0,
      image: '/img/placeholder.jpg',
      category: Category.jerseys,
      discount: 0
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      title: '',
      price: 0,
      originalPrice: 0,
      image: '/img/placeholder.jpg',
      category: Category.jerseys,
      discount: 0
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Products</h2>
        <button onClick={handleAdd} className={styles.addButton}>
          <FontAwesomeIcon icon={faPlus} />
          Add New Product
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
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="originalPrice">Original Price</label>
            <input
              type="number"
              id="originalPrice"
              value={formData.originalPrice}
              onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) })}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
              required
            >
              {Object.values(Category).map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="discount">Discount (%)</label>
            <input
              type="number"
              id="discount"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) })}
              required
              min="0"
              max="100"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
            <button type="button" onClick={handleCancel} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className={styles.productsList}>
        {products.map((product: Product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.productContent}>
              <h3>{product.title}</h3>
              <p className={styles.price}>Nu. {product.price?.toFixed(2) ?? '0.00'}</p>
              <p className={styles.originalPrice}>Nu. {product.originalPrice?.toFixed(2) ?? '0.00'}</p>
              <p className={styles.category}>{product.category}</p>
              <p className={styles.discount}>{product.discount}% OFF</p>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(product)} className={styles.editButton}>
                  <FontAwesomeIcon icon={faEdit} />
                  Edit
                </button>
                <button onClick={() => handleDelete(product.id)} className={styles.deleteButton}>
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