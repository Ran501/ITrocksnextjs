import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { BookingStatus, Prisma } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received booking request:', body);

    const { phone, quantity, totalAmount, isGroupBooking, tickets } = body;

    // Validate phone number format
    if (!/^((77)|(17))\d{6}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { error: 'Invalid quantity' },
        { status: 400 }
      );
    }

    // Create booking with simplified data
    const booking = await prisma.booking.create({
      data: {
        phone,
        quantity,
        totalAmount,
        isGroupBooking,
        tickets,
        status: BookingStatus.confirmed
      }
    });

    console.log('Created booking:', booking);

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create booking',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        phone: phone
      } as Prisma.BookingWhereInput,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch bookings',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 