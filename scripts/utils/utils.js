export function getRandomMovies(movies, count) {
  const shuffled = movies.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}