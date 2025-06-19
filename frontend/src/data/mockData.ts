import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    id: '2',
    name: 'Fashion',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    id: '3',
    name: 'Home & Garden',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    id: '4',
    name: 'Beauty',
    image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    id: '5',
    name: 'Toys & Kids',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    id: '6',
    name: 'Sports',
    image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  }
];

export const trendingProducts: Product[] = [
  {
    id: '7',
    title: 'Solar Powered Garden Lights',
    description: 'Set of 8 solar-powered LED garden lights with automatic dusk-to-dawn operation.',
    price: 39.99,
    discountPercentage: 25,
    rating: 4.4,
    stock: 50,
    brand: 'GreenEnergy',
    category: 'Home & Garden',
    thumbnail: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    images: [
      'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/545312/pexels-photo-545312.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ]
  },
  {
    id: '8',
    title: 'Fitness Smartwatch',
    description: 'Advanced fitness tracker with heart rate monitor, GPS, and 7-day battery life.',
    price: 149.99,
    discountPercentage: 15,
    rating: 4.6,
    stock: 35,
    brand: 'FitTech',
    category: 'Electronics',
    thumbnail: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ]
  },
  {
    id: '9',
    title: 'Wooden Building Blocks Set',
    description: 'Educational wooden building blocks set with 100 pieces in various shapes and colors.',
    price: 34.99,
    discountPercentage: 10,
    rating: 4.8,
    stock: 40,
    brand: 'EduToys',
    category: 'Toys & Kids',
    thumbnail: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    images: [
      'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/577697/pexels-photo-577697.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ]
  },
  {
    id: '10',
    title: 'Premium Basketball',
    description: 'Official size and weight basketball with superior grip and durability.',
    price: 29.99,
    discountPercentage: 0,
    rating: 4.5,
    stock: 55,
    brand: 'SportsPro',
    category: 'Sports',
    thumbnail: 'https://images.pexels.com/photos/945471/pexels-photo-945471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    images: [
      'https://images.pexels.com/photos/945471/pexels-photo-945471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ]
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Shop Owner',
    content: 'Chance Baaba has transformed my small business. The global reach and easy-to-use platform have helped me expand to international markets I never thought possible.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Wholesale Buyer',
    content: 'As a wholesale buyer, finding reliable suppliers was always a challenge until I discovered Chance Baaba. The verification system and quality guarantees have made sourcing products much easier.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Manufacturer',
    content: 'The tools for sellers on Chance Baaba are impressive. Analytics, inventory management, and shipping integration make running my manufacturing business seamless.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150'
  }
];