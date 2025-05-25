'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope 
} from '@fortawesome/free-solid-svg-icons';
import styles from './contact.module.css';

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <div style={{ height: '160px' }} />
      <div className={styles.heroSection}>
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Here's how you can reach us.</p>
      </div>
      
      <div className={styles.contactGrid}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
            <h3>Visit Us</h3>
            <p>IT Football Club</p>
            <p>Phuentsholing, Bhutan</p>
            <p>Chhukha, Bhutan</p>
          </div>

          <div className={styles.infoCard}>
            <FontAwesomeIcon icon={faPhone} className={styles.icon} />
            <h3>Call Us</h3>
            <p>+975 17844269</p>
            <p>Mon - Fri, 8:00 AM - 5:00 PM</p>
            <p>Sat - Sun, Closed</p>
          </div>

          <div className={styles.infoCard}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
            <h3>Email Us</h3>
            <p>rangdelchoney618@gmail.com</p>
            <p>02230122.cst@edu.bt</p>
            <p>Response within 24 hours</p>
          </div>
        </div>

        <div className={styles.mapSection}>
          <div className={styles.mapContainer}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14243.416880435495!2d89.37916621766733!3d26.85161385135095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e5b8e1e6f07c3b%3A0x8d8eb5ca5b3f9f4e!2sPhuentsholing!5e0!3m2!1sen!2sbt!4v1710669547387!5m2!1sen!2sbt"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className={styles.businessHours}>
        <h2>Business Hours</h2>
        <div className={styles.hoursGrid}>
          <div className={styles.hoursCard}>
            <h4>Weekdays</h4>
            <p>Monday - Friday</p>
            <p>8:00 AM - 5:00 PM</p>
          </div>
          <div className={styles.hoursCard}>
            <h4>Weekend</h4>
            <p>Saturday - Sunday</p>
            <p>Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
} 