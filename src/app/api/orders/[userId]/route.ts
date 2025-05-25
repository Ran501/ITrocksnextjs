// src/app/api/orders/[userId]/route.ts

import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the token
    const token = authHeader.split(' ')[1];
    const userId = await verifyToken(token);
    if (!userId || userId !== params.userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get user's orders
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
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