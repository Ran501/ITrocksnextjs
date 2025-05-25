// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// Removed unused import as the PrismaClient is instantiated locally


const prisma = new PrismaClient();

// Get all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        price: true,
        originalPrice: true,
        image: true,
        category: true,
        discount: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    if (!products || products.length === 0) {
      return NextResponse.json({ message: 'No products found' }, { status: 200 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// Create new product
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.price || !body.image || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate price is a positive number
    const price = parseFloat(body.price);
    if (isNaN(price) || price < 0) {
      return NextResponse.json(
        { error: 'Invalid price value' },
        { status: 400 }
      );
    }

    // Validate original price if provided
    let originalPrice = null;
    if (body.originalPrice) {
      originalPrice = parseFloat(body.originalPrice);
      if (isNaN(originalPrice) || originalPrice < 0) {
        return NextResponse.json(
          { error: 'Invalid original price value' },
          { status: 400 }
        );
      }
    }

    // Validate discount if provided
    let discount = null;
    if (body.discount) {
      discount = parseInt(body.discount);
      if (isNaN(discount) || discount < 0 || discount > 100) {
        return NextResponse.json(
          { error: 'Invalid discount value. Must be between 0 and 100' },
          { status: 400 }
        );
      }
    }

    const product = await prisma.product.create({
      data: {
        title: body.title,
        price: price,
        originalPrice: originalPrice,
        image: body.image,
        category: body.category,
        discount: discount
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
