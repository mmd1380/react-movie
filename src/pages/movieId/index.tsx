import React, { useEffect, useState } from 'react'
import AppHeader from '../../components/common/AppHeader';
import AppButton from '../../components/common/AppButton';
import AppMovieItem from '../../components/AppMovieItem';
import classes from "../../assets/styles/moviePage.module.css"
import IMovie from '../../model/movie';
import { useParams, NavLink } from 'react-router-dom';
import { fetchMovieById } from "../../apis/movie";

const MoviePage = () => {
  const [movie, setMovie] = useState<IMovie>({
    id: 0,
    title: "",
    tagline: "",
    backdrop_path: "",
    vote_count: 0,
    vote_average: 0,
    revenue: 0,
    runtime: 0,
    release_date: "",
    poster_path: "",
    popularity: 0,
    overview: "",
    imdb_id: "",
    budget: 0,
    genres: []
  });
  const { id } = useParams();

  useEffect(() => {
    fetchMovieHandler();
  }, []);

  const fetchMovieHandler = async () => {
    const { data } = await fetchMovieById(Number(id));
    setMovie(data);
  }
  
  return (
    <>
      <AppHeader>
        <div className={classes['header-container']}>
          <NavLink to="/">
            <AppButton>
              Back
            </AppButton>
          </NavLink>
          <div className={classes['movie-info']}>
            <h1 className={classes.title}>{ movie.title }</h1>
            <h3 className={classes['sub-title']}>{ movie.tagline }</h3>
          </div>
        </div>
      </AppHeader>
      { movie.id && <AppMovieItem movie={movie}/> }
    </>
  )
}

export default MoviePage