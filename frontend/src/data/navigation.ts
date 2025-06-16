import { NavigationItem } from '../types';

export const navigation: NavigationItem[] = [
  {
    title: 'Men',
    href: '/men',
    children: [
      { title: 'New Releases', href: '/men/new-releases', featured: true },
      { title: 'Best Sellers', href: '/men/best-sellers', featured: true },
      { title: 'T-Shirts', href: '/men/t-shirts' },
      { title: 'Shorts', href: '/men/shorts' },
      { title: 'Joggers', href: '/men/joggers' },
      { title: 'Hoodies', href: '/men/hoodies' },
      { title: 'Tanks', href: '/men/tanks' },
      { title: 'Accessories', href: '/men/accessories' }
    ]
  },
  {
    title: 'Women',
    href: '/women',
    children: [
      { title: 'New Releases', href: '/women/new-releases', featured: true },
      { title: 'Best Sellers', href: '/women/best-sellers', featured: true },
      { title: 'Sports Bras', href: '/women/sports-bras' },
      { title: 'Leggings', href: '/women/leggings' },
      { title: 'Shorts', href: '/women/shorts' },
      { title: 'Hoodies', href: '/women/hoodies' },
      { title: 'Crop Tops', href: '/women/crop-tops' },
      { title: 'Accessories', href: '/women/accessories' }
    ]
  },
  {
    title: 'Accessories',
    href: '/accessories',
    children: [
      { title: 'Bags', href: '/accessories/bags' },
      { title: 'Hats', href: '/accessories/hats' },
      { title: 'Bottles', href: '/accessories/bottles' },
      { title: 'Equipment', href: '/accessories/equipment' }
    ]
  },
  {
    title: 'Collections',
    href: '/collections',
    children: [
      { title: 'Summer Essentials', href: '/collections/summer-essentials', featured: true },
      { title: 'Training', href: '/collections/training' },
      { title: 'Lifestyle', href: '/collections/lifestyle' }
    ]
  }
];