// src/app/api/orders/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';

// Helper function to format date in Bhutan time
function formatBhutanTime(date: Date): string {
  return date.toLocaleString('en-US', {
    timeZone: 'Asia/Thimphu',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export async function POST(req: Request) {
  try {
    const { customerPhone, items, totalAmount } = await req.json();

    if (!customerPhone) {
      return NextResponse.json({ error: 'Missing customer phone' }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in order' }, { status: 400 });
    }
    if (!/^((77)|(17))\d{6}$/.test(customerPhone)) {
      return NextResponse.json({ error: 'Phone number must start with 77 or 17 and be 8 digits.' }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        customerPhone,
        totalAmount,
        status: OrderStatus.pending,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      }
    });
    console.log('ORDER CREATED:', order);
    
    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as any).message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
} 