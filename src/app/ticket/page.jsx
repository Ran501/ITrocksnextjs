'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
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
import '../../style/ticket.css';

function Ticketpage() {
  // State management for ticket booking
  const [selectedMonth, setSelectedMonth] = useState('JUNE');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isGroupBooking, setIsGroupBooking] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - This will be replaced with API calls later
  const matchData = {
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

  // Handlers for future API integration
  const handleSectionSelect = (sectionId) => {
    setSelectedSection(sectionId);
    // Will add API call to check seat availability
  };

  const handleMatchSelect = (matchId) => {
    setSelectedMatch(matchId);
    setSelectedSection(null); // Reset section when match changes
    // Will add API call to get match details
  };

  const handleQuantityChange = (quantity) => {
    setTicketQuantity(quantity);
    setIsGroupBooking(quantity >= 10);
    // Will add API call to check group booking availability
  };

  const handleBookTicket = async () => {
    if (!selectedMatch || !selectedSection) {
      alert('Please select a section before booking');
      return;
    }
    
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    try {
      const bookingData = {
        eventId: selectedMatch,
        quantity: ticketQuantity,
      };
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
        credentials: 'include',
      });
      
      // Here you would typically make an API call to process the booking
      console.log('Booking confirmed:', {
        matchId: selectedMatch,
        sectionId: selectedSection,
        quantity: ticketQuantity,
        isGroupBooking
      });

      // Show success message
      alert('Booking successful! You will receive a confirmation email shortly.');
      
      // Reset states
      setShowBookingModal(false);
      setSelectedSection(null);
      setSelectedMatch(null);
      setTicketQuantity(1);
      setIsGroupBooking(false);
    } catch (error) {
      alert('Failed to process booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderMatch = (match) => (
    <div className="match-card" key={match.id}>
      <div className="match-header">
        <div className="match-date">
          <div className="date-box">
            <span className="day">{match.date.day}</span>
            <span className="month">{match.date.month}</span>
            <span className="year">{match.date.year}</span>
    </div>
          <div className="time-box">
            <FontAwesomeIcon icon={faClock} />
            <span>{match.time}</span>
      </div>
    </div>
        <div className="match-type">{match.type}</div>
      </div>

      <div className="match-details">
        <div className="match-teams">
          <div className="team home">
            <Image src={match.homeTeam.logo} alt={match.homeTeam.name} width={80} height={80} className="team-logo" />
            <h3>{match.homeTeam.name}</h3>
      </div>
          <div className="vs-container">
            <span className="vs">VS</span>
            <div className={`ticket-status ${match.status}`}>
              {match.status === 'available' ? 'Tickets Available' : 'Sale Starting Soon'}
      </div>
      </div>
          <div className="team away">
            <Image src={match.awayTeam.logo} alt={match.awayTeam.name} width={80} height={80} className="team-logo" />
            <h3>{match.awayTeam.name}</h3>
      </div>
    </div>

        <div className="ticket-sections">
          <h4>Select Your Section</h4>
          <div className="section-buttons">
            {match.sections.map(section => (
              <button 
                key={section.id}
                className={selectedSection === section.id ? 'active' : ''}
                onClick={() => handleSectionSelect(section.id)}
                disabled={match.status !== 'available'}
              >
                {section.name} - Nu. {section.price}
              </button>
            ))}
          </div>
      </div>

        <div className="ticket-actions">
          <div className="ticket-info">
            <div className="price-info">
              <span className="label">From</span>
              <span className="price">Nu. {Math.min(...match.sections.map(s => s.price))}</span>
      </div>
      </div>
          <button 
            className="buy-ticket-btn"
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
      <div className="ticket-hero">
        <div className="hero-content">
          <h1>MATCH TICKETS</h1>
          <p>2024/25 Season</p>
        </div>
      </div>

      <main className="ticket-page">
        <section className="ticket-nav">
          <div className="nav-links">
            <Link href="/tickets" className="active">Match Tickets</Link>
          </div>
        </section>

        <section className="ticket-categories">
          <div className="category-card">
            <div className="card-content">
              <FontAwesomeIcon icon={faTicket} className="card-icon" />
              <h2>Match Tickets</h2>
              <p>Book your tickets for upcoming matches. Experience the excitement of live football at IT Stadium.</p>
              <div className="ticket-features">
                <div className="feature">
                  <FontAwesomeIcon icon={faChair} className="fa-icon" />
                  <div className="feature-content">
                    <h3>Choose Your Seat</h3>
                    <p>Select your preferred seating location in the stadium</p>
      </div>
    </div>
                <div className="feature">
                  <FontAwesomeIcon icon={faUsers} className="fa-icon" />
                  <div className="feature-content">
                    <h3>Group Booking</h3>
                    <p>Special rates for groups of 10 or more</p>
                  </div>
      </div>
                <div className="feature">
                  <FontAwesomeIcon icon={faQrcode} className="fa-icon" />
                  <div className="feature-content">
                    <h3>Digital Tickets</h3>
                    <p>Easy access with QR code on your phone</p>
      </div>
      </div>
      </div>
      </div>
    </div>
        </section>

        <section className="upcoming-matches">
          <div className="section-header">
            <h2>UPCOMING MATCHES</h2>
            <div className="month-selector">
              <button 
                className={selectedMonth === 'JUNE' ? 'active' : ''} 
                onClick={() => setSelectedMonth('JUNE')}
              >
                JUNE 2025
              </button>
              <button 
                className={selectedMonth === 'JULY' ? 'active' : ''} 
                onClick={() => setSelectedMonth('JULY')}
              >
                JULY 2025
              </button>
            </div>
      </div>

          <div className="ticket-notice">
            <FontAwesomeIcon icon={faInfoCircle} />
            <p>All fixtures are subject to change. Ticket prices from Nu. 500</p>
      </div>

          <div className="matches-container">
            {matchData[selectedMonth].map(match => renderMatch(match))}
      </div>
        </section>

        <section className="ticket-info-section">
          <div className="info-grid">
            <div className="info-item">
              <h3>Ticket Office</h3>
              <p>Monday to Friday: 8:00 - 18:00</p>
              <p>Matchday: Until kick-off</p>
      </div>
            <div className="info-item">
              <h3>Contact Us</h3>
              <p>Email: rangdelchoney618@gmail.com</p>
              <p>Phone: +975 17844269</p>
      </div>
    </div>
        </section>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="modalOverlay">
            <div className="modal">
              <div className="modalHeader">
                <h2>Confirm Your Booking</h2>
                <button 
                  className="closeButton"
                  onClick={() => setShowBookingModal(false)}
                  disabled={isLoading}
                >
                  ×
                </button>
              </div>
              <div className="modalContent">
                <div className="bookingSummary">
                  <div className="matchInfo">
                    <h3>Match Details</h3>
                    {selectedMatch && (
                      <>
                        <div className="summaryItem">
                          <span>Teams</span>
                          <span>
                            {matchData[selectedMonth].find(m => m.id === selectedMatch)?.homeTeam.name} vs{' '}
                            {matchData[selectedMonth].find(m => m.id === selectedMatch)?.awayTeam.name}
                          </span>
                        </div>
                        <div className="summaryItem">
                          <span>Date</span>
                          <span>
                            {matchData[selectedMonth].find(m => m.id === selectedMatch)?.date.day}{' '}
                            {matchData[selectedMonth].find(m => m.id === selectedMatch)?.date.month}{' '}
                            {matchData[selectedMonth].find(m => m.id === selectedMatch)?.date.year}
                          </span>
                        </div>
                        <div className="summaryItem">
                          <span>Time</span>
                          <span>{matchData[selectedMonth].find(m => m.id === selectedMatch)?.time}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="seatInfo">
                    <h3>Seat Details</h3>
                    {selectedSection && (
                      <>
                        <div className="summaryItem">
                          <span>Section</span>
                          <span>
                            {matchData[selectedMonth]
                              .find(m => m.id === selectedMatch)
                              ?.sections.find(s => s.id === selectedSection)?.name}
                          </span>
                        </div>
                        <div className="summaryItem">
                          <span>Price per ticket</span>
                          <span>
                            Nu.{matchData[selectedMonth]
                              .find(m => m.id === selectedMatch)
                              ?.sections.find(s => s.id === selectedSection)?.price}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="quantitySelector">
                      <span>Number of Tickets</span>
                      <div className="quantityControls">
                        <button
                          onClick={() => {
                            const newQuantity = Math.max(1, ticketQuantity - 1);
                            setTicketQuantity(newQuantity);
                            setIsGroupBooking(newQuantity >= 10);
                          }}
                          disabled={ticketQuantity <= 1 || isLoading}
                          className="quantityBtn"
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
                          className="quantityInput"
                        />
                        <button
                          onClick={() => {
                            const newQuantity = Math.min(20, ticketQuantity + 1);
                            setTicketQuantity(newQuantity);
                            setIsGroupBooking(newQuantity >= 10);
                          }}
                          disabled={ticketQuantity >= 20 || isLoading}
                          className="quantityBtn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {isGroupBooking && (
                    <div className="groupDiscount">
                      <FontAwesomeIcon icon={faUsers} className="discountIcon" />
                      <div className="discountInfo">
                        <h4>Group Booking Discount Applied!</h4>
                        <p>
                          {ticketQuantity >= 21 ? '15%' : '10%'} off for booking {ticketQuantity} tickets
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="priceSummary">
                    <div className="summaryItem">
                      <span>Subtotal</span>
                      <span>
                        Nu.{matchData[selectedMonth]
                          .find(m => m.id === selectedMatch)
                          ?.sections.find(s => s.id === selectedSection)?.price * ticketQuantity}
                      </span>
                    </div>
                    {isGroupBooking && (
                      <div className="summaryItem">
                        <span>Group Discount</span>
                        <span>
                          - Nu.
                          {matchData[selectedMonth]
                            .find(m => m.id === selectedMatch)
                            ?.sections.find(s => s.id === selectedSection)?.price *
                            ticketQuantity *
                            (ticketQuantity >= 21 ? 0.15 : 0.1)}
                        </span>
                      </div>
                    )}
                    <div className="summaryTotal">
                      <span>Total Amount</span>
                      <span>
                        Nu.
                        {(() => {
                          const price = matchData[selectedMonth]
                            .find(m => m.id === selectedMatch)
                            ?.sections.find(s => s.id === selectedSection)?.price;
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

                <div className="modalActions">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="cancelBtn"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="confirmBtn"
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
      </main>

      <footer className="ticket-footer">
        <div className="footer-content">
    </div>
  </footer>
       </>
  );
}

export default Ticketpage;