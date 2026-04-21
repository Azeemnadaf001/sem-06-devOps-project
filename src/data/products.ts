export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  desc: string;
  specs: Record<string, string>;
  stock: number;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 199.99,
    image: "https://example.com/headphones.jpg",
    images: [
      "https://example.com/headphones-1.jpg",
      "https://example.com/headphones-2.jpg",
    ],
    desc: "Premium wireless headphones with noise cancellation.",
    specs: { battery: "30h", connectivity: "Bluetooth 5.0" },
    stock: 15,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: "2",
    name: "Mechanical Keyboard",
    price: 89.99,
    image: "https://example.com/keyboard.jpg",
    images: [
      "https://example.com/keyboard-1.jpg",
      "https://example.com/keyboard-2.jpg",
    ],
    desc: "Compact mechanical keyboard with RGB lighting.",
    specs: { switches: "Cherry MX Blue", layout: "65%" },
    stock: 23,
    rating: 4.2,
    reviews: 64,
  },
  {
    id: "3",
    name: "USB-C Hub",
    price: 49.99,
    image: "https://example.com/hub.jpg",
    images: [
      "https://example.com/hub-1.jpg",
      "https://example.com/hub-2.jpg",
    ],
    desc: "7-in-1 USB-C hub with HDMI and ethernet.",
    specs: { ports: "7", power: "100W PD" },
    stock: 42,
    rating: 4.7,
    reviews: 215,
  },
];