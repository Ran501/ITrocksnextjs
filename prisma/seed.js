import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing records
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();

  // Create your products
  await prisma.product.createMany({
    data: [
      {
        id: 1,
        title: "IT FC HOME JERSEY 2024/2025",
        price: 700,
        originalPrice: 1400,
        image: "/img/itfit.png",
        category: Category.jerseys,
        discount: 50,
      },
      {
        id: 2,
        title: "IT FC PRESEASON JERSEY 2022/2023",
        price: 350,
        originalPrice: 700,
        image: "/img/jersey3.png",
        category: Category.jerseys,
        discount: 50,
      },
      {
        id: 3,
        title: "ITFC X ADIDAS OVERHEAD HOODIE",
        price: 1100,
        originalPrice: 2200,
        image: "/img/jacket.png",
        category: Category.apparel,
        discount: 50,
      },
      {
        id: 4,
        title: "ITFC X ADIDAS TRACK JACKET",
        price: 900,
        originalPrice: 1800,
        image: "/img/jacket2.png",
        category: Category.apparel,
        discount: 50,
      },
      
      {
        id: 5,
        title: "ITFC X ADIDAS JACKET BLACK",
        price: 750,
        originalPrice: 1500,
        image: "/img/shirt1.png",
        category: Category.apparel,
        discount: 50,
      },

      {
        id: 6,
        title: "IT FC X ADIDAS SHIRT BLACK",
        price: 350,
        originalPrice: 700,
        image: "/img/shirt2.png",
        category: Category.apparel,
        discount: 50,
      },
      {
        id: 7,
        title: "ITFC X ADIDAS MUG WHITE",
        price: 100,
        originalPrice: 200,
        image: "/img/mug.png",
        category: Category.accessories,
        discount: 50,
      },
      {
        id: 8,
        title: "ITFC X ADIDAS BAR SCARF BLACK",
        price: 200,
        originalPrice: 400,
        image: "/img/shavel.png",
        category: Category.accessories,
        discount: 50,
      },
      {
        id: 9,
        title: "IT FC SCARF GIFT BOX BLACK",
        price: 250,
        originalPrice: 500,
        image: "/img/shavel2.png",
        category: Category.accessories,
        discount: 50,
      },
      {
        id: 10,
        title: "IT FC JIGME THE RED PLUSH RED",
        price: 150,
        originalPrice: 300,
        image: "/img/toy.png",
        category: Category.accessories,
        discount: 50,
      },
      {
        id: 11,
        title: "ITFC X ADIDAS SOCKS 3 PACK",
        price: 250,
        originalPrice: 500,
        image: "/img/socks.png",
        category: Category.apparel,
        discount: 50,
      },
      {
        id: 12,
        title: "ITFC X ADIDAS PRIME GYMSACK BLACK",
        price: 350,
        originalPrice: 700,
        image: "/img/bag.png",
        category: Category.accessories,
        discount: 50,
      },
      {
        id: 13,
        title: "ITFC X ADIDAS PRIME BACKPACK BLACK",
        price: 350,
        originalPrice: 700,
        image: "/img/bag2.png",
        category: Category.accessories,
        discount: 50,
      },
      {
        id: 14,
        title: "ITFC X ADIDAS WATER BOTTLE RED",
        price: 200,
        originalPrice: 400,
        image: "/img/bottle.png",
        category: Category.accessories,
        discount: 50,
      },
      {
        id: 15,
        title: "IT FC JIGME THE RED PLUSH BOBBALL",
        price: 150,
        originalPrice: 300,
        image: "/img/toy3.png",
        category: Category.accessories,
        discount: 50,
      },
      {
        id: 16,
        title: "IT FC JIGME THE RED PLUSH CUSHION",
        price: 150,
        originalPrice: 300,
        image: "/img/toy2.png",
        category: Category.accessories,
        discount: 50,
      },
    ],
  });
}

main()
  .then(() => console.log("Database seeded"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
