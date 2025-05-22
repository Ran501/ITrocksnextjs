'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faUsers, faCalendar, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

interface BookingDetails {
  id: string;
  phone: string;
  quantity: number;
  totalAmount: number;
  isGroupBooking: boolean;
  status: string;
  createdAt: string;
  event: {
    title: string;
    date: string;
    venue: string;
    homeTeam: string;
    awayTeam: string;
  };
  section: {
    name: string;
    price: number;
  };
  tickets: Array<{
    section: string;
    price: number;
    discount: number;
  }>;
}

export default function BookingDetailsPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone');
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        if (!phone) {
          throw new Error('Phone number is required');
        }

        const response = await fetch(`/api/bookings/${id}?phone=${phone}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booking details');
        }
        const data = await response.json();
        setBooking(data.booking);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id, phone]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading booking details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Booking not found</p>
      </div>
    );
  }

  return (
    <div className={styles.bookingDetailsContainer}>
      <div className={styles.bookingHeader}>
        <h1>Booking Confirmation</h1>
        <div className={styles.bookingReference}>
          <FontAwesomeIcon icon={faTicket} />
          <span>Booking Reference: {booking.id}</span>
        </div>
      </div>

      <div className={styles.bookingCard}>
        <div className={styles.bookingInfo}>
          <div className={styles.infoRow}>
            <FontAwesomeIcon icon={faCalendar} />
            <div>
              <h3>Match Details</h3>
              <p>{booking.event.title}</p>
              <p>{new Date(booking.event.date).toLocaleDateString()}</p>
              <p>{booking.event.homeTeam} vs {booking.event.awayTeam}</p>
            </div>
          </div>

          <div className={styles.infoRow}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <div>
              <h3>Section</h3>
              <p>{booking.section.name}</p>
            </div>
          </div>

          <div className={styles.infoRow}>
            <FontAwesomeIcon icon={faUsers} />
            <div>
              <h3>Tickets</h3>
              <p>{booking.quantity} {booking.quantity > 1 ? 'tickets' : 'ticket'}</p>
              {booking.isGroupBooking && (
                <span className={styles.groupTag}>Group Booking</span>
              )}
            </div>
          </div>

          <div className={styles.infoRow}>
            <FontAwesomeIcon icon={faClock} />
            <div>
              <h3>Status</h3>
              <p className={styles[booking.status.toLowerCase()]}>
                {booking.status}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.priceSummary}>
          <h3>Price Summary</h3>
          <div className={styles.priceRow}>
            <span>Total Amount</span>
            <span>Nu. {booking.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className={styles.ticketInfo}>
          <p>Your e-tickets have been sent to your phone number.</p>
          <p>Please show your e-tickets at the stadium entrance on match day.</p>
        </div>
      </div>
    </div>
  );
} 