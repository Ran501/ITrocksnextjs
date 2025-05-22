'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faTrophy, faFutbol, faUsers, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './club.module.css';

export default function ClubPage() {
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div className={styles.clubContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1>IT FOOTBALL CLUB</h1>
        <p>Established 2025 | Phuentsholing, Bhutan</p>
      </section>

      {/* Navigation Tabs */}
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tab} ${activeTab === 'history' ? styles.active : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FontAwesomeIcon icon={faHistory} />
          History
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'achievements' ? styles.active : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <FontAwesomeIcon icon={faTrophy} />
          Achievements
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'facilities' ? styles.active : ''}`}
          onClick={() => setActiveTab('facilities')}
        >
          <FontAwesomeIcon icon={faFutbol} />
          Facilities
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'community' ? styles.active : ''}`}
          onClick={() => setActiveTab('community')}
        >
          <FontAwesomeIcon icon={faUsers} />
          Community
        </button>
      </div>

      {/* Content Sections */}
      <div className={styles.contentContainer}>
        {/* History Section */}
        {activeTab === 'history' && (
          <section className={styles.historySection}>
            <h2>Our Journey</h2>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <h3>2025</h3>
                <p>IT Football Club was founded with a vision to revolutionize football in Bhutan. Born from the passion of tech enthusiasts and football lovers, we set out to create a unique sporting institution that combines traditional values with modern innovation.</p>
              </div>
              <div className={styles.timelineItem}>
                <h3>Our Vision</h3>
                <p>To become a leading force in Bhutanese football, nurturing local talent and promoting the beautiful game through technological innovation and community engagement.</p>
              </div>
              <div className={styles.timelineItem}>
                <h3>Our Mission</h3>
                <p>Combining technology and football to create a unique sporting experience while developing young talent and contributing to the growth of Bhutanese football.</p>
              </div>
            </div>
          </section>
        )}

        {/* Achievements Section */}
        {activeTab === 'achievements' && (
          <section className={styles.achievementsSection}>
            <h2>Club Achievements</h2>
            <div className={styles.achievementsGrid}>
              <div className={styles.achievementCard}>
                <FontAwesomeIcon icon={faTrophy} className={styles.trophyIcon} />
                <h3>Phuentsholing League</h3>
                <p>Inaugural Season Participation 2024</p>
              </div>
              <div className={styles.achievementCard}>
                <FontAwesomeIcon icon={faUsers} className={styles.trophyIcon} />
                <h3>Community Impact</h3>
                <p>Established first Tech-Football Academy in Bhutan</p>
              </div>
              <div className={styles.achievementCard}>
                <FontAwesomeIcon icon={faFutbol} className={styles.trophyIcon} />
                <h3>Youth Development</h3>
                <p>Launch of IT FC Youth Program</p>
              </div>
            </div>
          </section>
        )}

        {/* Facilities Section */}
        {activeTab === 'facilities' && (
          <section className={styles.facilitiesSection}>
            <h2>Our Facilities</h2>
            <div className={styles.facilitiesGrid}>
              <div className={styles.facilityCard}>
                <div className={styles.facilityImage}>
                  <Image
                    src="/img/training.jpg"
                    alt="Training Ground"
                    width={400}
                    height={300}
                    style={{ objectFit: 'cover' }}
                    quality={90}
                    priority
                    className={styles.facilityImg}
                  />
                </div>
                <h3>Training Ground</h3>
                <p>State-of-the-art training facility with modern equipment and technology</p>
              </div>
              <div className={styles.facilityCard}>
                <div className={styles.facilityImage}>
                  <Image
                    src="/img/recovery.jpg"
                    alt="Performance Center"
                    width={400}
                    height={300}
                    style={{ objectFit: 'cover' }}
                    quality={90}
                    priority
                    className={styles.facilityImg}
                  />
                </div>
                <h3>Performance Center</h3>
                <p>Advanced performance analysis and recovery facilities</p>
              </div>
              <div className={styles.facilityCard}>
                <div className={styles.facilityImage}>
                  <Image
                    src="/img/youth.jpg"
                    alt="Youth Academy"
                    width={400}
                    height={300}
                    style={{ objectFit: 'cover' }}
                    quality={90}
                    priority
                    className={styles.facilityImg}
                  />
                </div>
                <h3>Youth Academy</h3>
                <p>Dedicated facilities for youth development and education</p>
              </div>
            </div>
          </section>
        )}

        {/* Community Section */}
        {activeTab === 'community' && (
          <section className={styles.communitySection}>
            <h2>Community Engagement</h2>
            <div className={styles.communityContent}>
              <div className={styles.communityCard}>
                <h3>Youth Development</h3>
                <p>Our commitment to nurturing young talent through our academy program and school partnerships.</p>
              </div>
              <div className={styles.communityCard}>
                <h3>Social Responsibility</h3>
                <p>Active participation in community service and social development initiatives.</p>
              </div>
              <div className={styles.communityCard}>
                <h3>Fan Engagement</h3>
                <p>Regular fan events, meet-and-greets, and interactive digital experiences.</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
} 