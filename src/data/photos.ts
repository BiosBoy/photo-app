export interface Photo {
  id: string;
  createDate: number; // unix ms timestamp
  title: string;
  caption: string;
  tags: string[];
}

const now = Date.now();
const days = (n: number) => n * 24 * 60 * 60 * 1000;

const photos: Photo[] = [
  {
    id: 'p1',
    createDate: now - days(2),
    title: 'Sunset at Cinque Terre',
    caption: 'Warm glow over the colorful houses on the Ligurian coast.',
    tags: ['travel', 'italy', 'sea', 'sunset', 'nature'],
  },
  {
    id: 'p2',
    createDate: now - days(4),
    title: 'Family Gelato Stop',
    caption: 'Our family enjoying gelato in Florence near the Duomo.',
    tags: ['family', 'italy', 'food', 'city'],
  },
  {
    id: 'p3',
    createDate: now - days(6),
    title: 'Tuscan Vineyard Walk',
    caption: 'Rolling hills and cypress trees during golden hour.',
    tags: ['nature', 'travel', 'italy', 'landscape'],
  },
  {
    id: 'p4',
    createDate: now - days(8),
    title: 'Rome at Night',
    caption: 'Streets around the Colosseum lit up after sunset.',
    tags: ['city', 'italy', 'night', 'travel'],
  },
  {
    id: 'p5',
    createDate: now - days(10),
    title: 'Venetian Canals',
    caption: 'Quiet morning gondolas by a tiny footbridge.',
    tags: ['water', 'italy', 'travel', 'architecture'],
  },
  {
    id: 'p6',
    createDate: now - days(12),
    title: 'Mountain Picnic',
    caption: 'Family picnic with a view of the Dolomites.',
    tags: ['family', 'mountains', 'nature', 'italy'],
  },
  {
    id: 'p7',
    createDate: now - days(14),
    title: 'Street Market Colors',
    caption: 'Fresh produce and flowers bursting with color.',
    tags: ['market', 'food', 'city', 'travel'],
  },
  {
    id: 'p8',
    createDate: now - days(16),
    title: 'Lake Como Ferry',
    caption: 'Ferry crossing with villas tucked into the hills.',
    tags: ['water', 'travel', 'italy', 'landscape'],
  },
  {
    id: 'p9',
    createDate: now - days(18),
    title: 'Pasta Night',
    caption: 'Homemade pasta with basil and tomatoes.',
    tags: ['food', 'family', 'home'],
  },
  {
    id: 'p10',
    createDate: now - days(20),
    title: 'Alleyway Discovery',
    caption: 'Tiny café hidden in a narrow alley.',
    tags: ['city', 'travel', 'italy'],
  },
  {
    id: 'p11',
    createDate: now - days(22),
    title: 'Beach Day',
    caption: 'Pebble beach with turquoise water.',
    tags: ['sea', 'nature', 'travel'],
  },
  {
    id: 'p12',
    createDate: now - days(24),
    title: 'Family Selfie',
    caption: 'All of us squeezed in front of a castle.',
    tags: ['family', 'portrait', 'travel'],
  },
  {
    id: 'p13',
    createDate: now - days(26),
    title: 'Forest Trail',
    caption: 'Shaded path with birdsong all around.',
    tags: ['nature', 'hike', 'forest'],
  },
  {
    id: 'p14',
    createDate: now - days(28),
    title: 'Cat on the Steps',
    caption: 'Friendly cat posing on marble steps.',
    tags: ['pets', 'city', 'street'],
  },
  {
    id: 'p15',
    createDate: now - days(30),
    title: 'Rooftop View',
    caption: 'Terracotta rooftops stretching to the horizon.',
    tags: ['city', 'architecture', 'travel'],
  },
  {
    id: 'p16',
    createDate: now - days(32),
    title: 'Countryside Road',
    caption: 'Dusty road lined with sunflowers.',
    tags: ['nature', 'landscape', 'summer'],
  },
  {
    id: 'p17',
    createDate: now - days(34),
    title: 'Harbor Morning',
    caption: 'Fishing boats and calm water at sunrise.',
    tags: ['water', 'sunrise', 'nature', 'travel'],
  },
  {
    id: 'p18',
    createDate: now - days(36),
    title: 'Rainy Day Espresso',
    caption: 'Steamy window and a tiny cup warming the hands.',
    tags: ['coffee', 'city', 'cozy'],
  },
  {
    id: 'p19',
    createDate: now - days(38),
    title: 'Village Festival',
    caption: 'Lanterns, music, and dancing in the square.',
    tags: ['event', 'night', 'family'],
  },
  {
    id: 'p20',
    createDate: now - days(40),
    title: 'Cliffside Path',
    caption: 'Blue sea below a winding hiking trail.',
    tags: ['hike', 'sea', 'nature', 'travel'],
  },
];

export default photos;
