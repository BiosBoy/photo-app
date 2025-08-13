export type Photo = {
  id: string;
  createDate: number;
  title: string;
  caption: string;
  tags: string[];
  fileName: string;
  fileType: string;
};

const photos: Photo[] = [
  {
    id: '23rdsvgd2sdf',
    createDate: 1733836800000,
    title: 'Lone Tree at Dusk',
    caption: 'A solitary tree crowns a hill while wildflowers blur in the foreground at sunset.',
    tags: ['nature', 'landscape', 'sunset', 'calm'],
    fileName: 'pexels-ebahir-1173285862-32945132',
    fileType: 'jpg',
  },
  {
    id: 'dfg43234dfgfdg',
    createDate: 1733491200000,
    title: 'Wrapped in Warmth',
    caption: 'A couple cuddles beneath a patterned blanket in golden evening light.',
    tags: ['people', 'love', 'portrait', 'warmth', 'family'],
    fileName: 'pexels-1032268979-20568986',
    fileType: 'jpg',
  },
  {
    id: 'dfg432423gdfg',
    createDate: 1733145600000,
    title: 'Canals at Golden Hour',
    caption: 'Historic warehouses and bridges reflect on a quiet canal at sunset (Hamburg).',
    tags: ['city', 'travel', 'architecture', 'water', 'sunset'],
    fileName: 'pexels-ben-b-1404794507-33217722',
    fileType: 'jpg',
  },
  {
    id: 'dfg32gdfg4324',
    createDate: 1732800000000,
    title: 'Slow Morning Breakfast',
    caption: 'Croissants, coffee, and peanut butter on vintage plates—simple weekend comfort.',
    tags: ['food', 'breakfast', 'cozy', 'home'],
    fileName: 'pexels-badesaba-30895359',
    fileType: 'jpg',
  },
  {
    id: 'dfhf325dfhdfh',
    createDate: 1732454400000,
    title: 'City in Motion',
    caption: 'Blurred buses sweep past red-brick facades on a cool evening downtown.',
    tags: ['urban', 'street', 'motion', 'city'],
    fileName: 'pexels-minhaj-muhammad-290894-33021572',
    fileType: 'jpg',
  },
  {
    id: 'dfhf234532dbdf',
    createDate: 1732108800000,
    title: 'Autumn Still Life',
    caption: 'Pumpkins, apples, and mums arranged beside a cabin door on a carpet of leaves.',
    tags: ['autumn', 'still-life', 'home', 'cozy', 'seasonal'],
    fileName: 'pexels-valeriya-18852534',
    fileType: 'jpg',
  },
  {
    id: 'dfhf234532dbdf',
    createDate: 1732108800000,
    title: 'Street Vides',
    caption: 'Jut another morning in New York beloved local coffee shop.',
    tags: ['autumn', 'street', 'coffee', 'cozy', 'vibrant'],
    fileName: 'pexels-valeriya-18852534',
    fileType: 'jpg',
  },
];

export default photos;
