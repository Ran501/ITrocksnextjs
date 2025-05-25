'use client';

import styles from './terms.module.css';

export default function TermsPage() {
  return (
    <div className={styles.container}>      
      <div style={{ height: '160px' }} />
      <h1>Terms of Use</h1>
      
      <section className={styles.section}>
        <h2>Acceptance of Terms</h2>
        <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
      </section>

      <section className={styles.section}>
        <h2>Use License</h2>
        <ul>
          <li>Permission is granted to temporarily access the materials on IT FC's website for personal, non-commercial viewing only.</li>
          <li>This is the grant of a license, not a transfer of title.</li>
          <li>This license shall automatically terminate if you violate any of these restrictions.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Ticket and Merchandise Policies</h2>
        <ul>
          <li>All ticket sales are final and non-refundable unless an event is cancelled.</li>
          <li>Resale of tickets is prohibited without explicit written permission.</li>
          <li>Merchandise returns are accepted within 14 days of purchase with original receipt.</li>
          <li>Damaged or defective merchandise can be exchanged within 30 days.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Intellectual Property</h2>
        <ul>
          <li>All content on this website is the property of IT FC and is protected by copyright laws.</li>
          <li>Unauthorized use of team logos, images, or other branded content is prohibited.</li>
          <li>Match footage and photography rights are reserved.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Disclaimer</h2>
        <ul>
          <li>The materials on IT FC's website are provided on an 'as is' basis.</li>
          <li>IT FC makes no warranties, expressed or implied, and hereby disclaims all warranties.</li>
          <li>IT FC does not warrant that the website will be uninterrupted or error-free.</li>
        </ul>
      </section>
    </div>
  );
} 