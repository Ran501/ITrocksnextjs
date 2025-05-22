'use client';

import styles from './privacy.module.css';

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <h1>Privacy Policy</h1>
      
      <section className={styles.section}>
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us, including:</p>
        <ul>
          <li>Name and contact information</li>
          <li>Account credentials</li>
          </ul>
      </section>

      <section className={styles.section}>
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process your purchases and transactions</li>
          <li>Communicate with you about your orders</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Improve our services</li>
          <li>Protect against fraud and unauthorized transactions</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Information Sharing</h2>
        <p>We do not sell your personal information. We may share your information with:</p>
        <ul>
          <li>Service providers who assist our operations</li>
          <li>Law enforcement when required by law</li>
          <li>Professional advisors and insurers</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Opt-out of marketing communications</li>
          <li>Lodge a complaint with supervisory authorities</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <div className={styles.contactInfo}>
          <p>Email: rangdelchoney618@gmail.com</p>
          <p>Phone: +975 17844269</p>
          <p>Address: CST, Phuentsholing, Bhutan</p>
        </div>
      </section>
    </div>
  );
} 