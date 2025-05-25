import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        title: body.title,
        price: price,
        originalPrice: originalPrice,
        image: body.image,
        category: body.category,
        discount: discount
      }
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Error updating product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // First check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: params.id }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Error deleting product' },
      { status: 500 }
    );
  }
} 