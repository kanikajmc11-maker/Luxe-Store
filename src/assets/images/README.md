# Images Folder

Place all local image assets here.

## Recommended naming convention
- `hero-1.jpg`, `hero-2.jpg` — Hero slider images
- `cat-clothes.jpg`, `cat-footwear.jpg` — Category images
- `product-p001-1.jpg`, `product-p001-2.jpg` — Product images (id + view number)
- `team-arjun.jpg` — Team member photos
- `banner-women.jpg` — Promotional banner images

## Current setup
Images are loaded from Unsplash CDN URLs defined in `src/data/products.js`.
Replace the `image` and `images` fields in products.js with local paths like:
`import heroImg from './assets/images/hero-1.jpg'`

## Recommended sizes
- Hero: 1200×600px (JPG, optimised)
- Product: 600×680px (JPG, optimised)
- Category: 300×300px (JPG, optimised)
- Team: 300×300px (JPG, optimised)
