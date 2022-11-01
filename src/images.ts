export const CATPAW_PATHS = [
  new URL("img/catpaw1.png", import.meta.url),
  new URL("img/catpaw2.png", import.meta.url),
  new URL("img/catpaw3.png", import.meta.url),
  new URL("img/catpaw4.png", import.meta.url),
  new URL("img/catpaw5.png", import.meta.url),
];

export const PAWPRINT_PATHS = [
  new URL("img/pawprint1.png", import.meta.url),
  new URL("img/pawprint2.png", import.meta.url),
  new URL("img/pawprint3.png", import.meta.url),
  new URL("img/pawprint4.png", import.meta.url)
];

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}
