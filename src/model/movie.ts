export default interface IMovie {
    adult: boolean,
    backdrop_path: string,
    budget: number,
    genres: Array<IGenre>,
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: Array<Object>,
    status: string,
    tagline: string,
    title: string,
    video: false,
    vote_average: number,
    vote_count: number
}

export interface IGenre {
  id: number,
  name: string
}