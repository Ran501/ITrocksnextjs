import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password, phone } = await req.json();

    const client = await clientPromise;
    const usersCollection = client.db().collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      phone,
      createdAt: new Date()
    });

    if (!result.acknowledged) {
      return NextResponse.json(
        { error: 'User registration failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'User registered successfully'
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
} 