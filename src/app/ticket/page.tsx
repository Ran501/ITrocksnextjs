'use client';

import React, { useState } from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTicket, 
  faClock, 
  faInfoCircle, 
  faChevronRight, 
  faChair, 
  faUsers, 
  faQrcode,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

interface MatchData {
  [key: string]: Array<{
    id: number;
    date: { day: string; month: string; year: string };
    time: string;
    type: string;
    homeTeam: { name: string; logo: string };
    awayTeam: { name: string; logo: string };
    status: string;
    sections: Array<{
      id: string;
      name: string;
      price: number;
    }>;
  }>;
}

export default function TicketPage() {
  // State management for ticket booking
  const [selectedMonth, setSelectedMonth] = useState<'JUNE' | 'JULY'>('JUNE');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isGroupBooking, setIsGroupBooking] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [featureModal, setFeatureModal] = useState<null | 'seat' | 'group' | 'digital'>(null);
  const [customerPhone, setCustomerPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const router = useRouter();

  // Mock data - This will be replaced with API calls later
  const matchData: MatchData = {
    JUNE: [
      {
        id: 1,
        date: { day: '15', month: 'JUN', year: '2025' },
        time: '15:00',
        type: 'Friendly Match',
        homeTeam: { name: '2IT FC', logo: '/img/it.jpg' },
        awayTeam: { name: 'AkaboTay FC', logo: '/img/7035929.jpg' },
        status: 'available',
        sections: [
          { id: 'north', name: 'North Stand', price: 500 },
          { id: 'south', name: 'South Stand', price: 600 },
          { id: 'east', name: 'East Stand', price: 800 }
        ]
      }
    ],
    JULY: [
      {
        id: 2,
        date: { day: '10', month: 'JUL', year: '2025' },
        time: '15:00',
        type: 'Friendly Match',
        homeTeam: { name: '2IT FC', logo: '/img/it.jpg' },
        awayTeam: { name: 'Kazuka FC', logo: '/img/7.jpg' },
        status: 'coming_soon',
        sections: [
          { id: 'north', name: 'North Stand', price: 500 },
          { id: 'south', name: 'South Stand', price: 600 },
          { id: 'east', name: 'East Stand', price: 800 }
        ]
      },
      {
        id: 3,
        date: { day: '25', month: 'JUL', year: '2025' },
        time: '18:00',
        type: 'Friendly Match',
        homeTeam: { name: '2IT FC', logo: '/img/it.jpg' },
        awayTeam: { name: 'JeepJeep FC', logo: '/img/5643919.jpg' },
        status: 'coming_soon',
        sections: [
          { id: 'north', name: 'North Stand', price: 500 },
          { id: 'south', name: 'South Stand', price: 600 },
          { id: 'east', name: 'East Stand', price: 800 }
        ]
      }
    ]
  };

  // Feature modal content
  const featureModalContent = {
    seat: {
      title: 'Choose Your Seat',
      body: (
        <>
          <p><b>Choose Your Seat</b> lets you select your preferred seating location in the stadium. Each section offers a unique view and atmosphere. Select your section when booking to see available seats and prices.</p>
          <ul>
            <li>North Stand: Behind the goal, premium view</li>
            <li>South Stand: Family-friendly, easy access</li>
            <li>East Stand: VIP and premium facilities</li>
          </ul>
        </>
      )
    },
    group: {
      title: 'Group Booking',
      body: (
        <>
          <p><b>Group Booking</b> offers special rates for groups of 10 or more. The more tickets you book, the bigger the discount!</p>
          <ul>
            <li>10% off for 10-20 tickets</li>
            <li>Reserved seating and priority entry</li>
          </ul>
        </>
      )
    },
    digital: {
      title: 'Digital Tickets',
      body: (
        <>
          <p><b>Digital Tickets</b> make entry easy and secure. After booking, you'll receive a QR code by email. Show it on your phone at the stadium entrance for quick access.</p>
          <ul>
            <li>No paper tickets needed</li>
            <li>Easy to transfer to friends</li>
            <li>Environmentally friendly</li>
          </ul>
        </>
      )
    }
  };

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId);
  };

  const handleMatchSelect = (matchId: number) => {
    setSelectedMatch(matchId);
    setSelectedSection(null);
  };

  const handleBookTicket = async () => {
    if (!selectedMatch || !selectedSection) {
      alert('Please select a section before booking');
      return;
    }
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async () => {
    try {
      if (!selectedMatch || !selectedSection) {
        setPhoneError('Please select a match and section');
        return;
      }

      if (!customerPhone) {
        setPhoneError('Please enter your phone number');
        return;
      }

      // Validate phone number format
      if (!/^((77)|(17))\d{6}$/.test(customerPhone)) {
        setPhoneError('Phone number must start with 77 or 17 and be 8 digits');
        return;
      }

      if (ticketQuantity < 1) {
        setPhoneError('Please select at least 1 ticket');
        return;
      }

      setIsLoading(true);
      setPhoneError('');

      const match = matchData[selectedMonth].find(m => m.id === selectedMatch);
      if (!match) {
        throw new Error('Selected match not found');
      }

      const section = match.sections.find(s => s.id === selectedSection);
      if (!section) {
        throw new Error('Selected section not found');
      }

      const subtotal = section.price * ticketQuantity;
      const discount = isGroupBooking ? subtotal * (ticketQuantity >= 21 ? 0.15 : 0.1) : 0;
      const totalAmount = subtotal - discount;

      const bookingData = {
        phone: customerPhone,
        quantity: ticketQuantity,
        totalAmount,
        isGroupBooking,
        tickets: [{
          sectionName: section.name,
          price: section.price,
          discount: discount / ticketQuantity
        }]
      };

      console.log('Sending booking data:', bookingData);

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      console.log('Booking response:', data, response);

      if (!response.ok) {
        // Log the full error object for debugging
        console.error('Full booking error:', data);
        throw new Error(data.error || data.details || 'Failed to create booking');
      }

      // Close the modal and redirect to ticket page
      setShowBookingModal(false);
      router.push('/ticket');
    } catch (err) {
      console.error('Booking error:', err);
      setPhoneError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setIsLoading(false);
    }
  };

  const renderMatch = (match: {
    id: number;
    date: { day: string; month: string; year: string };
    time: string;
    type: string;
    homeTeam: { name: string; logo: string };
    awayTeam: { name: string; logo: string };
    status: string;
    sections: Array<{
      id: string;
      name: string;
      price: number;
    }>;
  }) => (
    <div className={styles.matchCard} key={match.id}>
      <div className={styles.matchHeader}>
        <div className={styles.matchDate}>
          <div className={styles.dateBox}>
            <span className={styles.day}>{match.date.day}</span>
            <span className={styles.month}>{match.date.month}</span>
            <span className={styles.year}>{match.date.year}</span>
          </div>
          <div className={styles.timeBox}>
            <FontAwesomeIcon icon={faClock} />
            <span>{match.time}</span>
          </div>
        </div>
        <div className={styles.matchType}>{match.type}</div>
      </div>

      <div className={styles.matchDetails}>
        <div className={styles.matchTeams}>
          <div className={styles.team}>
            <Image src={match.homeTeam.logo} alt={match.homeTeam.name} width={80} height={80} className={styles.teamLogo} />
            <h3>{match.homeTeam.name}</h3>
          </div>
          <div className={styles.vsContainer}>
            <span className={styles.vs}>VS</span>
            <div className={`${styles.ticketStatus} ${styles[match.status]}`}>
              {match.status === 'available' ? 'Tickets Available' : 'Sale Starting Soon'}
            </div>
          </div>
          <div className={styles.team}>
            <Image src={match.awayTeam.logo} alt={match.awayTeam.name} width={80} height={80} className={styles.teamLogo} />
            <h3>{match.awayTeam.name}</h3>
          </div>
        </div>

        <div className={styles.ticketSections}>
          <h4>Select Your Section</h4>
          <div className={styles.sectionButtons}>
            {match.sections.map(section => (
              <button 
                key={section.id}
                className={selectedSection === section.id ? styles.active : ''}
                onClick={() => {
                  setSelectedMatch(match.id);
                  setSelectedSection(section.id);
                }}
                disabled={match.status !== 'available'}
              >
                {section.name} - Nu. {section.price}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.ticketActions}>
            <div className={styles.priceInfo}>
            <span className={styles.label}>From</span>
            <span className={styles.price}>Nu. {Math.min(...match.sections.map(s => s.price))}</span>
          </div>
          <button 
            className={styles.buyTicketBtn}
            disabled={match.status !== 'available'}
            onClick={() => handleBookTicket()}
          >
            {match.status === 'available' ? 'Buy Tickets' : 'Coming Soon'}
                <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>MATCH TICKETS</h1>
          <p>2024/25 Season</p>
        </div>
      </div>

      <main className={styles.page}>
        <section className={styles.nav}>
          <div className={styles.navLinks}>
            <Link href="/tickets" className={styles.active}>Match Tickets</Link>
          </div>
        </section>

        <section className={styles.categories}>
          <div className={styles.categoryCard}>
            <div className={styles.cardContent}>
              <FontAwesomeIcon icon={faTicket} className={styles.cardIcon} />
              <h2>Match Tickets</h2>
              <p>Book your tickets for upcoming matches. Experience the excitement of live football at IT Stadium.</p>
              <div className={styles.features}>
                <div className={styles.feature} style={{cursor: 'pointer'}} onClick={() => setFeatureModal('seat')}>
                  <FontAwesomeIcon icon={faChair} className={styles.featureIcon} />
                  <div className={styles.featureContent}>
                    <h3>Choose Your Seat</h3>
                    <p>Select your preferred seating location in the stadium</p>
                  </div>
                </div>
                <div className={styles.feature} style={{cursor: 'pointer'}} onClick={() => setFeatureModal('group')}>
                  <FontAwesomeIcon icon={faUsers} className={styles.featureIcon} />
                  <div className={styles.featureContent}>
                    <h3>Group Booking</h3>
                    <p>Special rates for groups of 10 or more</p>
                  </div>
                </div>
                <div className={styles.feature} style={{cursor: 'pointer'}} onClick={() => setFeatureModal('digital')}>
                  <FontAwesomeIcon icon={faQrcode} className={styles.featureIcon} />
                  <div className={styles.featureContent}>
                    <h3>Digital Tickets</h3>
                    <p>Easy access with QR code on your phone</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.upcomingMatches}>
          <div className={styles.sectionHeader}>
            <h2>UPCOMING MATCHES</h2>
            <div className={styles.monthSelector}>
              <button 
                className={selectedMonth === 'JUNE' ? styles.active : ''} 
                onClick={() => setSelectedMonth('JUNE')}
              >
                JUNE 2025
              </button>
              <button 
                className={selectedMonth === 'JULY' ? styles.active : ''} 
                onClick={() => setSelectedMonth('JULY')}
              >
                JULY 2025
              </button>
            </div>
          </div>

          <div className={styles.ticketNotice}>
            <FontAwesomeIcon icon={faInfoCircle} />
            <p>All fixtures are subject to change. Ticket prices from Nu. 500</p>
          </div>

          <div className={styles.matchesContainer}>
            {matchData[selectedMonth].map(match => renderMatch(match))}
          </div>
        </section>

        <section className={styles.infoSection}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h3>Ticket Office</h3>
              <p>Monday to Friday: 8:00 - 18:00</p>
              <p>Matchday: Until kick-off</p>
            </div>
            <div className={styles.infoItem}>
              <h3>Contact Us</h3>
              <p>Email: rangdelchoney618@gmail.com</p>
              <p>Phone: +975 17844269</p>
            </div>
          </div>
        </section>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>Confirm Your Booking</h2>
                <button 
                  className={styles.closeButton}
                  onClick={() => setShowBookingModal(false)}
                  disabled={isLoading}
                >
                  ×
                </button>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.bookingSummary}>
                  <div className={styles.matchInfo}>
                    <h3>Match Details</h3>
                    {selectedMatch && (
                      <>
                        <div className={styles.summaryItem}>
                          <span>Teams</span>
                          <span>
                            {matchData[selectedMonth].find(m => m.id === selectedMatch)?.homeTeam.name ?? 'Unknown'} vs{' '}
                            {matchData[selectedMonth].find(m => m.id === selectedMatch)?.awayTeam.name ?? 'Unknown'}
                          </span>
                        </div>
                        <div className={styles.summaryItem}>
                          <span>Date</span>
                          <span>
                            {matchData[selectedMonth].find(m => m.id === selectedMatch)?.date.day ?? '--'} {' '}
                            {matchData[selectedMonth].find(m => m.id === selectedMatch)?.date.month ?? '---'} {' '}
                            {matchData[selectedMonth].find(m => m.id === selectedMatch)?.date.year ?? '----'}
                          </span>
                        </div>
                        <div className={styles.summaryItem}>
                          <span>Time</span>
                          <span>{matchData[selectedMonth].find(m => m.id === selectedMatch)?.time ?? '--:--'}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className={styles.seatInfo}>
                    <h3>Seat Details</h3>
                    {selectedSection && (
                      <>
                        <div className={styles.summaryItem}>
                          <span>Section</span>
                          <span>
                            {matchData[selectedMonth]
                              .find(m => m.id === selectedMatch)
                              ?.sections.find(s => s.id === selectedSection)?.name ?? 'Unknown Section'}
                          </span>
                        </div>
                        <div className={styles.summaryItem}>
                          <span>Price per ticket</span>
                          <span>
                            Nu.{matchData[selectedMonth]
                              .find(m => m.id === selectedMatch)
                              ?.sections.find(s => s.id === selectedSection)?.price ?? 0}
                          </span>
                        </div>
                      </>
                    )}

                    <div className={styles.quantitySelector}>
                      <span>Number of Tickets</span>
                      <div className={styles.quantityControls}>
                        <button
                          onClick={() => {
                            const newQuantity = Math.max(1, ticketQuantity - 1);
                            setTicketQuantity(newQuantity);
                            setIsGroupBooking(newQuantity >= 10);
                          }}
                          disabled={ticketQuantity <= 1 || isLoading}
                          className={styles.quantityBtn}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={ticketQuantity}
                          onChange={(e) => {
                            const newQuantity = Math.max(1, Math.min(20, parseInt(e.target.value) || 1));
                            setTicketQuantity(newQuantity);
                            setIsGroupBooking(newQuantity >= 10);
                          }}
                          disabled={isLoading}
                          className={styles.quantityInput}
                        />
                        <button
                          onClick={() => {
                            const newQuantity = Math.min(20, ticketQuantity + 1);
                            setTicketQuantity(newQuantity);
                            setIsGroupBooking(newQuantity >= 10);
                          }}
                          disabled={ticketQuantity >= 20 || isLoading}
                          className={styles.quantityBtn}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {isGroupBooking && (
                    <div className={styles.groupDiscount}>
                      <FontAwesomeIcon icon={faUsers} className={styles.discountIcon} />
                      <div className={styles.discountInfo}>
                        <h4>Group Booking Discount Applied!</h4>
                        <p>
                          {ticketQuantity >= 21 ? '15%' : '10%'} off for booking {ticketQuantity} tickets
                        </p>
                      </div>
                    </div>
                  )}

                  <div className={styles.priceSummary}>
                    <div className={styles.summaryItem}>
                      <span>Subtotal</span>
                      <span>
                        Nu.{(() => {
                          const match = matchData[selectedMonth].find(m => m.id === selectedMatch);
                          const section = match?.sections.find(s => s.id === selectedSection);
                          return (section?.price ?? 0) * ticketQuantity;
                        })()}
                      </span>
                    </div>
                    {isGroupBooking && (
                      <div className={styles.summaryItem}>
                        <span>Group Discount</span>
                        <span>
                          - Nu.{(() => {
                            const match = matchData[selectedMonth].find(m => m.id === selectedMatch);
                            const section = match?.sections.find(s => s.id === selectedSection);
                            const price = section?.price ?? 0;
                            return price * ticketQuantity * (ticketQuantity >= 21 ? 0.15 : 0.1);
                          })()}
                        </span>
                      </div>
                    )}
                    <div className={styles.summaryTotal}>
                      <span>Total Amount</span>
                      <span>
                        Nu.{(() => {
                          const match = matchData[selectedMonth].find(m => m.id === selectedMatch);
                          const section = match?.sections.find(s => s.id === selectedSection);
                          const price = section?.price ?? 0;
                          const subtotal = price * ticketQuantity;
                          const discount = isGroupBooking
                            ? subtotal * (ticketQuantity >= 21 ? 0.15 : 0.1)
                            : 0;
                          return subtotal - discount;
                        })()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.cartCustomerInfo} style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ fontWeight: 500, color: '#333' }}>
                    Phone Number
                    <input
                      type="text"
                      placeholder="Your Phone"
                      value={customerPhone}
                      onChange={e => {
                        setCustomerPhone(e.target.value);
                        setPhoneError('');
                      }}
                      required
                      style={{
                        marginTop: '0.25rem',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        width: '100%',
                        fontSize: '1rem'
                      }}
                    />
                    {phoneError && (
                      <span style={{ color: 'red', fontSize: '0.95rem', marginTop: '0.25rem' }}>{phoneError}</span>
                    )}
                  </label>
                </div>

                <div className={styles.modalActions}>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className={styles.cancelBtn}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className={styles.confirmBtn}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} spin />
                        Processing...
                      </>
                    ) : (
                      'Confirm Purchase'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature Info Modal */}
        {featureModal && featureModalContent[featureModal] && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>{featureModalContent[featureModal].title}</h2>
                <button className={styles.closeButton} onClick={() => setFeatureModal(null)}>
                  ×
                </button>
              </div>
              <div className={styles.modalContent}>
                {featureModalContent[featureModal].body}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
} 