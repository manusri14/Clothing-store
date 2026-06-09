const mockProducts = [
  // MEN
  { name: 'Classic Oxford Shirt', description: 'Timeless staple for any wardrobe, crafted from premium organic cotton.', price: 65, category: 'MEN', images: ['https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=500&q=80'], sizes: ['M', 'L', 'XL'], featured: true },
  { name: 'Minimalist Leather Jacket', description: 'Sleek, genuine leather jacket with silver hardware and a tailored fit.', price: 320, category: 'MEN', images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80'], sizes: ['M', 'L'], featured: true },
  { name: 'Essential Chino Pants', description: 'Comfortable, stretch-cotton chinos perfect for smart-casual settings.', price: 85, category: 'MEN', images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80'], sizes: ['30', '32', '34'], featured: false },
  { name: 'Heavyweight Hoodie', description: 'Ultra-soft fleece hoodie in a relaxed oversized fit.', price: 95, category: 'MEN', images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80'], sizes: ['S', 'M', 'L', 'XL'], featured: false },
  { name: 'Linen Summer Button-Down', description: 'Breathable linen shirt for hot summer days.', price: 75, category: 'MEN', images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80'], sizes: ['M', 'L'], featured: false },
  { name: 'Tailored Wool Overcoat', description: 'Elegant double-breasted overcoat perfect for winter commutes.', price: 280, category: 'MEN', images: ['https://images.unsplash.com/photo-1520975954732-57dd22299614?w=500&q=80'], sizes: ['M', 'L', 'XL'], featured: true },
  { name: 'Slim Fit Denim Jeans', description: 'Classic raw denim with a slight stretch for comfort.', price: 110, category: 'MEN', images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80'], sizes: ['32', '34', '36'], featured: false },
  { name: 'Casual Graphic Tee', description: 'Vintage-inspired graphic print t-shirt in heavy cotton.', price: 40, category: 'MEN', images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80'], sizes: ['S', 'M', 'L'], featured: false },
  { name: 'Knit Polo Shirt', description: 'Retro-inspired knit polo with a textured finish.', price: 85, category: 'MEN', images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80'], sizes: ['M', 'L'], featured: false },
  
  // WOMEN
  { name: 'Silk Slip Dress', description: 'Elegant midi dress crafted from 100% pure silk with a cowl neckline.', price: 180, category: 'WOMEN', images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80'], sizes: ['XS', 'S', 'M'], featured: true },
  { name: 'Tailored Wide-Leg Trousers', description: 'High-waisted trousers with precise pleating and a flowing silhouette.', price: 110, category: 'WOMEN', images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80'], sizes: ['S', 'M', 'L'], featured: true },
  { name: 'Oversized Cashmere Sweater', description: 'Luxuriously soft cashmere knit designed for effortless layering.', price: 210, category: 'WOMEN', images: ['https://images.unsplash.com/photo-1623609163859-ca93c959b98a?w=500&q=80'], sizes: ['S', 'M', 'L'], featured: false },
  { name: 'Classic Denim Jacket', description: 'Vintage-wash denim jacket with an authentic worn-in feel.', price: 135, category: 'WOMEN', images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80'], sizes: ['S', 'M', 'L'], featured: true },
  { name: 'Pleated Midi Skirt', description: 'Lightweight pleated skirt perfect for spring and summer.', price: 95, category: 'WOMEN', images: ['https://images.unsplash.com/photo-1583496661160-c5dcb2241c6f?w=500&q=80'], sizes: ['XS', 'S', 'M'], featured: false },
  { name: 'Fitted Ribbed Knit Top', description: 'Essential layering piece with a flattering square neckline.', price: 45, category: 'WOMEN', images: ['https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500&q=80'], sizes: ['S', 'M', 'L'], featured: false },
  { name: 'Vegan Leather Trench Coat', description: 'Statement outerwear piece that elevates any outfit.', price: 260, category: 'WOMEN', images: ['https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&q=80'], sizes: ['S', 'M', 'L'], featured: true },
  { name: 'Cropped Cardigan', description: 'Chunky knit cardigan with oversized buttons.', price: 85, category: 'WOMEN', images: ['https://images.unsplash.com/photo-1434389678369-183017cb6e17?w=500&q=80'], sizes: ['S', 'M'], featured: false },
  { name: 'Linen Wrap Dress', description: 'Effortless wrap dress for warm weather getaways.', price: 150, category: 'WOMEN', images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80'], sizes: ['S', 'M', 'L'], featured: false },
  
  // STREETWEAR
  { name: 'Techwear Cargo Pants', description: 'Water-resistant tactical pants with multiple strapped pockets.', price: 140, category: 'STREETWEAR', images: ['https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500&q=80'], sizes: ['M', 'L', 'XL'], featured: true },
  { name: 'Reflective Windbreaker', description: 'Lightweight jacket for urban streetwear environments.', price: 180, category: 'STREETWEAR', images: ['https://images.unsplash.com/photo-1617325247661-675ab03407b3?w=500&q=80'], sizes: ['S', 'M', 'L'], featured: false },
  { name: 'Distressed Oversized Tee', description: 'Acid-wash t-shirt with subtle distressing on the hems.', price: 55, category: 'STREETWEAR', images: ['https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500&q=80'], sizes: ['M', 'L', 'XL'], featured: false },
  { name: 'Chunky Sneaker Boots', description: 'Hybrid footwear combining sneaker comfort with boot durability.', price: 220, category: 'STREETWEAR', images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80'], sizes: ['8', '9', '10', '11'], featured: true },
  { name: 'Nylon Messenger Bag', description: 'Crossbody bag with industrial hardware details.', price: 90, category: 'STREETWEAR', images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80'], sizes: ['ONE SIZE'], featured: false },
  { name: 'Panelled Track Jacket', description: 'Retro-futuristic zip-up jacket with contrast panels.', price: 130, category: 'STREETWEAR', images: ['https://images.unsplash.com/photo-1559582798-678dfc71cf85?w=500&q=80'], sizes: ['M', 'L', 'XL'], featured: false },

  // FORMAL
  { name: 'Tailored Wool Blazer', description: 'Premium formal wear suitable for high-end events.', price: 350, category: 'FORMAL', images: ['https://images.unsplash.com/photo-1594938298596-70f56fb3cecb?w=500&q=80'], sizes: ['38R', '40R', '42R'], featured: true },
  { name: 'Silk Evening Gown', description: 'Floor-length gown with an open back and delicate straps.', price: 580, category: 'FORMAL', images: ['https://images.unsplash.com/photo-1566160983935-866bf7e584ec?w=500&q=80'], sizes: ['4', '6', '8'], featured: true },
  { name: 'Crisp White Tuxedo Shirt', description: 'Impeccable slim-fit dress shirt with French cuffs.', price: 120, category: 'FORMAL', images: ['https://images.unsplash.com/photo-1620012253295-c15bc3e658e3?w=500&q=80'], sizes: ['15', '15.5', '16'], featured: false },
  { name: 'Velvet Smoking Jacket', description: 'Luxurious velvet jacket with satin lapels for black-tie events.', price: 420, category: 'FORMAL', images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80'], sizes: ['40R', '42R'], featured: false },
  { name: 'Patent Leather Oxfords', description: 'High-shine formal shoes crafted from Italian leather.', price: 295, category: 'FORMAL', images: ['https://images.unsplash.com/photo-1614252209142-2b22bb857f12?w=500&q=80'], sizes: ['9', '10', '11'], featured: false },
  { name: 'Pearl Embellished Clutch', description: 'Hard-shell evening bag with pearl detailing and gold chain.', price: 160, category: 'FORMAL', images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80'], sizes: ['ONE SIZE'], featured: false }
];

module.exports = mockProducts;
