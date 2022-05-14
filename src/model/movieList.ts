export default interface IMovieList {
  id: number,
  title: string,
  backdrop_path: string,
  poster_path: string,
  overview: string,
  release_date: string
  genre_ids: Array<number>
}